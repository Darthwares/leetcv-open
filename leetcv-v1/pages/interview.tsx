import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import Footer from "@components/home/footer";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { useRouter } from "next/router";
import { handleNavigation, interview } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { ProdTitle } from "@lib/helper/setProdTitle";
import IncludedPlan from "@components/public features/includedPlan";
import FeatureVideo from "@components/landing page/featureVideo";

const Interview = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleGetStartedClick = () => {
    handleNavigation("/s/interview", status, router);
  };

  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Mock Interview | LeetCV"
        description="Prepare for your next job interview with LeetCV's AI-powered mock interviews. Get tailored interview questions, real-time feedback, and boost your confidence to ace your next interview."
        key={
          "LeetCV, Mock Interview, Interview Preparation, AI Mock Interview, Interview Feedback, Real-Time Interview Feedback, Tailored Interview Questions, Job Interview Practice, Interview Coaching, Professional Interview Preparation, Improve Interview Skills, Behavioral Interview Questions, Technical Interview Simulation, Job Readiness, Interview Confidence Boost, AI-Powered Interview Training, Mock Job Interviews, Virtual Interview Practice, Career Advancement, Interview Strategy"
        }
        canonical="https://www.leetcv.com/interview"
        openGraph={{
          url: "https://www.leetcv.com/interview",
          title: "Mock Interview | LeetCV - AI-Powered Interview Preparation",
          description:
            "Prepare for your next job interview with LeetCV's AI-powered mock interviews. Get tailored interview questions, real-time feedback, and boost your confidence to ace your next interview.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Mock Interview",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        description="Prepare for your next job interview with confidence. Our AI-powered mock interview platform provides you with real-world interview questions tailored to your specific role and industry. Gain valuable insights and personalized feedback to refine your responses and enhance your interview skills."
        primaryButtonText="Ace Your Interview Practice"
        title="AI-Powered Mock Interview Preparation"
        onPrimaryButtonClick={handleGetStartedClick}
        padding="px-4 sm:px-8"
      />
      <FeatureVideo
        urlId="OTzFgHwAdCs"
        title="How to Prepare for Your Mock Interview with LeetCV"
      />
      <IncludedPlan />
      <AIFeature
        description="Boost your interview skills with LeetCV's AI-powered mock interviews. Get tailored, role-specific interview questions, real-time feedback, and insights to help you refine your responses. Whether you're preparing for your dream job or sharpening your interview game, our mock interviews are designed to give you the confidence and preparation you need to succeed."
        sections={interview}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Interview;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
