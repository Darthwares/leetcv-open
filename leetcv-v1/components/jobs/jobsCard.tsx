import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { Button } from "shadcn/components/ui/button";
import { Job } from "types/dashboardTypes";
import JobDetails from "./jobDetails";
import ConfirmationModal from "./confirmationModal";
import { useTranslations } from "next-intl";

interface JobsCardProps {
  job: Job;
  onRemoveTracking?: () => void;
  onViewJob?: () => void;
  showRemoveButton?: boolean;
  handleAppliedTrackJob: (job: Job) => void;
}

export default function JobsCard({
  job,
  onRemoveTracking,
  onViewJob,
  showRemoveButton,
  handleAppliedTrackJob,
}: JobsCardProps) {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations("Jobs");

  const handleRemoveTracking = () => {
    if (onRemoveTracking) {
      onRemoveTracking();
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-2 p-4 rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm relative">
      <JobDetails job={job} />
      {job?.description && (
        <p className="pt-2 line-clamp-4 text-sm">{job?.description ?? "NA"}</p>
      )}
      <div className="flex w-full items-center gap-3 justify-between pt-5">
        {showRemoveButton && (
          <Button
            onClick={() => setShowModal(true)}
            className="bg-red-600 max-w-fit text-white hover:bg-red-500"
          >
            {t("removeJob")}
          </Button>
        )}
        {!showRemoveButton && (
          <a href={job.jobUrl} target="_blank" className="flex justify-start">
            <Button
              className={`w-full sm:max-w-fit flex gap-1 whitespace-nowrap bg-indigo-600 text-white hover:bg-indigo-500`}
              onClick={() => {
                handleAppliedTrackJob(job);
              }}
            >
              {t("applyNowButton")}
              <span>
                {" "}
                <ExternalLinkIcon className="w-5 h-5" />{" "}
              </span>
            </Button>
          </a>
        )}
        <Button
          onClick={onViewJob}
          variant="outline"
          className="max-w-fit app-bar-btn"
        >
          {t("viewButton")}
        </Button>
      </div>
      <ConfirmationModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRemoveTracking}
        title={t("deleteConfirmationTitle")}
        description={t("deleteConfirmationDesc")}
        confirmText={t("confirm")}
        cancelText={t("cancel")}
        showDelete={true}
      />
    </div>
  );
}
