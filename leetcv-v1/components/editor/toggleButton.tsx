import React from "react";
import { RemoteWork } from "data/models/RemoteWork";
import { resumeState } from "@state/state";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";

export default function ToggleButton() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const t = useTranslations("Dashboard");

  const handleSwitchClick = (option: RemoteWork) => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        ["remoteWork"]: option,
      });
    }
  };

  return (
    <div>
      <div
        // className="SwitchContainer"
      >
        <fieldset className="grid grid-cols-2 md:grid-cols-4 max-w-md px-2 py-2.5 gap-3 ">
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="office"
                name="work-type"
                type="radio"
                defaultChecked={userInfo.remoteWork === t("office")}
                onChange={() => handleSwitchClick("Office")}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="office" className="font-medium text-gray-700">
                {t("office")}
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remote"
                name="work-type"
                defaultChecked={userInfo.remoteWork === t("remote")}
                type="radio"
                onChange={() => handleSwitchClick("Remote")}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remote" className="font-medium text-gray-700">
                {t("remote")}
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="both"
                name="work-type"
                defaultChecked={userInfo.remoteWork === "Both"}
                type="radio"
                onChange={() => handleSwitchClick("Both")}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="both" className="font-medium text-gray-700">
                {t("both")}
              </label>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="none"
                name="work-type"
                defaultChecked={userInfo.remoteWork === t("none")}
                type="radio"
                onChange={() => handleSwitchClick("None")}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="none" className="font-medium text-gray-700">
                {t("none")}
              </label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
