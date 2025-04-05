import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useProgressPercent } from "@utils/progressPercent";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { Progress } from "../shadcn/components/ui/progress";

const ProgressDemo = () => {
  const { result } = useProgressPercent();
  const t = useTranslations("ProgressBar");
  const [resume] = useRecoilState(resumeState);
  const [resultData, setResultData] = useState({ fieldName: "", weight: 0 });

  useEffect(() => {
    const missingFields = [
      {
        fieldName: t("experiences"),
        title: resume.experiences?.length,
        weight: resume.experiences?.length ? 0 : 10,
      },
      {
        fieldName: t("projects"),
        title: resume.projects?.length,
        weight: resume.projects?.length ? 0 : 10,
      },
      {
        fieldName: t("educations"),
        title: resume.educations?.length,
        weight: resume.educations?.length ? 0 : 10,
      },
      {
        fieldName: t("courses"),
        title: resume.courses?.length,
        weight: resume.courses?.length ? 0 : 5,
      },
      {
        fieldName: t("certificates"),
        title: resume.certificates?.length,
        weight: resume.certificates?.length ? 0 : 5,
      },
      {
        fieldName: t("publications"),
        title: resume.publications?.length,
        weight: resume.publications?.length ? 0 : 5,
      },
      {
        fieldName: t("awards"),
        title: resume.awards?.length,
        weight: resume.awards?.length ? 0 : 10,
      },
      {
        fieldName: t("languages"),
        title: resume.languages?.length,
        weight: resume.languages?.length ? 0 : 10,
      },
      {
        fieldName: t("socialMedia"),
        title: resume.socialMedia?.length,
        weight: resume.socialMedia?.length ? 0 : 10,
      },
    ];
    let emptyState: any = [];
    missingFields.forEach(function (obj) {
      if (!obj.title) {
        emptyState.push(obj);
      }
    });
    setResultData(emptyState[0]);
  }, [resume]);

  return (
    <div data-testid="progress-bar">
      <div className="flex md:flex-row pb-2 flex-col md:items-center justify-between">
        <p data-testid="progress-bar-percentage">
          {t("profileCompletion")}
          {result}
          {t("percentage")}
        </p>
        {resultData && (
          <div className="pb-2 hidden md:flex md:mb-0 text-sm gap-2 items-center justify-start">
            <span className="bg-green-200 px-1 rounded-sm py-0.5 text-green-900 font-medium">
              +{resultData?.weight}%
            </span>
            <a
              href={`#${resultData?.fieldName}`}
              className="hover:text-indigo-500"
            >
              {t("add")} {resultData?.fieldName}
            </a>
          </div>
        )}
      </div>
      <Progress value={result} className="h-1.5" />
      {resultData && (
        <div className="mt-2 md:hidden md:mb-0 text-sm flex gap-2 items-center justify-start">
          <span className="bg-green-200 px-1 rounded-sm py-0.5 text-green-900 font-medium">
            +{resultData?.weight}%
          </span>
          <a
            href={`#${resultData?.fieldName}`}
            className="hover:text-indigo-500"
          >
            {t("add")} {resultData?.fieldName}
          </a>
        </div>
      )}
    </div>
  );
};

export default ProgressDemo;
