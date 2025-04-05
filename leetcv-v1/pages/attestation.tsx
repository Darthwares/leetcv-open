import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import IncludePlan from "@components/public features/includedPlan";
import { attestationData, handleNavigation } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";

const Attestation = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleGetStartedClick = () => {
    handleNavigation("/s/prospectAttestation", status, router);
  };
  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Attestation | LeetCV"
        description="Request project attestations on LeetCV. Get your projects reviewed and approved by peers to enhance your professional profile. Maintain high-quality standards with controlled approvals."
        key={
          "Attestation Requests, Project Attestations, Peer Project Reviews, Professional Profile Enhancement, Approve or Deny Requests, Controlled Approvals, Professional Attestations, Project Approval Workflow, Peer-Reviewed Projects, High-Quality Standards, Professional Growth, Verified Projects, Endorsement Process, Skill Validation, Project Validation, Peer Endorsements, Professional Recognition, Career Development Tools, LeetCV Attestations"
        }
        canonical="https://www.leetcv.com/attestation"
        openGraph={{
          url: "https://www.leetcv.com/attestation",
          title:
            "Attestation | LeetCV - Professional Peer-Reviewed Project Endorsements",
          description:
            "Request project attestations on LeetCV. Get your projects reviewed and approved by peers to enhance your professional profile. Maintain high-quality standards with controlled approvals.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Attestation Feature",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />

      <CustomHero
        title="Project Attestation"
        description="Request project attestations from peers on LeetCV. Approve or deny requests to maintain high-quality professional profiles, ensuring accurate and credible endorsements. Evaluate each request carefully to uphold standards and provide value to users."
        onPrimaryButtonClick={handleGetStartedClick}
        primaryButtonText="Get Started for Free!"
      />
      <FeatureVideo
        urlId="veOYfdDoUMA"
        title="How To Use Project Attestation"
      />
      <IncludePlan />
      <AIFeature
        description="Strengthen your professional profile with project attestations on LeetCV. Request peer reviews and approvals for your projects to showcase credibility and maintain high-quality standards in your work. Build trust and demonstrate your expertise with verified achievements."
        sections={attestationData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Attestation;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
