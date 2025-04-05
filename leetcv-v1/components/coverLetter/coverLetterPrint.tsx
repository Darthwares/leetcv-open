import React from "react";
import { Letter } from "./previousDrafts";
import ReactMarkdown from "react-markdown";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import { resumeState } from "@state/state";
import { convertTimestamp } from "@constants/defaults";

const CoverLetterEditor = dynamic(() => import("./coverLetterEditor"), {
  ssr: false,
});

type CoverLetterPrintProps = {
  selectedLetter: Letter;
  isEditing: boolean;
  jobTitleVisible: boolean;
};

const CoverLetterPrint = ({
  selectedLetter,
  isEditing,
  jobTitleVisible,
}: CoverLetterPrintProps) => {
  const t = useTranslations("CoverLetter");
  const userInfo = useRecoilValue(resumeState);

  return (
    <div className="relative print:min-h-[85vh] print:max-h-[85vh]">
      <div className="border-b-2 border-gray-600 pb-4 mb-8 hidden print:block">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h2 className="font-semibold text-2xl">{userInfo.displayName}</h2>
            <h3 className="font-semibold text-xl text-gray-700">
              {selectedLetter.jobPosition}
            </h3>
          </div>
          <div className="space-y-1.5">
            {userInfo.phoneNumber && (
              <p>
                <span className="font-bold mr-1.5">{t("phone")}</span>{" "}
                {userInfo.phoneNumber}
              </p>
            )}
            {userInfo.email && (
              <p>
                <span className="font-bold mr-1.5">{t("email")}</span>
                {userInfo.email}
              </p>
            )}
            {userInfo.address && (
              <p>
                <span className="font-bold mr-1.5">{t("address")}</span>
                {userInfo.address}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="font-semibold hidden print:block">
        {convertTimestamp(selectedLetter.createdAt)}
      </p>
      <div className="space-y-5">
        {jobTitleVisible && (
          <h2 className="w-full text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl print:hidden">
            {selectedLetter.jobPosition}
          </h2>
        )}
        {isEditing ? (
          <CoverLetterEditor
            markdownData={selectedLetter.coverLetter}
            placeholder={t("coverLetter")}
          />
        ) : (
          <ReactMarkdown>{selectedLetter.coverLetter}</ReactMarkdown>
        )}
      </div>
      <div className="w-20 hidden print:block absolute bottom-0 right-0">
        <img src="/logo.png" alt="leetCV logo" className="w-full h-full" />
      </div>
    </div>
  );
};

export default CoverLetterPrint;
