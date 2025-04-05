import Container from "@components/container";
import IncomingRequest from "@components/incomingRequest";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, profileResumeState, userIdState } from "@state/state";
import { trpc } from "utils/trpc";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { useRouter } from "next/router";
import { handleSource } from "@constants/defaults";
import NotificationTracker from "@lib/helper/notificationTracking";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Requests: NextPage = () => {
  const setProfileResume = useSetRecoilState(profileResumeState);
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("ResumeEditor");
  useDailyUserCount();

  const { data: userResume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);
  const setProdTitle = useSetRecoilState(pageTitleState);

  const resume = {
    handle: userResume?.handle!,
    displayName: userResume?.displayName!,
    email: userResume?.email!,
  };

  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });
  NotificationTracker({
    userId,
    type: "access-request",
  });
  useEffect(() => {
    setProdTitle(t("requests"));
    if (userResume) {
      setProfileResume(userResume);
    }
  }, [userResume]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Requests | LeetCV"}
        description="Manage access to your private resume on LeetCV. Review and respond to incoming requests to control who can view your resume, with the option to accept or deny permissions at any time."
        key={
          "LeetCV, Requests, Incoming Requests, Resume Privacy, Manage Access"
        }
        canonical={`https://www.leetcv.com/s/requests`}
        openGraph={{
          url: "https://www.leetcv.com/s/requests",
          title: "Requests | LeetCV",
          description:
            "Manage access to your private resume on LeetCV. Review and respond to incoming requests to control who can view your resume, with the option to accept or deny permissions at any time.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Requests",
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
          name: "Requests",
          description:
            "Manage access to your private resume on LeetCV. Review and respond to incoming requests to control who can view your resume, with the option to accept or deny permissions at any time.",
          url: "https://www.leetcv.com/s/requests",
        })}
      </script>
      <div className="flex flex-col md:items-center md:justify-center dark:bg-gray-900">
        <Container loading={isLoading}>
          <IncomingRequest />
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
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

export default Requests;
