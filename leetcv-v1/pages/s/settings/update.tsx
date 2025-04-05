import Container from "@components/container";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import SyncApp from "@components/settings/syncApp";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Update = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Sync your LeetCV | LeetCV"}
        description="Effortlessly sync your LeetCV data across devices and platforms to maintain up-to-date professional information for easy career management."
        key={
          "LeetCV, Sync Data, Career Management, Professional Information, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/update`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/update",
          title: "Sync your LeetCV | LeetCV",
          description:
            "Effortlessly sync your LeetCV data across devices and platforms to maintain up-to-date professional information for easy career management.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Sync",
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
          name: "Sync your LeetCV",
          description:
            "Effortlessly sync your LeetCV data across devices and platforms to maintain up-to-date professional information for easy career management.",
          url: "https://www.leetcv.com/s/settings/update",
        })}
      </script>
      <Container>
        <SyncApp />
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Update;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
