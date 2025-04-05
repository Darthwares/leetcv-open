import AppBar from "@components/appbar/appBar";
import { Loader } from "@components/loader";
import { RESTRICTED_PAGES } from "constants/pages";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  printState,
  sideBarOpenState,
  userIdState,
  subscriptionPlanState,
  disableSidebarState,
  shareProfileModalState,
} from "@state/state";
import { clickableLink, getBrowserDeviceAndOSInfo } from "@constants/defaults";
import GlobalMessageContainer from "@components/messages/globalMessages/globalMessageContainer";
import GlobalResumeFabBtn from "@components/globalResumeFabBtn";
import SidebarMenu from "@components/sidebarMenu";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import NavbarPortfolio from "@components/portfolio/navbarPortfolio";
import FreePortfolioAccess from "@lib/helper/freeAccess";
import { trpc } from "@utils/trpc";
import { ProfileShareModal } from "@components/share/resumePortfolioShare";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();
  const setCurUserId = useSetRecoilState(userIdState);
  const router = useRouter();
  const { handle } = router.query;
  const setPrinted = useSetRecoilState(printState);
  const [collapsed, setCollapsed] = useRecoilState(sideBarOpenState);
  const [disableSidebar] = useRecoilState(disableSidebarState);
  const [plan] = useRecoilState(subscriptionPlanState);

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const setBrowserData = trpc.useMutation(["fs.browserdata.saveData"]);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [shareProfileModal, setShareProfileModal] = useRecoilState(
    shareProfileModalState
  );
  FreePortfolioAccess();

  useEffect(() => {
    const { onBeforePrint, onAfterPrint } = clickableLink(setPrinted);
    return () => {
      setPrinted(false);
      if (window.matchMedia) {
        window.matchMedia("print").removeEventListener("change", onBeforePrint);
        window.matchMedia("print").removeEventListener("change", onAfterPrint);
      }
    };
  }, []);



  useEffect(() => {
    if (status === "authenticated") {
      setBrowserData.mutate({
        id: session.user.id,
        browserData: getBrowserDeviceAndOSInfo(),
      });
    }
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated") {
      if (
        router.pathname === "/s/portfolio" &&
        router.query.showcase === "true"
      ) {
        sessionStorage.setItem("redirect", router.asPath);
        router.push("/");
      } else if (router.query.notification === "true") {
        const redirectUrl = `/?redirect=${encodeURIComponent(router.asPath)}`;
        router.push(redirectUrl);
      } else if (RESTRICTED_PAGES.includes(router.pathname)) {
        router.push("/");
      }
    }
    if (status == "authenticated") {
      setCurUserId(session.user.id);
      if (location.pathname === "/s/settings") {
        router.push("/s/settings/privacy");
      }
    }
  }, [status]);

  if (
    (`/` !== router.asPath || `/r/${handle}` !== router.asPath) &&
    status === "loading"
  ) {
    return null;
  } else if (status === "loading") {
    return <Loader />;
  }

  const notVisibleSidebar =
    location.pathname === "/search" ||
    location.pathname === "/" ||
    location.pathname === "/pricing" ||
    location.pathname === "/about" ||
    location.pathname === "/blog" ||
    location.pathname === "/contact" ||
    location.pathname === "/cancellation" ||
    location.pathname === "/privacy" ||
    location.pathname === "/terms" ||
    location.pathname === "/faq" ||
    location.pathname === "/404" ||
    location.pathname === "/500" ||
    location.pathname === "/cancel" ||
    location.pathname === "/checkoutSuccess" ||
    location.pathname === "/paymentVerification" ||
    location.pathname === "/s/portfolio" ||
    (disableSidebar && location.pathname === "/s/interview") ||
    location.pathname === "/aiResume" ||
    location.pathname === "/convertResume" ||
    location.pathname === "/coverLetter" ||
    location.pathname === "/resumeIdeas" ||
    location.pathname === "/portfolio" ||
    location.pathname === "/messages" ||
    location.pathname === "/requests" ||
    location.pathname === "/attestation" ||
    location.pathname === "/reviews" ||
    location.pathname === "/chatgptGuides" ||
    location.pathname === "/caseStudies" ||
    location.pathname === "/interviewGuides" ||
    location.pathname === "/jobSearchTips" ||
    location.pathname === "/interview" ||
    location.pathname === "/jobagent" ||
    location.pathname === "/leetLink" ||
    location.pathname.includes("/r/") ||
    location.pathname.includes("/p/") ||
    location.pathname.includes("/l/") ||
    location.pathname.includes("/college/") ||
    location.pathname.includes("/s/course");

  const handleMouseEnter = (text: string, rect: DOMRect) => {
    if (collapsed) {
      const sidebarRect = document
        .querySelector(".sidebar-container")
        ?.getBoundingClientRect();
      const offsetTop = sidebarRect ? rect.top - sidebarRect.top : rect.top;
      setShowTooltip(true);
      setTooltipText(text);
      setTooltipPosition({ top: offsetTop + 10, left: rect.right + 10 });
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setTooltipText("");
  };

  return (
    <main>
      {location.pathname.includes("/p/") && plan ? (
        <NavbarPortfolio />
      ) : (
        <AppBar />
      )}
      {status == "authenticated" && <GlobalResumeFabBtn />}
      {status == "authenticated" &&
        location.pathname !== "/s/resumeEditor" &&
        location.pathname !== "/s/resume" &&
        location.pathname !== "/s/messages" &&
        location.pathname !== "/s/leetLink" &&
        location.pathname !== "/cancel" &&
        location.pathname !== "/checkoutSuccess" &&
        !location.pathname.match(/^\/r\/.+/) &&
        !location.pathname.match(/^\/p\/.+/) &&
        location.pathname !== "/s/portfolio" &&
        !location.pathname.includes("/s/course") && <GlobalMessageContainer />}
      <div
        className={` ${!notVisibleSidebar && "flex"} mx-auto w-full ${
          location.pathname !== "/s/portfolio" &&
          location.pathname !== "/" &&
          location.pathname !== "/aiResume" &&
          location.pathname !== "/convertResume" &&
          location.pathname !== "/coverLetter" &&
          location.pathname !== "/resumeIdeas" &&
          location.pathname !== "/portfolio" &&
          location.pathname !== "/messages" &&
          location.pathname !== "/requests" &&
          location.pathname !== "/attestation" &&
          location.pathname !== "/reviews" &&
          location.pathname !== "/interview" &&
          !location.pathname.includes("/p/") &&
          !location.pathname.includes("/l/") &&
          // !location.pathname.includes("/course/") &&
          "max-w-[90rem] w-full"
        }`}
      >
        {!notVisibleSidebar && status == "authenticated" && (
          <>
            <div
              className="bg-gray-50 dark:bg-gray-900 sticky print:hidden top-0 overflow-y-auto lg:border-r-[1px] lg:border-gray-200 lg:dark:border-gray-700 flex-none sidebar-container"
              style={{ height: "calc(100vh - 0px)" }}
            >
              <div className="relative pt-12 pb-10 top-0">
                <SidebarMenu
                  collapsed={collapsed}
                  setCollapsed={setCollapsed}
                  className="hidden pb-12 lg:block"
                  width="280px"
                  collapsedWidth="70px"
                  onHover={handleMouseEnter}
                  onLeave={handleMouseLeave}
                />
              </div>
            </div>
            <div className="relative hidden print:hidden lg:block overflow-none">
              <div
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setCollapsed(!collapsed);
                  }
                }}
                tabIndex={0}
                onClick={() => setCollapsed(!collapsed)}
                className="absolute overflow-hidden top-72 cursor-pointer print:hidden -right-4 border border-gray-300 dark:border-gray-700 bg-indigo-500 dark:bg-indigo-600 rounded-full hover:scale-105 text-white p-1.5 z-40"
              >
                {collapsed ? (
                  <ChevronRightIcon className="w-5 h-5" strokeWidth={3} />
                ) : (
                  <ChevronLeftIcon className="w-5 h-5" strokeWidth={3} />
                )}
              </div>
            </div>
          </>
        )}
        <div className="w-full relative">
          {showTooltip &&
            location.pathname !== "/s/portfolio" &&
            !!location.pathname.includes("/p/") && (
              <div
                className="absolute z-50 left-2 bg-gray-700 text-white px-2 py-1 rounded"
                style={{ top: tooltipPosition.top }}
              >
                {tooltipText}
              </div>
            )}
          {children}
        </div>
        <ProfileShareModal
          open={shareProfileModal}
          setOpen={setShareProfileModal}
        />
      </div>
    </main>
  );
}
