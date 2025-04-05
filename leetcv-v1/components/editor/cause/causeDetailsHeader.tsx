import HeaderDetails from "@components/headerDetails";
import { useTranslations } from "next-intl";
import React from "react";

export default function CauseDetailsHeader() {
  const t = useTranslations("Dashboard");
  return (
    <div
      className="flex justify-between items-center sticky top-0 bg-gradient-to-r from-indigo-50 to-pink-50 shadow-md rounded-lg z-10 pl-5"
      data-testid="causeDetailsHeader"
    >
      <HeaderDetails
        heading={t("causeDetails")}
        title={t("add-award")}
        // select={""}
      />
    </div>
  );
}
