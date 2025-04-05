import Container from "@components/container";
import ReferralCode from "@components/settings/referral/referralCode";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pageTitleState,
  resumeState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const ReferralCodes = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Referral Code | LeetCV"}
        description="Unlock exclusive benefits on LeetCV with your unique referral code. Share it with friends, colleagues, and connections to enhance their experience and enjoy rewards."
        key={
          "LeetCV, Referral Code, Share Referral, Exclusive Benefits, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/referral-code`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/referral-code",
          title: "Referral Code | LeetCV",
          description:
            "Unlock exclusive benefits on LeetCV with your unique referral code. Share it with friends, colleagues, and connections to enhance their experience and enjoy rewards.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Referral Code",
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
          name: "Referral Code",
          description:
            "Unlock exclusive benefits on LeetCV with your unique referral code. Share it with friends, colleagues, and connections to enhance their experience and enjoy rewards.",
          url: "https://www.leetcv.com/s/settings/referral-code",
        })}
      </script>
      <Container>
        <div className="">
          <ReferralCode />
        </div>
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default ReferralCodes;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
