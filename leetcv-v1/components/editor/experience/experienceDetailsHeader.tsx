import { getDefaultExperience, tipsExperience } from "@constants/defaults";
import { openLastExpState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function ExperienceDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastExp = useSetRecoilState(openLastExpState);
  const t = useTranslations("Dashboard");
  const [experienceTipButton, setExperienceTipButton] = useState(false);
  const [isExpHeaderSticky, setIsExpHeaderSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  useDetectSticky(headerRef, setIsExpHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.experiences?.length || 0) + 1;
    const newExperience = getDefaultExperience(seed, userInfo?.currentCompany);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        experiences: [...userInfo?.experiences!, newExperience],
      });
    }
    setOpenLastExp(true);
  };

  return (
    <div className="headerDetails" data-testid="experienceDetailsHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isExpHeaderSticky}
        handleAdd={handleAdd}
        tipButton={experienceTipButton}
        setTipButton={setExperienceTipButton}
        tipsData={tipsExperience}
        title={t("add-experience")}
        heading={t("experience-details")}
      />
    </div>
  );
}


