import { useTranslations } from "next-intl";
import React, { useState } from "react";
import ReUsableTransitionModal from "@components/reUsableTransitionModal";
import ReUsableWatchVideoBanner from "@components/reUsableWatchVideoBanner";

const ConvertBanner = () => {
  const t = useTranslations("Convert");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ReUsableWatchVideoBanner
        title={t("convertYourLinkedIn")}
        setIsOpen={setIsOpen}
      />
      <ReUsableTransitionModal
        src="https://www.youtube.com/embed/H8xKj5n3QnU?si=uT2CJ7iTziJHiZIb?autoplay=1&mute=1"
        title={t("modalTitle")}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default ConvertBanner;
