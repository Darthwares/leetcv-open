import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import IncludedPlan from "@components/public features/includedPlan";
import { useRouter } from "next/router";
import { convertResumeData, handleNavigation } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { ProdTitle } from "@lib/helper/setProdTitle";
import FeatureVideo from "@components/landing page/featureVideo";

const ConvertResume = () => {
  const router = useRouter();
  const { status } = useSession();
  ProdTitle("");
  const handleGetStartedClick = () => {
    handleNavigation("/s/convert", status, router);
  };

  return (
    <div>
      <NextSeo
        title="Convert Resume | LeetCV"
        description="Transform your traditional resume into a standout document with LeetCV's AI-powered conversion tools. Elevate your professional profile effortlessly."
        key={
          "Effortless Resume Conversion, PDF to Resume, AI Resume Conversion, Unique Skills Highlighting, Maximize Resume Impact, Recruiter Friendly Resumes, Job Application Optimization, Standout Document Creation, AI-Powered Resume Tools, Enhanced Resume Presentation, Resume Details Categorization, Simplified Resume Process, Competitive Edge Resumes, Professional Resume Transformation, Tailored Resume Conversion, Modern Resume Solutions, Effective Resume Building, Resume Impact Maximization, Automated Resume Enhancement, Job Market Advantage"
        }
        canonical="https://www.leetcv.com/convertResume"
        openGraph={{
          url: "https://www.leetcv.com/convertResume",
          title: "Convert Resume | LeetCV - AI-Powered Resume Transformation",
          description:
            "Transform your traditional resume into a standout document with LeetCV's AI-powered conversion tools. Elevate your professional profile effortlessly.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Resume Conversion",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        title="Effortless Resume Conversion"
        description="Upload your PDF resume easily. Our AI tools will convert it into a standout document, highlighting your unique skills and experiences to maximize its impact on recruiters and hiring managers."
        onPrimaryButtonClick={handleGetStartedClick}
        primaryButtonText="Get Started for Free!"
      />
      <FeatureVideo
        urlId="H8xKj5n3QnU"
        title="How To Use Effortless Resume Conversion"
      />
      <IncludedPlan />
      <AIFeature
        description="Effortlessly transform your traditional resume into a modern, impactful document with LeetCV's AI-powered conversion tools. Highlight your unique skills, optimize for recruiters, and stand out in the competitive job market with a professional, polished resume."
        sections={convertResumeData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default ConvertResume;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
