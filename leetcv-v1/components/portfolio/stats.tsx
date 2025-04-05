import React, { useState, useEffect } from "react";
import { profileResumeState } from "@state/state";
import { useRecoilValue } from "recoil";
import { useTranslations } from "next-intl";
import {
  calculateTotalProjects,
  calculateTotalAwards,
} from "@constants/defaults";

interface Stat {
  id: number;
  name: string;
  value: string | number;
}

const Stats: React.FC = () => {
  const resume = useRecoilValue(profileResumeState);
  const t = useTranslations("Portfolio");
  const shortNumber = require("short-number");
  const [yearOrMonth, setYearOrMonth] = useState("");
  const [totalExperience, setTotalExperience] = useState("");

  const resumeExperience = (resume?.yearOfExperience ?? "0,0")
    .split(",")
    .map((num) => {
      const parsedNum = Number(num);
      return isNaN(parsedNum) ? 0 : parsedNum;
    });

  const formatExperience = (experience?: number[]) => {
    if (!experience) return 0;
    const [years = 0, months = 0] = experience ?? [];
    if (typeof years !== "number" || typeof months !== "number") return 0;
    switch (true) {
      case years === 0 && months > 0:
        setYearOrMonth(months > 1 ? t("months") : t("month"));
        return months;
      case months <= 3 && years === 1:
        setYearOrMonth(t("year"));
        return years;
      case months > 3:
        setYearOrMonth(t("years"));
        return `${years}+`;
      default:
        setYearOrMonth(t("years"));
        return years;
    }
  };

  useEffect(() => {
    if (resumeExperience) {
      const experience = formatExperience(resumeExperience);
      setTotalExperience(experience.toString());
    }
  }, [resumeExperience]);

  const totalProjects = calculateTotalProjects(resume?.projects);
  const totalFollowers = resume?.followers ?? 0;
  const totalAwards = calculateTotalAwards(resume?.awards ?? []);

  const stats: Stat[] = [
    { id: 1, name: t("yearsExperience"), value: totalExperience },
    {
      id: 2,
      name: totalProjects > 1 ? t("projectsCompleted") : t("projectCompleted"),
      value: totalProjects,
    },
    { id: 3, name: t("followers"), value: totalFollowers },
    {
      id: 4,
      name: totalAwards > 1 ? t("awardsWon") : t("awardWon"),
      value: totalAwards,
    },
  ].filter((stat) => stat.value !== 0 && stat.value !== "0");

  return (
    <div className="max-w-7xl mx-auto w-full mt-10 lg:mt-16">
      <dl
        className={`${
          stats.length < 4
            ? "flex flex-wrap"
            : "grid grid-cols-2 md:grid-cols-4 gap-5"
        } justify-evenly `}
      >
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center p-6 w-auto">
            <span className="font-bold tracking-tight text-indigo-500 text-4xl lg:text-6xl dark:text-white">
              {stat.name === t("yearsExperience")
                ? stat.value
                : shortNumber(stat.value as number)}
            </span>
            <span className="text-md text-center lg:text-lg font-semibold leading-6 text-indigo-500 dark:text-white">
              {stat.name === t("yearsExperience") && (
                <span>
                  {yearOrMonth} {t("of")}{" "}
                </span>
              )}
              {stat.name}
            </span>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
