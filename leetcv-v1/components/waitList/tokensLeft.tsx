import { subscriptionPlanState, tokenCountState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";
import RunningLow from "./runningLowTokens";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/outline";
import { CoinSvg } from "@components/svg";

const TokensLeft = () => {
  const t = useTranslations("WaitList");
  const [tokens] = useRecoilState(tokenCountState);
  const [plan] = useRecoilState(subscriptionPlanState);
  return (
    <div className="w-full text-left font-semibold text-indigo-600 flex gap-2 sm:gap-5 sm:items-center sm:flex-row flex-col space-y-1 md:space-y-0">
      {tokens ? (
        <p className="flex items-center gap-2">
          <div className="flex rounded-lg bg-indigo-200 dark:bg-gray-600/30 p-2">
            <CoinSvg />
          </div>
          {t("tokenLeft")} {tokens}
        </p>
      ) : null}
      {plan && tokens < 560 && (
        <RunningLow
          title="Low Tokens?"
          buttonType={
            <div>
              <Link href={"/contact"}>
                <div className="app-bar-btn whitespace-nowrap flex items-center gap-1 border border-indigo-400 max-w-fit">
                  <UserIcon className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm">{t("contactUs")}</span>
                </div>
              </Link>
            </div>
          }
        />
      )}
      {!plan && tokens < 560 && (
        <RunningLow
          title="Low Tokens?"
          buttonType={
            <div>
              <Link href={"/pricing"}>
                <div className="app-bar-btn whitespace-nowrap flex items-center gap-1 border border-indigo-400 max-w-fit">
                  <img src={`/icons/crown.svg`} alt="Leet Tokens Left" className="w-6 h-6" />
                  <span className="text-sm">{t("upgradePlan")}</span>
                </div>
              </Link>
            </div>
          }
        />
      )}
    </div>
  );
};

export default TokensLeft;
