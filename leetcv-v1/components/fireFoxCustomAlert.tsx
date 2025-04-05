import React, { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import useCopyToClipboard from "@lib/helper/useCoptToClipboard";

type FireFoxCustomAlertProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  link: string;
};

const FireFoxCustomAlert = ({
  open,
  setOpen,
  message,
  link,
}: FireFoxCustomAlertProps) => {
  const cancelButtonRef = useRef(null);
  const [isCopied, handleCopy] = useCopyToClipboard();
  const t = useTranslations("Dashboard");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-30"
        as="div"
        onClose={setOpen}
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          enter="ease-out duration-300"
          as={Fragment}
          enterTo="opacity-100"
          enterFrom="opacity-0"
          leave="ease-in duration-200"
          leaveTo="opacity-0"
          leaveFrom="opacity-100"
        >
          <div className="duration-200 fixed inset-0 bg-black/40 transition-all" />
        </Transition.Child>

        <div className="fixed w-screen overflow-y-auto inset-0 z-10">
          <div className="min-h-full justify-center p-4 text-center flex items-center sm:p-0">
            <Transition.Child
              enter="ease-out duration-300"
              as={Fragment}
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              leave="ease-in duration-200"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl  sm:w-full sm:max-w-lg transition-all sm:my-8 sm:p-6">
                <div className="sm:items-start sm:flex">
                  <div className="sm:mt-0 sm:text-left mt-3 text-center">
                    <div className="flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start">
                      <div className="p-1.5 bg-indigo-100 w-8 h-8 rounded-full">
                        <ExclamationIcon className="w-5 h-5 text-indigo-600 " />
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 first-letter-uppercase"
                      >
                        {t("notSupported")}
                      </Dialog.Title>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{message}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 sm:w-auto"
                    onClick={() => handleCopy(link)}
                  >
                    {isCopied ? t("copied") : t("copyLink")}
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

export default FireFoxCustomAlert;
