import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn/components/ui/table";
import { Button } from "shadcn/components/ui/button";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { track } from "@vercel/analytics";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { checkIfFreeUser, getExperienceLabel } from "@constants/defaults";
import { useRecoilState, useSetRecoilState } from "recoil";
import { trackedJobs, userIdState } from "@state/state";
import { Job } from "types/dashboardTypes";
import { toast, ToastContainer } from "react-toastify";
import LoadMore from "./loadMore";
import IsFreeUserCard from "./isFreeUserCard";
import MobileViewCard from "./mobileViewCard";
import ConfirmationModal from "./confirmationModal";

export default function JobListingCard({ jobs }: { jobs: any }) {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleJobs, setVisibleJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const { status } = useSession();
  const [userId] = useRecoilState(userIdState);
  const setAddTrackJob = useSetRecoilState(trackedJobs);
  const addTrackedJobsMutation = trpc.useMutation([
    "fs.aiJobListingRouter.addTrackedJobs",
  ]);
  const { data: getAllTrackedJobs } = trpc.useQuery([
    "fs.aiJobListingRouter.getTrackedJobs",
  ]);
  const setTrackedAppliedJobs = trpc.useMutation([
    "fs.aiJobListingRouter.trackedAppliedJobs",
  ]);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { data: isPremiumMember } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    setVisibleJobs(jobs.slice(0, jobsPerPage));
  }, [jobs]);

  const handleLoadMore = () => {
    setLoading(true);
    const nextPage = currentPage + 1;
    const endIndex = nextPage * jobsPerPage;
    setTimeout(() => {
      setVisibleJobs(jobs.slice(0, endIndex));
      setCurrentPage(nextPage);
      setLoading(false);
    }, 500);
  };

  const extractJobDetails = (job: Job) => ({
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
    updatedAt: job.updatedAt,
  });

  const handleTrackJob = async (job: Job) => {
    const isJobAlreadyTracked = getAllTrackedJobs?.some(
      (trackedJob: any) => trackedJob.jobId === job.jobId
    );

    if (isJobAlreadyTracked) {
      setShowModal(true);
      return;
    }

    setAddTrackJob((prevJobs) => [...prevJobs, job]);

    try {
      await addTrackedJobsMutation.mutateAsync({
        userId,
        jobDetails: extractJobDetails(job),
      });

      track("ClickOnTrackJob", {
        jobTitle: job.jobTitle,
        company: job.companyName,
        location: job.location,
        url: job.jobUrl,
      });

      toast.success("Job successfully tracked!");
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleAppliedTrackJob = async (job: Job) => {
    try {
      setTrackedAppliedJobs.mutate({
        jobDetails: extractJobDetails(job),
      });

      track("ClickOnApplyJob", {
        jobTitle: job.jobTitle,
        company: job.companyName,
        location: job.location,
        url: job.jobUrl,
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const isFreeUser = checkIfFreeUser(isPremiumMember);

  if (jobs.length === 0) {
    return (
      <>
        <div className="max-w-5xl w-full mx-auto text-center flex flex-col lg:flex-row items-center gap-10 md:gap-20">
          <div className="w-full max-w-3xl">
            <h2 className="mt-4 text-xl font-semibold text-gray-700 md:text-2xl">
              Sorry, no job found matching these criteria.
            </h2>
            <p className="mt-2 text-gray-500">
              Try removing filters or refine your search.
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
    );
  }

  if (isMobile) {
    return (
      <>
        <MobileViewCard
          jobs={jobs?.length!}
          visibleJobs={visibleJobs}
          handleLoadMore={handleLoadMore}
          handleTrackJob={handleTrackJob}
          handleAppliedTrackJob={handleAppliedTrackJob}
          loading={loading}
          isFreeUser={isFreeUser}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      </>
    );
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="whitespace-nowrap">
            <TableHead>Job Title</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Required Exp.</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleJobs.map((job: any, index: number) => (
            <TableRow key={index} className="odd:bg-gray-100">
              <TableCell className="font-semibold">{job.jobTitle}</TableCell>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.location ?? "NA"}</TableCell>
              <TableCell>
                {getExperienceLabel(job?.yearsOfExperience) ?? "NA"}
              </TableCell>
              <TableCell>
                <p
                  className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    job.status === "active" &&
                    "text-green-700 bg-green-50 ring-green-600/10"
                  } capitalize`}
                >
                  {job.status}
                </p>
              </TableCell>
              <TableCell className={`${job.status} flex gap-3`}>
                <a href={job.jobUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    className={`w-full text-sm sm:max-w-fit flex gap-1 ${
                      job.status === "delisted"
                        ? "bg-indigo-300 text-white cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    } whitespace-nowrap`}
                    disabled={job.status === "delisted"}
                    onClick={() => handleAppliedTrackJob(job)}
                  >
                    Apply Now
                    <span>
                      <ExternalLinkIcon className="w-5 h-5" />
                    </span>
                  </Button>
                </a>
                {!isFreeUser && (
                  <>
                    <Button
                      className={`w-full text-sm sm:max-w-fit flex gap-1
                    whitespace-nowrap`}
                      onClick={() => {
                        handleTrackJob(job);
                      }}
                      size="sm"
                      variant="outline"
                    >
                      Track
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <IsFreeUserCard
        isFreeUser={isFreeUser}
        src={"/assets/blur-image.png"}
        className="-mt-10"
      />
      <LoadMore
        isFreeUser={isFreeUser}
        loading={loading}
        handleLoadMore={handleLoadMore}
        jobs={jobs.length}
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
      <ToastContainer />
    </div>
  );
}
