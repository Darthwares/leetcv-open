import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, userIdState } from "@state/state";
import { trpc } from "utils/trpc";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import CheckFollowing from "@components/checkFollowing";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Connect: NextPage = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("CheckFollowing");
  useDailyUserCount();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const { data: resume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);

  useEffect(() => {
    setProdTitle(t("following"));
  }, [resume]);

  return (
    <>
      <NextSeo
        title={"Following | LeetCV"}
        description="Manage and track the professionals you are following on LeetCV. Stay updated with their activities and maintain strong connections within your network."
        key={"LeetCV, Following, Professional Network, Manage Connections"}
        canonical={`https://www.leetcv.com/s/following`}
        openGraph={{
          url: "https://www.leetcv.com/s/following",
          title: "Following | LeetCV",
          description:
            "Manage and track the professionals you are following on LeetCV. Stay updated with their activities and maintain strong connections within your network.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Following",
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
          name: "Following",
          description:
            "Manage and track the professionals you are following on LeetCV. Stay updated with their activities and maintain strong connections within your network.",
          url: "https://www.leetcv.com/s/following",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="flex flex-col md:items-center md:justify-center">
          <Container loading={isLoading}>
            <CheckFollowing />
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

export default Connect;
