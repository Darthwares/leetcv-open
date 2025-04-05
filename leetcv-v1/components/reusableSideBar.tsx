import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

interface ReusableSidebarProps {
  children: React.ReactNode;
  title: string;
  description: string | JSX.Element;
  open: boolean;
  setOpen: (open: boolean) => void;
  cssClass?: string;
  aiReview?: boolean;
}

export default function ReusableSidebar({
  children,
  description,
  title,
  open,
  setOpen,
  cssClass,
  aiReview,
}: ReusableSidebarProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40"
        onClose={aiReview ? () => {} : setOpen}
      >
        <div className="fixed inset-0 bg-black bg-opacity-5 transition-all duration-100" />
        <div
          className="fixed inset-0 overflow-hidden"
          data-testid="reUsableSidebar"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div
                    className={`${cssClass} flex flex-col h-full bg-white shadow-xl`}
                  >
                    <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                          {title}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-200">{description}</p>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
