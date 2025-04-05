import { DateRange } from "@components/resume/dateRange";
import { validId } from "@constants/defaults";
import { profileResumeState } from "@state/state";
import { useRecoilValue } from "recoil";
import CardStackUi from "./cardStackUi";

export function Courses() {
  const resume = useRecoilValue(profileResumeState);

  return (
    <>
      {resume.courses?.some(() => true) && (
        <CardStackUi
          id="courses"
          Card={CoursesCard}
          lottiesrc="courses.json"
          dir="flex-row"
        />
      )}
    </>
  );
}

const CoursesCard = () => {
  const resume = useRecoilValue(profileResumeState);
  const isValidUrl = (url: string) => {
    return url.startsWith("https:");
  };
  return (
    <>
      {resume?.courses?.map((item, idx) => (
        <div
          key={item.id}
          className="duration-500 group overflow-hidden rounded bg-indigo-100 p-5 flex flex-col justify-evenly sticky top-10 pt-[1.5em]"
        >
          <div className="relative">
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-violet-100 right-1 -bottom-24"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-200 right-12 bottom-12"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-100 right-1 -top-12"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-24 h-24 bg-purple-100 rounded-full group-hover:-translate-x-12"></div>
            <div className="z-20 flex flex-col justify-evenly w-full h-full">
              <a
                href={
                  isValidUrl(item.certificateLink)
                    ? item.certificateLink
                    : undefined
                }
                target="_blank"
              >
                <div>
                  <p className="text-xl font-bold line-clamp-3 mt-4 mb-2 text-wrap break-words">
                    {item.name}
                  </p>
                  <div className="text-sm text-gray-600">
                    <DateRange
                      id={item.id}
                      start={item.start}
                      end={item.end}
                      checked={false}
                    />
                  </div>
                  <p className="my-4 line-clamp-2 font-bold">
                    {item.coursePlatform}
                  </p>
                  {item.courseId && validId(item.courseId) && (
                    <p className="text-gray-600 line-clamp-2">
                      {item.courseId}
                    </p>
                  )}
                </div>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
