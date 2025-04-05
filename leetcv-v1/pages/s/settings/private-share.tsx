import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import Container from "@components/container";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import PrivateLink from "@components/settings/privateLink";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const PrivateShare = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Private Sharable Link | LeetCV"}
        description="Create a private, secure link to share your professional resume with specific people or organizations, keeping it confidential and not public."
        key={
          "LeetCV, Private Sharable Link, Secure Resume Sharing, Confidential Resume, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/private-share`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/private-share",
          title: "Private Sharable Link | LeetCV",
          description:
            "Create a private, secure link to share your professional resume with specific people or organizations, keeping it confidential and not public.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Private Sharable Link",
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
          name: "Private Sharable Link",
          description:
            "Create a private, secure link to share your professional resume with specific people or organizations, keeping it confidential and not public.",
          url: "https://www.leetcv.com/s/settings/private-share",
        })}
      </script>
      <Container>
        <div className="">
          <PrivateLink />
        </div>
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default PrivateShare;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
