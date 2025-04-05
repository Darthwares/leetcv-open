import { getDefaultCertificate, tipsCertification } from "@constants/defaults";
import { openLastCertificateState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useMemo, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useDetectSticky } from "@lib/helper/detectSticky";
import HeaderContainer from "@components/headerContainer";

export default function CertificateDetailsHeader() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const setOpenLastCertificate = useSetRecoilState(openLastCertificateState);
  const [certificateTipButton, setCertificateTipButton] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isCertificateHeaderSticky, setIsCertificateHeaderSticky] =
    useState(false);
  const translations = useTranslations("Dashboard");
  const t = useMemo(() => translations, []);
  useDetectSticky(headerRef, setIsCertificateHeaderSticky);

  const defaultCertificate = useMemo(
    () => getDefaultCertificate((userInfo?.certificates?.length ?? 0) + 1),
    [userInfo?.certificates]
  );

  const handleAdd = () => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        certificates: [...(userInfo?.certificates ?? []), defaultCertificate],
      });
    }
    setOpenLastCertificate(true);
  };

  return (
    <div
      className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-indigo-50 to-pink-50 shadow-md rounded-lg z-10 pl-5"
      data-testid="certificateDetailsHeader"
    >
      <HeaderContainer
        headerRef={headerRef}
        isHeaderSticky={isCertificateHeaderSticky}
        handleAdd={handleAdd}
        tipButton={certificateTipButton}
        setTipButton={setCertificateTipButton}
        tipsData={tipsCertification}
        title={t("add-certificate")}
        heading={t("certificate-details")}
      />
    </div>
  );
}
