import React, { useState } from "react";
import Notification from "@components/notification";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { resumeState, showRecoveredResumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { LoadingSvg } from "@components/svg";
import RecoverCard from "./recoverResume/recoverCard";
import ActionNeededCard from "@components/actionNeededCard";

const RecoverOldAccount = () => {
  const setResume = trpc.useMutation(["fs.recoverEmail.setUserResume"]);
  const [isOpen, setIsOpen] = useRecoilState(showRecoveredResumeState);
  const t = useTranslations("Settings");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [resume] = useRecoilState(resumeState);
  const isButtonDisabled =
    !recoveryEmail || !recoveryCode || setResume.isLoading;

  return (
    <div className="w-full space-y-8 px-3 mt-6 lg:mt-0 lg:py-8 bg-white min-h-[60vh]">
      <h2 className="text-xl text-gray-700 font-bold">
        {t("recoverOldAccount")}
      </h2>
      <ActionNeededCard cardDescription={t("recoverOldAccountDesc")} />
      <div className="rounded-2xl bg-indigo-50 p-5 md:pt-4 md:pb-4 md:px-1 max-w-5xl">
        <div className="lg:py-[20px] md:px-8">
          <div className="space-y-2 mt-3 max-w-sm">
            <div>
              <label htmlFor="recoveryCode" className="block font-medium">
                {t("enterRecoveryCode")}
                <span className="text-red-500">{t("star")}</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="recoveryCode"
                  name="recoveryCode"
                  type="text"
                  onChange={(e) => {
                    setRecoveryCode(e.target.value);
                  }}
                  required
                  value={recoveryCode}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t("enterRecoveryCode")}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block font-medium">
                {t("enterOldAccount")}{" "}
                <span className="text-red-500">{t("star")}</span>
              </label>
              <div className="mt-1 flex items-center">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => {
                    setRecoveryEmail(e.target.value);
                  }}
                  value={recoveryEmail}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t("enterOldAccount")}
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                  className={`relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                    isButtonDisabled
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  disabled={isButtonDisabled}
                >
                  {setResume.isLoading ? <LoadingSvg /> : null}
                  {t("recover")}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
      {isOpen && (
        <RecoverCard
          recoveryEmail={recoveryEmail}
          recoveryCode={recoveryCode}
          handle={resume.handle}
        />
      )}
    </div>
  );
};

export default RecoverOldAccount;
