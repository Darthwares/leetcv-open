import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import React, { Fragment } from "react";

interface TransitionModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const TransitionModal = ({
  children,
  isOpen,
  setIsOpen,
}: TransitionModalProps) => {
  const t = useTranslations("Convert");

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-all duration-200" />
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl dark:bg-gray-900 bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg flex justify-between items-center font-medium leading-6 px-2 pb-3 text-gray-900 dark:text-white"
                >
                  <span>{t("howItWorks")}</span>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-full bg-gray-100 dark:bg-gray-800/50 p-2 text-sm font-medium text-indigo-600 dark:text-gray-300 hover:bg-gray-200 hover:dark:bg-gray-800/95"
                    onClick={closeModal}
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TransitionModal;
