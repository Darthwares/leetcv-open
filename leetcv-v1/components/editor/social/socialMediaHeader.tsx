import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import { openLastSocialState, resumeState } from "@state/state";
import { getDefaultSocialMedia } from "@constants/defaults";
import { useRef, useState } from "react";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function SocialMediaHeader() {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastSocial = useSetRecoilState(openLastSocialState);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSocialHeaderSticky, setIsSocialHeaderSticky] = useState(false);
  useDetectSticky(headerRef, setIsSocialHeaderSticky);

  const handleAdd = () => {
    const seed = (userInfo?.socialMedia?.length || 0) + 1;
    const newSocial = getDefaultSocialMedia(seed);
    if (userInfo && userInfo.socialMedia) {
      setUserInfo({
        ...userInfo,
        socialMedia: [...userInfo.socialMedia, newSocial],
      });
      return;
    }
    setUserInfo({
      ...userInfo,
      socialMedia: [newSocial],
    });
    setOpenLastSocial(true);
  };

  return (
    <div className="headerDetails" data-testid="socialDetailsHeader">
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isSocialHeaderSticky}
        handleAdd={handleAdd}
        title={t("add-social")}
        heading={t("social-details")}
      />
    </div>
  );
}
