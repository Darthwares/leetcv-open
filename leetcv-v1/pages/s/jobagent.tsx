import Container from "@components/container";
import Footer from "@components/home/footer";
import { Loader } from "@components/loader";
import { FilterIcon, SearchIcon } from "@heroicons/react/outline";
import {
  pageTitleState,
  resumeState,
  subscriptionPlanState,
  userIdState,
} from "@state/state";
import { IconArrowBackUp } from "@tabler/icons-react";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "shadcn/components/ui/button";
import { Input } from "shadcn/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "shadcn/components/ui/tabs";
import TrackingTab from "@components/jobs/trackingTab";
import SearchTab from "@components/jobs/search";
import RequestTab from "@components/jobs/requestTab";
import { checkIfFreeUser, checkIfProUser } from "@constants/defaults";
import { Job } from "types/dashboardTypes";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

interface JobListing {
  id: string;
  postings: Job[];
}

const JobAgent = () => {
  const t = useTranslations("JobAgent");
  const [selectedJobListing, setSelectedJobListing] =
    useState<JobListing | null>(null);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchFilteredJobs, setSearchFilteredJobs] = useState<Job[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [filteredJobTitles, setFilteredJobTitles] = useState<string[]>([]);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"active" | "delisted">(
    "active"
  );
  const [resume] = useRecoilState(resumeState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const router = useRouter();
  const { status } = useSession();
  const { data: isPremiumMember } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });
  const isFreeUser = checkIfFreeUser(isPremiumMember);
  const [activeTab, setActiveTab] = useState("tracking");
  useDailyUserCount();

  const { data: jobListings, isLoading } = trpc.useQuery(
    ["fs.aiJobListingRouter.getJobLists"],
    {
      enabled: true,
    }
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const [plan] = useRecoilState(subscriptionPlanState);

  useEffect(() => {
    setProdTitle("Jobs");
  }, []);

  useEffect(() => {
    if (jobListings && jobListings.length > 0) {
      const allPostings = jobListings.flatMap(
        (listing: any) => listing.postings
      );

      let visiblePostings;

      if (!isFreeUser) {
        visiblePostings = allPostings;
      } else {
        const activePostings = allPostings.filter(
          (job: any) => job.status === "active"
        );
        visiblePostings = activePostings.slice(0, 3);
      }

      setAllJobs(visiblePostings);
      const year = parseInt(resume?.yearOfExperience?.split(",")[0] || "0", 10);

      const filteredPostings = visiblePostings.filter((posting: any) => {
        const normalizedPostingTitle = posting.jobTitle?.toLowerCase();
        const normalizedResumePosition = resume.position?.toLowerCase();
        return (
          posting.status === "active" &&
          normalizedPostingTitle.includes(normalizedResumePosition)
        );
      });
      setFilteredJobs(filteredPostings.slice(0, 3));
    }
  }, [jobListings, isPremiumMember, resume.position, resume?.yearOfExperience]);

  const isProUser = checkIfProUser(isPremiumMember);

  useEffect(() => {
    let filtered = allJobs;

    if (selectedJobListing) {
      filtered = selectedJobListing.postings;
    }

    if (selectedJobTitle) {
      filtered = filtered.filter((job) =>
        job.jobTitle?.toLowerCase().includes(selectedJobTitle.toLowerCase())
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    const lowercasedQuery = searchQuery.trim().toLowerCase();
    if (lowercasedQuery) {
      filtered = filtered.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(lowercasedQuery) ||
          job.location?.toLowerCase().includes(lowercasedQuery) ||
          job.companyName?.toLowerCase().includes(lowercasedQuery) ||
          job.skills?.some((skill) =>
            skill.toLowerCase().includes(lowercasedQuery)
          )
      );
    }

    filtered = filtered.filter((job) => job.status === filterStatus);

    if (isFreeUser) {
      filtered = filtered.filter((job) => job.status === "active").slice(0, 3);
    }

    setSearchFilteredJobs(filtered);
  }, [
    allJobs,
    selectedJobListing,
    selectedJobTitle,
    selectedLocation,
    searchQuery,
    filterStatus,
    isFreeUser,
  ]);

  useEffect(() => {
    if (selectedJobListing) {
      const jobTitles = [
        ...new Set(selectedJobListing.postings.map((job) => job.jobTitle)),
      ];
      const locations = [
        ...new Set(selectedJobListing.postings.map((job) => job.location)),
      ];

      setFilteredJobTitles(jobTitles);
      setFilteredLocations(locations);
    } else {
      setFilteredJobTitles([...new Set(allJobs.map((job) => job.jobTitle))]);
      setFilteredLocations([...new Set(allJobs.map((job) => job.location))]);
    }
  }, [selectedJobListing, allJobs]);

  const isFilterApplied = () => {
    return (
      selectedJobListing !== null ||
      selectedJobTitle !== null ||
      selectedLocation !== null ||
      searchQuery !== ""
    );
  };

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    if (isFreeUser) {
      setActiveTab("search");
    }
  }, [isFreeUser]);

  if (isLoading) {
    return <Loader />;
  }

  const handleCompanySelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedJobListing =
      jobListings?.find((listing: any) => listing.id === selectedId) || null;

    setSelectedJobListing(selectedJobListing);

    const jobTitlesInSelectedCompany = selectedJobListing?.postings.map(
      (posting: any) => posting.jobTitle
    );

    if (
      selectedJobTitle &&
      jobTitlesInSelectedCompany &&
      !jobTitlesInSelectedCompany.includes(selectedJobTitle)
    ) {
      setSelectedJobTitle(null);
    }
  };

  const handleJobTitleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJobTitle(event.target.value || null);
  };

  const handleLocationSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value || null);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const toggleFilterModal = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const clearFilters = () => {
    setSelectedJobListing(null);
    setSelectedJobTitle(null);
    setSelectedLocation(null);
    setSearchQuery("");
    setFilterStatus("active");
  };

  const tabOrder = isFreeUser
    ? ["search", "tracking", "request"]
    : ["tracking", "search", "request"];

  const getTabClass = (tabValue: any) =>
    activeTab === tabValue
      ? "bg-indigo-600 text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <div className="dark:bg-gray-900">
      <div className="flex flex-col md:items-center md:justify-center">
        <NextSeo
          title={"Job Agent | LeetCV"}
          description="Super powered Agents to search and automatically apply"
          key={"LeetCV, Job Agent, Automatically Job apply"}
          canonical={`https://www.leetcv.com/s/jobagent`}
        />
        <Container>
          <div className={`${plan === "Pro" && "py-4 md:mt-8"}`}>
            <div className="max-w-7xl w-full mx-auto py-4">
              <h1 className="text-3xl font-bold mb-4 py-2">Job Openings</h1>
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full p-2 grid-cols-3 mb-6">
              {tabOrder.map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`${getTabClass(
                    tab
                  )} transition-colors duration-200 ease-in-out`}
                >
                  {tab === "tracking" && "Tracking"}
                  {tab === "search" && "Search"}
                  {tab === "request" && "Request"}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="tracking">
              <TrackingTab jobs={filteredJobs} />
            </TabsContent>

            <TabsContent value="search">
              <div className={`${isFilterOpen ? "" : "space-y-5"}`}>
                <div className="relative flex gap-3 px-2 w-full">
                  <SearchIcon className="absolute left-5 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search jobs by title"
                    className="pl-10 w-full rounded-md"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {!isFreeUser && (
                    <Button
                      onClick={toggleFilterModal}
                      className="text-gray-500 border border-gray-500"
                    >
                      <FilterIcon className="sm:mr-2 h-4 w-4 text-sm font-normal text-gray-800" />
                      <span className="text-sm font-normal sm:block hidden">
                        Filter
                      </span>
                    </Button>
                  )}
                </div>
                {!isFreeUser && isFilterOpen && (
                  <div
                    className={`flex flex-col md:flex-row my-4 md:space-x-4 space-y-3 sm:space-y-0 px-2`}
                  >
                    <div className="flex-1">
                      <label
                        htmlFor="company-select"
                        className="block font-medium mb-2"
                      >
                        Select Company
                      </label>
                      <select
                        id="company-select"
                        className="w-full p-2 border rounded-lg"
                        onChange={handleCompanySelect}
                        value={selectedJobListing?.id || ""}
                      >
                        <option value="">All Companies</option>
                        {jobListings?.map((jobListing: any) => (
                          <option key={jobListing.id} value={jobListing.id}>
                            {jobListing.id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="job-title-select"
                        className="block font-medium mb-2"
                      >
                        Select Job Title
                      </label>
                      <select
                        id="job-title-select"
                        className="w-full p-2 border rounded-lg"
                        onChange={handleJobTitleSelect}
                        value={selectedJobTitle || ""}
                      >
                        <option value="">All Jobs</option>
                        {filteredJobTitles.map((jobTitle) => (
                          <option key={jobTitle} value={jobTitle}>
                            {jobTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="location-select"
                        className="block font-medium mb-2"
                      >
                        Select Location
                      </label>
                      <select
                        id="location-select"
                        className="w-full p-2 border rounded-lg"
                        onChange={handleLocationSelect}
                        value={selectedLocation || ""}
                      >
                        <option value="">All Locations</option>
                        {filteredLocations.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isFilterApplied() && (
                      <div className="flex justify-end pt-4 sm:pt-8">
                        <Button
                          onClick={clearFilters}
                          className="text-gray-500 flex justify-end ml-2"
                        >
                          <span>
                            {" "}
                            <IconArrowBackUp className="mr-2 h-4 w-4 text-sm font-normal text-gray-800" />{" "}
                          </span>
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <SearchTab jobs={searchFilteredJobs} />
            </TabsContent>
            <TabsContent value="request">
              <RequestTab isProUser={isProUser} />
            </TabsContent>
          </Tabs>
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default JobAgent;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}
