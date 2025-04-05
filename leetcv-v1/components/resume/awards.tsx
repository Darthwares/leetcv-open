import { Award } from "data/models/Award";
import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeReviewState,
  profileResumeState,
  resumeColorState,
  resumeFontState,
  showReviewModal,
} from "@state/state";
import { DateRange } from "./dateRange";
import { SparklesIcon } from "@heroicons/react/outline";
import CreateReviewButton from "./createReviewButton";
import ResumeSectionHeader from "./resumeSectionHeader";

function Awards() {
  const [profileResume] = useRecoilState(profileResumeState);
  const awards = profileResume.awards;
  const t = useTranslations("Awards");
  const setShowModal = useSetRecoilState(showReviewModal);
  const setActiveReview = useSetRecoilState(activeReviewState);
  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");
  const [selectedFont] = useRecoilState(resumeFontState);

  if (awards?.length === 0) {
    return null;
  }
  return (
    <div data-testid="award">
      {awards?.length !== 0 && (
        <div data-testid={"award"} className="print:mt-1">
          {awards?.some(
            (award) =>
              award?.name &&
              award?.awardFor &&
              award?.date &&
              award?.description
          ) && <ResumeSectionHeader title={t("title")} />}

          {awards?.map((award: Award, id: number) => {
            if (
              award.awardFor &&
              award.name &&
              award.description &&
              award.date
            ) {
              return (
                <div
                  key={id}
                  className="flex items-start justify-between pl-5"
                  data-testid={`awardFor${id}`}
                >
                  <ol className="relative pl-1 border-l border-gray-300">
                    <li className="mb-2 ml-6 space-y-1">
                      <span className="rounded-icon brand-grad-bg">
                        <SparklesIcon className="w-4" />
                      </span>
                      <div className="md:flex md:flex-col">
                        <h5
                          className={`${selectedFont.className} font-semibold flex justify-between text-gray-900 hover:text-gray-700 text-base`}
                        >
                          <span>
                            <span className="capitalize">{award.name[0]}</span>
                            {award.name.slice(1)}
                          </span>
                        </h5>
                        <p
                          className={`${selectedFont.className} pt-[2px] text-sm font-semibold text-gray-600 pb-1`}
                        >
                          <span className="capitalize">{award.awardFor[0]}</span>
                          {award.awardFor.slice(1)}
                        
                        </p>
                      </div>
                      <time
                        className={`${selectedFont.className} mb-3 py-2 text-sm font-semibold leading-none text-gray-500`}
                      >
                        <DateRange
                          id={id}
                          start={award.date}
                          category="awards"
                        />
                      </time>
                      <p
                        className={`${selectedFont.className} tracking-wide mb-2 text-sm text-gray-700 rounded-md pt-2`}
                      >
                        {award.description}
                      </p>
                    </li>
                  </ol>
                  <span className="print:hidden pt-1.5">
                    {location.pathname !== "/" &&
                      location.pathname !== "/s/resume" &&
                      location.pathname !== "/s/convert" &&
                      location.pathname !== "/s/resumeIdeas" &&
                      basePath !== "/openai/resume" &&
                      location.pathname !== "/s/aiResume" && (
                        <CreateReviewButton
                          onClick={() => {
                            setShowModal(true);
                            setActiveReview({
                              document: "Awards-Review",
                              headingTitle: award.name,
                              title: "Awards",
                            });
                          }}
                        />
                      )}
                  </span>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}

export default Awards;
