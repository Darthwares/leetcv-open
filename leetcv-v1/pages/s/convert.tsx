import Container from "@components/container";
import ConfirmResume from "@components/convertToText/confirmConvertedResume";
import ConvertHero from "@components/convertToText/convertHero";
import { ResumeView } from "@components/resumeView";
import {
  highlightingState,
  pageTitleState,
  profileResumeState,
  resumeConversionState,
  resumeState,
  subscriptionPlanState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ConvertText from "@components/convertToText/convertText";
import Footer from "@components/home/footer";
import RefiningHeader from "@components/convertToText/refiningHeader";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { useRouter } from "next/router";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Convert = () => {
  const [resume] = useRecoilState(profileResumeState);
  const [userInfo] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const [isConverted] = useRecoilState(resumeConversionState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const [isHighlighting] = useRecoilState(highlightingState);
  const t = useTranslations("Convert");
  const { isLoading } = trpc.useQuery(["fs.resume.get", { id: userId }]);
  const setTokens = useSetRecoilState(tokenCountState);
  useDailyUserCount();

  const { data: tokenCount } = trpc.useQuery([
    "fs.gptToken.checkToken",
    { id: userInfo?.id, handle: userInfo?.handle },
  ]);

  const setProdTitle = useSetRecoilState(pageTitleState);
  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  useEffect(() => {
    setProdTitle(t("convertResume"));
    if (tokenCount !== undefined) {
      setTokens(tokenCount);
    }
  }, [tokenCount, setTokens, userInfo.id]);

  useEffect(() => {
    ``;
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Convert Resume | LeetCV"}
        description="Easily convert your old resume into a new, ATS-friendly professional resume with LeetCV's AI-powered tool. Upload your existing resume, and let our AI transform it to enhance your career opportunities."
        key={
          "LeetCV, Convert Resume, AI Resume Conversion, ATS Friendly Resume, Professional Resume, Resume Update"
        }
        canonical={`https://www.leetcv.com/s/convert`}
        openGraph={{
          url: "https://www.leetcv.com/s/convert",
          title: "Convert Resume | LeetCV",
          description:
            "Easily convert your old resume into a new, ATS-friendly professional resume with LeetCV's AI-powered tool. Upload your existing resume, and let our AI transform it to enhance your career opportunities.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Convert Resume",
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
          name: "Convert Resume",
          description:
            "Easily convert your old resume into a new, ATS-friendly professional resume with LeetCV's AI-powered tool. Upload your existing resume, and let our AI transform it to enhance your career opportunities.",
          url: "https://www.leetcv.com/s/convert",
        })}
      </script>
      <div className="pageLevelPadding">
        <Container loading={isLoading}>
          <div className="mt-6 lg:mt-0">
            {(plan === "Pro" ||
              plan === "Premium" ||
              (plan === "" && tokenCount > 0)) && (
              <div className="pb-14">
                <div className="mx-auto">
                  {isConverted && resume && !isHighlighting && (
                    <ConfirmResume />
                  )}
                  {isHighlighting && <RefiningHeader />}
                  {!isConverted && <ConvertText />}
                  {isConverted && resume && <ResumeView />}
                </div>
              </div>
            )}
            {plan === "" && tokenCount <= 0 && <ConvertHero />}
          </div>
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
      </div>
    </>
  );
};
export default Convert;
export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
