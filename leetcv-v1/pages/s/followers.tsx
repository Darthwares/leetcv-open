import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, userIdState } from "@state/state";
import { trpc } from "utils/trpc";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import CheckFollowers from "../../components/checkFollowers";
import NotificationTracker from "@lib/helper/notificationTracking";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Followers: NextPage = () => {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("CheckFollowers");
  const setProdTitle = useSetRecoilState(pageTitleState);
  useDailyUserCount();

  const { data: resume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);
  NotificationTracker({
    userId,
    type: "followers",
  });
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    setProdTitle(t("followers"));
  }, [resume]);

  return (
    <>
      <NextSeo
        title={"Followers | LeetCV"}
        description="Track and manage your followers on LeetCV. Stay connected with your professional network and keep up with those who follow your updates and activities."
        key={
          "LeetCV, Followers, Professional Network, Manage Followers, Stay Connected"
        }
        canonical={`https://www.leetcv.com/s/followers`}
        openGraph={{
          url: "https://www.leetcv.com/s/followers",
          title: "Followers | LeetCV",
          description:
            "Track and manage your followers on LeetCV. Stay connected with your professional network and keep up with those who follow your updates and activities.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Followers",
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
          name: "Followers",
          description:
            "Track and manage your followers on LeetCV. Stay connected with your professional network and keep up with those who follow your updates and activities.",
          url: "https://www.leetcv.com/s/followers",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="flex flex-col md:items-center md:justify-center">
          <Container loading={isLoading}>
            <CheckFollowers />
            <div className="pt-14">
              <Footer />
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default Followers;
