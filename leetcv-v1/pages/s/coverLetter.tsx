import { GetStaticPropsContext } from "next";
import { useEffect } from "react";
import {
  pageTitleState,
  resumeState,
  subscriptionPlanState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import { trpc } from "@utils/trpc";
import Footer from "@components/home/footer";
import { ToastContainer } from "react-toastify";
import CoverHero from "@components/coverLetter/coverLetterHero";
import CoverLetterContainer from "@components/coverLetter/coverLetterContainer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}

export default function CoverLetterPage() {
  const router = useRouter();
  const { status } = useSession();
  useDailyUserCount();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const setTokens = useSetRecoilState(tokenCountState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  const { data: tokenCount } = trpc.useQuery([
    "fs.gptToken.checkToken",
    { id: userId, handle: resume?.handle },
  ]);

  useEffect(() => {
    setProdTitle("Cover Letter");
    setTokens(tokenCount);
  }, [tokenCount]);

  const { isLoading } = trpc.useQuery(["fs.resume.getUser", { id: userId }], {
    enabled: !!userId,
  });

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Cover Letter | LeetCV"}
        description="Create a professional cover letter effortlessly with LeetCV. Enter the company name, job description, and hiring manager's name, and let our AI generate a tailored cover letter for you. Enhance your job application and impress potential employers."
        key={
          "LeetCV, Professional Cover Letter, Cover Letter Generator, AI Cover Letter, Tailored Cover Letter"
        }
        canonical={`https://www.leetcv.com/s/coverLetter`}
        openGraph={{
          url: "https://www.leetcv.com/s/coverLetter",
          title: "Cover Letter | LeetCV",
          description:
            "Create a professional cover letter effortlessly with LeetCV. Enter the company name, job description, and hiring manager's name, and let our AI generate a tailored cover letter for you. Enhance your job application and impress potential employers.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Cover Letter",
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
          name: "Cover Letter",
          description:
            "Create a professional cover letter effortlessly with LeetCV. Enter the company name, job description, and hiring manager's name, and let our AI generate a tailored cover letter for you. Enhance your job application and impress potential employers.",
          url: "https://www.leetcv.com/s/coverLetter",
        })}
      </script>
      <div className="dark:bg-gray-900 dark:print:bg-white">
        <Container loading={isLoading}>
          {(plan === "Pro" ||
            plan === "Premium" ||
            (plan === "" && tokenCount > 0)) && <CoverLetterContainer />}
          {plan === "" && tokenCount <= 0 && <CoverHero />}
          <div className="pt-14 md:pt-20">
            <Footer />
          </div>
        </Container>
        <ToastContainer />
      </div>
    </>
  );
}
