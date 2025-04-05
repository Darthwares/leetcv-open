import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import ViewProject from "./viewProject";

type ViewProjectModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ViewProjectModal({
  open,
  setOpen,
}: Readonly<ViewProjectModalProps>) {
  const cancelButtonRef = useRef(null);
  const t = useTranslations("Attestation");

  return (
    <Transition.Root show={open} as={Fragment}>
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
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 transition-all duration-200" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mx-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8 md:px-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative shadow-2xl transform overflow-hidden rounded-lg dark:bg-gray-800 bg-white text-left transition-all sm:my-8 sm:w-full md:max-w-xl lg:max-w-3xl ">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-left p-4 md:px-6 md:py-5 flex justify-between w-full items-start font-semibold sm:items-center leading-6 border-b dark:border-gray-700 dark:text-white text-gray-900 first-letter-uppercase"
                  >
                    {t("projectTitle")}
                    <button
                      className="float-right text-gray-400 bg-transparent duration-200 transition-all hover:bg-gray-100 hover:text-gray-600 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center border dark:hover:bg-gray-700/30 dark:hover:text-gray-300 border-gray-200"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </Dialog.Title>
                  <div className="px-5 pb-5 pt-2.5 md:px-6 md:pb-6">
                    <ViewProject />
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
