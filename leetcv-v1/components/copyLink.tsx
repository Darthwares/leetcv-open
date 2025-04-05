import React from "react";
import { DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/outline";
import useCopyToClipboard from "@lib/helper/useCoptToClipboard";

type CopyLinkProps = {
  copyText: string;
  copied: string;
  copyClass?: string;
  copiedClass?: string;
  url: string;
};

const CopyLink = ({
  copyText,
  copied,
  url,
  copyClass,
  copiedClass,
}: CopyLinkProps) => {
  const [isCopied, handleCopy] = useCopyToClipboard();

  return (
    <div data-testid="copyLink">
      {!isCopied ? (
        <button
          className={`flex items-center gap-2 ${copyClass} duration-300 transition-all w-full underline cursor-pointer dark:text-white text-gray-700 hover:text-indigo-600 font-medium`}
          onClick={() => handleCopy(url)}
        >
          {copyText}
          <DocumentDuplicateIcon className="w-[18px] h-[18px]" />
        </button>
      ) : (
        <p
          className={`font-medium text-green-500 ${copiedClass} flex items-center gap-1`}
        >
          {copied}
          <CheckIcon className="w-5 h-5" />
        </p>
      )}
    </div>
  );
};

export default CopyLink;
