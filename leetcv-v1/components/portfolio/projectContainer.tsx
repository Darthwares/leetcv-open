import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { useRecoilValue } from "recoil";
import { profileResumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { Project } from "data/models/Project";

export function BentoProjects() {
  const resume = useRecoilValue(profileResumeState);
  const projects = resume.projects;
  const t = useTranslations("Portfolio");
  const filteredProjects = projects.filter((project) => project.work);

  return (
    <>
      {filteredProjects.length > 0 && (
        <section
          id="projects"
          className="py-12 px-6 md:py-16 dark:bg-transparent"
          data-testid="projectContainer"
        >
          <h2
            className="mb-14 text-center font-extrabold tracking-tight text-4xl md:text-5xl text-indigo-900 dark:text-white"
            data-testid="MyProjects"
          >
            {t("projects")}
          </h2>
          {filteredProjects.length === 1 && (
            <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-around">
              <div className="block h-[24rem] w-[24rem]">
                <lottie-player
                  src="/assets/lottie/projectWork.json"
                  speed="1"
                  loop
                  autoplay
                  data-testid="lottie"
                ></lottie-player>
              </div>
              <div className="max-w-sm">
                <BentoGridItem
                  key={filteredProjects[0].id}
                  index={0}
                  project={filteredProjects[0]}
                  className={""}
                />
              </div>
            </div>
          )}
          {filteredProjects.length > 1 && (
            <BentoGrid className="max-w-6xl mx-auto my-10">
              {filteredProjects.map((item: Project, i: number) => (
                <BentoGridItem
                  key={item.id}
                  index={i % 7}
                  project={item}
                  className={i % 7 === 3 || i % 7 === 6 ? "md:col-span-2" : ""}
                />
              ))}
            </BentoGrid>
          )}
        </section>
      )}
    </>
  );
}
