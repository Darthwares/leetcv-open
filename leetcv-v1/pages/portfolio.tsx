import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import IncludePlan from "@components/public features/includedPlan";
import { handleNavigation, portfolioData } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";

const Portfolio = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleGetStartedClick = () => {
    handleNavigation("/s/portfolio", status, router);
  };
  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Portfolio | LeetCV"
        description="Create a stunning professional portfolio with LeetCV's AI-powered tools. Showcase your work, enhance your online presence, and attract more opportunities effortlessly."
        key={
          "Showcase Your Portfolio, Professional Portfolio Creation, AI-Powered Portfolio Tools, Highlight Skills and Accomplishments, Recruiter Friendly Portfolios, Visually Appealing Portfolio, Online Presence Enhancement, Personal Brand Strengthening, Portfolio Optimization, Stunning Project Showcase, Effective Work Presentation, Career Growth Demonstration, Attractive Candidate Profile, Network Effectively, Portfolio Content Organization, Up-to-Date Portfolio, Professional Journey Reflection, Job Opportunity Attraction, Competitive Job Market, Career Advancement, Digital Portfolio, Personal Branding"
        }
        canonical="https://www.leetcv.com/portfolio"
        openGraph={{
          url: "https://www.leetcv.com/portfolio",
          title:
            "Portfolio | LeetCV - AI-Powered Professional Portfolio Creation",
          description:
            "Create a stunning professional portfolio with LeetCV's AI-powered tools. Showcase your work, enhance your online presence, and attract more opportunities effortlessly.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Portfolio",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        title="Showcase Your Portfolio"
        description="Create a stunning portfolio to showcase your skills and accomplishments, making it easier for recruiters to see your capabilities and set you apart from other candidates."
        primaryButtonText="Get Started for Free!"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo urlId="xV48DBnwFgI" title="How To Use Portfolio" />
      <IncludePlan />
      <AIFeature
        description="Build a visually stunning portfolio with LeetCV's AI-powered tools. Effortlessly showcase your skills, accomplishments, and projects to enhance your professional online presence and attract more career opportunities."
        sections={portfolioData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Portfolio;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
