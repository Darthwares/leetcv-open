import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { openLastEduState, resumeState } from "@state/state";
import { getDefaultEducation, tipsEducation } from "@constants/defaults";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function EducationDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastEducation = useSetRecoilState(openLastEduState);
  const t = useTranslations("Dashboard");
  const [educationTipButton, setEducationTipButton] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isEduHeaderSticky, setIsEduHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsEduHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.educations?.length || 0) + 1;
    const newEducation = getDefaultEducation(seed);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        educations: [...userInfo?.educations!, newEducation],
      });
    }
    setOpenLastEducation(true)
  };

  return (
    <div className="headerDetails" data-testid="educationDetailsHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isEduHeaderSticky}
        handleAdd={handleAdd}
        tipButton={educationTipButton}
        setTipButton={setEducationTipButton}
        tipsData={tipsEducation}
        title={t("add-education")}
        heading={t("education-details")}
      />
    </div>
  );
}

