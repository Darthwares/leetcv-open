import { CheckBadgeSvg } from "@components/svg";
import Tooltip from "@components/tooltip";
import { resumeState, subscriptionPlanState } from "@state/state";
import { useProgressPercent } from "@utils/progressPercent";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

const DashboardHeader = () => {
  const router = useRouter();
  const [resume] = useRecoilState(resumeState);
  const { result } = useProgressPercent();
  const t = useTranslations("DashboardWidget");
  const [planUser] = useRecoilState(subscriptionPlanState);

  return (
    <div
      className="bg-gradient-to-r from-indigo-100 to-pink-200 dark:from-gray-700 dark:to-gray-800 py-6 md:py-3 rounded-lg max-w-7xl mx-auto"
      data-testid="dashboardHeader"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full md:px-12 lg:px-16 px-6">
          <div
            className="max-w-xl text-2xl font-bold tracking-tight sm:text-4xl lg:col-span-7 py-1.5 lg:py-0"
            data-testid="dashboardHeaderLeft"
          >
            <div className="flex flex-col sm:flex-row md:flex-col sm:gap-4 md:gap-1.5 xl:flex-row xl:gap-4">
              <h2 data-testid="displayName">
                {t("hi")} {resume.displayName.split(" ")[0]}
              </h2>
              {planUser && (
                <div className="flex justify-start items-start my-1.5 sm:my-0">
                  <div className="space-x-1 border border-gray-400 rounded-full pl-3 pr-4 py-1.5 dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm items-center">
                    <CheckBadgeSvg className="w-6 h-6 text-indigo-600" />
                    <span>{t("profileVerified")}</span>
                  </div>
                </div>
              )}
              {!planUser && (
                <Link href="/pricing" passHref>
                  <div className="flex justify-start items-start my-1.5 sm:my-0">
                    <div className="space-x-1 border border-gray-400 rounded-full px-3 py-1.5 dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm items-center cursor-pointer">
                      <img
                        src={`/icons/crown.svg`}
                        alt="pricing"
                        className="w-6 h-6"
                      />
                      <span>{t("getProfileVerified")}</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <p
              className="text-[1rem] md:text-lg font-medium dark:text-gray-300 text-gray-600 mt-2 leading-5"
              data-testid="youHaveCompleted"
            >
              {t("youHaveCompleted")} {result}% {t("moreStats")}
            </p>
            <p
              className="text-[1rem] md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2 leading-5"
              data-testid="gotYouCovered"
            >
              {t("gotYouCovered")}
            </p>
            <div className="text-lg font-medium text-gray-600 dark:text-gray-300 mt-4 flex flex-col lg:flex-row gap-2 items-start">
              <span
                className="whitespace-nowrap text-sm md:text-lg"
                data-testid="resumePrivacy"
              >
                {t("resumePrivacy")}
              </span>
              <div className="flex w-full gap-2 justify-start">
                <div className="flex justify-start">
                  <button
                    data-testid="privacyButton"
                    onClick={() => {
                      router.push("/s/settings/privacy");
                    }}
                    className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-md px-3 py-1 text-sm max-w-fit"
                  >
                    {resume.private ? t("private") : t("public")}
                  </button>
                </div>
                <div className="md:w-full flex justify-start">
                  <Tooltip tip={t("changePrivacy")} width="w-52 md:w-60" />
                </div>
              </div>
            </div>
          </div>
          <div className="h-72 hidden md:block" data-testid="lottie">
            <lottie-player
              src="/assets/lottie/dashboard.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
