import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import { handleNavigation, reviewData } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";
import IncludePlan from "@components/public features/includedPlan";

const Reviews = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleGetStartedClick = () => {
    handleNavigation("/s/reviews", status, router);
  };
  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Reviews | LeetCV"
        description="Get and give reviews on LeetCV. Enhance your professional profile with feedback on your resume, projects, and more. Connect with peers and build a supportive network."
        key={
          "LeetCV, Reviews, Professional Feedback, Peer Reviews, Resume Feedback, Project Reviews, Professional Network, Career Growth, Professional Endorsements, Skill Assessment, Resume Improvement, Collaborative Networking, Job Application Improvement, Peer Support, Review System, Professional Endorsements, Peer Feedback, Project Validation, Career Development, Professional Profile Enhancement"
        }
        canonical="https://www.leetcv.com/reviews"
        openGraph={{
          url: "https://www.leetcv.com/reviews",
          title: "Reviews | LeetCV - Peer and Professional Feedback",
          description:
            "Get and give reviews on LeetCV. Enhance your professional profile with feedback on your resume, projects, and more. Connect with peers and build a supportive network.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Reviews",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        description="Receive and provide feedback on resumes, projects, education, experience, awards, and publications. Enhance your profile with peer reviews and build connections."
        title="Get and Give Reviews"
        primaryButtonText="Get Started for Free!"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo urlId="9KpjnKiyJS0" title="How To Use AI Review" />
      <IncludePlan />
      <AIFeature
        description="Strengthen your professional profile by giving and receiving reviews on LeetCV. Gain valuable feedback on your resume, projects, and skills, while connecting with peers to build a supportive and collaborative network."
        sections={reviewData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Reviews;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
