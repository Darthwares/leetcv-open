import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeFontState } from "@state/state";
import { DateRange } from "./dateRange";
import { Course } from "data/models/Course";
import { generateValidHref } from "@constants/defaults";
import ResumeSectionHeader from "./resumeSectionHeader";

function Courses() {
  const [profileResume] = useRecoilState(profileResumeState);
  const courses = profileResume.courses;
  const t = useTranslations("CourseData");
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <>
      {courses?.length !== 0 && (
        <div data-testid="courses" className="w-full sm:p-0 print:mt-1">
          {courses?.some(() => courses.length > 0) && (
            <ResumeSectionHeader title={t("courses")} />
          )}
          <div className="print:flex print:flex-col print:gap-1">
            {courses?.map((course: Course, id: number) => {
              return (
                <div key={id} className="pl-5">
                  <ol className="relative pl-1 border-l border-gray-200">
                    <li className="mb-2 w-full pl-6 space-y-1">
                      <span className="rounded-icon brand-grad-bg">
                        <img
                          src="/icons/courses.png"
                          alt={`course-${id}`}
                          className="w-[18px]"
                        />
                      </span>
                      <a
                        href={generateValidHref(course.certificateLink)}
                        className={`font-semibold text-gray-900 print:text-sm ${
                          course?.certificateLink
                            ? "hover:text-blue-600 external cursor-pointer"
                            : "cursor-text"
                        } ${selectedFont.className}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {course.name}
                      </a>
                      <p
                        className={`${selectedFont.className} font-semibold text-sm text-gray-500 bg-white rounded-md`}
                      >
                        {course.coursePlatform}
                      </p>
                      <div
                        className={`${selectedFont.className} text-sm font-semibold text-gray-500`}
                      >
                        <span className="flex gap-2">
                          <DateRange
                            id={id}
                            start={course.start}
                            end={course.end}
                            category="courses"
                          />
                        </span>
                      </div>
                      {course.courseId && (
                        <p
                          className={`${selectedFont.className} text-sm font-semibold  text-gray-500`}
                        >
                          {t("courseId")}
                          {course.courseId}
                        </p>
                      )}
                    </li>
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Courses;
