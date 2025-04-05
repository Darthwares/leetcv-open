import React from "react";
import TransitionModal from "./convertToText/transitionModal";

type ReUsableTransitionModalProps = {
  src: string;
  title: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReUsableTransitionModal = ({
  src,
  title,
  isOpen,
  setIsOpen,
}: ReUsableTransitionModalProps) => {
  return (
    <TransitionModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="mt-2">
        <div className="aspect-w-16 aspect-h-9 rounded-lg p-1 border-none transition-all lg:px-2">
          <iframe
            className="flex justify-center border border-gray-300 items-center rounded-lg h-96 w-full"
            src={src}
            title={title}
            allowFullScreen
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          />
        </div>
      </div>
    </TransitionModal>
  );
};

export default ReUsableTransitionModal;
