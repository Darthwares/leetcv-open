import {
  tipsExtraCurricular,
  getDefaultExtraCurricular,
} from "@constants/defaults";
import { resumeState, openLastExtraCurricularState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function ExtraCurricularDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastExtraCurricular = useSetRecoilState(
    openLastExtraCurricularState
  );
  const t = useTranslations("Dashboard");
  const [extraCurricularTipButton, setExtraCurricularTipButton] =
    useState(false);
  const [isExtraCurricularHeaderSticky, setIsExtraCurricularHeaderSticky] =
    useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  useDetectSticky(headerRef, setIsExtraCurricularHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.extraCurricularActivities?.length ?? 0) + 1;
    const newActivities = getDefaultExtraCurricular(seed);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        extraCurricularActivities: [
          ...(userInfo?.extraCurricularActivities! ?? []),
          newActivities,
        ],
      });
    }
    setOpenLastExtraCurricular(true);
  };

  return (
    <div className="headerDetails" data-testid="extraCurricularDetailsHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isExtraCurricularHeaderSticky}
        handleAdd={handleAdd}
        tipButton={extraCurricularTipButton}
        setTipButton={setExtraCurricularTipButton}
        tipsData={tipsExtraCurricular}
        title={t("add-activities")}
        heading={t("activities-details")}
      />
    </div>
  );
}
