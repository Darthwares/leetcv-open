import Follow from "@components/resume/follow/follow";
import StarResume from "@components/resume/star/starResume";
import {
  isProhibitedPage,
  setCurrentPageInLocalStorage,
} from "@constants/defaults";
import { PROHIBITED_PAGES } from "@constants/pages";
import { Disclosure } from "@headlessui/react";
import {
  GiftIcon,
  MenuIcon,
  SearchIcon,
  StatusOnlineIcon,
  DocumentTextIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";
import {
  activeReviewState,
  mobileMenuSidebar,
  openReferralModelState,
  prospectApprovalState,
  showReviewSidebarModal,
  subscriptionPlanState,
} from "@state/state";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ShareResume from "./shareResume";
import { useSession } from "next-auth/react";
import DiscordButton from "@components/discordButton";
import { useRouter } from "next/router";
import useNavigationHelper from "@lib/helper/portfolioNavigation";
import PrintResume from "./printResume";

const DisclosureButtons = () => {
  const { status } = useSession();
  const t = useTranslations("Appbar");
  const setShowReferralModal = useSetRecoilState(openReferralModelState);
  const [showReviewSidebar, setShowReviewSidebar] = useRecoilState(
    showReviewSidebarModal
  );
  const [plan] = useRecoilState(subscriptionPlanState);
  const [prospectApproval] = useRecoilState(prospectApprovalState);
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);
  const setActiveReview = useSetRecoilState(activeReviewState);
  const router = useRouter();
  const { handle } = router.query;
  const { handleUsersPortfolioNavigation } = useNavigationHelper();

  return (
    <div className="-mr-2 flex items-center lg:hidden">
      {location.pathname === "/" && <DiscordButton />}
      <div className="flex items-center gap-2 w-full">
        {!plan &&
          !location.pathname.match(/^\/r\/.+/) &&
          !location.pathname.match(/^\/p\/.+/) &&
          status === "authenticated" && (
            <Link href="/pricing" passHref>
              <div className="app-bar-btn dark:bg-gray-900 dark:text-white hidden sm:flex lg:hidden md:gap-1.5 text-sm w-full">
                <div className="w-6">
                  <img
                    src={`/icons/crown.svg`}
                    alt="pricing"
                    className="w-6 h-6"
                  />
                </div>
                <span className="hidden md:block whitespace-nowrap">
                  {t("becomePRO")}
                </span>
              </div>
            </Link>
          )}
        {status === "authenticated" &&
          !location.pathname.includes("/r/") &&
          !location.pathname.includes("/p/") && !location.pathname.includes("/l/")&&(
            <div
              className={`${
                (location.pathname === "/s/prospectAttestation" ||
                  location.pathname === "/s/requestAttestation") &&
                "hidden sm:flex"
              } app-bar-btn dark:bg-gray-900 dark:text-white md:gap-1.5 text-sm`}
              onClick={() => {
                setShowReferralModal(true);
              }}
            >
              <GiftIcon className="w-5 h-5 dark:text-white text-gray-800" />
              <span className="hidden md:block">Refer</span>
            </div>
          )}
      </div>
      {!location.pathname.includes("/r/") && !location.pathname.includes("/p/") &&(
        <Link href="/search" passHref>
          <div className="flex items-center dark:bg-gray-900 dark:text-white app-bar-btn text-sm md:px-3 px-1 py-1 space-x-2 md:border-none rounded-lg">
            <SearchIcon className="w-5 h-5" />
            <span className="hidden md:block ">{t("search")}</span>
          </div>
        </Link>
      )}
      <div className="hidden md:block">
        {prospectApproval &&
          status === "authenticated" &&
          isProhibitedPage(PROHIBITED_PAGES) &&!location.pathname.includes("/p/")&& !location.pathname.includes("/l/")&&<PrintResume />}
        {status === "authenticated" && location.pathname === "/s/resume" && (
          <PrintResume />
        )}
      </div>
      {prospectApproval && status === "authenticated" && (
        <>
          {isProhibitedPage(PROHIBITED_PAGES) && <StarResume />}
          <div className="hidden md:block">
            {isProhibitedPage(PROHIBITED_PAGES) &&
            !location.pathname.includes("/p/") && !location.pathname.includes("/l/")&&<ShareResume />}
          </div>
          {isProhibitedPage(PROHIBITED_PAGES) && <Follow />}
          {isProhibitedPage(PROHIBITED_PAGES) && !location.pathname.includes("/l/")&&(
            <button
              className="px-1 app-bar-btn flex items-center gap-1 text-sm border py-2"
              onClick={() =>
                handleUsersPortfolioNavigation(handle?.toString() ?? "")
              }
            >
              {location.pathname.startsWith("/p") ? (
                <DocumentTextIcon className="w-4 h-4 text-sm" />
              ) : (
                <BriefcaseIcon className="w-4 h-4 text-sm" />
              )}
              <span className="hidden md:block">
                {" "}
                {t(location.pathname.startsWith("/p") ? "resume" : "portfolio")}
              </span>
            </button>
          )}
          {isProhibitedPage(PROHIBITED_PAGES) && (
            <button
              className="flex items-center dark:bg-gray-900 dark:text-white app-bar-btn text-sm md:px-3 px-1 py-1 space-x-2 md:border-none rounded-lg"
              onClick={() => {
                setShowReviewSidebar(!showReviewSidebar);
              }}
            >
              <span>
                <StatusOnlineIcon className={`w-4 text-sm`} />
              </span>
              <span className="hidden md:block">{t("review")}</span>
            </button>
          )}
        </>
      )}
      {status === "authenticated" && (
        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:hover:bg-gray-800/40">
          <MenuIcon
            className="block h-6 w-6 text-black dark:text-white"
            aria-hidden="true"
            onClick={() => {
              setIsMobileMenuSidebarOpen(true);
              setCurrentPageInLocalStorage();
              setActiveReview({
                title: "Projects",
                document: "Projects-Review",
                headingTitle: "",
              });
            }}
          />
        </Disclosure.Button>
      )}
    </div>
  );
};
export default DisclosureButtons;
