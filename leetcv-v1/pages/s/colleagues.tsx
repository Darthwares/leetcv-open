import ColleaguesListContainer from "@components/colleagues/colleaguesContainer";
import Container from "@components/container";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";
import { pageTitleState, resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const Colleagues = () => {
  const [resume] = useRecoilState(resumeState);
  const { status } = useSession();
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Colleagues");
  useDailyUserCount();

  const { data: matchingUsers, isLoading } = trpc.useQuery(
    ["fs.dashboard.getColleagues", { userId: resume.id }],
    {
      enabled: !!resume.id && status === "authenticated",
    }
  );

  useEffect(() => {
    setProdTitle(t("colleagues"));
  }, [matchingUsers]);

  return (
    <>
      <NextSeo
        title={"Colleagues | LeetCV"}
        description="Network with colleagues from your company or college on LeetCV. Connect with your colleagues on LeetCV and keep track of your professional connections."
        key={
          "LeetCV, Colleagues, Professional Network, Company Connections, College Connections, Email Domain Networking"
        }
        canonical={`https://www.leetcv.com/s/colleagues`}
        openGraph={{
          url: "https://www.leetcv.com/s/colleagues",
          title: "Colleagues | LeetCV",
          description:
            "Network with colleagues from your company or college on LeetCV. Connect with your colleagues on LeetCV and keep track of your professional connections.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Colleagues",
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
          name: "Colleagues",
          description:
            "Network with colleagues from your company or college on LeetCV. Connect with your colleagues on LeetCV and keep track of your professional connections.",
          url: "https://www.leetcv.com/s/colleagues",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div
          className="flex flex-col md:items-center md:justify-center"
          data-testid="colleagues"
        >
          <Container loading={isLoading}>
            <ColleaguesListContainer />
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

export default Colleagues;
