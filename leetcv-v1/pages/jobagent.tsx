import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import Footer from "@components/home/footer";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { useRouter } from "next/router";
import { handleNavigation, jobsAgent } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { ProdTitle } from "@lib/helper/setProdTitle";
import IncludedPlan from "@components/public features/includedPlan";
import FeatureVideo from "@components/landing page/featureVideo";

const Interview = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleGetStartedClick = () => {
    handleNavigation("/s/jobagent", status, router);
  };

  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Job Agent | LeetCV"
        description="Unlock full access to all job openings and get tailored job recommendations with LeetCV's Job Agent. Start your journey to landing the perfect job today."
        key={
          "LeetCV, Job Agent, Job Search, Tailored Job Recommendations, Job Openings, Personalized Job Alerts, Job Matching, Career Growth, AI Job Agent, Job Opportunities, Find Jobs, Career Advancement, Job Market Insights, Job Search Tools, Professional Job Matches"
        }
        canonical="https://www.leetcv.com/jobagent"
        openGraph={{
          url: "https://www.leetcv.com/jobagent",
          title:
            "Job Agent | LeetCV - Tailored Job Recommendations & Full Job Access",
          description:
            "Unlock full access to all job openings and get tailored job recommendations with LeetCV's Job Agent. Start your journey to landing the perfect job today.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Job Agent",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        description="Discover tailored job opportunities designed just for you with LeetCV. Gain access to exclusive roles and personalized job recommendations that match your skills and career goals. Elevate your job search with advanced filters, priority listings, and insights that can fast-track your application process. Don’t miss your next career breakthrough—take the next step and unlock the potential for your dream job today!"
        primaryButtonText="Find Top Job Matches"
        title="Discover Exclusive Jobs & Matches"
        onPrimaryButtonClick={handleGetStartedClick}
        padding="px-6 sm:px-8"
      />
      <FeatureVideo
        urlId="0zOo0wjnhVA"
        title="How to Unlock Full Access to Job Listings with LeetCV"
      />
      <IncludedPlan />
      <AIFeature
        sections={jobsAgent}
        description="Stand out from the competition with professionally tailored headlines and about sections, designed to align with your target job functions. Capture the attention of recruiters and hiring managers, and boost your chances of landing your dream job."
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
