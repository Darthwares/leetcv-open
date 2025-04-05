import React from "react";
import { ClockIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { accessCameraState } from "@state/state";
import { isMobileOnly } from "mobile-device-detect";
import { useTranslations } from "next-intl";

interface ShowTimerProps {
  time: number;
  isLoading: boolean;
  setShowEndModal: (value: boolean) => void;
  formatTime: (time: number) => string;
}

const ShowTimer: React.FC<ShowTimerProps> = ({
  time,
  isLoading,
  setShowEndModal,
  formatTime,
}) => {
  const [accessCamera] = useRecoilState(accessCameraState);

  const t = useTranslations("Interview");
  const warningMessage = accessCamera
    ? t("importantLookCamera")
    : t("importantAllowCamera");

  return (
    <div className="bg-indigo-50 rounded-md">
      <div className="flex justify-between w-full flex-col-reverse lg:flex-row sm:items-center gap-2 px-5 py-4">
        {!isMobileOnly && (
          <p
            className={`w-full ${
              accessCamera ? "text-yellow-600" : "text-red-600"
            }`}
          >
            <strong>{warningMessage}</strong>
          </p>
        )}

        <div className="flex w-full justify-between lg:justify-end items-center gap-5">
          <div
            className={`flex items-center max-w-md gap-2 font-bold ${
              time === 60 ? "text-red-500" : ""
            }`}
          >
            <ClockIcon className="w-5 h-5 inline" />
            <span className="hidden sm:block">{t("timeLeftLabel")}</span>{" "}
            {formatTime(time)}
          </div>
          <button
            onClick={() => {
              setShowEndModal(true);
             
            }}
            disabled={isLoading}
            className="bg-red-600 whitespace-nowrap font-medium text-white p-2 hover:bg-red-500 rounded text-sm"
          >
            {t("endInterviewButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowTimer;
