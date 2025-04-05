import { GetStaticPropsContext } from "next";
import WaitListAccess from "@components/waitList/waitlistAccess";
import { useAutoSave } from "@lib/helper/useAutoSave";
import { useEffect } from "react";
import {
  pageTitleState,
  resumeState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import { trpc } from "@utils/trpc";
import Footer from "@components/home/footer";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}

export default function WaitList() {
  const router = useRouter();
  const { status } = useSession();
  useDailyUserCount();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const { handleAutoSave } = useAutoSave();
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const { isLoading } = trpc.useQuery(["fs.resume.getUser", { id: userId }], {
    enabled: !!userId,
  });
  const setTokens = useSetRecoilState(tokenCountState);
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  const { data: tokenCount } = trpc.useQuery([
    "fs.gptToken.checkToken",
    { id: userId, handle: resume.handle },
  ]);

  useEffect(() => {
    setProdTitle("AI Resume");
    setTokens(tokenCount);
  }, [tokenCount]);

  useEffect(() => {
    handleAutoSave();
  }, [resume]);

  return (
    <>
      <NextSeo
        title={"AI Resume | LeetCV"}
        description="Create a personalized, professional resume with LeetCV's AI-powered tool. Enter your name, specialization, field, and areas of interest, and let our AI suggest relevant skills. Add your project descriptions, and generate a polished resume tailored to your career goals."
        key={
          "LeetCV, AI Resume, Professional Resume, Custom Resume, Skill-Based Resume, ATS Friendly, Career Development"
        }
        canonical={`https://www.leetcv.com/s/aiResume`}
        openGraph={{
          url: "https://www.leetcv.com/s/aiResume",
          title: "AI Resume | LeetCV",
          description:
            "Create a personalized, professional resume with LeetCV's AI-powered tool. Enter your name, specialization, field, and areas of interest, and let our AI suggest relevant skills. Add your project descriptions, and generate a polished resume tailored to your career goals.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV AI Resume",
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
          name: "AI Resume",
          description:
            "Create a personalized, professional resume with LeetCV's AI-powered tool. Enter your name, specialization, field, and areas of interest, and let our AI suggest relevant skills. Add your project descriptions, and generate a polished resume tailored to your career goals.",
          url: "https://www.leetcv.com/s/aiResume",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <Container loading={isLoading}>
          <div className="flex-grow overflow-y-auto">
            <WaitListAccess />
          </div>
          <div className=" pt-14">
            <Footer />
          </div>
        </Container>
      </div>
    </>
  );
}
