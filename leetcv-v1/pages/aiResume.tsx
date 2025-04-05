import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import Footer from "@components/home/footer";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { useRouter } from "next/router";
import { aiData, handleNavigation } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { ProdTitle } from "@lib/helper/setProdTitle";
import IncludedPlan from "@components/public features/includedPlan";
import FeatureVideo from "@components/landing page/featureVideo";

const AiResume = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleGetStartedClick = () => {
    handleNavigation("/s/aiResume", status, router);
  };

  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="AI Resume Builder | LeetCV"
        description="Create job-specific, AI-enhanced resumes with LeetCV's powerful AI Resume Builder. Maximize your career opportunities with modern resume templates, personalized insights, and detailed resume reviews."
        key={
          "AI Resume Builder, AI-Enhanced Resumes, Resume Customization, Job-Specific Resumes, AI-Powered Resume Writing, Tailored Resumes, Professional Resume Templates, Career Growth Tools, AI Resume Insights, Resume Reviews, Resume Optimization, AI Career Tools, Modern Resume Builder"
        }
        canonical="https://www.leetcv.com/aiResume"
        openGraph={{
          url: "https://www.leetcv.com/aiResume",
          title:
            "AI Resume Builder | LeetCV - Tailored AI-Powered Resumes for Your Career",
          description:
            "Create job-specific, AI-enhanced resumes with LeetCV's powerful AI Resume Builder. Maximize your career opportunities with modern resume templates, personalized insights, and detailed resume reviews.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV AI Resume Builder",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        description="Provide basic details like your name, industry, expertise, and experience. Our AI will craft a polished resume tailored to your job function, enhancing your chances of getting noticed by hiring managers."
        primaryButtonText="Get Started for Free!"
        title="Effortless Resume Creation"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo
        urlId="9KpjnKiyJS0"
        title="How To Use Effortless Resume Creation"
      />
      <IncludedPlan />
      <AIFeature
        description="Elevate your job applications with LeetCV's AI-powered resume builder. Tailor your resume to specific roles, highlight key skills, and gain a competitive edge with personalized insights that help you stand out in today's job market."
        sections={aiData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AiResume;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
