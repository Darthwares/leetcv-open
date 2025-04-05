import React, { Dispatch, SetStateAction, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  content: React.ReactNode;
  className?: string;
  closeIconColor?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  content,
  className,
  closeIconColor,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative p-6 z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-all duration-200 bg-gray-900/50 dark:bg-gray-800/10 bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center py-4 text-center px-2 sm:p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-white text-left shadow-xl transition-all w-full mx-auto ${
                  className ? className : "max-w-lg"
                } `}
              >
                <button
                  onClick={() => setOpen(false)}
                  className={`h-7 w-7 flex items-center justify-center cursor-pointer ${
                    closeIconColor
                      ? closeIconColor
                      : "text-white hover:text-gray-300"
                  } rounded-full transition-colors absolute top-5 right-5`}
                >
                  <XIcon className="w-5 h-5" />
                </button>
                <div>{content}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
