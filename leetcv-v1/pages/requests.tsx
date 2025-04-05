import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import IncludePlan from "@components/public features/includedPlan";
import { handleNavigation, requestData } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";

const Requests = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleGetStartedClick = () => {
    handleNavigation("/s/requests", status, router);
  };
  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Requests | LeetCV"
        description="Manage connection requests on LeetCV. Send, receive, and manage requests to build your professional network. Access resumes after approval for informed networking."
        key={
          "Resume Requests, Professional Network, Send Connection Requests, Receive Connection Requests, Approve or Deny Requests, Access Resumes, Build Professional Network, Connect with Peers, Network Management, Meaningful Connections, Professional Profile Access, Privacy and Consent, Streamlined Connections, Peer Networking, Resume Sharing, Professional Circle, Connection Notifications, Enhance Professional Network, Networking Control, Connect with Professionals, Professional Networking, Career Networking"
        }
        canonical="https://www.leetcv.com/requests"
        openGraph={{
          url: "https://www.leetcv.com/requests",
          title: "Requests | LeetCV - Manage Your Professional Network",
          description:
            "Manage connection requests on LeetCV. Send, receive, and manage requests to build your professional network. Access resumes after approval for informed networking.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Requests",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />

      <CustomHero
        title="Resume Requests"
        description="Send and receive connection requests on LeetCV. Accept or deny requests and access resumes after approval to build a strong professional network."
        primaryButtonText="Get Started for Free!"
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo urlId="MgrxDGxe2YI" title="How To Use Resume Requests" />
      <IncludePlan />
      <AIFeature
        description="Seamlessly manage your connection requests on LeetCV. Send, receive, and approve requests to expand your professional network. Access resumes and connect with peers to foster meaningful relationships and career growth."
        sections={requestData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Requests;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
