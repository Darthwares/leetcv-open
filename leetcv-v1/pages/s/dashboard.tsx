import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pageTitleState,
  profileImageState,
  profileResumeState,
  userIdState,
  resumeState,
  subscriptionPlanState,
  have90daysAccessState,
} from "@state/state";
import { trpc } from "utils/trpc";
import DashboardProfile from "@components/dashboard/dashboardWidget";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import useMessengerToken from "@lib/firebase/setMessenger";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TokenManager from "@components/tokenManager";
import Footer from "@components/home/footer";
import CampaignTracker from "@components/dashboard/campaignTracker";
import FreeAccessBanner from "@components/freeAccessBanner";
import NotificationTracker from "@lib/helper/notificationTracking";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  useDailyUserCount();

  useEffect(() => {
    if (status === "unauthenticated" && router.query.notification !== "true") {
      router.push("/");
    }
  }, [status, router.query]);

  const setResume = useSetRecoilState(profileResumeState);
  const setProfileImage = useSetRecoilState(profileImageState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("DashboardWidget");
  const [resume] = useRecoilState(resumeState);
  const { targetToken } = useMessengerToken();
  const [userId] = useRecoilState(userIdState);
  const [isAllowedUser, setIsAllowedUser] = useState(false);
  const [plan] = useRecoilState(subscriptionPlanState);
  const [canAccess] = useRecoilState(have90daysAccessState);
  const [showAccessBanner, setShowAccessBanner] = useState<boolean>(false);
  NotificationTracker({
    userId,
    type: "dashboard-star",
  });

  const { data: profileResume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);

  const { data: user } = trpc.useQuery(["fs.resume.getUser", { id: userId }]);

  const { data: matchingUsers } = trpc.useQuery(
    ["fs.dashboard.getColleagues", { userId }],
    {
      enabled: !!userId && status === "authenticated",
    }
  );

  useEffect(() => {
    setProdTitle(t("dashboard"));
    if (profileResume) {
      setResume({ ...profileResume });
      setProfileImage(user?.image);
    }
  }, [profileResume, matchingUsers]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    function checkCampainTracker() {
      const allowedDomains = process.env
        .NEXT_PUBLIC_CAMPAIGN_TRACKER!?.split(",")
        .includes(userId);

      if (allowedDomains) {
        setIsAllowedUser(true);
      }
    }

    checkCampainTracker();
  }, [isAllowedUser, userId]);

  const createToken = trpc.useMutation(["fs.notification.createToken"]);

  useEffect(() => {
    if (targetToken) {
      createToken.mutate({
        id: userId,
        name: resume.displayName,
        token: targetToken,
      });
    }
  }, [resume.displayName, targetToken]);

  useEffect(() => {
    if (status === "unauthenticated" && router.query?.marketing_program) {
      router.push("/auth/signin");
    }
  }, [status, router.query?.marketing_program]);

  useEffect(() => {
    if (!plan && canAccess) {
      setShowAccessBanner(true);
    }
  }, [plan, canAccess]);

  return (
    <>
      <NextSeo
        title={"Dashboard | LeetCV"}
        description="Manage and track your professional activities with LeetCV's Dashboard. View portfolio and resume visit stats, request and attestation counts, reviews, followers, and following counts, all in one place."
        key={
          "LeetCV, Dashboard, Professional Dashboard, Portfolio Visits, Resume Visits, Reviews, Followers, Professional Networking"
        }
        canonical={`https://www.leetcv.com/s/dashboard`}
        openGraph={{
          url: "https://www.leetcv.com/s/dashboard",
          title: "Dashboard | LeetCV",
          description:
            "Manage and track your professional activities with LeetCV's Dashboard. View portfolio and resume visit stats, request and attestation counts, reviews, followers, and following counts, all in one place.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Dashboard",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Dashboard",
          description:
            "Manage and track your professional activities with LeetCV's Dashboard. View portfolio and resume visit stats, request and attestation counts, reviews, followers, and following counts, all in one place.",
          url: "https://www.leetcv.com/s/dashboard",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="pageLevelPadding">
          <TokenManager
            userId={userId}
            resumeDisplayName={resume.displayName}
            targetToken={targetToken!}
          />
          <Container loading={isLoading}>
            <div className="ml-0 lg:ml-1">
              {!isLoading && showAccessBanner && <FreeAccessBanner />}
              <DashboardProfile />
              {isAllowedUser && <CampaignTracker />}
            </div>
            <div className="mt-14 w-full">
              <Footer />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default Dashboard;
