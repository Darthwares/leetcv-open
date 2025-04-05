// src/components/ProjectContent.tsx
import React from "react";
import { Project } from "data/models/Project";
import { useRecoilState } from "recoil";
import ProjectSkills from "../projectSkills";
import { DateRange } from "./dateRange";
import ProjectImageCarousel from "@components/editor/project/projectImageCarousel";
import { useSession } from "next-auth/react";
import Avatar from "./avatar";
import CreateReviewButton from "./createReviewButton";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  determineHighlightOrFadeClass,
  formatMarkdown,
  generateValidHref,
} from "@constants/defaults";
import MarkdownWithTextColor from "@components/markdownWithTextColor";
import ActionButtons from "./actionButtons";
import AiRefineButton from "@components/aiRefineButton";
import AiRefineSkeleton from "@components/aiRefineSkeleton";
import { motion, AnimatePresence } from "framer-motion";
import {
  acceptedDescriptionsState,
  resumeFontState,
  selectedSkillState,
} from "@state/state";
import { BaseContentProps } from "types/dashboardTypes";

interface ProjectWithMatchCount extends Project {
  matchCount: number;
}

interface ProjectContentProps extends BaseContentProps {
  sortedProjects: ProjectWithMatchCount[];
  generatedDescriptions: { [key: string]: string };
  attestedRequest: any;
}

const ProjectContent = ({
  isPrinting,
  sortedProjects,
  generatedDescriptions,
  attestedRequest,
  basePath,
  setShowModal,
  setActiveReview,
  loadingExperienceId,
  currentId,
  refreshExperience,
  setCurrentId,
  keepChanges,
  discardChanges,
}: ProjectContentProps) => {
  const { status } = useSession();
  const [selectedSkillList] = useRecoilState(selectedSkillState);
  const [selectedFont] = useRecoilState(resumeFontState);
  const [acceptedDescriptions] = useRecoilState(acceptedDescriptionsState);
  const isMatchedProjects = sortedProjects?.some(
    (project) => project.matchCount > 0
  );

  return (
    <div className="project">
      <VerticalTimeline layout="1-column-left" animate={isPrinting}>
        <AnimatePresence>
          {sortedProjects?.map((project: any, id: number) => {
            const markdownContent = generatedDescriptions[project.id]
              ? acceptedDescriptions
                ? formatMarkdown(project.work)
                : formatMarkdown(generatedDescriptions[project.id])
              : formatMarkdown(project.work);

            const attestedRequestList = attestedRequest.filter(
              (req: any) => req?.project?.name === project?.name
            );

            const highlightOrFadeStyle = determineHighlightOrFadeClass(
              project.matchCount,
              isMatchedProjects
            );

            return (
              <React.Fragment key={project.id}>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work relative -z-1"
                  iconStyle={{
                    background: "#5F56E7",
                    color: "#fff",
                  }}
                >
                  <div className="">
                    <motion.div
                      className={highlightOrFadeStyle}
                      key={id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="flex vertical-timeline-element-title items-center justify-between font-bold text-gray-700">
                        <div className="">
                          {project.url ? (
                            <a
                              href={generateValidHref(project.url)}
                              className={`external gap-2 text-xl capitalize items-start font-semibold hover:underline-offset-4 ${
                                project.url
                                  ? "hover:text-blue-600 cursor-pointer"
                                  : ""
                              } ${selectedFont.className}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {project.name}
                            </a>
                          ) : (
                            <p
                              className={` ${selectedFont.className} text-xl capitalize font-semibold`}
                            >
                              {project.name}
                            </p>
                          )}
                        </div>
                        {location.pathname !== "/" &&
                          location.pathname !== "/s/resume" &&
                          location.pathname !== "/s/aiResume" &&
                          location.pathname !== "/s/resumeIdeas" &&
                          location.pathname !== "/s/convert" &&
                          basePath !== "/openai/resume" &&
                          status === "authenticated" && (
                            <CreateReviewButton
                              onClick={() => {
                                setShowModal(true);
                                setActiveReview({
                                  document: "Projects-Review",
                                  headingTitle: project.name,
                                  title: "Projects",
                                });
                              }}
                            />
                          )}
                      </div>
                      {project.company && (
                        <h4 className="vertical-timeline-element-subtitle">
                          <span className="inline-flex flex-col md:flex-row gap-1 text-sm md:justify-start font-semibold text-gray-700">
                            <span
                              className={`${selectedFont.className} text-gray-600 text-sm capitalize`}
                            >
                              {project.company}
                            </span>
                          </span>
                        </h4>
                      )}

                      <h4
                        className={`${selectedFont.className} vertical-timeline-element-subtitle text-gray-700`}
                      >
                        <DateRange
                          id={id}
                          start={project.start}
                          end={project.end}
                          checked={project.checked}
                        />
                      </h4>

                      <div className="pt-2 print:pt-5">
                        {project?.skills?.length !== 0 && (
                          <ProjectSkills skills={[...project?.skills]} />
                        )}
                      </div>
                      <div className="pt-3 print:pt-2">
                        {loadingExperienceId === project.id ? (
                          <AiRefineSkeleton />
                        ) : (
                          <div className="relative">
                            <div className="showWorkImpact">
                              <div className="hidden md:block"></div>
                              {markdownContent && (
                                <div
                                  className={` ${selectedFont.className} w-full pt-2 sm:pb-2 pl-2 sm:px-4`}
                                >
                                  <MarkdownWithTextColor
                                    content={markdownContent}
                                  />
                                </div>
                              )}
                            </div>
                            {location.pathname === "/s/resume" &&
                              (!isMatchedProjects ||
                                project.matchCount > 0) && (
                                <div className="absolute -top-7 lg:-top-5 right-0">
                                  {project?.id !== currentId &&
                                  !acceptedDescriptions ? (
                                    <div className="flex justify-end w-full sm:w-auto mt-2 md:mt-2.5 mb-1 lg:mt-0 md:mb-0 print:mt-0 print:mb-0">
                                      <AiRefineButton
                                        handleRefine={() => {
                                          refreshExperience(
                                            project.id,
                                            project.title,
                                            project.work
                                          );
                                        }}
                                      />
                                    </div>
                                  ) : (
                                    <ActionButtons
                                      setCurrentId={setCurrentId}
                                      keepChanges={keepChanges}
                                      discardChanges={discardChanges}
                                      id={project.id}
                                    />
                                  )}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                      {project?.uploadedImages?.length > 0 &&
                        (project.matchCount > 0 ||
                          selectedSkillList.length === 0) && (
                          <>
                            <div
                              className={`flex w-full justify-start items-center print:hidden`}
                            >
                              <ProjectImageCarousel
                                uniqueUploadedImages={[
                                  ...new Set(
                                    project?.uploadedImages as string[]
                                  ),
                                ]}
                                project={project}
                              />
                            </div>
                          </>
                        )}
                      {attestedRequestList.length > 0 && (
                        <div className="flex print:hidden gap-3 py-5 sm:px-3">
                          <Avatar project={project} />
                        </div>
                      )}
                    </motion.div>
                  </div>
                </VerticalTimelineElement>
              </React.Fragment>
            );
          })}
        </AnimatePresence>
      </VerticalTimeline>
    </div>
  );
};

export default ProjectContent;
