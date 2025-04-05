import { useState, Fragment } from "react";
import {
  activeReviewState,
  profileResumeState,
  resumeState,
  showReviewModal,
  tokenCountState,
  userIdState,
} from "@state/state";
import { useRecoilState } from "recoil";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { v4 as guid } from "uuid";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from "react-toastify";
import { ExclamationCircleIcon, LightBulbIcon } from "@heroicons/react/outline";
import { shortNumber, uniqueAvatar } from "@constants/defaults";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/solid";
import HoverContainer from "@components/customShadCdn/hoverCard";
import SidebarHeader from "./sidebarHeader";

export default function CreateReview() {
  const t = useTranslations("ReviewModal");
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [reviewError, setReviewError] = useState(false);
  const [reviewCategory] = useRecoilState(activeReviewState);
  const [profileResume] = useRecoilState(profileResumeState);
  const mutation = trpc.useMutation(["fs.review.create"]);
  const [resume] = useRecoilState(resumeState);
  const [text, setText] = useState("");
  const [selectText, setSelectText] = useState("");
  const [showLottie, setShowLottie] = useState(false);
  const [showModal, setShowModal] = useRecoilState(showReviewModal);
  const [userId] = useRecoilState(userIdState);
  const [selectedDocument] = useRecoilState(activeReviewState);
  const [userInfo] = useRecoilState(profileResumeState);
  const [tokens] = useRecoilState(tokenCountState);

  const setStreak = trpc.useMutation(["fs.streak.createStreak"]);
  const setStreakPoints = trpc.useMutation(["fs.streak.setStreakPoints"]);
  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);
  const isEnabled = !!(status === "authenticated" && userInfo.id);

  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userInfo.id, handle: userInfo.handle }],
    {
      enabled: isEnabled,
    }
  );

  const { data: requests } = trpc.useQuery(
    [
      "fs.review.get",
      {
        requestId: userInfo.id,
        userId,
        reviewCategory: selectedDocument.document,
        postId: selectedDocument.headingTitle,
      },
    ],
    {
      enabled: isEnabled,
    }
  );

  const setReview = trpc.useMutation(["fs.notification.setReview"]);

  const handleRefine = async (e: any) => {
    e.preventDefault();
    setText("");
    setShowLottie(true);
    if (tokens < 20) {
      return;
    }
    const resp = await fetch("/api/openai/generateReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descriptionText: selectText,
      }),
    });
    const response = await resp.json();
    setText(response.description.trim().replace(/[\n\r]/g, ""));
    let newTokenCount = tokens - 20;
    setTokens.mutate(
      {
        count: newTokenCount,
        handle: resume.handle,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleAcceptSave = (e: any) => {
    e.preventDefault();
    const description = text
      .trim()
      .replace(/[\n\r]/g, "")
      .slice(0);
    setSelectText(description);
    setContent(description);
    setShowLottie(false);
    setText("");
  };

  const handleMutation = async (e: any) => {
    e.preventDefault();
    if (content) {
      try {
        await mutation.mutateAsync({
          content,
          email: session?.user.email!,
          image: resume.image!,
          requestId: profileResume?.id,
          status: t("pending"),
          reviewCategory: reviewCategory.document,
          userId: session?.user.id!,
          id: guid(),
          username: session?.user.name!,
          reviewTitle: reviewCategory.headingTitle,
          requesterHandle: resume.handle,
          requesterPosition: resume.position!,
        });

        setReview.mutate({
          handle: profileResume.handle,
          userId,
          reviewSection: reviewCategory.title,
        });
        setStreakPoints.mutate({
          id: userId,
          points: 10,
        });

        const currentDate = new Date();

        setStreak.mutateAsync({
          id: resume.id,
          currentDate: currentDate,
        });

        toast.success(t("reviewSuccess"));
        setShowModal(false);
        setContent("");
      } catch (error) {
        toast.error(t("reviewError"));
      }
    }
  };

  const uniqueRequests = uniqueAvatar(requests);

  return (
    <>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowModal}>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <SidebarHeader
                          t={t}
                          displayName={userInfo.displayName}
                          setSidebar={setShowModal}
                          createReview={true}
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-6 pb-5 pt-6">
                              <div className="space-y-2">
                                <p className="block text-sm capitalize font-medium leading-6 text-gray-900">
                                  {t("reviewOf")}{" "}
                                  <strong className="capitalize">
                                    {reviewCategory.title} {t("section")}
                                  </strong>
                                </p>
                                <p className="block capitalize text-sm leading-6 text-gray-900 font-bold">
                                  <span></span> {reviewCategory.headingTitle}
                                </p>
                              </div>
                              <div>
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  {t("description")}
                                </label>
                                <div className="mt-2">
                                  <textarea
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    rows={7}
                                    autoFocus={true}
                                    spellCheck={true}
                                    cols={15}
                                    data-testid="editReview"
                                    placeholder="Enter the Review"
                                    value={content}
                                    onChange={(
                                      e: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => {
                                      setReviewError(!e.target.value);
                                      setContent(e.target.value);
                                      setSelectText(e.target.value);
                                    }}
                                  />
                                  <div className="justify-between items-center w-full">
                                    <div>
                                      {reviewError && (
                                        <p className="flex w-full gap-1 items-center relative top-2">
                                          <ExclamationCircleIcon className="text-red-500 w-5" />
                                          <span className="text-red-500 text-sm">
                                            {t("emptyReview")}
                                          </span>
                                        </p>
                                      )}
                                    </div>
                                    {showLottie && (
                                      <div className="max-w-lg ml-1.5 py-2">
                                        <p className="p-2 text-sm text-gray-900">
                                          {text}
                                        </p>
                                      </div>
                                    )}
                                    <div className="flex w-full flex-col">
                                      {showLottie && text === "" && (
                                        <>
                                          <div className="max-w-lg flex items-center justify-center ">
                                            <div className="w-60">
                                              <lottie-player
                                                src="/assets/lottie/ai.json"
                                                background="white"
                                                speed="1"
                                                loop
                                                autoplay
                                              ></lottie-player>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                      {
                                        <div className="flex w-full justify-end mt-2 md:mt-1 py-2 gap-6">
                                          {content && (!showLottie || text) && (
                                            <button
                                              className={`${
                                                selectText
                                                  ? "bg-indigo-600 hover:bg-indigo-700"
                                                  : "cursor-not-allowed bg-indigo-400"
                                              } w-full max-w-fit inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-[6px] text-base font-medium text-white sm:mt-0 sm:text-sm`}
                                              onClick={(e) => {
                                                if (selectText) {
                                                  handleRefine(e);
                                                  setText("");
                                                }
                                              }}
                                            >
                                              <span className="flex gap-2 px-4 font-medium items-center text-sm">
                                                <LightBulbIcon className="w-6 animate-pulse" />
                                                <span className="tracking-normal">
                                                  {t("refine")}
                                                </span>
                                              </span>
                                            </button>
                                          )}

                                          {text && (
                                            <button
                                              className="w-full max-w-fit inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-[6px] bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:mt-0 sm:text-sm"
                                              onClick={handleAcceptSave}
                                            >
                                              <span className="px-4">
                                                {t("accept")}
                                              </span>
                                            </button>
                                          )}
                                        </div>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium leading-6 text-gray-900">
                                  {requests?.length === 0
                                    ? t("noReview")
                                    : t("alreadyReviewBy")}
                                </h3>
                                <div className="mt-2">
                                  <div className="flex -space-x-2">
                                    <div className="">
                                      <HoverContainer requests={requests} />
                                    </div>
                                    {uniqueRequests?.length! > 5 && (
                                      <button
                                        type="button"
                                        className="relative inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-xs"
                                      >
                                        <span className="absolute -inset-2" />

                                        <span className="text-xs text-center flex flex-col justify-center items-center">
                                          <PlusIcon
                                            className="h-3 w-3"
                                            aria-hidden="true"
                                          />{" "}
                                          {shortNumber(
                                            +(uniqueRequests?.length! - 5)
                                          )}
                                        </span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex w-full flex-shrink-0 justify-end px-4 py-4">
                        <button
                          type="submit"
                          className={`${
                            !content &&
                            "bg-indigo-500 font-bold py-2 px-4 rounded opacity-50"
                          } w-40 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                          disabled={!content}
                          onClick={handleMutation}
                        >
                          {t("addReview")}
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ToastContainer />
    </>
  );
}
