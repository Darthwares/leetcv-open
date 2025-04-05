import Container from "@components/container";
import {
  pageTitleState,
  resumeIdeas,
  resumeState,
  subscriptionPlanState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useRecoilState, useSetRecoilState } from "recoil";
import ResumeReviewBody from "@components/resumeReview/resumeReviewBody";
import ResumeReviewHero from "@components/resumeReview/resumeReviewHero";
import { useEffect, useState } from "react";
import ResumeIdeaBanner from "@components/resumeReview/resumeIdeaBanner";
import Footer from "@components/home/footer";
import TokensLeft from "@components/waitList/tokensLeft";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

export default function ResumeIdeas() {
  const router = useRouter();
  const { status } = useSession();
  useDailyUserCount();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const [userId] = useRecoilState(userIdState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const [resume] = useRecoilState(resumeState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [tokenColor, setTokenColor] = useState("");
  const [ideas] = useRecoilState(resumeIdeas);
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  const { isLoading } = trpc.useQuery(["fs.resume.get", { id: userId }], {
    refetchOnWindowFocus: false,
  });

  const setTokens = useSetRecoilState(tokenCountState);

  const { data: tokenCount } = trpc.useQuery([
    "fs.gptToken.checkToken",
    { id: userId, handle: resume?.handle },
  ]);

  useEffect(() => {
    setProdTitle("Resume Ideas");
    setTokens(tokenCount);
    setTokenColor(tokenCount < 560 ? "red" : "indigo");
  }, [tokenCount]);

  return (
    <>
      <NextSeo
        title={"Resume Ideas | LeetCV"}
        description="Discover innovative resume ideas on LeetCV. Simply paste any job description, and our tool will generate a tailored resume to help you stand out. Get inspired and create the perfect resume for your desired job."
        key={
          "LeetCV, Resume Ideas, Resume Generator, Job Description Based Resume, Professional Resume, Tailored Resume, ATS Friendly Resume"
        }
        canonical={`https://www.leetcv.com/s/resumeIdeas`}
        openGraph={{
          url: "https://www.leetcv.com/s/resumeIdeas",
          title: "Resume Ideas | LeetCV",
          description:
            "Discover innovative resume ideas on LeetCV. Simply paste any job description, and our tool will generate a tailored resume to help you stand out. Get inspired and create the perfect resume for your desired job.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Resume Ideas",
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
          name: "Resume Ideas",
          description:
            "Discover innovative resume ideas on LeetCV. Simply paste any job description, and our tool will generate a tailored resume to help you stand out. Get inspired and create the perfect resume for your desired job.",
          url: "https://www.leetcv.com/s/resumeIdeas",
        })}
      </script>
      <div className="pageLevelPadding w-full">
        <Container loading={isLoading}>
          <div className="ml-0 lg:ml-1">
            <ResumeIdeaBanner />
            {(plan === "Pro" ||
              plan === "Premium" ||
              (plan === "" && tokenCount > 0)) &&
              !ideas && (
                <div className="w-full mt-2">
                  <div className="py-2 w-full">
                    <div className={`rounded-lg bg-${tokenColor}-50 py-3 px-6`}>
                      <TokensLeft />
                    </div>
                  </div>
                </div>
              )}
            {(plan === "Pro" ||
              plan === "Premium" ||
              (plan === "" && tokenCount > 0)) && <ResumeReviewBody />}
            {plan === "" && tokenCount <= 0 && <ResumeReviewHero />}
          </div>
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
      </div>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}
