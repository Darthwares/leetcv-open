import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SpinnerSvg } from "./svg";

type RazorPayLoadingModelProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RazorPayLoadingModel = ({ open, setOpen }: RazorPayLoadingModelProps) => {
  const cancelButtonRef = useRef(null);

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
          <div className="fixed inset-0 bg-black/30 transition-all duration-200" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center  sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:py-6 sm:px-8">
                <div className="text-center">
                  <Dialog.Title
                    as="h3"
                    className="text-base text-center font-semibold leading-6 dark:text-white text-gray-900 first-letter-uppercase flex justify-center gap-2.5 items-center"
                  >
                    <SpinnerSvg />
                    Please wait
                  </Dialog.Title>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RazorPayLoadingModel;
