import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import IncludePlan from "@components/public features/includedPlan";
import { handleNavigation, resumeIdeaData } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";

const ResumeIdeas = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleGetStartedClick = () => {
    handleNavigation("/s/resumeIdeas", status, router);
  };
  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Resume Ideas | LeetCV"
        description="Explore innovative ideas to enhance your resume with LeetCV's AI-powered tools. Elevate your professional profile effortlessly with personalized suggestions and creative insights."
        key={
          "Improved Resume Suggestions, AI Resume Enhancements, Job Description Analysis, Tailored Resume Recommendations, Recruiter Friendly Resumes, Job Matching Optimization, Skill Highlighting, Resume Relevance, AI-Powered Resume Tools, Enhanced Job Applications, Targeted Job Applications, Professional Resume Improvement, Job Application Success, AI Resume Insights, Matching Resume Percentage, Continuous Resume Optimization, Focused Resume Creation, Competitive Job Applications, Resume Skill Updates, Effective Resume Building, Resume Customization"
        }
        canonical="https://www.leetcv.com/resumeIdeas"
        openGraph={{
          url: "https://www.leetcv.com/resumeIdeas",
          title: "Resume Ideas | LeetCV - AI-Powered Resume Enhancements",
          description:
            "Explore innovative ideas to enhance your resume with LeetCV's AI-powered tools. Elevate your professional profile effortlessly with personalized suggestions and creative insights.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Resume Ideas",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        title="Improved Resume Suggestions"
        description="Add job descriptions, and our AI provides enhanced resume suggestions. Tailored to the jobs you're targeting, increasing your chances with recruiters and hiring managers."
        primaryButtonText="Get Started for Free!"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo
        urlId="xF5kPZuzli8"
        title="How To Use Improved Resume Suggestions"
      />
      <IncludePlan />
      <AIFeature
        description="Unlock creative ways to enhance your resume with LeetCV's AI-powered tools. Get personalized suggestions and innovative insights to make your resume stand out and align with your career goals."
        sections={resumeIdeaData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ResumeIdeas;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
