import { profileResumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const SkillsData = () => {
  const resume = useRecoilValue(profileResumeState);
  const [skills, setSkills] = useState(resume.skills);
  const t = useTranslations("Portfolio");
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    const projects = resume.projects || [];
    const experiences = resume.experiences || [];

    const projectSkills = projects.flatMap((project) => project.skills || []);
    const experienceSkills = experiences.flatMap((exp) => exp.skills || []);

    const allSkills = [
      ...new Set([...(skills || []), ...projectSkills, ...experienceSkills]),
    ];

    setSkills(allSkills);
  }, [resume]);

  if (!skills || skills.length === 0) return null;

  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center py-8 lg:py-14 bg-indigo-50"
      data-testid="skill-container"
    >
      <div className="w-full max-w-6xl px-8">
        <h2
          className="text-4xl md:text-5xl text-center text-indigo-900 font-extrabold tracking-tight"
          data-testid="header-title"
        >
          {t("skills")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg">{t("skillDesc")}</p>
            <div className="block md:hidden">
              <lottie-player
                src="/assets/lottie/creative-skill.json"
                background=""
                speed="1"
                loop
                autoplay
                data-testid="lottie-player"
                className="bg-gradient-to-r from-indigo-100 to-pink-200"
              ></lottie-player>
            </div>
            <div>
              <div className="flex flex-wrap gap-1">
                {skills
                  ?.slice(0, showMore ? skills.length : 6)
                  .map((skill, index) => (
                    <button
                      className="relative inline-flex items-center justify-center cursor-default p-0.5 mb-1 me-1 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-300 to-indigo-400 group-hover:from-purple-300 group-hover:to-indigo-400 hover:text-white dark:text-white"
                      key={index}
                      data-testid={`skill-${index}`}
                    >
                      <span className="relative px-2 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {skill}
                      </span>
                    </button>
                  ))}

                {skills?.length > 6 && (
                  <button
                    className="relative inline-flex items-center justify-center p-0.5 mb-1 me-1 overflow-hidden text-sm font-medium  rounded-lg group bg-gradient-to-br from-purple-300 to-indigo-400 text-white dark:text-white"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? (
                      <span className="relative flex px-2 py-1.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md">
                        <ChevronLeftIcon className="w-5 h-5" />
                        {t("showLess")}
                      </span>
                    ) : (
                      <span className="relative flex px-2 py-1.5 transition-all ease-in duration-75 dark:bg-gray-900 rounded-md">
                        {t("showMore")}
                        <ChevronRightIcon className="w-5 h-5" />
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <lottie-player
              src="/assets/lottie/creative-skill.json"
              background=""
              speed="1"
              loop
              autoplay
              data-testid="lottie-player"
              className="bg-gradient-to-r from-indigo-100 to-pink-200"
            ></lottie-player>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SkillsData;
