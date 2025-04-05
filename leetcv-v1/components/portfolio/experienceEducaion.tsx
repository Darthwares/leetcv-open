import { profileResumeState } from "@state/state";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  checkExperienceDetails,
  portfolioTimelinetabs,
} from "@constants/defaults";
import PortfolioTimeline from "./portfolioTimeline";

const ExperienceEducation = () => {
  const resume = useRecoilValue(profileResumeState);
  const [data, setData] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string>("");
  const t = useTranslations("Portfolio");
  const hasExperiences = checkExperienceDetails(resume.experiences ?? []);
  const hasEducations = resume.educations?.length! > 0;

  useEffect(() => {
    if (hasExperiences && hasEducations) {
      setData(true);
      setActiveField("Experience");
    } else if (hasExperiences) {
      setData(false);
      setActiveField("Experience");
    } else if (hasEducations) {
      setData(false);
      setActiveField("Education");
    }
  }, [resume]);

  if (!hasExperiences && !hasEducations) {
    return null;
  }

  return (
    <section
      id="experiences"
      className="bg-indigo-50 py-12 px-5 md:py-16 dark:bg-transparent"
    >
      {data && (
        <div className="flex justify-center w-full">
          <div
            className={cn(
              "flex flex-row items-center justify-start bg-white relative [perspective:1000px] px-2 py-1.5  rounded-full overflow-auto dark:bg-zinc-900"
            )}
          >
            {portfolioTimelinetabs.map((tab, idx) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveField(tab.label);
                }}
                className={"relative px-6 py-3 rounded-[50px]"}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {activeField === tab.label && (
                  <motion.div
                    layoutId="clickedbutton"
                    transition={{
                      type: "spring",
                      bounce: 0.3,
                      duration: 0.8,
                    }}
                    className={
                      "absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-800 rounded-full dark:bg-gradientto-r dark:from-indigo-950 dark:to-zinc-600"
                    }
                  />
                )}
                <span
                  className={`relative block ${
                    activeField === tab.label
                      ? "text-white "
                      : " text-indigo-600"
                  } dark:text-white `}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {!data && hasExperiences && (
        <h2 className="text-4xl md:text-5xl text-center font-extrabold tracking-tight text-indigo-900 mb-14 dark:text-gray-300">
          {t("experience")}
        </h2>
      )}
      {!data && hasEducations && (
        <h2 className="text-4xl md:text-5xl text-center font-extrabold tracking-tight text-indigo-900 mb-14 dark:text-gray-300">
          {t("education")}
        </h2>
      )}
      {activeField && activeField === "Experience" && (
        <PortfolioTimeline field={"Experience"} />
      )}
      {activeField && activeField === "Education" && (
        <PortfolioTimeline field={"Education"} />
      )}
    </section>
  );
};

export default ExperienceEducation;
