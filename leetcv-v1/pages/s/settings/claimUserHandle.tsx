import ClaimUserHandle from "@components/settings/claimUserHandle";
import { GetStaticPropsContext } from "next";
import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import { defaultUsersTour } from "@lib/helper/tourConfig";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const ClaimUserHandles = () => {
  const t = useTranslations("ResumeEditor");
  const setProdTitle = useSetRecoilState(pageTitleState);
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));

    defaultUsersTour();
  }, []);

  return (
    <>
      <NextSeo
        title={"Claim Handle Name | LeetCV"}
        description="Personalize your online identity on LeetCV by modifying your username. Choose a unique and recognizable handle to represent yourself effectively."
        key={
          "LeetCV, Claim Handle Name, Username, Personalize Identity, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/claimUserHandle`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/claimUserHandle",
          title: "Claim Handle Name | LeetCV",
          description:
            "Personalize your online identity on LeetCV by modifying your username. Choose a unique and recognizable handle to represent yourself effectively.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Claim Handle Name",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Claim Handle Name",
          description:
            "Personalize your online identity on LeetCV by modifying your username. Choose a unique and recognizable handle to represent yourself effectively.",
          url: "https://www.leetcv.com/s/settings/claimUserHandle",
        })}
      </script>
      <Container>
        <ClaimUserHandle />
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default ClaimUserHandles;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
