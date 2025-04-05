import RecoverOldAccount from "@components/settings/recoverOldAccount";
import { GetStaticPropsContext } from "next";
import React, { useEffect } from "react";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { useTranslations } from "next-intl";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const RecoverOldAccounts = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Recover Old Account | LeetCV"}
        description="Recover your old LeetCV account by entering the recovery code and associated email. Note that your current resume will be replaced by the old account's resume, and this action is irreversible."
        key={
          "LeetCV, Recover Old Account, Account Recovery, Resume Replacement, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/recover-old-account`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/recover-old-account",
          title: "Recover Old Account | LeetCV",
          description:
            "Recover your old LeetCV account by entering the recovery code and associated email. Note that your current resume will be replaced by the old account's resume, and this action is irreversible.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Recover Old Account",
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
          name: "Recover Old Account",
          description:
            "Recover your old LeetCV account by entering the recovery code and associated email. Note that your current resume will be replaced by the old account's resume, and this action is irreversible.",
          url: "https://www.leetcv.com/s/settings/recover-old-account",
        })}
      </script>
      <Container>
        <div className="">
          <RecoverOldAccount />
        </div>
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default RecoverOldAccounts;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
