import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ToastContainer } from "react-toastify";

type ReUsableFeedbackModalProps = {
  handleClose: () => void;
  children: React.ReactNode;
  open: boolean;
};

export default function ReUsableFeedbackModal({
  handleClose,
  children,
  open,
}: Readonly<ReUsableFeedbackModalProps>) {
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 transition-all duration-200" />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className={`flex w-full items-center justify-center px-3 md:px-0 min-h-screen`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    {location.pathname !== "/s/resumeEditor" && (
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={handleClose}
                      >
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ToastContainer />
    </>
  );
}
