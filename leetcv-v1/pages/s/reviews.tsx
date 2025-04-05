import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { ReviewList } from "@components/review";
import {
  pageTitleState,
  profileImageState,
  resumeState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { handleSource } from "@constants/defaults";
import { useRouter } from "next/router";
import NotificationTracker from "@lib/helper/notificationTracking";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Reviews: NextPage = () => {
  const setProfileImage = useSetRecoilState(profileImageState);
  const [userId] = useRecoilState(userIdState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Reviews");
  const [resume] = useRecoilState(resumeState);
  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });
  useDailyUserCount();
  NotificationTracker({
    userId,
    type: "reviews",
  });

  const { data: user, isLoading } = trpc.useQuery(
    ["fs.resume.getUser", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    setProdTitle(t("reviews"));
    setProfileImage(user?.image);
  }, []);

  return (
    <>
      <NextSeo
        title={"Reviews | LeetCV"}
        description="Enhance your resume with feedback from peers on LeetCV. Receive reviews on your experiences, publications, projects, and more, and address any corrections to improve your professional profile."
        key={
          "LeetCV, Reviews, Resume Feedback, Peer Reviews, Professional Growth"
        }
        canonical={`https://www.leetcv.com/s/reviews`}
        openGraph={{
          url: "https://www.leetcv.com/s/reviews",
          title: "Reviews | LeetCV",
          description:
            "Enhance your resume with feedback from peers on LeetCV. Receive reviews on your experiences, publications, projects, and more, and address any corrections to improve your professional profile.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Reviews",
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
          name: "Reviews",
          description:
            "Enhance your resume with feedback from peers on LeetCV. Receive reviews on your experiences, publications, projects, and more, and address any corrections to improve your professional profile.",
          url: "https://www.leetcv.com/s/reviews",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="pageLevelPadding" data-testid="review">
          <Container loading={isLoading}>
            <div className="lg:pt-6">
              <ReviewList />
            </div>
            <div className="mt-12">
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

export default Reviews;
