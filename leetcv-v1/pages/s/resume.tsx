import Container from "@components/container";
import FormFAB from "@components/editor/formFAB";
import { ResumeView } from "@components/resumeView";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  attestedRequestState,
  pageTitleState,
  profileResumeState,
  resumeBannerColorState,
  resumeColorState,
  resumeFontState,
  resumeState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { trpc } from "utils/trpc";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import {
  convertLanguages,
  defaultBannerColor,
  defaultFontStyle,
  defaultHeadingColor,
  openResumeId,
} from "@constants/defaults";
import Banner from "@components/banner";
import FeedbackForm from "@components/feedbackForm";
import { useSession } from "next-auth/react";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Resume: NextPage = () => {
  const { status } = useSession();
  const setProfileResume = useSetRecoilState(profileResumeState);
  const setAttestedRequest = useSetRecoilState(attestedRequestState);
  const t = useTranslations("ResumeEditor");
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [userId] = useRecoilState(userIdState);
  const [userInfo] = useRecoilState(resumeState);
  const setTokens = useSetRecoilState(tokenCountState);
  const setFontStyle = useSetRecoilState(resumeFontState);
  const setHeadingColor = useSetRecoilState(resumeColorState);
  const setBannerColor = useSetRecoilState(resumeBannerColorState);
  useDailyUserCount();

  const setStatus = trpc.useMutation(["fs.openAIResume.create"]);

  const { data: resume, isLoading } = trpc.useQuery(
    ["fs.resume.get", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  const { data: attestedUserList } = trpc.useQuery([
    "fs.attestation.getAttestedUserList",
    { id: userId },
  ]);

  const { data: tokenCount } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  const { data: matchingUsers } = trpc.useQuery(
    ["fs.dashboard.getColleagues", { userId }],
    {
      enabled: !!userId && status === "authenticated",
    }
  );

  const { data: isReturningUser } = trpc.useQuery(
    ["fs.viewCount.isReturningUser"],
    {
      enabled: status === "authenticated",
    }
  );

  const { data: resumeStyle, isLoading: resumeStyleLoading } = trpc.useQuery(
    ["fs.resumeStyles.getResumeStyles", { id: userId }],
    {
      enabled: !!userId && status === "authenticated",
    }
  );

  useEffect(() => {
    if (resumeStyle && !resumeStyleLoading) {
      setHeadingColor(resumeStyle.color ?? defaultHeadingColor);
      setFontStyle(resumeStyle.font ?? defaultFontStyle);
      setBannerColor(resumeStyle.bannerColor ?? defaultBannerColor);
    }
  }, [resumeStyle, resumeStyleLoading]);

  useEffect(() => {
    if (tokenCount !== undefined) {
      setTokens(tokenCount);
    }
  }, [tokenCount, setTokens, userInfo.id, matchingUsers, isReturningUser]);

  const getGeneratedResume = localStorage.getItem(openResumeId);

  useEffect(() => {
    setProdTitle(t("resume"));
    if (getGeneratedResume) {
      setStatus
        .mutateAsync({
          resumeId: JSON.parse(getGeneratedResume!),
          handle: userInfo.handle,
        })
        .then(() => {
          localStorage.removeItem(openResumeId);
        });
    }
    if (resume) {
      setProfileResume(resume);
    }
  }, [resume, getGeneratedResume, userId, userInfo]);

  useEffect(() => {
    if (attestedUserList) {
      setAttestedRequest(attestedUserList as any);
    }
  }, [attestedUserList]);

  useEffect(() => {
    if (
      resume?.languages &&
      resume.languages.every((lang) => typeof lang === "string")
    ) {
      const updatedLanguages = convertLanguages(resume.languages);
      if (
        JSON.stringify(resume.languages) !== JSON.stringify(updatedLanguages)
      ) {
        setProfileResume({
          ...resume,
          languages: updatedLanguages,
        });
      }
    }
  }, [resume]);

  return (
    <>
      <NextSeo
        title={"My Resume | LeetCV"}
        description="Welcome to my professional resume homepage on LeetCV. Here, you will find a comprehensive overview of my qualifications, skills, and experience, meticulously curated to highlight my career achievements and expertise."
        key={
          "LeetCV, Online Resume, Professional Resume, Career Overview, ATS Friendly"
        }
        canonical={`https://www.leetcv.com/s/resume`}
        openGraph={{
          url: "https://www.leetcv.com/s/resume",
          title: "My Resume | LeetCV",
          description:
            "Welcome to my professional resume homepage on LeetCV. Here, you will find a comprehensive overview of my qualifications, skills, and experience, meticulously curated to highlight my career achievements and expertise.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Resume",
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
          name: "Resume",
          description:
            "Welcome to my professional resume homepage on LeetCV. Here, you will find a comprehensive overview of my qualifications, skills, and experience, meticulously curated to highlight my career achievements and expertise.",
          url: "https://www.leetcv.com/s/resume",
        })}
      </script>
      <div className="pageLevelPadding">
        <Container loading={isLoading}>
          <div className="max-w-7xl mx-auto">
            {!isLoading && <Banner />}
            <ResumeView />
          </div>
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
        <FormFAB />
      </div>
      <FeedbackForm />
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
export default Resume;
