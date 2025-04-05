import { SvgInfo } from "@components/svgGrid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FreePortfolioAccess from "@lib/helper/freeAccess";
import { useEffect, useState } from "react";

const FreeAccessBanner = () => {
  const t = useTranslations("Banner");
  const days = FreePortfolioAccess();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 75) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handlePosition = () => {
    if (isScrolling && location.pathname === "/s/portfolio") {
      return "top-[5px] md:top-[9.5px]";
    } else if (isScrolling) {
      return "top-0";
    } else {
      return "top-3 md:top-4";
    }
  };

  return (
    <div
      className={`sticky ${
        location.pathname === "/s/portfolio" ||
        location.pathname.startsWith("/p")
          ? "top-16"
          : "top-0"
      } z-30 max-w-7xl m-auto ${
        location.pathname !== "/s/resume" &&
        location.pathname !== "/s/dashboard"
          ? "px-4 sm:px-6 lg:px-8"
          : ""
      } pb-8`}
      data-testid="banner"
    >
      <div
        className={`relative isolate flex md:justify-center rounded-lg gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 ${handlePosition()}`}
      >
        <div
          className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div
          className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <SvgInfo />
            <span className="sr-only">{t("info")}</span>
          </div>
          <p className="text-sm leading-6 text-gray-900 group">
            {t("youHave")}
            {days}
            {t("freeAccess")}

            <Link href="/pricing">
              <span className="font-semibold  underline hover:no-underline inline-flex items-center sm:ml-2 cursor-pointer text-center">
                {t("upgradeNow")} -&gt;
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FreeAccessBanner;
