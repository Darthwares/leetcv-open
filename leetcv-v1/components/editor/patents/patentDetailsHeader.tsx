import { getDefaultPatent, tipsPatent } from "@constants/defaults";
import { openLastPatentState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function PatentDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const t = useTranslations("Dashboard");
  const [patentTipButton, setPatentTipButton] = useState(false);
  const setOpenLastPatent = useSetRecoilState(openLastPatentState);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isPatentHeaderSticky, setIsPatentHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsPatentHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.patents?.length ?? 0) + 1;
    const newPatents = getDefaultPatent(seed);

    if (userInfo) {
      const updatedPatents = userInfo.patents
        ? [...userInfo.patents, newPatents]
        : [newPatents];
      setUserInfo({
        ...userInfo,
        patents: updatedPatents,
      });
    }

    setOpenLastPatent(true);
  };

  return (
    <div
      className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-indigo-50 to-pink-50 shadow-md rounded-lg z-10 pl-5"
      data-testid="patentDetailsHeader"
    >
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isPatentHeaderSticky}
        handleAdd={handleAdd}
        tipButton={patentTipButton}
        setTipButton={setPatentTipButton}
        tipsData={tipsPatent}
        title={t("add-patent")}
        heading={t("patent-details")}
      />
    </div>
  );
}
