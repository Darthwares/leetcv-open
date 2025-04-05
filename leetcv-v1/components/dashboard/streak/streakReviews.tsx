import { resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { getCurrentPage, getUsersPerPage } from "@constants/defaults";
import StreakSkeleton from "./streakSkeleton";
import { useEffect, useState } from "react";
import ReUsablePaginationButtons from "@components/reUsablePaginationButtons";
import RequestResources from "@components/resource/requests";
import { CardHoverEffect } from "@components/ui/card-hover-effect";

export default function StreakReviews() {
  const [resume] = useRecoilState(resumeState);
  const t = useTranslations("Streak");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage());
  const usersListPerPage = getUsersPerPage(window.innerWidth);

  const { data: publicUserResumes, isLoading } = trpc.useQuery(
    [
      "fs.dashboard.getResumeToReview",
      { userId: resume.id, page: currentPage, limit: usersListPerPage },
    ],
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (publicUserResumes?.list) {
      setTotalPages(publicUserResumes?.totalPages);
    }
  }, [publicUserResumes?.list]);

  return (
    <>
      {publicUserResumes?.list?.length !== 0 && (
        <div className="px-2 md:px-4 py-3 mb-4">
          <h2 className="font-semibold md:text-2xl text-xl mb-2">
            {t("startAReview")}
          </h2>
          <p className="text-gray-700">{t("maintainStreak")}</p>
        </div>
      )}
      {isLoading ? (
        <StreakSkeleton />
      ) : (
        <>
          {publicUserResumes?.list?.length === 0 && (
            <RequestResources
              title={t("noResumesFound")}
              message={t("noResumesNow")}
              path={"/assets/lottie/schedule-planning.json"}
            />
          )}
          <div className="max-w-7xl mx-auto">
            <CardHoverEffect items={publicUserResumes?.list!} />
          </div>
          <div className="mt-12 mb-6 md:mt-16 lg:mt-14">
            {publicUserResumes?.list?.length !== 0 && totalPages !== 1 && (
              <ReUsablePaginationButtons
                totalPages={totalPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
