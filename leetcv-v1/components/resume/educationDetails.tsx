import { Education } from "data/models/Education";
import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeReviewState,
  profileResumeState,
  resumeFontState,
  showReviewModal,
} from "@state/state";
import { DateRange } from "./dateRange";
import { AcademicCapIcon } from "@heroicons/react/outline";
import {
  gradeSystem,
  compareStartYearsAndMonthsDesc,
} from "@constants/defaults";
import { useSession } from "next-auth/react";
import CreateReviewButton from "./createReviewButton";
import ResumeSectionHeader from "./resumeSectionHeader";

function EducationDetails() {
  const { status } = useSession();
  const [profileResume] = useRecoilState(profileResumeState);
  const educations = profileResume.educations;
  const t = useTranslations("EducationData");
  const setShowModal = useSetRecoilState(showReviewModal);
  const setActiveReview = useSetRecoilState(activeReviewState);
  const [selectedFont] = useRecoilState(resumeFontState);

  const sortedEducations = educations ? [...educations] : [];

  if (sortedEducations.length > 0) {
    sortedEducations.sort(compareStartYearsAndMonthsDesc);
  }

  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");

  return (
    <>
      {educations?.length !== 0 && (
        <div data-testid="educations" className="w-full sm:p-0 print:mt-1">
          {educations?.some(() => educations.length > 0) && (
            <ResumeSectionHeader title={t("education")} />
          )}
          {sortedEducations?.map((edu: Education, id: number) => {
            return (
              <div className="flex items-start justify-between pl-5" key={id}>
                <ol className="relative pl-1 border-l border-gray-300">
                  <li className="mb-2 ml-6">
                    <span className="rounded-icon brand-grad-bg">
                      <AcademicCapIcon className="w-4" />
                    </span>
                    <div className="space-y-1">
                      <h5
                        className={`${selectedFont.className} font-semibold text-gray-900 capitalize print:text-sm`}
                      >
                        {edu.degree}
                      </h5>
                      <p
                        className={`${selectedFont.className} text-gray-600 text-sm bg-white rounded-md capitalize font-semibold`}
                      >
                        {edu.name}
                      </p>
                      <div
                        className={`${selectedFont.className} text-sm font-semibold  text-gray-500`}
                      >
                        <DateRange
                          id={id}
                          start={edu.start}
                          end={edu.end}
                          category="educations"
                        />
                      </div>
                      <p
                        className={`${selectedFont.className} text-gray-600 text-sm bg-white rounded-md capitalize font-semibold`}
                      >
                        {edu.major}
                      </p>
                      {edu.grade && (
                        <p
                          className={`${selectedFont.className} text-gray-600 text-sm bg-white rounded-md capitalize font-semibold`}
                        >
                          {t("score")} - {gradeSystem(edu.grade)}
                        </p>
                      )}
                    </div>
                  </li>
                </ol>
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
                          document: "Educations-Review",
                          headingTitle: edu.name,
                          title: "Educations",
                        });
                      }}
                    />
                  )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
export default EducationDetails;
