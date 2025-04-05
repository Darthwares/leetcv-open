import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import Container from "@components/container";
import ResumeForm from "@components/editor/resumeForm";
import type { GetStaticPropsContext, NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pageTitleState,
  resumeState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { trpc } from "utils/trpc";
import ProgressBar from "@components/progressBar";
import { useAutoSave } from "@lib/helper/useAutoSave";
import { useTranslations } from "next-intl";
import FormFAB from "@components/editor/formFAB";
import { defaultEditorTour } from "@lib/helper/tourConfig";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import useMessengerToken from "@lib/firebase/setMessenger";
import TokenManager from "@components/tokenManager";
import AutoSyncResume from "@components/syncResume";
import HereAboutUs from "@components/hereAboutUs";
import { useRouter } from "next/router";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const ResumeEditor: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const [userId] = useRecoilState(userIdState);
  const [resume, setResume] = useRecoilState(resumeState);
  const { handleAutoSave } = useAutoSave();
  const t = useTranslations("ResumeEditor");
  const setTokens = useSetRecoilState(tokenCountState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });
  useDailyUserCount();

  const { error, isLoading } = trpc.useQuery(
    ["fs.resume.get", { id: userId }],
    {
      enabled: status === "authenticated",
      refetchOnWindowFocus: false,
    }
  );

  const { data: tokenCount } = trpc.useQuery([
    "fs.gptToken.checkToken",
    { id: userId, handle: resume.handle },
  ]);

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

  const { targetToken } = useMessengerToken();

  useEffect(() => {
    setProdTitle(t("resumeEditor"));
    defaultEditorTour();
    setTokens(tokenCount);
  }, [tokenCount, matchingUsers, isReturningUser]);

  useEffect(() => {
    handleAutoSave();
  }, [resume]);

  if (error) {
    return (
      <>
        <div>{error.message}</div>
        <div>{JSON.stringify(error)}</div>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={t("resumeEditorTitle")}
        description={t("resumeEditorDesc")}
        key={t("resumeEditorTags")}
        canonical={`${window.location.origin}/s/resumeEditor`}
        openGraph={{
          url: "https://www.leetcv.com/s/resumeEditor",
          title: "Resume Editor | LeetCV",
          description:
            "Enhance your resume with LeetCV's Resume Editor. Easily edit and format your resume to perfection, with user-friendly tools designed to help you highlight your skills and achievements.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Resume Editor",
            },
          ],
          site_name: "LeetCV",
          type: "website",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Resume Editor",
          description:
            "Create and edit your resume easily with LeetCV's Resume Editor",
          url: `${window.location.origin}/s/resumeEditor`,
        })}
      </script>
      <div className="pageLevelPadding w-full">
        <AutoSyncResume setResume={setResume} />
        <TokenManager
          userId={userId}
          resumeDisplayName={resume.displayName}
          targetToken={targetToken!}
        />
        <Container loading={isLoading}>
          {status === "authenticated" && (
            <div className="ml-0 lg:ml-1">
              <div className="mt-5 ml-0 lg:ml-1">
                <ProgressBar />
              </div>
              <div className="space-y-3 relative z-20">
                <ResumeForm />
              </div>
            </div>
          )}
          <HereAboutUs />
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
        <FormFAB />
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

export default ResumeEditor;
