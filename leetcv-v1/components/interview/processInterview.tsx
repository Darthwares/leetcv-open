import { formatAMPM, formatTime, formatTimeTaken, getBrowserDeviceAndOSInfo } from "@constants/defaults";
import {
  disableSidebarState,
  mockInterviewTopicState,
  resumeState,
  userIdState,
} from "@state/state";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import { useWizard } from "react-use-wizard";
import { useRecoilState, useSetRecoilState } from "recoil";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import EndInterviewModal from "./endInterviewModal";
import EnterTopic from "./enterTopic";
import ShowTimer from "./showTimer";
import { Interview } from "types/dashboardTypes";
import { trpc } from "@utils/trpc";
import StartedInterview from "./startedInterview";
import AccessCamera from "./accessCamera";
import Speaking from "./speaking";
import TapToSpeak from "./tapToSpeak";
import { Card, CardContent, CardHeader } from "shadcn/components/ui/cards";
import { Button } from "shadcn/components/ui/button";
import useManageToken from "@lib/helper/useManageToken";
import { isMobileOnly, isIOS } from "mobile-device-detect";
import { useUniqueSkills } from "@lib/helper/useUniqueSkills";
import { XIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";

interface ProcessInterviewProps {
  setReport: Dispatch<SetStateAction<Interview | null>>;
}
const ProcessInterview = ({ setReport }: ProcessInterviewProps) => {
  const { previousStep, nextStep } = useWizard();
  const [resume] = useRecoilState(resumeState);
  const uniqueSkills = useUniqueSkills(resume);
  const filteredSkills = uniqueSkills.slice(0, 14);
  const [topic, setTopic] = useRecoilState(mockInterviewTopicState);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qaHistory, setQaHistory] = useState<
    { question: string; answer: string }[]
  >([]);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);
  const [popupDismissed, setPopupDismissed] = useState(false);
  const [isMicrophoneAvailable, setIsMicrophoneAvailable] = useState(false);
  const totalTime = 15 * 60;
  const [time, setTime] = useState(totalTime);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autoEndTimerRef = useRef<NodeJS.Timeout | null>(null);
  const questionRef = useRef(question);
  const qaHistoryRef = useRef(qaHistory);
  const answerRef = useRef(answer);
  const answerScrollRef = useRef<HTMLDivElement | null>(null);
  const [gptAudio, setGptAudio] = useState<HTMLAudioElement | null>(null);
  const [audioPosition, setAudioPosition] = useState<number>(0);
  const setDisableSidebar = useSetRecoilState(disableSidebarState);

  const saveInterviewReport = trpc.useMutation([
    "fs.mockInterviewRouter.saveInterviewData",
  ]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const t = useTranslations("Interview");

  const [isQuestionComplete, setIsQuestionComplete] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [userId] = useRecoilState(userIdState);
  const { deductToken } = useManageToken();
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(true);
  const { browser, os } = getBrowserDeviceAndOSInfo();

  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHelperActiveRef = useRef(false);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  // New state and ref for helper timer
  const [showHelperTimer, setShowHelperTimer] = useState(false);
  const helperTimerRef = useRef<NodeJS.Timeout | null>(null);

  const playAudio = (audioBase64: string) => {
    return new Promise<void>((resolve, reject) => {
      const audioSource = `data:audio/mp3;base64,${audioBase64}`;
      if (currentAudioRef.current) {
        currentAudioRef.current.pause(); // Pause the audio
        currentAudioRef.current.currentTime = 0; // Reset playback time
      }
      const audio = new Audio(audioSource);
      currentAudioRef.current = audio;

      audio.onerror = () => {
        toast.error("Error playing audio. Please try again.");
        reject(new Error("Audio playback error"));
      };

      audio.onended = () => {
        resolve();
        currentAudioRef.current = null;
      };

      audio.play();
    });
  };

  useEffect(() => {
    if (listening) {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }

      pauseTimerRef.current = setTimeout(async () => {
        if (!answer.trim()) {
          return; // Skip the API call for the initial 3 seconds pause
        }

        if (!isHelperActiveRef.current) {
          isHelperActiveRef.current = true;

          // Start the 5-second timer to show the helper timer
          helperTimerRef.current = setTimeout(() => {
            setShowHelperTimer(true);
          }, 5000); // 5000 milliseconds = 5 seconds

          try {
            const response = await fetch(
              "/api/openai/interview/userInteraction",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  sessionId,
                  currentQuestion: question,
                  transcript: answer,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to get assistance");
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            if (reader) {
              while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });

                let lines = buffer.split("\n");
                buffer = lines.pop() || "";

                for (const line of lines) {
                  if (line.trim()) {
                    const data = JSON.parse(line);
                    if (data.audio) {
                      await playAudio(data.audio);
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error("Error fetching helper assistance:", error);
            toast.error("Failed to fetch assistance.");
          } finally {
            isHelperActiveRef.current = false;
            setShowHelperTimer(false); // Hide the timer when assistance is done
            if (helperTimerRef.current) {
              clearTimeout(helperTimerRef.current);
              helperTimerRef.current = null;
            }
          }
        }
      }, 3000);
    }

    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
      if (helperTimerRef.current) {
        clearTimeout(helperTimerRef.current);
      }
    };
  }, [listening, sessionId, question, answer]);

  useEffect(() => {
    if (currentAudioRef.current && isHelperActiveRef.current) {
      currentAudioRef.current.pause(); // Pause the audio
      currentAudioRef.current.currentTime = 0; // Reset playback
      currentAudioRef.current = null;
      isHelperActiveRef.current = false;
      setShowHelperTimer(false); // Hide the timer when assistance is done
      if (helperTimerRef.current) {
        clearTimeout(helperTimerRef.current);
        helperTimerRef.current = null;
      }
    }
  }, [answer]);

  const { data: questionData } = trpc.useQuery(
    ["fs.mockInterviewRouter.getQuestionsByTopic", { id: userId, topic }],
    {
      enabled: !!userId && !!topic,
    }
  );

  useEffect(() => {
    questionRef.current = question;
  }, [question]);

  useEffect(() => {
    qaHistoryRef.current = qaHistory;
  }, [qaHistory]);

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  useEffect(() => {
    if (answerScrollRef.current) {
      answerScrollRef.current.scrollTop = answerScrollRef.current.scrollHeight;
    }
  }, [answer]);

  const checkMicrophonePermission = useCallback(async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      setIsMicrophoneAvailable(permissionStatus.state === "granted");

      permissionStatus.onchange = () => {
        setIsMicrophoneAvailable(permissionStatus.state === "granted");
      };
    } catch (error) {
      console.error("Error checking microphone permission:", error);
    }
  }, []);

  useEffect(() => {
    checkMicrophonePermission();
  }, [checkMicrophonePermission]);

  useEffect(() => {
    if (isInterviewActive) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      autoEndTimerRef.current = setTimeout(() => {
        SpeechRecognition.stopListening();
        endInterview();
      }, time * 60 * 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (autoEndTimerRef.current) {
        clearTimeout(autoEndTimerRef.current);
        autoEndTimerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (autoEndTimerRef.current) {
        clearTimeout(autoEndTimerRef.current);
        autoEndTimerRef.current = null;
      }
    };
  }, [isInterviewActive]);

  useEffect(() => {
    if (gptAudio) {
      const handleEnded = () => {
        setIsQuestionComplete(true);
      };

      gptAudio.addEventListener("ended", handleEnded);

      if (listening) {
        gptAudio.pause();
        setAudioPosition(gptAudio.currentTime);
      } else {
        if (audioPosition > 0 && gptAudio.paused && !isQuestionComplete) {
          gptAudio.currentTime = audioPosition;
          gptAudio.play();
        }
      }

      return () => {
        gptAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, [listening, gptAudio, audioPosition, isQuestionComplete]);

  useEffect(() => {
    setIsQuestionComplete(false);
  }, [question]);

  useEffect(() => {
    if (isInterviewActive) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key.toLowerCase() === "s") {
          if (isRecording) {
            SpeechRecognition.stopListening();
            setIsRecording(false);
            toast.info("Recording stopped");
          }
        } else if (event.key.toLowerCase() === "r") {
          if (!isRecording) {
            startListening();
            setIsRecording(true);
            toast.info("Recording started");
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isInterviewActive, isRecording]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);



  const startInterview = async () => {
    if (!topic) {
      toast.error("Please enter a topic to start the interview.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/openai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, questionData }),
      });
      const data = await response.json();
      setSessionId(data.sessionId);
      setQuestion(data.interviewQuestions);
      setIsInterviewActive(true);
      setDisableSidebar(true);
      const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
      setGptAudio(audio);

      audio.play();
    } catch (error) {
      console.error("Error starting interview:", error);
      toast.error("Failed to start interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill((prevSelectedSkill) =>
      prevSelectedSkill === skill ? null : skill
    );
    if (topic.toLowerCase() !== skill.toLowerCase()) {
      setTopic(skill);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTopic = e.target.value;
    setTopic(newTopic);
    if (!newTopic) {
      setSelectedSkill(null);
    }
  };

  const handleStartInterview = async () => {
    startInterview();
  };

  const submitAnswer = async () => {
    setIsLoading(true);
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setIsQuestionComplete(true);

    try {
      const response = await fetch("/api/openai/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentAnswer: answer,
          sessionId,
          topic,
          questionData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      if (data.audio) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audio}`);
        audio.onerror = () => {
          console.error("Error loading audio");
          toast.error("Failed to load audio. Please try again.");
          setIsSubmissionSuccessful(false);
        };

        setQaHistory((prevHistory) => [...prevHistory, { question, answer }]);
        setQuestion(data.interviewQuestions);
        setAnswer("");

        setGptAudio(audio);
        audio.play();
        resetTranscript();
      }
    } catch (error: any) {
      console.error("Error submitting answer:", error);
      toast.error(`Failed to submit answer: ${error.message}`);
      setIsSubmissionSuccessful(false);
    } finally {
      setIsLoading(false);
      //  resetTranscript();
    }
  };

  const endInterview = async () => {
    setIsLoading(true);
    setIsInterviewActive(false);

    if (gptAudio) {
      gptAudio.pause();
      gptAudio.currentTime = 0;
    }
    if (currentAudioRef.current) {
      currentAudioRef.current.pause(); // Pause the audio
      currentAudioRef.current.currentTime = 0; // Reset playback
      currentAudioRef.current = null;
    }

    setIsQuestionComplete(true);
    SpeechRecognition.stopListening();
    nextStep();
    const finalAnswer = answerRef.current;
    const updatedQaHistory = [
      ...qaHistoryRef.current,
      { question: questionRef.current, answer: finalAnswer },
    ];
    setQaHistory(updatedQaHistory);
    try {
      const response = await fetch("/api/openai/end-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          qaHistory: updatedQaHistory,
          name: resume.displayName,
          answer: finalAnswer,
        }),
      });

      const data = await response.json();

      const formattedStartTime = formatAMPM(
        new Date(new Date().getTime() - (totalTime - time) * 1000)
      );
      const unansweredQuestions = updatedQaHistory.filter(
        (qa) => !qa.answer || qa.answer === "no answer provided"
      ).length;

      const interviewDetails: Interview = {
        id: resume.id,
        topic,
        attemptedAtDate: formattedStartTime.split("T")[0],
        timeTaken: formatTimeTaken(totalTime - time),
        totalQuestions: updatedQaHistory.length,
        answeredQuestions: updatedQaHistory.length - unansweredQuestions,
        unansweredQuestions,
        questionAnswer: updatedQaHistory,
        report: data.report,
        attemptedAtTime: formattedStartTime,
        createdAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
      };

      setReport(interviewDetails);

      saveInterviewReport.mutate({
        id: resume.id,
        topic,
        timeTaken: formatTimeTaken(totalTime - time),
        totalQuestions: updatedQaHistory.length,
        answeredQuestions: updatedQaHistory.length - unansweredQuestions,
        unansweredQuestions,
        questionAnswer: updatedQaHistory,
        report: data.report,
        attemptedAtTime: formattedStartTime,
      });
      deductToken(1000);
    } catch (error) {
      console.error("Error ending interview:", error);
      toast.error("Failed to end interview. Please try again.");
    } finally {
      setIsQuestionComplete(true);
      setIsLoading(false);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    setIsRecording(true);
  };
  const handleMicrophoneStop = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  };
  const handleAgainRecord = () => {
    startListening();
    setAnswer("");
    resetTranscript();
  };

  if (!browserSupportsSpeechRecognition || (os === "Mac OS" && browser === "Edge") || (os !== "Mac OS" && browser !== "Chrome" && browser !== "Edge")) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-96 h-96 mb-8">
          <lottie-player
            src="/assets/lottie/website-error.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
          Unsupported Browser
        </h2>
        <p className="text-lg text-gray-600 max-w-lg font-medium">
          Please use  {os === "Mac OS" ? "other browser" : "Chrome or Edge"} to access the interview feature. Speech recognition is not supported in your current browser.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
          <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-indigo-500 font-semibold">Requires Web Speech API support</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto sm:p-4 relative">
      {!isInterviewActive && (
        <EnterTopic
          filteredSkills={filteredSkills!}
          selectedSkill={selectedSkill!}
          handleSkillClick={handleSkillClick}
          topic={topic}
          handleInputChange={handleInputChange}
          isLoading={isLoading}
          previousStep={previousStep}
          handleStartInterview={handleStartInterview}
        />
      )}

      {isInterviewActive && (
        <>
          <div className="mb-4 pl-3 flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 hidden md:block">
              Mock Interview Practice
            </h1>
          </div>
          <ShowTimer
            time={time}
            isLoading={isLoading}
            setShowEndModal={setShowEndModal}
            formatTime={formatTime}
          />
          <div></div>
          <div className="my-3">
            <div className="w-full flex justify-end mb-4">
              {time < 61 && !popupDismissed && (
                <div
                  className={`max-w-full md:max-w-xs shadow-xl flex gap-6 p-2 justify-between items-center bg-red-500 text-white rounded-md`}
                >
                  <p>{t("onlySecondsLeft")}</p>
                  <button onClick={() => setPopupDismissed(true)}>
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <Card className="shadow-none rounded-md px-0">
              <CardHeader className="p-3">
                <h2 className="text-lg font-semibold">
                  Question: {qaHistory.length + 1}
                </h2>
              </CardHeader>
              <CardContent className="px-3 pb-3 pt-0">
                <p className="text-gray-600 leading-relaxed">{question}</p>
              </CardContent>
            </Card>
          </div>
          <main className="flex flex-col-reverse  w-full md:flex-row md:space-y-0 md:space-x-4">
            <StartedInterview
              time={time}
              popupDismissed={popupDismissed}
              setPopupDismissed={setPopupDismissed}
              qaHistory={qaHistory}
              question={question}
              listening={listening}
              isLoading={isLoading}
              answer={answer}
              answerScrollRef={answerScrollRef}
              transcript={transcript}
              submitAnswer={submitAnswer}
              handleAgainRecord={handleAgainRecord}
            />
            <aside className="flex flex-col items-center w-full pt-0 bg-white rounded-t-md md:w-1/3">
              <div className="relative w-full border-dashed border-2 rounded-md items-center md:top-12 top-0">
                {/* Conditionally render the helper timer */}
                {showHelperTimer && (
                  <div className="absolute top-0 left-0 w-full bg-yellow-100 p-2 rounded-md shadow-md z-10">
                    <p className="text-sm text-yellow-800">
                      LeetCV Assistance active...
                    </p>
                    {/* Replace with a custom Timer component if needed */}
                  </div>
                )}

                {isMobileOnly && isIOS ? null : (
                  <AccessCamera isInterviewActive={isInterviewActive} />
                )}
                <div className="justify-center flex w-full">
                  <Button
                    onClick={listening ? handleMicrophoneStop : startListening}
                    disabled={isLoading}
                    className={`flex px-0 w-full items-center ${listening ? "text-indigo-600" : ""
                      }  ${isLoading && "cursor-not-allowed"}`}
                  >
                    {listening ? <Speaking /> : <TapToSpeak />}
                  </Button>
                </div>
              </div>
            </aside>
          </main>
        </>
      )}
      <EndInterviewModal
        handleEnd={endInterview}
        open={showEndModal}
        setOpen={setShowEndModal}
        interviewActive={isInterviewActive}
        timeLeft={time}
      />
    </div>
  );
};

export default ProcessInterview;
