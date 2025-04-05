import { SvgInfo } from "@components/svgGrid";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";

const Banner = () => {
  const t = useTranslations("Portfolio");
  return (
    <div
      className="sticky top-0 z-30 max-w-7xl m-auto px-4 sm:px-6 lg:px-8 pb-8"
      data-testid="banner"
    >
      <div className="relative isolate flex rounded-lg gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 top-3 md:top-4">
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
            {t("upgradePlan")}
            <Link href="/pricing">
              <p className="font-semibold  underline hover:no-underline inline-flex items-center sm:ml-2 cursor-pointer text-center">
                {t("upgradeNow")}
                <span aria-hidden="true">
                  <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-200 ease-in-out" />
                </span>
              </p>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
