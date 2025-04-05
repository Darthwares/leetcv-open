import RequestResources from "@components/resource/requests";
import { resumeState, sideBarOpenState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ColleagueList from "./colleagueList";
import { getCurrentPage } from "@constants/defaults";
import ReUsablePaginationButtons from "@components/reUsablePaginationButtons";
import { useSession } from "next-auth/react";

const ColleaguesListContainer = () => {
  const [resume] = useRecoilState(resumeState);
  const { status } = useSession();
  const t = useTranslations("Colleagues");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage());
  const screenWidth = window.screen.width;
  const isLgDevice = screenWidth >= 1024 && screenWidth <= 1280;
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const { data: findColleagues, isLoading } = trpc.useQuery(
    [
      "fs.dashboard.getColleagues",
      { userId: resume.id, page: currentPage, isLgDevice },
    ],
    {
      enabled: !!resume.id && status === "authenticated",
    }
  );

  useEffect(() => {
    if (findColleagues?.users) {
      setTotalPages(findColleagues?.totalPages);
    }
  }, [findColleagues?.users]);

  const colleaguesList = findColleagues?.users ?? [];

  return (
    <div className="lg:px-2" data-testid="colleaguesContainer">
      {isLoading ? (
        <div className="min-h-[65vh] md:min-h-[55vh] flex flex-col justify-between">
          <div
            className={`md:mt-0 lg:mt-2 grid gap-6 sm:grid-cols-2 h-full ${
              isSideBarClosed
                ? "lg:grid-cols-3 xl:grid-cols-4"
                : "lg:grid-cols-2 xl:grid-cols-3"
            }`}
          >
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="shadow-sm rounded-lg px-4 py-5 dark:bg-gray-800/20 dark:border-gray-700 bg-gray-50 border border-gray-200 relative animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="flex gap-2 rounded-md">
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                      </div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-end lg:absolute bottom-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {colleaguesList?.length === 0 && (
            <div className="py-6">
              <RequestResources
                title={t("noColleagues")}
                message={t("noColleaguesNow")}
                path={"/assets/lottie/colleagues.json"}
              />
            </div>
          )}
          {colleaguesList?.length !== 0 && (
            <>
              <div className="md:pt-6 md:pb-0">
                <h2 className="hidden md:block text-2xl font-bold">
                  {t("colleagues")}
                </h2>
                <p className="my-4 md:mt-2 text-sm md:text-base leading-6 dark:text-gray-300 text-gray-600 md:pb-5">
                  {t("connectWithColleagues")}
                </p>
              </div>
              {colleaguesList?.length === 0 ? (
                <RequestResources
                  title={t("noColleagues")}
                  message={t("noColleaguesWithThisName")}
                  path={"/assets/lottie/colleagues.json"}
                />
              ) : (
                <div className="min-h-[65vh] md:min-h-[55vh] flex flex-col justify-between">
                  <ul
                    className={`md:mt-0 lg:mt-2 grid gap-6 sm:grid-cols-2 h-full ${
                      isSideBarClosed
                        ? "lg:grid-cols-3 xl:grid-cols-4"
                        : "lg:grid-cols-2 xl:grid-cols-3"
                    }`}
                  >
                    <ColleagueList findColleagues={colleaguesList} />
                  </ul>
                  <div className="mt-12 mb-6 md:mt-16 lg:mt-14">
                    {colleaguesList?.length !== 0 && totalPages !== 1 && (
                      <ReUsablePaginationButtons
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                      />
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ColleaguesListContainer;
