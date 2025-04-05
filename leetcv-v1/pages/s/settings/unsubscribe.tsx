import Container from "@components/container";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import Unsubscribe from "@components/settings/unsubscribe";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const UnsubscribePlan = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Unsubscribe | LeetCV"}
        description="Unsubscribe from LeetCV to opt-out of our services. This action will permanently remove your access to all LeetCV features and cannot be undone."
        key={"LeetCV, Unsubscribe, Opt-out, Cancel Subscription, Settings"}
        canonical={`https://www.leetcv.com/s/settings/unsubscribe`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/unsubscribe",
          title: "Unsubscribe | LeetCV",
          description:
            "Unsubscribe from LeetCV to opt-out of our services. This action will permanently remove your access to all LeetCV features and cannot be undone.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Unsubscribe",
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
          name: "Unsubscribe",
          description:
            "Unsubscribe from LeetCV to opt-out of our services. This action will permanently remove your access to all LeetCV features and cannot be undone.",
          url: "https://www.leetcv.com/s/settings/unsubscribe",
        })}
      </script>
      <Container>
        <Unsubscribe />
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default UnsubscribePlan;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
