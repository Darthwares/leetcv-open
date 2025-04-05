import { resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";
import SwitchButton from "./switchButton";

const HideImageAndQrCode = () => {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);

  const toggleSwitch = (key: keyof typeof resume) => {
    setResume((prevResume) => ({
      ...prevResume,
      [key]: !prevResume[key],
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row max-w-lg items-start gap-3 sm:gap-10 py-2">
      {[
        {
          label: t("hideImage"),
          checked: resume?.hiddenImage ?? false,
          onChange: () => toggleSwitch("hiddenImage"),
        },
        {
          label: t("hideQrCode"),
          checked: resume?.hiddenQrCode ?? false,
          onChange: () => toggleSwitch("hiddenQrCode"),
        },
      ].map((item, index) => (
        <SwitchButton key={item.label} {...item} />
      ))}
    </div>
  );
};

export default HideImageAndQrCode;
