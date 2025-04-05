import { CheckCircleIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import React from "react";
interface ReviewResolveProps {
  onResolveClick: () => void;
  status: string;
}

function ReviewResolve({ onResolveClick, status }: ReviewResolveProps) {
  const t = useTranslations("ReviewList");

  return (
    <div>
      {location.pathname === "/s/reviews" && (
        <div className="flex items-center justify-end gap-3">
          {status !== t("resolved") && (
            <button
              className="flex gap-2 dark:bg-gray-800/70 items-center p-1 px-3 transition-all duration-300 border border-transparent shadow-sm font-medium rounded-lg  bg-gray-100 app-bar-btn"
              role="button"
              onClick={onResolveClick}
            >
              <CheckCircleIcon
                className={`transform h-5 w-5 text-green-500 hover:text-white-800 cursor-pointer`}
              />
              <p className="block text-sm font-medium dark:text-white text-gray-900">
                {t("resolve")}
              </p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewResolve;
