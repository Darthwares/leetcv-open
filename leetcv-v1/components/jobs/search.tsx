import React from "react";
import JobListingCard from "./jobListingCard";
import { Job } from "types/dashboardTypes";

interface SearchTabProps{
  jobs: Job[]
}
export default function SearchTab({ jobs }: SearchTabProps) {
  return (
    <div className="space-y-6 pt-5">
      <JobListingCard jobs={jobs} />
    </div>
  );
}
