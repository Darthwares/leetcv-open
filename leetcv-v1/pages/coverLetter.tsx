import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import IncludePlan from "@components/public features/includedPlan";
import { coverLetterData, handleNavigation } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";

const CoverLetter = () => {
  const router = useRouter();
  const { status } = useSession();
  ProdTitle("");

  const handleGetStartedClick = () => {
    handleNavigation("/s/coverLetter", status, router);
  };

  return (
    <div>
      <NextSeo
        title="Cover Letter | LeetCV"
        description="Craft personalized cover letters with precision using LeetCV's AI-driven tools. Elevate your job applications with tailored content that showcases your unique professional strengths."
        key={
          "AI-Powered Cover Letters, Personalized Cover Letters, Impactful Cover Letters, Professional Strengths Highlighting, Tailored Job Applications, AI-Driven Cover Letter Tools, Industry-Specific Keywords, Job Application Enhancement, Cover Letter Customization, Unique Value Proposition, Recruiter Friendly Cover Letters, Job Description Analysis, Optimized Cover Letters, Cover Letter Automation, Effective Job Applications, Standout Cover Letters, AI Cover Letter Creation, Competitive Edge Applications, Enhanced Job Application, Professional Application Tools"
        }
        canonical="https://www.leetcv.com/coverLetter"
        openGraph={{
          url: "https://www.leetcv.com/coverLetter",
          title: "Cover Letter | LeetCV - AI-Powered Cover Letter Creation",
          description:
            "Craft personalized cover letters with precision using LeetCV's AI-driven tools. Elevate your job applications with tailored content that showcases your unique professional strengths.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Cover Letter",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        title="AI-Powered Cover Letters"
        description="Create personalized, impactful cover letters with ease using LeetCV's AI-driven tools. Enhance your applications and highlight your professional strengths."
        primaryButtonText="Get Started for Free!"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo
        urlId="VI31mrVRVy8"
        title="How To Use AI-Powered Cover Letter"
      />
      <IncludePlan />
      <AIFeature
        description="Elevate your job applications with AI-powered cover letters from LeetCV. Create personalized, impactful cover letters that highlight your professional strengths and align perfectly with the job description, giving you a competitive edge in your career journey."
        sections={coverLetterData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default CoverLetter;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
