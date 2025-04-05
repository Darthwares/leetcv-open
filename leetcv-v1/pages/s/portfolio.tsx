import { GetStaticPropsContext, NextPage } from "next";
import { NextSeo } from "next-seo";
import {
  attestedRequestState,
  profileResumeState,
  resumeState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import PortfolioView from "@components/portfolio/portfolioView";
import Footer from "@components/home/footer";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useEffect } from "react";
import { handleSource, openResumeId } from "@constants/defaults";
import NavbarPortfolio from "@components/portfolio/navbarPortfolio";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { useRouter } from "next/router";
import { SharePortfolio } from "@components/portfolio/sharePortfolio";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Portfolio: NextPage = () => {
  const { status } = useSession();
  const setProfileResume = useSetRecoilState(profileResumeState);
  const setAttestedRequest = useSetRecoilState(attestedRequestState);
  const [userId] = useRecoilState(userIdState);
  const [userInfo] = useRecoilState(resumeState);
  const setTokens = useSetRecoilState(tokenCountState);
  const setStatus = trpc.useMutation(["fs.openAIResume.create"]);
  useDailyUserCount();

  const { data: userResume } = trpc.useQuery(
    ["fs.resume.get", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  const resume = {
    handle: userResume?.handle!,
    displayName: userResume?.displayName!,
    email: userResume?.email!,
  };

  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  const { data: attestedUserList } = trpc.useQuery([
    "fs.attestation.getAttestedUserList",
    { id: userId },
  ]);

  const { data: tokenCount } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  const { data: matchingUsers } = trpc.useQuery(
    ["fs.dashboard.getColleagues", { userId }],
    {
      enabled: !!userId && status === "authenticated",
    }
  );

  useEffect(() => {
    if (tokenCount !== undefined) {
      setTokens(tokenCount);
    }
  }, [tokenCount, setTokens, userInfo.id, matchingUsers]);

  const getGeneratedResume = localStorage.getItem(openResumeId);

  useEffect(() => {
    if (getGeneratedResume) {
      setStatus
        .mutateAsync({
          resumeId: JSON.parse(getGeneratedResume!),
          handle: userInfo.handle,
        })
        .then(() => {
          localStorage.removeItem(openResumeId);
        });
    }
    if (userResume) {
      setProfileResume(userResume);
    }
  }, [userResume, getGeneratedResume, userId, userInfo]);

  useEffect(() => {
    if (attestedUserList) {
      setAttestedRequest(attestedUserList as any);
    }
  }, [attestedUserList]);

  return (
    <>
      <NextSeo
        title={"Portfolio | LeetCV"}
        description="Explore a comprehensive portfolio created from your resume data on LeetCV. Showcase your professional expertise, accomplishments, and innovative contributions in a beautifully designed format."
        key={
          "LeetCV, Portfolio, Professional Portfolio, Showcase Achievements, Career Highlights, Resume-Based Portfolio"
        }
        canonical={`https://www.leetcv.com/portfolio`}
        openGraph={{
          url: "https://www.leetcv.com/portfolio",
          title: "Portfolio | LeetCV",
          description:
            "Explore a comprehensive portfolio created from your resume data on LeetCV. Showcase your professional expertise, accomplishments, and innovative contributions in a beautifully designed format.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Portfolio",
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
          name: "Portfolio",
          description:
            "Explore a comprehensive portfolio created from your resume data on LeetCV. Showcase your professional expertise, accomplishments, and innovative contributions in a beautifully designed format.",
          url: "https://www.leetcv.com/portfolio",
        })}
      </script>
      <NavbarPortfolio />
      <PortfolioView />
      <SharePortfolio />
      <div className="pt-14">
        <Footer />
      </div>
    </>
  );
};
export default Portfolio;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
