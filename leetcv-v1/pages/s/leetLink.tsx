import Container from "@components/container";
import Footer from "@components/home/footer";
import UpgradePro from "@components/leetLink/upgradePro";
import { ProdTitle } from "@lib/helper/setProdTitle";
import useDailyUserCount from "@lib/helper/useDailyUserCount";
import {
  leetFormVisibleState,
  profileResumeState,
  sideBarOpenState,
  subscriptionPlanState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { LeetUi } from "shadcn/components/component/leetUi";
import LinkForm from "shadcn/components/component/linkForm";

const LeetLink = () => {
  const { status } = useSession();
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
  const setProfileResume = useSetRecoilState(profileResumeState);
  const [leetFormVisible] = useRecoilState(leetFormVisibleState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const t = useTranslations("LeetLink");
  ProdTitle(t("leetLink"));
  useDailyUserCount();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const { data: userResume } = trpc.useQuery(
    ["fs.resume.get", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  useEffect(() => {
    if (userResume) {
      setProfileResume(userResume);
    }
  }, [userResume, userId]);

  return (
    <>
      <NextSeo
        title={"LeetLink | LeetCV"}
        description="Create and share your professional LeetLink to showcase your resume and portfolio data on LeetCV."
        key={"LeetCV, LeetLink, Professional Link, Showcase Resume, Portfolio"}
        canonical={`https://www.leetcv.com/s/leetlink`}
        openGraph={{
          url: "https://www.leetcv.com/s/leetlink",
          title: "LeetLink | LeetCV",
          description:
            "Create and share your professional LeetLink to showcase your resume and portfolio data on LeetCV.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV LeetLink",
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
          name: "LeetLink",
          description:
            "Create and share your professional LeetLink to showcase your resume and portfolio data on LeetCV.",
          url: "https://www.leetcv.com/s/leetlink",
        })}
      </script>
      <div className="pageLevelPadding">
        <Container>
          <div className="brand-bg">
            {plan !== "Pro" ? (
              <UpgradePro />
            ) : (
              <div className="py-10 max-w-7xl mx-auto px-1 md:px-6 lg:px-10">
                <div className="max-w-xl mx-auto lg:max-w-none">
                  <h1 className="font-bold text-2xl md:text-3xl mb-4">
                    {t("leetLinkTitle")}
                  </h1>
                  <p className="text-gray-500">{t("leetLinkDescription")}</p>
                </div>
                <div className="max-w-xl mx-auto lg:hidden">
                  {leetFormVisible ? <LinkForm /> : <LeetUi />}
                </div>
                <div
                  className={`w-full hidden lg:flex ${
                    isSideBarClosed
                      ? "lg:gap-12 lg:flex-row"
                      : "lg:gap-6 lg:flex-col"
                  } xl:flex-row xl:gap-12 lg:pt-3`}
                >
                  <LinkForm />
                  <LeetUi />
                </div>
              </div>
            )}
            <Footer />
          </div>
        </Container>
      </div>
    </>
  );
};

export default LeetLink;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
