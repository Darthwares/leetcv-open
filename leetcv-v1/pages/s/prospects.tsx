import Container from "@components/container";
import Prospects from "@components/outgoingRequest";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, profileResumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import NotificationTracker from "@lib/helper/notificationTracking";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Prospect: NextPage = () => {
  const setProfileResume = useSetRecoilState(profileResumeState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();
  const { data: resume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);

  NotificationTracker({
    userId,
    type: "prospect",
  });

  useEffect(() => {
    if (resume) {
      setProfileResume(resume);
    }
    setProdTitle(t("prospects"));
  }, [resume]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Prospects | LeetCV"}
        description="Track your outgoing resume requests on LeetCV. Stay informed about the status of your requests with instant notifications and easily manage your connections."
        key={
          "LeetCV, Prospects, Outgoing Requests, Track Requests, Resume Requests"
        }
        canonical={`https://www.leetcv.com/s/prospects`}
        openGraph={{
          url: "https://www.leetcv.com/s/prospects",
          title: "Prospects | LeetCV",
          description:
            "Track your outgoing resume requests on LeetCV. Stay informed about the status of your requests with instant notifications and easily manage your connections.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Prospects",
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
          name: "Prospects",
          description:
            "Track your outgoing resume requests on LeetCV. Stay informed about the status of your requests with instant notifications and easily manage your connections.",
          url: "https://www.leetcv.com/s/prospects",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="pageLevelPadding">
          <Container loading={isLoading}>
            <Prospects />
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
      messages: require(`../../messages/pages/dashboard/${context.locale}.json`),
    },
  };
}

export default Prospect;
