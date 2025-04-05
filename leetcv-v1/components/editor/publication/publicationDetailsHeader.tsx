import { getDefaultPublication, tipsPublication } from "@constants/defaults";
import { openLastPublicationState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function PublicationDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const t = useTranslations("Dashboard");
  const [publicationTipButton, setPublicationTipButton] = useState(false);
  const setOpenLastPublication = useSetRecoilState(openLastPublicationState);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isPublicationHeaderSticky, setIsPublicationHeaderSticky] =
    useState(false);
  useDetectSticky(headerRef, setIsPublicationHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.publications?.length || 0) + 1;
    const newPublication = getDefaultPublication(seed);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        publications: [...userInfo?.publications!, newPublication],
      });
    }
    setOpenLastPublication(true);
  };

  return (
    <div
      className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-indigo-50 to-pink-50 shadow-md rounded-lg z-10 pl-5"
      data-testid="publicationDetailsHeader"
    >
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isPublicationHeaderSticky}
        handleAdd={handleAdd}
        tipButton={publicationTipButton}
        setTipButton={setPublicationTipButton}
        tipsData={tipsPublication}
        title={t("add-publication")}
        heading={t("publication-details")}
      />
    </div>
  );
}
