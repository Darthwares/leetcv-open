import React from "react";
import JobDetails from "./jobDetails";
import { Button } from "shadcn/components/ui/button";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import IsFreeUserCard from "./isFreeUserCard";
import LoadMore from "./loadMore";
import { Job } from "types/dashboardTypes";
import ConfirmationModal from "./confirmationModal";

interface MobileViewCardProps {
  loading: boolean;
  jobs: number;
  visibleJobs: Job[];
  handleLoadMore: () => void;
  handleTrackJob: (job: Job) => void;
  handleAppliedTrackJob: (job: Job) => void;
  isFreeUser: boolean;
  setShowModal: (value: boolean) => void;
  showModal: boolean;
}

const MobileViewCard = ({
  loading,
  jobs,
  visibleJobs,
  setShowModal,
  handleLoadMore,
  handleTrackJob,
  handleAppliedTrackJob,
  isFreeUser,
  showModal,
}: MobileViewCardProps) => {
  return (
    <div className="space-y-4">
      {visibleJobs?.map((job: any, index: number) => (
        <div
          key={index}
          className="space-y-2 p-4 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm relative"
        >
          <JobDetails job={job} />
          {job?.description && (
            <p className="pt-2 line-clamp-0 sm:line-clamp-4 text-sm">
              {job?.description ?? "NA"}
            </p>
          )}
          <div className="flex w-full items-center pt-5 gap-3 justify-between">
            <a
              href={job.jobUrl}
              target="_blank"
              className="w-full flex justify-start"
            >
              <Button
                className={`w-full sm:max-w-fit flex gap-1 ${
                  job.status === "delisted"
                    ? "bg-indigo-300 text-white cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white"
                } whitespace-nowrap`}
                disabled={job.status === "delisted"}
                onClick={() => {
                  handleAppliedTrackJob(job);
                }}
              >
                Apply Now
                <span>
                  {" "}
                  <ExternalLinkIcon className="w-5 h-5" />{" "}
                </span>
              </Button>
            </a>
            <>
              {!isFreeUser && (
                <Button
                  className={`w-full text-sm
                    whitespace-nowrap`}
                  onClick={() => {
                    handleTrackJob(job);
                  }}
                  variant="outline"
                >
                  Track Job
                </Button>
              )}
            </>
          </div>
        </div>
      ))}
      <IsFreeUserCard
        isFreeUser={isFreeUser}
        src={"/assets/mobile-blur.png"}
        className="-mt-10"
      />
      <LoadMore
        isFreeUser={isFreeUser}
        loading={loading}
        handleLoadMore={handleLoadMore}
        jobs={jobs}
        visibleJobs={visibleJobs.length}
      />
      <ConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Job Already Tracked"
        description="You are already tracking this job."
        cancelText="Close"
        showDelete={false}
      />
    </div>
  );
};

export default MobileViewCard;
