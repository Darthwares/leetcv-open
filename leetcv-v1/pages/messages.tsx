import Footer from "@components/home/footer";
import AIFeature from "@components/public features/aiFeature";
import CustomHero from "@components/public features/customHero";
import IncludePlan from "@components/public features/includedPlan";
import { handleNavigation, messagesData } from "@constants/defaults";
import { ProdTitle } from "@lib/helper/setProdTitle";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import FeatureVideo from "@components/landing page/featureVideo";

const Messages = () => {
  const router = useRouter();
  const { status } = useSession();

  const handleGetStartedClick = () => {
    handleNavigation("/s/messages", status, router);
  };
  ProdTitle("");

  return (
    <div>
      <NextSeo
        title="Messages | LeetCV"
        description="Connect with your peers on LeetCV. Send messages, build connections, and get to know other professionals in your field."
        key={
          "Connect with Peers, Professional Networking, Send Messages, Enhance Career Growth, Build Connections, Networking Opportunities, Peer Messaging, Industry Connections, Expand Professional Network, Find Professionals, View Peer Profiles, Initiate Conversations, Career Advancement, Like-Minded Professionals, Improve Career Growth, Networking Tools, Discover Opportunities, Professional Networking Platform, Peer Connections, Professional Community, Career Networking, Communication Tools"
        }
        canonical="https://www.leetcv.com/messages"
        openGraph={{
          url: "https://www.leetcv.com/messages",
          title: "Messages | LeetCV - Professional Networking & Peer Messaging",
          description:
            "Connect with your peers on LeetCV. Send messages, build connections, and get to know other professionals in your field.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 1200,
              height: 630,
              alt: "LeetCV Messages",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <CustomHero
        primaryButtonText="Get Started for Free!"
        title="Connect with Peers"
        description="Send messages to your peers on LeetCV. Build connections, enhance your professional network, and get to know other professionals in your field. Improve your career growth by connecting with like-minded individuals."
        onPrimaryButtonClick={handleGetStartedClick}
      />
      <FeatureVideo urlId="qu4m9YoOElU" title="How To Connect with Peers" />
      <IncludePlan />
      <AIFeature
        description="Strengthen your professional network with LeetCV's messaging feature. Connect with peers, share insights, and build valuable relationships that can elevate your career. Start meaningful conversations with like-minded professionals and explore new opportunities within your industry."
        sections={messagesData}
      />
      <div className="mt-6 md:mt-8 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Messages;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
