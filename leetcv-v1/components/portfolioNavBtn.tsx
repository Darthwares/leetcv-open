import { BriefcaseIcon, DocumentTextIcon } from "@heroicons/react/outline";
import useNavigationHelper from "@lib/helper/portfolioNavigation";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

const PortfolioNavBtn = () => {
  const t = useTranslations("Portfolio");
  const router = useRouter();
  const { handle } = router.query;
  const { handleUsersPortfolioNavigation } = useNavigationHelper();

  return (
    <div
      className={`fixed bottom-10 md:bottom-[4.5rem] mb-8 sm:mb-3 z-30 right-4 md:right-6 lg:right-8`}
    >
      <button
        onClick={() => handleUsersPortfolioNavigation(handle?.toString() ?? "")}
        className="w-10 h-10 sm:w-12 sm:h-12 relative group print:hidden rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 "
      >
        <span className="absolute -left-[6.25rem] lg:bottom-14 lg:-left-[23px] scale-0 w-24 mx-auto transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          {location.pathname.startsWith("/p")
            ? t("viewResume")
            : t("viewPortfolio")}
        </span>
        {location.pathname.startsWith("/p") ? (
          <DocumentTextIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
        ) : (
          <BriefcaseIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default PortfolioNavBtn;
