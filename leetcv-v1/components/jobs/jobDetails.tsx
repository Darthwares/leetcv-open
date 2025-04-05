import { BriefcaseIcon, BuildingIcon, CircleArrowPathIcon } from '@components/svg';
import { getExperienceLabel, timeAgo } from '@constants/defaults';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import React from 'react'
import { Badge } from 'shadcn/components/ui/badge';
import { Job } from 'types/dashboardTypes';

interface JobDetailsProps{
    job:Job
}
const JobDetails = ({job}: JobDetailsProps) => {
  return (
    <>
      <div>
        <div className="flex justify-between">
          <p className="font-semibold text-lg line-clamp-2">{job?.jobTitle}</p>
          <div className="">
            {job?.status === "active" && (
              <Badge
                variant="secondary"
                className="bg-green-100 capitalize text-green-800"
              >
                {job?.status}
              </Badge>
            )}
            {job?.status === "delisted" && (
              <Badge
                variant="secondary"
                className="bg-red-100 capitalize text-red-800"
              >
                {job?.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center mt-2 gap-2">
          {" "}
          <span>
            <BuildingIcon className="w-5 h-5 text-sm" />
          </span>
          <p className="text-sm line-clamp-1"> {job?.companyName ?? "NA"} </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span>
          <LocationMarkerIcon className="w-5 h-5" />
        </span>
        <p className="text-sm line-clamp-1">{job?.location ?? "NA"} </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>
            <CircleArrowPathIcon className="w-5 h-5" />
          </span>
          <p className="text-sm">Synced {timeAgo(job?.updatedAt)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span>
            <BriefcaseIcon className="w-5 h-5" />
          </span>
          <p className="text-sm">
            {" "}
            {getExperienceLabel(job?.yearsOfExperience) ?? "NA"}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default JobDetails