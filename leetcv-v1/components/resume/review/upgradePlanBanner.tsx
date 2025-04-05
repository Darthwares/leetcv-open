import { LockClosedIcon } from "@heroicons/react/outline";
import { subscriptionPlanState } from "@state/state";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

interface UpgradePlanBannerProps {
  title: string;
  description: string;
}

const UpgradePlanBanner = ({ title, description }: UpgradePlanBannerProps) => {
  const [plan] = useRecoilState(subscriptionPlanState);
  const t = useTranslations("ReviewList");
  const router = useRouter();

  return (
    <>
      {plan !== "Pro" && (
        <div className="mt-5">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800/80 p-4 text-left shadow border border-gray-200 dark:border-gray-700 transition-all mb-8 w-full sm:p-6">
            <div className="flex gap-2">
              <div className="mx-auto hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0">
                <LockClosedIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="sm:ml-4 sm:mt-0">
                <div className="text-base font-semibold leading-6 dark:text-white text-gray-900">
                  {title}
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex justify-end">
              <button
                type="button"
                className="inline-flex w-full max-w-fit items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700/90 sm:ml-3 sm:w-auto"
                onClick={() => router.push("/pricing")}
              >
                <img src={`/icons/crown.svg`} alt="Pricing" className="w-7 h-7" />
                {t("upgradePlan")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpgradePlanBanner;
