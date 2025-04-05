import PrivacySettings from "@components/settings/privacySettings";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import Container from "@components/container";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Privacy = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Resume Privacy | LeetCV"}
        description="Manage the privacy of your resume on LeetCV. Keep your professional qualifications and experiences confidential, ensuring they are shared only with authorized viewers."
        key={
          "LeetCV, Resume Privacy, Confidential Resume, Manage Privacy, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/privacy`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/privacy",
          title: "Resume Privacy | LeetCV",
          description:
            "Manage the privacy of your resume on LeetCV. Keep your professional qualifications and experiences confidential, ensuring they are shared only with authorized viewers.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Resume Privacy",
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
          name: "Resume Privacy",
          description:
            "Manage the privacy of your resume on LeetCV. Keep your professional qualifications and experiences confidential, ensuring they are shared only with authorized viewers.",
          url: "https://www.leetcv.com/s/settings/privacy",
        })}
      </script>
      <Container>
        <PrivacySettings />
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Privacy;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
