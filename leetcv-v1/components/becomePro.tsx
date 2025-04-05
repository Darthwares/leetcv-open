import { UserIcon } from "@heroicons/react/solid";
import { subscriptionPlanState } from "@state/state";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
interface BecomeProProps {
  width: string;
}

const BecomePro = ({ width }: BecomeProProps) => {
  const t = useTranslations("Dashboard");
  const router = useRouter();
  const [plan] = useRecoilState(subscriptionPlanState);

  const handleClick = () => {
    if (plan) {
      return router.push("/contact");
    }
    router.push("/pricing");
  };

  return (
    <div
      className="mt-2 w-full max-w-lg flex bg-red-50 rounded-md px-3 sm:px-4"
      data-testid="become-pro-container"
    >
      <div className=" flex py-3 gap-2 items-center justify-between w-full">
        <p
          data-testid="pro-text"
          className={` text-red-600 font-semibold ${width}`}
        >
          {t("proMember")}
        </p>
        <div
          data-testid="become-btn-div"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        >
          {plan && (
            <div className="flex items-center gap-2 cursor-pointer py-1">
              <button className="app-bar-btn whitespace-nowrap flex items-center gap-1 border border-indigo-400">
                <UserIcon className="w-5 h-5 text-indigo-500" />
                <span className="text-sm">{t("contactUs")}</span>
              </button>
            </div>
          )}
          {!plan && (
            <button className="app-bar-btn text-sm py-1 px-4 rounded-md flex items-center gap-2 max-w-fit border border-indigo-400">
              <img src={`/icons/crown.svg`} alt="Pricing" className="w-6 h-6" />
              <span className="whitespace-nowrap">{t("pro")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BecomePro;
