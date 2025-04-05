import { DateRange } from "./dateRange";
import { useSession } from "next-auth/react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  ExperienceWithMatchCount,
  determineHighlightOrFadeClass,
  formatMarkdown,
} from "@constants/defaults";
import CreateReviewButton from "./createReviewButton";
import MarkdownWithTextColor from "@components/markdownWithTextColor";
import ActionButtons from "./actionButtons";
import AiRefineButton from "@components/aiRefineButton";
import AiRefineSkeleton from "@components/aiRefineSkeleton";
import ProjectSkills from "@components/projectSkills";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { BaseContentProps } from "types/dashboardTypes";
import { useRecoilState } from "recoil";
import { acceptedDescriptionsState, resumeFontState } from "@state/state";

interface ExperienceContentProps extends BaseContentProps {
  sortedExperience: ExperienceWithMatchCount[];
  showModal: boolean;
}

const ExperienceContent = ({
  sortedExperience,
  isPrinting,
  generatedDescriptions,
  basePath,
  setShowModal,
  setActiveReview,
  showModal,
  loadingExperienceId,
  currentId,
  refreshExperience,
  setCurrentId,
  keepChanges,
  discardChanges,
}: ExperienceContentProps) => {
  const { status } = useSession();
  const [selectedFont] = useRecoilState(resumeFontState);
  const [acceptedDescriptions] = useRecoilState(acceptedDescriptionsState);

  const isMatchedExperience = sortedExperience?.some(
    (project) => project.matchCount > 0
  );

  return (
    <div className="experience">
      <VerticalTimeline layout="1-column-left" animate={isPrinting}>
        <AnimatePresence>
          {sortedExperience?.map(
            (exp: ExperienceWithMatchCount, id: number) => {
              const markdownContent = generatedDescriptions[exp.id]
                ? acceptedDescriptions
                  ? formatMarkdown(exp.description!!)
                  : formatMarkdown(generatedDescriptions[exp.id])
                : formatMarkdown(exp.description!);

              if (
                exp.title &&
                exp.company &&
                exp.start &&
                exp.end &&
                exp.description
              ) {
                const highlightOrFadeStyle = determineHighlightOrFadeClass(
                  exp?.matchCount!,
                  isMatchedExperience
                );

                return (
                  <React.Fragment key={exp.id}>
                    <VerticalTimelineElement
                      className="vertical-timeline-element--work relative -z-1"
                      iconStyle={{
                        background: "#5F56E7",
                        color: "#fff",
                      }}
                    >
                      <div>
                        <motion.div
                          className={highlightOrFadeStyle}
                          key={exp.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.7 }}
                        >
                          <div className="flex justify-between">
                            <div>
                              <h3
                                className={`${selectedFont.className} vertical-timeline-element-title text-lg font-semibold text-gray-800 hover:text-gray-700 capitalize`}
                              >
                                {exp.title}
                              </h3>
                              {exp.company && (
                                <h4
                                  className={`${selectedFont.className} vertical-timeline-element-subtitle font-semibold text-sm text-gray-700`}
                                >
                                  {exp.company}
                                </h4>
                              )}

                              {exp.city && (
                                <h4
                                  className={`${selectedFont.className} vertical-timeline-element-subtitle text-gray-700 text-sm`}
                                >
                                  {exp.city}
                                </h4>
                              )}

                              <h4
                                className={`${selectedFont.className} vertical-timeline-element-subtitle text-gray-700`}
                              >
                                <DateRange
                                  id={id}
                                  start={exp.start}
                                  end={exp.end}
                                  checked={exp.checked}
                                />
                              </h4>
                            </div>
                            {location.pathname !== "/" &&
                              location.pathname !== "/s/convert" &&
                              location.pathname !== "/s/resume" &&
                              location.pathname !== "/s/resumeIdeas" &&
                              location.pathname !== "/s/aiResume" &&
                              basePath !== "/openai/resume" &&
                              status === "authenticated" && (
                                <CreateReviewButton
                                  onClick={() => {
                                    setShowModal(!showModal);
                                    setActiveReview({
                                      document: "Experience-Review",
                                      headingTitle: exp.title!,
                                      title: "experiences",
                                    });
                                  }}
                                />
                              )}
                          </div>
                          <div className="pt-2 print:pt-5">
                            {exp?.skills?.length! > 0 && (
                              <ProjectSkills
                                skills={[...(exp?.skills ?? [])]}
                              />
                            )}
                          </div>
                          <div className="pt-3 print:pt-2">
                            {loadingExperienceId === exp.id ? (
                              <AiRefineSkeleton />
                            ) : (
                              <div className="relative">
                                <div className="showWorkImpact">
                                  <div className="hidden md:block bg-gray-300"></div>
                                  {markdownContent && (
                                    <div
                                      className={`${selectedFont.className} w-full print:py-0 sm:pb-2 pt-2 px-2 text-gray-700 sm:px-4`}
                                    >
                                      <MarkdownWithTextColor
                                        content={markdownContent}
                                      />
                                    </div>
                                  )}
                                </div>
                                {location.pathname === "/s/resume" &&
                                  (!isMatchedExperience ||
                                    exp?.matchCount > 0) && (
                                    <div className="absolute -top-7 lg:-top-5 right-0">
                                      {exp?.id !== currentId &&
                                      !acceptedDescriptions ? (
                                        <div className="flex justify-end w-full sm:w-auto mt-2 md:mt-0 print:mt-0 print:mb-0">
                                          <AiRefineButton
                                            handleRefine={() => {
                                              refreshExperience(
                                                exp.id,
                                                exp.title!,
                                                exp.description!
                                              );
                                            }}
                                          />
                                        </div>
                                      ) : (
                                        <ActionButtons
                                          setCurrentId={setCurrentId}
                                          keepChanges={keepChanges}
                                          discardChanges={discardChanges}
                                          id={exp.id}
                                        />
                                      )}
                                    </div>
                                  )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    </VerticalTimelineElement>
                  </React.Fragment>
                );
              }
            }
          )}
        </AnimatePresence>
      </VerticalTimeline>
    </div>
  );
};

export default ExperienceContent;
