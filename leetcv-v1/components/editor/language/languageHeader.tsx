import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import { openLastLanguageState, resumeState } from "@state/state";
import { getDefaultLanguage } from "@constants/defaults";
import { useRef, useState } from "react";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function LanguageHeader() {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastLanguage = useSetRecoilState(openLastLanguageState);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isLanguageHeaderSticky, setIsLanguageHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsLanguageHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.languages?.length || 0) + 1;
    const newLanguage = getDefaultLanguage(seed);
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        languages: [...userInfo.languages!, newLanguage],
      });
    }
    setOpenLastLanguage(true);
  };

  return (
    <div className="headerDetails" data-testid="languageHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isLanguageHeaderSticky}
        handleAdd={handleAdd}
        title={t("add-language")}
        heading={t("language-details")}
      />
    </div>
  );
}
