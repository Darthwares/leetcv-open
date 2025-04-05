import Container from "@components/container";
import Footer from "@components/home/footer";
import RequestResources from "@components/resource/requestsResources";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React from "react";
import { ProdTitle } from "@lib/helper/setProdTitle";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const RecruiterAgent = () => {
  const t = useTranslations("RecruiterAgent");
  ProdTitle("Recruiter Agent");
  useDailyUserCount();

  return (
    <div className="dark:bg-gray-900">
      <div className="flex flex-col md:items-center md:justify-center">
        <NextSeo
          title={"Job Recruiter Agent | LeetCV"}
          description="AI Recruiter who screens resumes with you !"
          key={"LeetCV, Job Recruiter Agent, Automatically Job apply"}
          canonical={`https://www.leetcv.com/s/recruiteragent`}
        />
        <Container>
          <div className="py-4 md:mt-8">
            <RequestResources
              title={t("recruiterAgentTitle")}
              message={t("recruiterAgentDesc")}
              path={"/assets/lottie/comingsoon.json"}
            />
          </div>
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default RecruiterAgent;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}
