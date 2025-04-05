import React, { useEffect } from "react";
import AIResume from "./aiResume";
import ConvertResume from "./convertResume";
import Blogs from "./blogs";
import HeroHome from "./heroHome";
import ProductHuntBadge from "@components/productHuntBadge";
import Feedback from "@components/home/feedback";
import Footer from "@components/home/footer";
import { NextSeo } from "next-seo";
import { useTranslations } from "next-intl";
import { Pricing } from "@components/home/pricing";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import PortfolioSummary from "./portfolio";
import { AllFeaturesLists } from "./allFeatureList";
import MockInterview from "./mockInterview";

const AllFeatures = () => {
  const { status } = useSession();
  const t = useTranslations("HomePage");
  const { data: razorpayCustomerId } = trpc.useQuery(
    ["fs.stripe.getRazoapayCustId"],
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (status === "loading") {
      return;
    }
  }, [razorpayCustomerId]);

  return (
    <div>
      <NextSeo
        title={
          "Create Your Professional Resume and CV Online | Free Ai Resume Builder - LeetCV"
        }
        description={t("homeDescription")}
        key={
          "AI Resume Builder, Effortless Resume Creation, Customized Resume Templates, Standout Resumes, Job Winning Resumes, Resume Tips and Tricks, ATS-Friendly Resumes, Professional Resume Templates, Fast Resume Creation, AI-Powered Resume Builder, Portfolio Builder, Career Portfolio, Optimize for Recruiters, Convert LinkedIn Resume, Tailored Cover Letters, Resume Review Service, Professional Portfolio Presentation, Improve Job Matching, Real-Time Feedback on Resumes, Enhance Your Resume, LeetCV. LeetCV Home page. LeetCV Resume builder, LeetCV AI Resume."
        }
        canonical={t("canonical")}
      />
      <HeroHome />
      <AIResume />
      <MockInterview />
      <PortfolioSummary />
      <ConvertResume />
      <AllFeaturesLists />
      <div className="space-y-2 mt-2 mb-8">
        <ProductHuntBadge />
        <Feedback />
      </div>
      <section className="bg-white px-4">
        <Pricing razorpayCustomerId={razorpayCustomerId!} />
      </section>
      <Blogs />
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default AllFeatures;
