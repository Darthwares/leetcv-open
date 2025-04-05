import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

interface InterviewState {
  questions: string[];
  answers: string[];
  currentDifficulty: "easy" | "medium" | "hard";
  usedQuestionDataIndices: Set<number>;
}

interface GenerateInterviewRequest {
  topic: string;
  studentAnswer?: string;
  sessionId?: string;
  questionData?: string[];
}

interface OpenAIMessage {
  role: string;
  content: string;
}

interface OpenAIChoice {
  index: number;
  message: OpenAIMessage;
  finish_reason: string;
}

interface OpenAIChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  choices: OpenAIChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const interviewStates: Record<string, InterviewState> = {};

const getDifficultyLevel = (
  questionCount: number
): "easy" | "medium" | "hard" => {
  if (questionCount <= 3) return "easy";
  if (questionCount <= 6) return "medium";
  return "hard";
};

const shouldUseQuestionData = (): boolean => {
  const probability = 0.3;
  return Math.random() < probability;
};

const getRandomQuestionFromData = (
  questionData: string[],
  usedIndices: Set<number>
): { question: string; index: number } | null => {
  const availableIndices = questionData
    .map((_, idx) => idx)
    .filter((idx) => !usedIndices.has(idx));

  if (availableIndices.length === 0) {
    return null;
  }

  const randomIdx =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return { question: questionData[randomIdx], index: randomIdx };
};

export default async function generateMockInterviewQuestions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    topic,
    studentAnswer,
    sessionId,
    questionData = [],
  }: GenerateInterviewRequest = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  if (req.method === "POST") {
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });

      let prompt: string;
      let selectedQuestion: string | null = null;
      let usedQuestionDataIndex: number | null = null;

      let session = sessionId ? interviewStates[sessionId] : null;
      if (sessionId && !session) {
        interviewStates[sessionId] = {
          questions: [],
          answers: [],
          currentDifficulty: "easy",
          usedQuestionDataIndices: new Set<number>(),
        };
        session = interviewStates[sessionId];
      }

      if (session && shouldUseQuestionData() && questionData.length > 0) {
        const result = getRandomQuestionFromData(
          questionData,
          session.usedQuestionDataIndices
        );

        if (result) {
          selectedQuestion = result.question;
          usedQuestionDataIndex = result.index;
          session.questions.push(selectedQuestion);
          session.usedQuestionDataIndices.add(usedQuestionDataIndex);

          const nextDifficulty = getDifficultyLevel(session.questions.length);
          session.currentDifficulty = nextDifficulty;

          return res.status(200).json({
            interviewQuestions: selectedQuestion,
            sessionId: sessionId,
            audio: null,
          });
        } else {
          console.log(
            "No unused questions available in questionData. Falling back to generating a new question."
          );
        }
      }

      if (sessionId && studentAnswer) {
        const previousQuestions = session?.questions || [];
        const questionCount = previousQuestions.length;
        const nextDifficulty = getDifficultyLevel(questionCount + 1);

        const previousQuestionsStr =
          previousQuestions.length > 0
            ? `Here are the previously asked questions:\n${previousQuestions
                .map((q: string, idx: number) => `${idx + 1}. ${q}`)
                .join("\n")}\n`
            : "";

        prompt = `You are an interviewer conducting a mock interview on the topic "${topic}". The current difficulty level is "${nextDifficulty}". Based on the student's last answer: "${studentAnswer}", generate the next interview question that strictly relates to "${topic}".

${previousQuestionsStr}

**Instructions:**
- Do not include any greetings, introductions, or concluding remarks.
- Do not number the question (e.g., avoid "Question 1," "Next," etc.).
- Provide only the interview question as a single line of text without any additional formatting or commentary.
- Do not repeat any of the previously asked questions.
- Ensure the question is suitable for a final-year major student and matches the current difficulty level ("${nextDifficulty}").
`;
      } else {
        if (questionData.length > 0) {
          const initialDifficulty: "easy" | "medium" | "hard" = "easy";
          const previousQuestionsStr = `Here are some example questions that have been asked before:\n${questionData
            .map((q: string, idx: number) => `${idx + 1}. ${q}`)
            .join("\n")}\n`;

          prompt = `You are an interviewer conducting a mock interview on the topic "${topic}". The current difficulty level is "${initialDifficulty}". Generate the first interview question that strictly relates to "${topic}".

${previousQuestionsStr}

**Instructions:**
- Do not include any greetings, introductions, or concluding remarks.
- Do not number the question (e.g., avoid "Question 1," "First," etc.).
- Provide only the interview question as a single line of text without any additional formatting or commentary.
- Do not repeat any of the example questions provided above.
- Ensure the question is suitable for a final-year major student and matches the current difficulty level ("${initialDifficulty}").
`;
        } else {
          const initialDifficulty: "easy" | "medium" | "hard" = "easy";

          prompt = `You are an interviewer conducting a mock interview on the topic "${topic}". The current difficulty level is "${initialDifficulty}". Generate an interview question that is appropriate for a final-year major student. The question should assess the student's understanding and application of advanced concepts related to "${topic}" and match the current difficulty level ("${initialDifficulty}").

**Instructions:**
- Do not include any greetings, introductions, or concluding remarks.
- Do not number the question (e.g., avoid "Question 1," "First," etc.).
- Provide only the interview question as a single line of text without any additional formatting or commentary.
`;
        }
      }

      const response = (await openai.chat.completions.create({
        model: `gpt-4o-mini`,
        messages: [
          {
            role: "system",
            content: prompt,
          },
        ],
        max_tokens: 700,
        temperature: 0.7,
      })) as OpenAIChatCompletionResponse;

      if (
        response.choices &&
        Array.isArray(response.choices) &&
        response.choices.length > 0 &&
        response.choices[0].message &&
        typeof response.choices[0].message.content === "string"
      ) {
        const generatedQuestion = response.choices[0].message.content.trim();
       
        const ttsResponse = await openai.audio.speech.create({
          model: "tts-1",
          voice: "alloy",
          input: generatedQuestion,
          speed: 1,
          response_format: "mp3",
        });

        const arrayBuffer = await ttsResponse.arrayBuffer();
        const audioBase64 = Buffer.from(arrayBuffer).toString("base64");

        if (!sessionId) {
          const newSessionId = new Date().getTime().toString();
          interviewStates[newSessionId] = {
            questions: [generatedQuestion],
            answers: [],
            currentDifficulty: "medium",
            usedQuestionDataIndices: new Set<number>(),
          };
          console.log(`New session created with ID ${newSessionId}`);

          return res.status(200).json({
            sessionId: newSessionId,
            interviewQuestions: generatedQuestion,
            audio: audioBase64,
          });
        } else {
          if (!interviewStates[sessionId]) {
            interviewStates[sessionId] = {
              questions: [],
              answers: [],
              currentDifficulty: "easy",
              usedQuestionDataIndices: new Set<number>(),
            };
          }

          interviewStates[sessionId].questions.push(generatedQuestion);

          const nextDifficulty = getDifficultyLevel(
            interviewStates[sessionId].questions.length
          );

          interviewStates[sessionId].currentDifficulty = nextDifficulty;

          console.log(
            `Added question to session ${sessionId} with difficulty ${nextDifficulty}`
          );

          return res.status(200).json({
            interviewQuestions: generatedQuestion,
            sessionId: sessionId,
            audio: audioBase64,
          });
        }
      } else {
        console.error("OpenAI response does not contain valid choices.");
        return res.status(500).json({ error: "Failed to generate question." });
      }
    } catch (error) {
      console.error("Error generating interview question:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    const { sessionId } = req.query;
    console.log(`Fetching data for session ID ${sessionId}`);

    if (sessionId && interviewStates[sessionId as string]) {
      console.log(`Session data found for ID ${sessionId}`);
      res.status(200).json(interviewStates[sessionId as string]);
    } else {
      console.error(`Session ID ${sessionId} not found`);
      res.status(404).json({ error: "Session not found" });
    }
  } else {
    console.error(`Method ${req.method} not allowed`);
    res.status(405).json({ error: "Method not allowed" });
  }
}
