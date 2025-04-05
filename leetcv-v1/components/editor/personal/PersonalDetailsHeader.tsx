import ShowStickyProgress from "@components/showStickyProgress";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

const PersonalDetailsHeader = () => {
  const [personalHeader, setPersonalHeader] = useState(false);
  const t = useTranslations("Dashboard");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = 250;
      setPersonalHeader(scrollTop > height);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="headerDetails flex justify-between"
      data-testid="personalDetailsHeader"
    >
      <div className="my-2 items-center">
        <span className="text-lg font-medium" data-testid="personal-details">
          {t("header")}
        </span>
      </div>
      <ShowStickyProgress sticky={personalHeader} />
    </div>
  );
};

export default PersonalDetailsHeader;
