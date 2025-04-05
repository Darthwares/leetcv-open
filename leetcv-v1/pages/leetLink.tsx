import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import Footer from "@components/home/footer";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { useRouter } from "next/router";
import { handleNavigation, leetLinkFeatures } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { ProdTitle } from "@lib/helper/setProdTitle";
import IncludedPlan from "@components/public features/includedPlan";
import FeatureVideo from "@components/landing page/featureVideo";

const LeetLink = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleGetStartedClick = () => {
    handleNavigation("/s/leetLink", status, router);
  };

  ProdTitle("");

  return (
    <>
      <NextSeo
        title="LeetLink | LeetCV"
        description="Create and share your professional LeetLink to showcase your resume, portfolio, and social media profiles all in one place."
        key={
          "LeetCV, LeetLink, Professional Link, Showcase Resume, Portfolio, Social Media, Digital Resume, Online Portfolio, Professional Networking, Career Showcase, Shareable Professional Link, LeetCV Profile, Personal Branding"
        }
        canonical="https://www.leetcv.com/leetLink"
        openGraph={{
          url: "https://www.leetcv.com/leetLink",
          title: "LeetLink | LeetCV - Showcase Your Resume and Portfolio",
          description:
            "Create and share your professional LeetLink to showcase your resume, portfolio, and social media profiles all in one place.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV LeetLink",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        description="Create your professional LeetLink to connect with employers, showcase your resume, portfolio, and social media profiles in one simple link."
        primaryButtonText="Create Your LeetLink"
        title="Create and Share Your Professional LeetLink"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo
        urlId="svomo5zvJ2g"
        title="How to Create and Share Your LeetLink"
      />
      <IncludedPlan />
      <AIFeature
        description="Showcase your professional brand with LeetLink by combining your resume, portfolio, and social media profiles in one easy-to-share link. Simplify the way you present yourself to potential employers and connections, and make a lasting impression with a sleek, all-in-one professional profile."
        sections={leetLinkFeatures}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </>
  );
};

export default LeetLink;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
