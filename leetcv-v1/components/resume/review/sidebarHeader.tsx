import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React from "react";

interface SidebarHeaderPops {
  t: any;
  displayName: string;
  createReview: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const SidebarHeader = ({
  t,
  displayName,
  setSidebar,
  createReview,
}: SidebarHeaderPops) => {
  return (
    <div className="bg-indigo-700 px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between">
        <Dialog.Title className="text-base font-semibold leading-6 text-white">
          {createReview ? t("writeReview") : t("receivedFeedback")}
        </Dialog.Title>
        <div className="flex h-7 items-center">
          <button
            type="button"
            className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setSidebar(false)}
          >
            <span className="absolute -inset-2.5" />
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="mt-1">
        <p className="text-sm text-indigo-300">
          {createReview ? t("writeFeedFor") : t("userGivenFeedback")}
          <strong className="text-white"> {`${displayName}'s`}</strong>{" "}
          {createReview ? t("feelFree") : t("resume")}
        </p>
      </div>
    </div>
  );
};

export default SidebarHeader;
