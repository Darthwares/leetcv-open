import { Disclosure } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { HIDE_APP_BAR_PAGES, PROHIBITED_PAGES } from "@constants/pages";
import {
  GiftIcon,
  RssIcon,
  SearchIcon,
  StatusOnlineIcon,
  DocumentTextIcon,
  BriefcaseIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import AppbarDropdown from "./appbarDropdown";
import MobileMenu from "./mobileMenu";
import {
  activeReviewState,
  openReferralModelState,
  pageTitleState,
  profileResumeState,
  prospectApprovalState,
  referralCode,
  showReviewSidebarModal,
  signOutModelOpen,
  subscriptionPlanState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import StarResume from "@components/resume/star/starResume";
import {
  handleHref,
  isProhibitedPage,
  publicCompany,
  publicFeatures,
  publicPagePaths,
  publicResources,
} from "@constants/defaults";
import Follow from "@components/resume/follow/follow";
import PrintResume from "./printResume";
import ShareResume from "./shareResume";
import { ToastContainer } from "react-toastify";
import DiscordButton from "@components/discordButton";
import { trpc } from "@utils/trpc";
import Modal from "@components/modal";
import LogOutButton from "@components/logOutButton";
import SideBarMenuContainer from "./mobileSideBarMenu/sideBarMenuContainer";
import ReferModal from "@components/referModal";
import AiFeaturesMenu from "./aiFeaturesMenu";
import ProductLogo from "./productLogo";
import NavigationDropdown from "./navigationDropdown";
import { BarSvg } from "@components/svg";
import PublicNavbar from "./publicNavbar";
import SignInButton from "./signInButton";
import useStaticHeader from "@lib/helper/useStaticHeader";
import useNavigationHelper from "@lib/helper/portfolioNavigation";

export default function AppBar() {
  const router = useRouter();
  const { status } = useSession();
  const [planUser, setPlanUser] = useRecoilState(subscriptionPlanState);
  const [prodTitle] = useRecoilState(pageTitleState);
  const t = useTranslations("Appbar");
  const [resume] = useRecoilState(profileResumeState);
  const [prospectApproval] = useRecoilState(prospectApprovalState);
  const [disabledSearchFirefox, setDisabledSearchFirefox] = useState(true);
  const [disabledSearchMac, setDisabledSearchMac] = useState(true);
  const [showReferralModal, setShowReferralModal] = useRecoilState(
    openReferralModelState
  );
  const [showReviewSidebar, setShowReviewSidebar] = useRecoilState(
    showReviewSidebarModal
  );
  const setActiveReview = useSetRecoilState(activeReviewState);
  const [isSignOutModelOpen, setIsSignOutModelOpen] =
    useRecoilState(signOutModelOpen);
  const setReferralCode = useSetRecoilState(referralCode);
  const [userId] = useRecoilState(userIdState);
  const [publicNavOpen, setPublicNavOpen] = useState(false);
  const features = publicFeatures(t);
  const resources = publicResources(t);
  const company = publicCompany(t);
  const href = handleHref("/search", router);
  const shouldShowStaticHeader = useStaticHeader();
  const { handleUsersPortfolioNavigation } = useNavigationHelper();
  const { handle } = router.query;

  const { data: isPremiumMember } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });

  const { data: isReferralCode } = trpc.useQuery(
    ["fs.refer.getReferralCode", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (
      isReferralCode &&
      typeof isReferralCode === "string" &&
      isReferralCode.trim() !== ""
    ) {
      return setReferralCode(isReferralCode);
    }
  }, [isReferralCode]);

  const closeModal = () => {
    setIsSignOutModelOpen(false);
  };

  useEffect(() => {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      setDisabledSearchFirefox(false);
    }
    if (navigator.userAgent.indexOf("Mac") != -1) {
      setDisabledSearchMac(false);
    }

    setPlanUser(
      isPremiumMember?.stripeMembershipStatus === "Active" &&
        ["Premium", "Pro"].includes(isPremiumMember.subscriptionPlan)
        ? isPremiumMember.subscriptionPlan
        : ""
    );
  }, [resume, isPremiumMember, planUser]);

  if (HIDE_APP_BAR_PAGES.includes(router.pathname)) {
    return null;
  }


  return (
    <>
      <Disclosure
        as="nav"
        className="bg-white sticky top-0 dark:bg-gray-900 dark:border-b dark:border-gray-800 z-40 shadow-sm print:hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center ">
            <div className="lg:px-0 flex-shrink-0 text-xl font-semibold py-4">
              <p className="block md:hidden">
                {location.pathname === "/" ||
                location.pathname === "/s/portfolio" ||
                location.pathname.includes("/l/") ||
                location.pathname.includes("/s/course") ||
                (location.pathname.startsWith("/p") &&
                  status === "authenticated") ? (
                  <ProductLogo />
                ) : (
                  prodTitle
                )}
              </p>
              {status === "authenticated" ? (
                <p
                  className={`${
                    publicPagePaths.includes(location.pathname)
                      ? "block"
                      : "hidden"
                  } md:block`}
                >
                  <ProductLogo />
                </p>
              ) : (
                <p
                  className={`${
                    (location.pathname === "/" || prodTitle !== "") && "hidden"
                  } md:block`}
                >
                  <ProductLogo />
                </p>
              )}
            </div>
            {(status === "unauthenticated" || shouldShowStaticHeader) && (
              <div className="pl-28 items-center gap-8 hidden lg:flex">
                <NavigationDropdown
                  title="Features"
                  dropdownOptions={features}
                />
                <NavigationDropdown
                  title="Resources"
                  dropdownOptions={resources}
                  width="max-w-[19rem]"
                />
                <NavigationDropdown
                  title="Company"
                  dropdownOptions={company}
                  width="max-w-sm"
                />
              </div>
            )}
            <div className="flex flex-row-reverse lg:flex-row items-center gap-2.5 lg:gap-0">
              <div className="sm:ml-6 hidden lg:flex sm:items-center justify-end w-full">
                <div className="flex items-center relative right-2">
                  {status === "authenticated" && !shouldShowStaticHeader && (
                    <AiFeaturesMenu />
                  )}
                  {(location.pathname === "/" ||
                    location.pathname === "/search") && <DiscordButton />}
                  {!planUser &&
                    !isProhibitedPage(PROHIBITED_PAGES) &&
                    status === "authenticated" && (
                      <Link href="/pricing" passHref>
                        <div className="app-bar-btn dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm items-center">
                          <img
                            src={`/icons/crown.svg`}
                            alt="pricing"
                            className="w-6 h-6"
                          />
                          <span className="hidden md:block">
                            {t("becomePRO")}
                          </span>
                        </div>
                      </Link>
                    )}
                  <Link href={href!} passHref>
                    <div className="app-bar-btn dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm">
                      <SearchIcon className="w-5 h-5" />
                      <span className="hidden md:block">{t("search")}</span>
                    </div>
                  </Link>

                  {((status === "authenticated" &&
                    !location.pathname.includes("/p/") &&
                    !location.pathname.includes("/r/")) ||
                    location.pathname === "/search") &&
                    location.pathname !== "/" && (
                      <div
                        className="app-bar-btn dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm"
                        onClick={() => {
                          setShowReferralModal(true);
                        }}
                      >
                        <GiftIcon className="w-5 h-5 text-gray-800 dark:text-white" />
                        <span className="hidden md:block">{t("refer")}</span>
                      </div>
                    )}
                  {prospectApproval &&
                    status === "authenticated" &&
                    isProhibitedPage(PROHIBITED_PAGES) &&
                    !location.pathname.includes("/p/") &&
                    !location.pathname.includes("/l") && <PrintResume />}
                  {status === "authenticated" &&
                    location.pathname === "/s/resume" && <PrintResume />}
                  {status === "authenticated" &&
                    disabledSearchFirefox &&
                    disabledSearchMac &&
                    prospectApproval &&
                    isProhibitedPage(PROHIBITED_PAGES) &&
                    !location.pathname.includes("/p/") &&
                    !location.pathname.includes("/l") && <ShareResume />}
                  {status === "authenticated" &&
                    disabledSearchFirefox &&
                    location.pathname.startsWith("/s/") && (
                      <ShareResume />
                    )}
                  {prospectApproval && (
                    <>
                      {isProhibitedPage(PROHIBITED_PAGES) && <Follow />}
                      {isProhibitedPage(PROHIBITED_PAGES) && <StarResume />}
                      {isProhibitedPage(PROHIBITED_PAGES) &&
                        !location.pathname.includes("/l") && (
                          <button
                            className="md:px-3 app-bar-btn flex items-center gap-1 text-sm border py-2"
                            onClick={() =>
                              handleUsersPortfolioNavigation(
                                handle?.toString() ?? ""
                              )
                            }
                          >
                            {location.pathname.startsWith("/p") ? (
                              <DocumentTextIcon className="w-4 h-4 text-sm" />
                            ) : (
                              <BriefcaseIcon className="w-4 h-4 text-sm" />
                            )}{" "}
                            {t(
                              location.pathname.startsWith("/p")
                                ? "resume"
                                : "portfolio"
                            )}
                          </button>
                        )}
                      {isProhibitedPage(PROHIBITED_PAGES) &&
                        !location.pathname.startsWith("/l") && (
                          <button
                            className="app-bar-btn dark:bg-gray-900 dark:text-white text-sm py-1 gap-1.5"
                            onClick={() => {
                              setActiveReview({
                                document: "Projects-Review",
                                headingTitle: "",
                                title: "experiences",
                              });
                              setShowReviewSidebar(!showReviewSidebar);
                            }}
                          >
                            <span>
                              <StatusOnlineIcon className={`w-4 text-sm`} />
                            </span>
                            {"Reviews"}
                          </button>
                        )}
                    </>
                  )}
                  {location.pathname === "/search" &&
                    status === "authenticated" && (
                      <button
                        className="app-bar-btn dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm"
                        data-testid="blogButton"
                        onClick={() => router.push("/blog")}
                      >
                        <RssIcon className="w-4 h-4" />
                        <span className="hidden md:block">{t("blogs")}</span>
                      </button>
                    )}
                </div>
                {status === "authenticated" && (
                  <div className={planUser === "Premium" ? "ml-3" : ""}>
                    <AppbarDropdown />
                  </div>
                )}
              </div>
              {status === "unauthenticated" && (
                <div className="hidden lg:block">
                  <SignInButton />
                </div>
              )}
              {status === "authenticated" ? (
                <MobileMenu />
              ) : (
                <div className="flex gap-2 items-center">
                  <div className="lg:hidden">
                    <DiscordButton />
                  </div>
                  <Link href={href!} passHref>
                    <div className="flex items-center dark:bg-gray-900 dark:text-white app-bar-btn text-sm md:px-3 px-1 py-1 space-x-2 mx-0 md:border-none rounded-lg lg:hidden">
                      <SearchIcon className="w-5 h-5" />
                      <span className="hidden md:block">{t("search")}</span>
                    </div>
                  </Link>
                  <div className="lg:hidden">
                    <SignInButton />
                  </div>
                  <div className="lg:hidden">
                    <button onClick={() => setPublicNavOpen(true)}>
                      <BarSvg />
                    </button>
                    <PublicNavbar
                      sidebarOpen={publicNavOpen}
                      setSidebarOpen={setPublicNavOpen}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <SideBarMenuContainer />
        </div>
      </Disclosure>
      <Modal
        content={t("logOutDescription")}
        title={t("logOutTitle")}
        isOpen={isSignOutModelOpen}
        closeModal={closeModal}
        logOutButton={<LogOutButton />}
      />
      <ReferModal open={showReferralModal} setOpen={setShowReferralModal} />
      <ToastContainer />
    </>
  );
}
