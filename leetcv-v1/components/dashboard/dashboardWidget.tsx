import {
  ArrowDownIcon,
  ArrowUpIcon,
  BriefcaseIcon,
  ChartBarIcon,
  EyeIcon,
  PresentationChartLineIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import {
  openAiReviewSidebarState,
  resumeState,
  userIdState,
} from "@state/state";
import { useProgressPercent } from "@utils/progressPercent";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import Widget from "./widget";
import DashboardHeader from "./dashboardHeader";
import { useRouter } from "next/router";
import {
  calculateStreaks,
  setCurrentPageInLocalStorage,
} from "@constants/defaults";
import {
  FireSvg,
  InterviewIcon,
  portfolioViewsSvg,
  RocketSvg,
  StatsSvg,
} from "@components/svg";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import ReusableSidebar from "@components/reusableSideBar";
import ProfileVisitorsList from "@components/visitorList";

export default function DashboardWidget() {
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const { result } = useProgressPercent();
  const t = useTranslations("DashboardWidget");
  const router = useRouter();
  const { status } = useSession();
  const [openAiSidebar, setOpenAiSidebar] = useRecoilState(
    openAiReviewSidebarState
  );

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  const { data: prospectAttestation } = trpc.useQuery(
    ["fs.attestation.getRequestsCount", { userId }],
    { enabled: !!userId }
  );

  const { data: requestAttestation } = trpc.useQuery(
    ["fs.attestation.getProspectsCount", { userId }],
    { enabled: !!userId }
  );

  const { data: viewCounter } = trpc.useQuery(
    [
      "fs.viewCount.getCount",
      { id: userId, handle: resume?.handle, file: "viewCounter" },
    ],
    { enabled: !!userId && !!resume?.handle }
  );

  const { data: viewPortfolioCounter } = trpc.useQuery(
    [
      "fs.viewCount.getCount",
      { id: userId, handle: resume?.handle, file: "viewPortfolioCounter" },
    ],
    { enabled: !!userId && !!resume?.handle }
  );

  const { data: viewLeetLinkCounter } = trpc.useQuery(
    [
      "fs.public.getLeetLinkCount",
      { id: userId, handle: resume?.handle, file: "leetLinkCounter" },
    ],
    { enabled: !!userId && !!resume?.handle }
  );

  const { data: followers } = trpc.useQuery(
    ["fs.follower.getFollowers", { id: userId, handle: resume?.handle }],
    { enabled: !!userId && !!resume?.handle }
  );

  const { data: following } = trpc.useQuery(
    ["fs.follower.getFollowingList", { id: userId, handle: resume?.handle }],
    { enabled: !!userId && !!resume?.handle }
  );

  const { data: requestsCount } = trpc.useQuery(
    ["fs.request.getCount", { userId }],
    { refetchOnWindowFocus: false, enabled: !!userId }
  );

  const { data: prospectCount } = trpc.useQuery(
    ["fs.prospects.getCount", { id: userId }],
    { refetchOnWindowFocus: false, enabled: !!userId }
  );

  const { data: streakData, isLoading: isStreakLoading } = trpc.useQuery(
    ["fs.streak.getStreak", { userId: resume?.id }],
    { enabled: status === "authenticated" }
  );

  const selectedDates = Array.isArray(streakData)
    ? streakData.map((dateString) => new Date(dateString))
    : [];

  const streakCount = calculateStreaks(selectedDates);
  const displayStreakCount = isStreakLoading ? 0 : streakCount;

  const { data: projectReviews } = trpc.useQuery(
    ["fs.review.getAll", { userId, reviewCategory: "Projects-Review" }],
    { enabled: !!userId }
  );

  const { data: educationsReviews } = trpc.useQuery(
    ["fs.review.getAll", { userId, reviewCategory: "Educations-Review" }],
    { enabled: !!userId }
  );

  const { data: awardsReviews } = trpc.useQuery(
    ["fs.review.getAll", { userId, reviewCategory: "Awards-Review" }],
    { enabled: !!userId }
  );

  const { data: experiencesReviews } = trpc.useQuery(
    ["fs.review.getAll", { userId, reviewCategory: "Experience-Review" }],
    { enabled: !!userId }
  );

  const { data: publicationsReviews } = trpc.useQuery(
    ["fs.review.getAll", { userId, reviewCategory: "Publication-Review" }],
    { enabled: !!userId }
  );

  const { data: VisitorsList } = trpc.useQuery(
    ["fs.handle.getVisitorsList", { id: userId }],
    { enabled: status === "authenticated" && !!userId }
  );

  const { data: trackedJobsCount } = trpc.useQuery(
    ["fs.aiJobListingRouter.getTrackedJobs"],
    { enabled: status === "authenticated" }
  );

  const { data: totalMockInterviews } = trpc.useQuery(
    ["fs.mockInterviewRouter.getAllMockInterviews", { id: userId }],
    { enabled: status === "authenticated" && !!userId }
  );

  const totalReviews =
    (projectReviews?.length || 0) +
    (educationsReviews?.length || 0) +
    (awardsReviews?.length || 0) +
    (experiencesReviews?.length || 0) +
    (publicationsReviews?.length || 0);

  if (!userId || !resume?.handle) return null;

  const stats = [
    {
      icon: ArrowDownIcon,
      name: t("requestTitle"),
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      new: false,
      count: requestsCount,
      actionButton: t("requestActionButton"),
      rotate: "rotate-45",
      style: "md:h-24 xl:h-auto",
      actionButtonPath: () => {
        router.push("/s/requests");
      },
      description: t("requestDescription"),
    },
    {
      icon: ArrowUpIcon,
      name: t("prospectsTitle"),
      count: prospectCount,
      new: false,
      iconForeground: "text-sky-700",
      actionButton: t("prospectsActionButton"),
      actionButtonPath: () => {
        router.push("/s/prospects");
      },
      style: "md:h-24 xl:h-auto",
      rotate: "rotate-45",
      iconBackground: "bg-sky-50",
      description: t("prospectsDescription"),
    },
    {
      icon: PresentationChartLineIcon,
      name: t("reviewsReceived"),
      new: false,
      iconForeground: "text-sky-700",
      count: isNaN(totalReviews) ? 0 : totalReviews,
      actionButton: t("reviewsActionButton"),
      actionButtonPath: () => {
        router.push("/s/reviews");
      },
      style: "md:h-24 xl:h-auto",
      iconBackground: "bg-sky-50",
      description: t("reviewsReceivedDesc"),
    },
    {
      icon: ArrowDownIcon,
      name: t("requestAttestationTitle"),
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
      new: false,
      count: requestAttestation,
      actionButton: t("requestAttestationActionButton"),
      rotate: "rotate-45",
      style: "md:h-24 xl:h-auto",
      actionButtonPath: () => {
        router.push("/s/requestAttestation");
      },
      description: t("requestAttestationDesc"),
    },
    {
      icon: ArrowUpIcon,
      name: t("prospectAttestationTitle"),
      count: prospectAttestation,
      new: false,
      iconForeground: "text-sky-700",
      actionButton: t("prospectAttestationActionBtn"),
      actionButtonPath: () => {
        router.push("/s/prospectAttestation");
      },
      style: "md:h-24 xl:h-auto",
      rotate: "rotate-45",
      iconBackground: "bg-sky-50",
      description: t("prospectAttestationDesc"),
    },
  ];

  const resumeProgress = [
    {
      icon: ChartBarIcon,
      name: t("resumeProgressName"),
      rotate: "0deg",
      new: false,
      count: `${result}%`,
      iconForeground: "text-teal-700",
      actionButton: result < 100 && t("resumeProgressActionBtn"),
      actionButtonPath: () => router.push("/s/resumeEditor"),
      actionButtonTwo: t("viewResume"),
      actionButtonTwoPath: () => router.push("/s/resume"),
      iconBackground: "bg-teal-50",
      description: t("resumeProgressDescription"),
    },
  ];

  const streakStats = [
    {
      icon: FireSvg,
      name: t("streakProgress"),
      rotate: "0deg",
      new: false,
      count: displayStreakCount ?? 0,
      iconForeground: "text-teal-700",
      actionButton: t("checkDetails"),
      actionButtonPath: () => {
        router.push("/s/streak");
        setCurrentPageInLocalStorage();
      },
      iconBackground: "bg-teal-50",
      description: t("numberOfDays"),
    },
  ];

  const statistics = [
    {
      icon: UserGroupIcon,
      name: t("followersName"),
      count: followers?.count,
      iconForeground: "text-indigo-700",
      actionButton: t("followersActionButton"),
      actionButtonPath: () => router.push("/s/followers"),
      description: t("peopleFollowYou"),
    },
    {
      icon: UserGroupIcon,
      name: t("following"),
      count: following?.count,
      iconForeground: "text-indigo-700",
      actionButton: t("checkFollowing"),
      actionButtonPath: () => router.push("/s/following"),
      description: t("checkPeopleYouFollow"),
    },
    {
      icon: StarIcon,
      name: t("starName"),
      count: resume?.rating,
      iconForeground: "text-indigo-700",
      description: t("peopleFGaveStar"),
    },
    {
      icon: EyeIcon,
      name: t("resumeVisitors"),
      count: VisitorsList?.totalVisitors ?? 0,
      iconForeground: "text-indigo-700",
      actionButton:
        VisitorsList?.totalVisitors !== 0 ? t("viewRecentVisitors") : undefined,
      actionButtonPath:
        VisitorsList?.totalVisitors !== 0
          ? () => setOpenAiSidebar(true)
          : undefined,
      description: t("peopleVisitedResume"),
    },
    {
      icon: StatsSvg,
      name: t("profileVisitsName"),
      count: viewCounter,
      iconForeground: "text-indigo-700",
      description: t("peopleSawResume"),
    },
    {
      icon: portfolioViewsSvg,
      name: t("portfolioVisits"),
      count: viewPortfolioCounter,
      iconForeground: "text-indigo-700",
      description: t("peopleSawPortfolio"),
    },
    {
      icon: RocketSvg,
      name: t("leetLinkVisit"),
      count: viewLeetLinkCounter,
      iconForeground: "text-indigo-700",
      description: t("peopleSawLeetLink"),
    },
    {
      icon: BriefcaseIcon,
      name: t("trackedJobs"),
      count: trackedJobsCount?.length ?? 0,
      iconForeground: "text-indigo-700",
      description: t("totalTrackedJobsDesc"),
    },
    {
      icon: InterviewIcon,
      name: t("totalMockInterviews"),
      count: totalMockInterviews?.length,
      iconForeground: "text-indigo-700",
      description: t("totalMockInterviewsDesc"),
    },
  ];

  return (
    <div className="pt-3.5 pb-6" data-testid="dashboard">
      <DashboardHeader />
      <h2 className="text-lg max-w-7xl mx-auto font-semibold leading-6 dark:text-white text-gray-900 mt-6 mb-3 md:mb-0">
        {t("overview")}
      </h2>
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 md:mt-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Widget widgetElement={resumeProgress} />
            <Widget widgetElement={streakStats} />
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Widget widgetElement={statistics} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Widget widgetElement={stats} />
          </div>
        </div>
      </div>

      <ReusableSidebar
        open={openAiSidebar}
        setOpen={setOpenAiSidebar}
        title={"Profile visitors"}
        description={"See who visited your profile in the last 30 days."}
        cssClass="fixed top-0 z-50 w-full"
      >
        <ProfileVisitorsList />
      </ReusableSidebar>
    </div>
  );
}
