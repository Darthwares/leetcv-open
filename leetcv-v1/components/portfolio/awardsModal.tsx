import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { Award } from "data/models/Award";

type AwardModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  award: Award;
};

export default function AwardModal({
  open,
  setOpen,
  award,
}: Readonly<AwardModalProps>) {
  const cancelButtonRef = useRef(null);
  const t = useTranslations("Portfolio");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-50"
        as="div"
        onClose={setOpen}
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterTo="opacity-100"
          enterFrom="opacity-0"
          leaveTo="opacity-0"
          leaveFrom="opacity-100"
          leave="ease-in duration-200"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 transition-all duration-200" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mx-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8 md:px-8 text-center">
            <Transition.Child
              as={Fragment}
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              enter="ease-out duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
            >
              <Dialog.Panel className="relative group shadow-2xl transform overflow-hidden rounded-md dark:bg-gray-800 bg-indigo-200 text-left transition-all sm:my-8 sm:w-full md:max-w-xl lg:max-w-2xl">
                <div className="absolute -z-10 duration-500 w-72 h-72 rounded-full translate-x-12 translate-y-12 bg-violet-300 right-1 -bottom-24"></div>
                <div className="absolute -z-10 duration-500 w-12 h-12 rounded-full translate-x-12 translate-y-2 bg-indigo-300 right-12 bottom-12"></div>
                <div className="absolute -z-10 duration-500 w-36 h-36 rounded-full translate-x-12 -translate-y-12 bg-indigo-200 right-1 -top-12"></div>
                <div className="absolute -z-10 duration-500 w-24 h-24 bg-purple-200 rounded-full -translate-x-12"></div>
                <div className="z-40 mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl z-40 text-left p-4 md:px-6 md:py-5 flex justify-between w-full items-start font-semibold sm:items-center leading-6 border-b border-gray-300 dark:border-gray-700 dark:text-white first-letter-uppercase"
                  >
                    {award.name}
                    <button
                      className="float-right bg-transparent duration-200 transition-all hover:bg-indigo-400 hover:text-gray-100 shadow-lg rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700/30 dark:hover:text-gray-300 border border-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </Dialog.Title>
                  <div className="px-5 z-40 pb-5 pt-2.5 md:px-6 md:pb-6 flex flex-col items-start gap-4">
                    <span className="text-sm font-medium">
                      {award.date}
                    </span>
                    <span className="font-medium">
                      {award.awardFor}
                    </span>
                    <p className="leading-7 text-left">
                      {award.description}
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
