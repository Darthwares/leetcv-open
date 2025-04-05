import Container from "@components/container";
import StreakAnalytics from "@components/dashboard/streak/streakAnalytics";
import StreakModal from "@components/dashboard/streak/streakModal";
import StreakReviews from "@components/dashboard/streak/streakReviews";
import Footer from "@components/home/footer";
import { searchClient } from "@components/search/AlgoliaSearch";
import useDailyUserCount from "@lib/helper/useDailyUserCount";
import { pageTitleState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

const Streak = () => {
  const [userId] = useRecoilState(userIdState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Streak");
  useDailyUserCount();

  const { isLoading } = trpc.useQuery(["fs.resume.getUser", { id: userId }], {
    enabled: !!userId,
  });

  useEffect(() => {
    setProdTitle(t("streak"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Streak | LeetCV"}
        description="Increase your streak points on LeetCV by reviewing public resumes daily. Convert your streak points into tokens to unlock advanced AI features and enhance your professional growth."
        key={"LeetCV, Streak Feature, Resume Reviews, Earn Tokens, AI Features"}
        canonical={`https://www.leetcv.com/s/streak`}
        openGraph={{
          url: "https://www.leetcv.com/s/streak",
          title: "Streak | LeetCV",
          description:
            "Increase your streak points on LeetCV by reviewing public resumes daily. Convert your streak points into tokens to unlock advanced AI features and enhance your professional growth.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Streak",
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
          name: "Streak",
          description:
            "Increase your streak points on LeetCV by reviewing public resumes daily. Convert your streak points into tokens to unlock advanced AI features and enhance your professional growth.",
          url: "https://www.leetcv.com/s/streak",
        })}
      </script>
      <div className="pageLevelPadding" data-testid="streak">
        <Container loading={isLoading}>
          <InstantSearch
            searchClient={searchClient}
            indexName="Resumes"
          ></InstantSearch>
          <StreakModal />
          <StreakAnalytics />
          <StreakReviews />
          <div className="mt-12">
            <Footer />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Streak;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}
