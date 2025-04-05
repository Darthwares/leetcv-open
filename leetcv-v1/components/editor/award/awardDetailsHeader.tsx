import HeaderContainer from "@components/headerContainer";
import { getDefaultAward, tipsAward } from "@constants/defaults";
import { useDetectSticky } from "@lib/helper/detectSticky";
import { openLastAwardState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function AwardDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastAward = useSetRecoilState(openLastAwardState);
  const [awardTipButton, setAwardTipButton] = useState(false);
  const t = useTranslations("Dashboard");
  const headerRef = useRef<HTMLDivElement>(null);
  const [isAwardHeaderSticky, setIsAwardHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsAwardHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.awards?.length || 0) + 1;
    const newAward = getDefaultAward(seed);
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        awards: [...userInfo?.awards!, newAward],
      });
    }
    setOpenLastAward(true);
  };

  return (
    <div className="headerDetails" data-testid="awardDetailsHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isAwardHeaderSticky}
        handleAdd={handleAdd}
        tipButton={awardTipButton}
        setTipButton={setAwardTipButton}
        tipsData={tipsAward}
        title={t("add-award")}
        heading={t("award-details")}
      />
    </div>
  );
}
