import { FormEvent, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { LinkedinShareButton } from "react-share";
import { ShareIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import ReUsableFeedbackModal from "./reUsableFeedbackModal";

const FeedbackForm = () => {
  const [open, setOpen] = useState(false);
  const [resume] = useRecoilState(resumeState);
  const [message, setMessage] = useState("");
  const [showLinkedinShare, setShowLinkedinShare] = useState(true);
  const setFeedback = trpc.useMutation(["fs.feedback.create"]);
  const url = `${window.location.origin}/r/${resume.handle}`;
  const t = useTranslations("FeedbackForm");
  const setConversion = trpc.useMutation(["fs.feedback.setConversion"]);

  const { data: isResumeConverted } = trpc.useQuery([
    "fs.feedback.getConversion",
    { id: resume.id },
  ]);

  useEffect(() => {
    if (!isResumeConverted) {
      setOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isResumeConverted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) {
      return toast.error(t("enterAMessage"));
    }

    setConversion.mutate({
      id: resume.id,
      status: false,
    });
    setFeedback
      .mutateAsync({
        id: resume.id,
        message,
      })
      .then(() => {
        toast.success(t("messageSent"));
        setShowLinkedinShare(false);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <ReUsableFeedbackModal
      open={open}
      handleClose={() => {
        setConversion.mutate({
          id: resume.id,
          status: false,
        });
        setFeedback.mutateAsync({
          id: resume.id,
          message: "Closed without giving feedback",
        });
        setConversion.mutate({
          id: resume.id,
          status: false,
        });
        setOpen(false);
      }}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 flex flex-col items-center justify-center mt-4"
      >
        <div className="w-80 bg-[#4b008205] block">
          <lottie-player
            src={`/assets/lottie/task.json`}
            speed="1"
            loop
            autoplay
            data-testid="lottie"
          />
        </div>
        {showLinkedinShare && <p className="mt-2">{t("likedConversion")}</p>}
        {!showLinkedinShare && (
          <p className="mt-2 text-base text-center">
            {t("enjoyedYourExperience")}
          </p>
        )}
      </Dialog.Title>

      {showLinkedinShare && (
        <form className="mt-6 space-y-4 w-full" onSubmit={handleSubmit}>
          <div>
            <textarea
              name="feedback"
              id="feedback"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Leave your feedback here"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full"
          >
            {t("submitFeedback")}
          </button>
        </form>
      )}

      {!showLinkedinShare && (
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex gap-3 items-center justify-center">
            <p className="text-sm font-semibold text-gray-800 text-center">
              {t("shareOnLinkedIn")}
            </p>
            <LinkedinShareButton
              url={url}
              title={t("title")}
              summary={t("interestedInConnecting")}
            >
              <div className="flex cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow hover:from-indigo-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                <ShareIcon className="w-5 h-5" />
              </div>
            </LinkedinShareButton>
          </div>
        </div>
      )}
    </ReUsableFeedbackModal>
  );
};

export default FeedbackForm;
