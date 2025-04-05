import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ReferralCode from "./settings/referral/referralCode";

type ReferModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ReferModal({
  open,
  setOpen,
}: Readonly<ReferModalProps>) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
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

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto mx-auto">
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
              <Dialog.Panel className="relative shadow-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left transition-all sm:my-8 lg:max-w-3xl">
                <div className="relative">
                  <button
                    className="absolute top-2 right-2 text-gray-100 duration-200 transition-all hover:bg-gray-950/10 hover:text-gray-300 rounded-lg text-sm p-1.5 items-center  dark:hover:bg-gray-700/40 dark:hover:text-gray-300  outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <XIcon className="w-6 h-6" />
                  </button>
                  <ReferralCode showReferralModal={true} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
