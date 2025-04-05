import { useTranslations } from "next-intl";
import ReUsableWatchVideoBanner from "@components/reUsableWatchVideoBanner";
import ReUsableTransitionModal from "@components/reUsableTransitionModal";
import React, { useState } from "react";

const AIResumeVideo = () => {
  const t = useTranslations("Wizard");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bottom-0 pb-5">
        <div className="mx-auto max-w-7xl">
          <div className="sm:hidden block">
            <ReUsableWatchVideoBanner
              title={t("howItWorks")}
              setIsOpen={setIsOpen}
            />
          </div>
          <div className="sm:block hidden">
            <ReUsableWatchVideoBanner
              title={t("bigAnnouncements")}
              setIsOpen={setIsOpen}
            />
          </div>
        </div>
      </div>
      <ReUsableTransitionModal
        src="https://www.youtube.com/embed/9KpjnKiyJS0?autoplay=1&mute=1"
        title={t("aiResumeFeature")}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};

export default AIResumeVideo;
