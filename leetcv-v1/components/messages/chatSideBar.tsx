import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import ImageFallBack from "@components/imageFallBack";

interface ChatSideBarProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  userName: string;
  userImage: string;
  profession: string;
  id: string;
}

const ChatSideBar = ({
  children,
  open,
  setOpen,
  userName,
  userImage,
  profession,
  id,
}: ChatSideBarProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-40" as="div" onClose={setOpen}>
        <div className="inset-0 fixed" />
        <div
          data-testid="reUsableSidebar"
          className="fixed overflow-hidden inset-0"
        >
          <div className="absolute overflow-hidden inset-0">
            <div className="fixed inset-y-0 right-0 pointer-events-none flex max-w-full md:pl-10">
              <Transition.Child
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                as={Fragment}
                enterTo="translate-x-0"
                enterFrom="translate-x-full"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveTo="translate-x-full"
                leaveFrom="translate-x-0"
              >
                <Dialog.Panel className="max-w-md pointer-events-auto w-screen">
                  <div className="overflow-y-scroll bg-white shadow-xl flex h-full flex-col">
                    <div className="fixed shadow-md z-50 top-0 bg-slate-50 w-full px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-6">
                        <div className="flex h-7 items-center">
                          <button
                            type="button"
                            className="relative "
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <ArrowLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                        <div className="flex items-center gap-3.5">
                          <ImageFallBack
                            imgSrc={userImage}
                            fallBackText={userName}
                            avatarClass="w-11 h-11 rounded-full"
                            avatarImgClass="w-full h-full overflow-hidden"
                            avatarFallbackClass="w-11 h-11 text-white rounded-full text-xl"
                          />
                          <div>
                            <Dialog.Title className="text-base font-semibold leading-6 text-black">
                              {userName}
                            </Dialog.Title>
                            <p className="text-xs text-gray-500 font-medium">
                              {profession}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ChatSideBar;
