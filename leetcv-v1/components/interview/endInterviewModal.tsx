import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { formatTime } from "@constants/defaults";
import { useTranslations } from "next-intl";
import { disableSidebarState } from "@state/state";
import { useSetRecoilState } from "recoil";

type EndInterviewProps = {
  handleEnd: () => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  interviewActive: boolean;
  timeLeft: number;
};

const EndInterviewModal = ({
  handleEnd,
  open,
  interviewActive,
  setOpen,
  timeLeft,
}: Readonly<EndInterviewProps>) => {
  const cancelButtonRef = useRef(null);
  const t = useTranslations("Interview");
  const setDisableSidebar = useSetRecoilState(disableSidebarState);


  function formatTimeString(timeString: string) {
    const [minutes, seconds] = timeString.split(":").map(Number);

    if (minutes > 0 && seconds > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds} second${
        seconds > 1 ? "s" : ""
      }`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else if (seconds > 0) {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    } else {
      return "0 seconds";
    }
  }

  return (
    <Transition.Root show={open && interviewActive} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 transition-all duration-200" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-white p-4 text-left shadow-xl transition-all w-full max-w-lg mx-auto">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 dark:text-white text-gray-900 first-letter-uppercase"
                    >
                      {t("endInterviewTitle")}
                    </Dialog.Title>
                    <div className="mt-2 flex flex-col gap-4">
                      <p className="text-sm dark:text-gray-200 text-gray-500">
                        {t("timeRemaining", {
                          time: formatTimeString(formatTime(timeLeft)),
                        })}
                      </p>
                      <p className="text-sm dark:text-gray-200 text-gray-500">
                        {t("continueInterviewInstruction")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                      handleEnd();
                      setOpen(false);
                      setDisableSidebar(true);
                    }}
                  >
                    {t("endInterviewButton")}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {t("cancelButton")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EndInterviewModal;
