import React, { Dispatch, SetStateAction } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Button } from "shadcn/components/ui/button";
import Report from "./report";
import { Interview } from "types/dashboardTypes";
import { useTranslations } from "next-intl";

interface ViewInterviewModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cancelButtonRef: React.RefObject<HTMLButtonElement>;
  interview: Interview;
}
const ViewInterviewModal = ({
  open,
  setOpen,
  cancelButtonRef,
  interview,
}: ViewInterviewModalProps) => {
  const t = useTranslations("Interview");
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
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
          <div className="flex min-h-full items-center justify-center py-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-white pb-4 text-left shadow-xl transition-all w-full max-w-5xl mx-auto">
                <button
                  className="absolute top-12 right-8"
                  ref={cancelButtonRef}
                >
                  <XIcon
                    className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                    onClick={() => setOpen(false)}
                  />
                </button>
                <div className="pt-6 px-2 sm:p-6">
                  <Report interview={interview!} />
                </div>
                <div className="px-5 flex justify-end">
                  <Button
                    type="button"
                    className="w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-40"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {t("close")}
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ViewInterviewModal;
