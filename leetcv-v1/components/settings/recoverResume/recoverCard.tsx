import { colorFullSkills, defaultImage } from "@constants/defaults";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  resumeState,
  showRecoveredResumeState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

interface RecoverCardProps {
  recoveryEmail: string;
  recoveryCode: string;
  handle: string;
}

const RecoverCard = ({
  recoveryEmail,
  recoveryCode,
  handle,
}: RecoverCardProps) => {
  const [isOpen, setIsOpen] = useRecoilState(showRecoveredResumeState);
  const setResume = trpc.useMutation(["fs.recoverEmail.setUserResume"]);
  const t = useTranslations("Settings");
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const { data: recoveredMail } = trpc.useQuery([
    "fs.recoverEmail.getRecoveryProfile",
    { email: recoveryEmail, recoveryCode, handle },
  ]);

  function isClosedModal() {
    setIsOpen(false);
  }

  let gradient = "bg-gradient-to-r from-indigo-50 to-pink-50";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={isClosedModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-3xl space-y-3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${gradient}`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg flex justify-between items-center font-medium leading-6 px-2 pb-3 text-gray-900"
                >
                  <p className="text-lg font-semibold">
                    {t("recoveredResume")}
                  </p>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-full bg-gray-100 p-2.5 text-sm font-medium text-indigo-600 hover:bg-gray-200"
                    onClick={isClosedModal}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </Dialog.Title>
                {!recoveredMail?.id && (
                  <div className="w-full flex items-center justify-center flex-col">
                    <div className="max-w-lg flex items-center justify-center w-full">
                      <div className="w-96">
                        <lottie-player
                          src="/assets/lottie/notfound.json"
                          speed="1"
                          loop
                          autoplay
                        ></lottie-player>
                      </div>
                    </div>
                    <p className=""> {t("resumeCouldNotBeRecovered")}</p>
                  </div>
                )}
                {recoveredMail?.id && (
                  <div>
                    <div className="flex items-start gap-5">
                      <img
                        src={
                          recoveredMail?.image !== undefined &&
                          recoveredMail?.image !== null &&
                          recoveredMail?.image !== ""
                            ? recoveredMail?.image
                            : defaultImage(userId)
                        }
                        alt={recoveredMail?.displayName}
                        className="w-28 h-28 rounded-lg"
                      />
                      <div className="space-y-1.5">
                        <p className="font-semibold text-xl">
                          {recoveredMail?.displayName}
                        </p>
                        <p className="font-normal-text-sm">
                          {recoveredMail?.position}
                        </p>
                        <p className="text-sm">{recoveredMail?.address}</p>
                        <div className="flex gap-2 flex-wrap text-sm">
                          {recoveredMail?.skills?.map((skill: string) => {
                            const { rgb } = colorFullSkills(skill);

                            return (
                              <p
                                style={{
                                  background: `${rgb}`,
                                }}
                                className={`border border-gray-200 p-2 rounded-lg ${rgb}`}
                                key={uuidv4()}
                              >
                                {skill}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {recoveredMail?.id && (
                  <div className="flex flex-col items-center gap-2 justify-between w-full">
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-red-500">{t("important")}</p>
                      <p>{t("areYouSure")}</p>
                    </div>
                    <div className=" text-white space-x-3 pt-2 w-full flex justify-end">
                      <button
                        className="px-4 py-2 font-medium rounded-md bg-indigo-600"
                        onClick={() => {
                          setResume.mutate(
                            {
                              email: recoveryEmail,
                              recoveryCode,
                              handle: resume?.handle,
                            },
                            {
                              onError: (error) => {
                                toast.error(error.message);
                              },
                              onSuccess: () => {
                                toast.success(t("resumeRecovered"));
                                setIsOpen(false);
                              },
                            }
                          );
                        }}
                      >
                        {t("confirm")}
                      </button>
                      <button
                        className="px-4 py-2 font-medium rounded-md bg-indigo-600"
                        onClick={() => {
                          setIsOpen(false);
                        }}
                      >
                        {t("cancel")}
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RecoverCard;
