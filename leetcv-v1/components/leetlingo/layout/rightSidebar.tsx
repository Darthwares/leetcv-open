import { useRecoilState, useSetRecoilState } from "recoil";
import { gemsState, livesState, resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useEffect } from "react";
import MetricsBar from "./metricsBar";
import { useRouter } from "next/router";
import ImageFallBack from "@components/imageFallBack";

const RightSidebar = () => {
  const setLives = useSetRecoilState(livesState);
  const setGems = useSetRecoilState(gemsState);
  const [userId] = useRecoilState(userIdState);
  const router = useRouter();
  const [resume] = useRecoilState(resumeState);

  const { data: courseLives } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseLives", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const { data: courseGems } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseGems", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    if (courseLives) {
      setLives(courseLives.live);
    }
    if (courseGems) {
      setGems(courseGems.gems);
    }
  }, [courseLives, courseGems]);

  return (
    <div className="hidden lg:flex sticky h-full top-14 right-0 xl:right-32 flex-col bg-white pt-2 space-y-4 w-[23rem]">
      <MetricsBar />
      <div className="hidden lg:block">
        <div
          className="border border-gray-300 px-4 py-6 rounded-xl cursor-pointer"
          onClick={() => router.push(`/s/course/profile/${resume.handle}`)}
        >
          <div className="flex items-center justify-between">
            <p className="font-bold pb-3 text-lg">Visit Profile</p>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium relative -top-1">
              View Profile
            </button>
          </div>
          <div className="flex items-center gap-6">
            <ImageFallBack
              imgSrc={resume.image ?? ""}
              fallBackText={resume.displayName ?? ""}
              avatarClass="w-12 h-12 rounded-full"
              avatarImgClass="w-full h-full rounded-full overflow-hidden border-gray-200 bg-indigo-100"
              avatarFallbackClass="w-12 h-12 text-white rounded-full text-lg"
            />
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                Visit your profile to track your progress
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
