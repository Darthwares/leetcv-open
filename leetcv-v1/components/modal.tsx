import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
interface ModelProps {
  content: string;
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  logOutButton?: React.ReactNode;
}
export default function Modal({
  content,
  title,
  isOpen,
  closeModal,
  logOutButton,
}: Readonly<ModelProps>) {
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
          <div className="fixed inset-0 backdrop-blur-sm bg-gray-300 dark:bg-gray-800/10 bg-opacity-25" />
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
              <Dialog.Panel className="w-full p-10 max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-0 top-0 pr-4 pt-4 block">
                  <button
                    type="button"
                    className="rounded-lg text-gray-500 dark:text-gray-300 hover:text-gray-600 duration-200 transition-all p-1 dark:hover:bg-gray-700/30 hover:bg-gray-200"
                    onClick={closeModal}
                  >
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium first-letter-uppercase mt-2 leading-6 dark:text-white text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <div className="mt-2 max-h-96 overflow-y-auto">
                  <p className="text-sm mt-1 text-gray-500 dark:text-gray-200">
                    {content}
                  </p>
                </div>
                <div className="mt-4">{logOutButton}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
