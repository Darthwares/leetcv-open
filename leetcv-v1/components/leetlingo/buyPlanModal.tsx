import { LockClosedIcon } from "@heroicons/react/outline";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

type BuyPlanModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BuyPlanModal = ({ setOpen }: BuyPlanModalProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
      <button
        onClick={handleClose}
        className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="mb-4 h-36">
        <lottie-player
          src="/assets/lottie/crown-4.json"
          background="white"
          speed="1"
          loop
          autoplay
          data-testid="lottie"
        ></lottie-player>
      </div>

      <h1 className="text-center text-2xl font-bold mb-4">
        Upgrade to Pro Plan
      </h1>

      <div className="text-center mb-4">
        <p className="text-gray-700 text-lg mb-3">
          Get unlimited access to all premium courses and exclusive content
        </p>
        <div className="flex justify-center gap-[2px] text-gray-500">
          <div className="w-8 h-8">
            <LockClosedIcon className="h-5 w-5" />
          </div>
          <p>This course is for Premium and Pro members only</p>
        </div>
      </div>

      <div className="w-full flex flex-col pt-2 sm:flex-row gap-4">
        <button
          onClick={handleClose}
          className="px-6 py-2 w-full border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Maybe Later
        </button>
        <Link href={"/pricing"}>
          <button className="px-6 w-full py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-md transition-colors">
            View Pricing
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BuyPlanModal;
