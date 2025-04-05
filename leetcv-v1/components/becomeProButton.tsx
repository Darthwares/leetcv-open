import Link from "next/link";
import React from "react";

type BecomeProButtonProps = {
  title: string;
  buttonTitle: string;
};

const BecomeProButton = ({ title, buttonTitle }: BecomeProButtonProps) => {
  return (
    <div
      data-testid="becomeProButton"
      className="flex items-start flex-col justify-start pt-7 gap-4"
    >
      <p className="inline font-semibold text-gray-900 md:text-lg text-base">
        {title}
      </p>
      <Link href="/pricing" passHref>
        <button
          type="button"
          className="text-white bg-indigo-600 hover:bg-indigo-700/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 gap-2"
        >
          <img src={`/icons/crown.svg`} alt="Pricing" className="w-6 h-6" />
          {buttonTitle}
        </button>
      </Link>
    </div>
  );
};

export default BecomeProButton;
