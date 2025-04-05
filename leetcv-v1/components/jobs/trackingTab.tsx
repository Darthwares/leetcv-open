import React, { useCallback, useEffect, useState } from "react";
import JobsCard from "./jobsCard";
import { useRecoilState } from "recoil";
import { trackedJobs, userIdState } from "@state/state";
import { Job } from "types/dashboardTypes";
import { trpc } from "@utils/trpc";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { checkIfFreeUser, colorFullSkills } from "@constants/defaults";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "shadcn/components/ui/button";
import { useSession } from "next-auth/react";
import UpgradePlanBanner from "@components/resume/review/upgradePlanBanner";
import JobDetails from "./jobDetails";
import LoadMore from "./loadMore";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";

interface TrackingTabProps {
  jobs: Job[];
}

export default function TrackingTab({ jobs }: TrackingTabProps) {
  const t = useTranslations("Jobs");

  const [trackedJobsList, setTrackedJobsList] = useRecoilState(trackedJobs);
  const [userId] = useRecoilState(userIdState);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteTrackedJob = trpc.useMutation([
    "fs.aiJobListingRouter.deleteTrackedJob",
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]);

  const { status } = useSession();
  const { data: isPremiumMember } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });
  const isFreeUser = checkIfFreeUser(isPremiumMember);

  const { data: getAllTrackedJobs, isLoading } = trpc.useQuery([
    "fs.aiJobListingRouter.getTrackedJobs",
  ]);
  const setTrackedAppliedJobs = trpc.useMutation([
    "fs.aiJobListingRouter.trackedAppliedJobs",
  ]);

  useEffect(() => {
    if (getAllTrackedJobs && !isLoading) {
      setTrackedJobsList(getAllTrackedJobs);
    }
  }, [getAllTrackedJobs, isLoading, setTrackedJobsList]);

  const removeTrackingJob = useCallback(
    (jobId: string, companyName: string) => {
      if (jobId !== null) {
        deleteTrackedJob.mutate(
          {
            userId: userId,
            jobId,
            companyName,
          },
          {
            onSuccess: () => {
              setTrackedJobsList((prevJobs) =>
                prevJobs.filter((job) => job.jobId !== jobId)
              );
              toast.success("Track Job deleted successfully.");
            },
            onError: (error) => {
              toast.error("something went wrong. Please try again later.");
            },
          }
        );
      }
    },
    [deleteTrackedJob, userId]
  );

  useEffect(() => {
    setVisibleJobs(trackedJobsList?.slice(0, jobsPerPage));
  }, [trackedJobsList]);

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  const handleLoadMore = () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    const endIndex = nextPage * jobsPerPage;
    setTimeout(() => {
      setVisibleJobs(trackedJobsList.slice(0, endIndex));
      setCurrentPage(nextPage);
      setLoading(false);
    }, 500);
  };

  const handleAppliedTrackJob = async (job: Job) => {
    try {
      setTrackedAppliedJobs.mutate({
        jobDetails: {
          companyName: job.companyName,
          description: job.description,
          endDate: job.endDate ?? "",
          jobUrl: job.jobUrl,
          jobTitle: job.jobTitle,
          jobId: job.jobId!,
          location: job.location,
          startDate: job.startDate ?? "",
          status: job.status,
          yearsOfExperience: job.yearsOfExperience,
          skills: job.skills,
        },
      });

      track("ClickOnApplyJob", {
        jobTitle: job.jobTitle,
        company: job.companyName,
        location: job.location,
        url: job.jobUrl,
      });
    } catch (error) {
      toast.error(t("somethingWrong"));
    }
  };

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="space-y-6">
      {jobs.length > 0 ? (
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            {t("recommendedJobs")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
            {jobs.map((job, id) => (
              <JobsCard
                key={id}
                job={job}
                onViewJob={() => handleViewJob(job)}
                handleAppliedTrackJob={handleAppliedTrackJob}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        {jobs.length > 0 ? (
          <h2 className="text-2xl font-semibold mb-4">{t("trackedJobs")}</h2>
        ) : null}

        {isLoading ? (
          <p>{t("loadingTrackedJobs")}</p>
        ) : trackedJobsList.length === 0 ? (
          <>
            <div className="max-w-7xl w-full text-center flex flex-col lg:flex-row items-center gap-10 md:gap-20">
              <div className="w-full">
                <h2 className="mt-4 text-xl font-semibold text-gray-700 md:text-2xl">
                  {t("noTrackedJob")}
                </h2>
                <p className="mt-2 text-gray-500">
                  {t("trackedJobsListMessage")}
                </p>
              </div>
              <div className="sm:h-96 w-full">
                <lottie-player
                  src="/assets/lottie/no-track.json"
                  background=""
                  speed="1"
                  loop
                  autoplay
                  className="bg-gradient-to-r from-indigo-100 to-pink-200"
                ></lottie-player>
              </div>
            </div>
          </>
        ) : (
          <>
            {isFreeUser ? (
              <div className="mt-10">
                <UpgradePlanBanner
                  title={t("upgradeTitle")}
                  description={t("upgradeDesc")}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
                {visibleJobs.map((job, id) => (
                  <JobsCard
                    key={id}
                    job={job}
                    onRemoveTracking={() =>
                      removeTrackingJob(job.jobId, job.companyName)
                    }
                    showRemoveButton={job.status === "delisted"}
                    onViewJob={() => handleViewJob(job)}
                    handleAppliedTrackJob={handleAppliedTrackJob}
                  />
                ))}
              </div>
            )}
            {trackedJobsList.length > 4 && (
              <LoadMore
                isFreeUser={isFreeUser}
                loading={loading}
                handleLoadMore={handleLoadMore}
                jobs={trackedJobsList.length}
                visibleJobs={visibleJobs.length}
              />
            )}
          </>
        )}
      </section>
      {isModalOpen && (
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setIsModalOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30 transition-all duration-200" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="space-y-2 p-4 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm relative">
                      <JobDetails job={selectedJob!} />
                      <p className="text-left text-sm font-medium pt-2">
                        {t("requiredSkills")}
                      </p>
                      <div className="flex flex-col justify-between items-center">
                        <div className="flex gap-2 flex-wrap text-left items-center rounded-md py-2 w-full print:w-full print:flex-wrap">
                          {selectedJob?.skills?.map((skill, id) => {
                            const { border, rgb } = colorFullSkills(skill);
                            return (
                              <div key={id}>
                                <p
                                  className={`flex items-center justify-center px-2 text-xs text-gray-700 bg-white border rounded-md shadow-sm md:py-1 md:text-xs md:px-2 project-skills-chip py-1 text-left font-semibold cursor-default`}
                                  style={{
                                    background: `${rgb}`,
                                    borderColor: `${border}`,
                                  }}
                                >
                                  <span className="text-sm whitespace-wrap">
                                    {skill}
                                  </span>
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      {selectedJob?.description && (
                        <p className="pt-2 text-sm">
                          {selectedJob?.description ?? "NA"}
                        </p>
                      )}
                    </div>
                    <div className="mt-5 flex items-center gap-3 justify-between">
                      {selectedJob?.status === "delisted" ? (
                        <Button
                          className={`w-full sm:max-w-fit flex gap-1 whitespace-nowrap cursor-not-allowed bg-indigo-300 text-white hover:bg-indigo-300`}
                          disabled={selectedJob?.status === "delisted"}
                          onClick={() => handleAppliedTrackJob(selectedJob!)}
                        >
                          {t("applyNowButton")}
                          <span>
                            {" "}
                            <ExternalLinkIcon className="w-5 h-5" />{" "}
                          </span>
                        </Button>
                      ) : (
                        <a
                          href={selectedJob?.jobUrl}
                          target="_blank"
                          className="w-full flex justify-start"
                          rel="noopener noreferrer"
                        >
                          <Button
                            className={`w-full sm:max-w-fit flex gap-1 whitespace-nowrap bg-indigo-600 text-white hover:bg-indigo-500`}
                            onClick={() => handleAppliedTrackJob(selectedJob!)}
                          >
                            {t("applyNowButton")}
                            <span>
                              {" "}
                              <ExternalLinkIcon className="w-5 h-5" />{" "}
                            </span>
                          </Button>
                        </a>
                      )}

                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setIsModalOpen(false)}
                      >
                        {t("closeButton")}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
      <ToastContainer />
    </div>
  );
}
