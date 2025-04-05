import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ModalProps {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  cancelButtonRef: React.RefObject<HTMLButtonElement>;
  className: string;
}

const Modal = (props: ModalProps) => {
  return (
    <Transition.Root show={props.showModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={props.cancelButtonRef}
        onClose={props.setShowModal}
      >
        <Transition.Child
          as="div"
          className={`fixed inset-0 ${props.className} backdrop-blur-sm transition-opacity duration-200 dark:bg-gradient-to-br dark:from-neutral-800 dark:to-zinc-900`}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        ></Transition.Child>
        <div className="fixed inset-0 z-10 w-screen mx-auto overflow-y-auto">
          {props.children}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
