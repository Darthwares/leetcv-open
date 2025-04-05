import React, { useEffect, useState } from "react";
import { GetStaticPropsContext } from "next";
import { useIntercom } from "react-use-intercom";
import HeadSeo from "@components/headSeo";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  profileImageState,
  userIdState,
  resumeState,
  subscriptionPlanState,
  have90daysAccessState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import BackgroundBlur from "@components/resource/backgroundBlur";
import { NextSeo } from "next-seo";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import useMessengerToken from "@lib/firebase/setMessenger";
import TokenManager from "@components/tokenManager";
import AutoSyncResume from "@components/syncResume";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import AllFeatures from "@components/landing page/allFeatures";
import FreeAccessBanner from "@components/freeAccessBanner";
import { useRouter } from "next/router";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";
export default function Home() {
  const { status } = useSession();
  const t = useTranslations("HomePage");
  const { boot } = useIntercom();
  const [userId] = useRecoilState(userIdState);
  const setProfileImage = useSetRecoilState(profileImageState);
  const [resume, setSyncResume] = useRecoilState(resumeState);
  const { targetToken } = useMessengerToken();
  const [plan] = useRecoilState(subscriptionPlanState);
  const [canAccess] = useRecoilState(have90daysAccessState);
  const [showAccessBanner, setShowAccessBanner] = useState<boolean>(false);
  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });
  useDailyUserCount();

  const { data: isReturningUser } = trpc.useQuery(
    ["fs.viewCount.isReturningUser"],
    {
      enabled: status === "authenticated",
    }
  );

  const { data: user } = trpc.useQuery(["fs.resume.getUser", { id: userId }], {
    enabled: !!userId,
  });

  const { data: razorpayCustomerId } = trpc.useQuery(
    ["fs.stripe.getRazoapayCustId"],
    {
      enabled: status === "authenticated",
    }
  );
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    boot();
    import("@lottiefiles/lottie-player");
    setProfileImage(user?.image);
  }, [boot, user, razorpayCustomerId, isReturningUser]);

  useEffect(() => {
    if (status === "authenticated") {
      if (!plan && canAccess) {
        setShowAccessBanner(true);
      }
    }
  }, [plan, canAccess, status]);

  return (
    <div data-testid="index" className="dark:bg-gray-900">
      <HeadSeo title={t("title")}></HeadSeo>
      <NextSeo
        title={
          "Create Your Professional Resume and CV Online | Free Ai Resume Builder - LeetCV"
        }
        description={t("homeDescription")}
        key={
          "AI Resume Builder, Effortless Resume Creation, Customized Resume Templates, Standout Resumes, Job Winning Resumes, Resume Tips and Tricks, ATS-Friendly Resumes, Professional Resume Templates, Fast Resume Creation, AI-Powered Resume Builder, Portfolio Builder, Career Portfolio, Optimize for Recruiters, Convert LinkedIn Resume, Tailored Cover Letters, Resume Review Service, Professional Portfolio Presentation, Improve Job Matching, Real-Time Feedback on Resumes, Enhance Your Resume, LeetCV. LeetCV Home page. LeetCV Resume builder, LeetCV AI Resume."
        }
        canonical={t("canonical")}
      />
      <AutoSyncResume setResume={setSyncResume} />
      <TokenManager
        userId={userId}
        resumeDisplayName={resume.displayName}
        targetToken={targetToken!}
      />
      <BackgroundBlur />
      {showAccessBanner && <FreeAccessBanner />}
      <AllFeatures />
    </div>
  );
}
export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
