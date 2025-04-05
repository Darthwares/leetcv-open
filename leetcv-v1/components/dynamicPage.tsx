import Container from "@components/container";
import { ResumeView } from "@components/resumeView";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  blurState,
  pageTitleState,
  profileImageState,
  profileResumeState,
  prospectApprovalState,
  resumeState,
  tokenCountState,
  userIdState,
  viewCounterState,
  subscriptionPlanState,
  have90daysAccessState,
  resumeFontState,
  resumeColorState,
  resumeBannerColorState,
} from "@state/state";
import { useSession } from "next-auth/react";
import SignInToView from "@components/signInToView";
import RequestAccess from "@components/requestAccess";
import { Loader } from "@components/loader";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import ChatIconButton from "@components/chatIconButton";
import Head from "next/head";
import ResumeSkeletonContainer from "@components/resumeSkeletons/resumeSkeletonContainer";
import PortfolioView from "@components/portfolio/portfolioView";
import PortfolioNavBtn from "@components/portfolioNavBtn";
import FreeAccessBanner from "@components/freeAccessBanner";
import { trpc } from "@utils/trpc";
import HandleNotFound from "./handleNotFound";
import { SharePortfolio } from "./portfolio/sharePortfolio";
import { LeetUi } from "shadcn/components/component/leetUi";
import LeetUiSkeleton from "./leetLink/leetUiSkeleton";
import {
  defaultBannerColor,
  defaultFontStyle,
  defaultHeadingColor,
} from "@constants/defaults";

type ProfileViewPageProps = {
  profileType: "resume" | "portfolio" | "leetLink";
  fileName: string;
};

const ProfileViewPage: React.FC<ProfileViewPageProps> = ({
  profileType,
  fileName,
}) => {
  const t = useTranslations("ProfileHeader");
  const { status } = useSession();
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
  const setProspectApproval = useSetRecoilState(prospectApprovalState);
  const { handle, passcode, roll } = router.query;
  const [profileResume, setProfileResume] = useRecoilState(profileResumeState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const setProfileImage = useSetRecoilState(profileImageState);
  const setResumeViewCounter = useSetRecoilState(viewCounterState);
  const [userInfo] = useRecoilState(resumeState);
  const setTokens = useSetRecoilState(tokenCountState);
  const setBlurred = useSetRecoilState(blurState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const [canAccess] = useRecoilState(have90daysAccessState);
  const [showAccessBanner, setShowAccessBanner] = useState<boolean>(false);
  const setFontStyle = useSetRecoilState(resumeFontState);
  const setHeadingColor = useSetRecoilState(resumeColorState);
  const setBannerColor = useSetRecoilState(resumeBannerColorState);

  const { data: resumeStyle, isLoading: resumeStyleLoading } = trpc.useQuery(
    ["fs.resumeStyles.getResumeStyles", { id: profileResume.id }],
    {
      enabled: !!profileResume.id && status === "authenticated",
    }
  );

  useEffect(() => {
    if (resumeStyle && !resumeStyleLoading) {
      setHeadingColor(resumeStyle.color ?? defaultHeadingColor);
      setFontStyle(resumeStyle.font ?? defaultFontStyle);
      setBannerColor(resumeStyle.bannerColor ?? defaultBannerColor);
    }
  }, [resumeStyle, resumeStyleLoading]);

  const { data: leetLink } = trpc.useQuery(
    ["fs.leetLink.getLeetLink", { id: profileResume.id }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  const { data: viewCounter } = trpc.useQuery([
    "fs.viewCount.getCount",
    { id: userId, handle: handle as string, file: fileName },
  ]);

  const { data: user } = trpc.useQuery(
    ["fs.resume.getUser", { id: profileResume?.id! }],
    {
      enabled: !!profileResume,
    }
  );

  const setViewCounter = trpc.useMutation(["fs.viewCount.setCount"]);

  async function pageViewer() {
    let counter = viewCounter + 1;
    setViewCounter.mutate({
      handle: handle as string,
      count: counter,
      file: fileName,
    });
  }

  const { data: tokenCount } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId, handle: userInfo.handle }],
    {
      enabled: status === "authenticated" && !!userInfo.id,
    }
  );

  const { data: isVisitingHandle } = trpc.useQuery(
    [
      "fs.handle.getVisitingHandle",
      {
        id: userId,
        visitorHandle: userInfo.handle,
        userHandle: profileResume.handle,
        visitorName: userInfo.displayName,
        visitorImage: userInfo.image!,
        visitorJobTitle: userInfo.position!,
      },
    ],
    {
      enabled: status === "authenticated" && !!userInfo.id,
    }
  );

  useEffect(() => {
    setTokens(tokenCount);
  }, [tokenCount, isVisitingHandle]);

  useEffect(() => {
    window.addEventListener("beforeunload", pageViewer);
    return () => {
      window.removeEventListener("beforeunload", pageViewer);
    };
  }, [viewCounter]);

  useEffect(() => {
    if (handle === userInfo.handle) {
      router.push(`/s/${profileType}`);
    }
  }, [handle, userInfo.handle]);

  useEffect(() => {
    if (profileType === "resume") {
      setResumeViewCounter(viewCounter);
    }
  }, [viewCounter]);

  useEffect(() => {
    if (profileResume) {
      setProfileImage(user?.image);
    }
  }, [profileResume]);

  const {
    data: resume,
    isLoading,
    error,
  } = trpc.useQuery([
    "fs.profile.getResume",
    passcode
      ? {
          handle: handle! as string,
          passCode: parseInt(passcode as string, 10),
        }
      : { handle: handle! as string },
  ]);

  const { data: PassCode } = trpc.useQuery([
    "fs.profile.getPassCode",
    passcode
      ? {
          handle: handle! as string,
          passCode: parseInt(passcode as string, 10),
        }
      : { handle: handle! as string, passCode: 0 },
  ]);

  useEffect(() => {
    handleResumeData();
  }, [resume, status, PassCode]);

  useEffect(() => {
    if (status === "authenticated") {
      setProspectApproval(profileResume.id !== "");
    }
  }, [profileResume.id]);

  useEffect(() => {
    if (!plan && canAccess) {
      setShowAccessBanner(true);
    }
  }, [plan, canAccess]);

  const handleResumeData = () => {
    if (status === "authenticated" && !resume) {
      return setProdTitle(t("handle"));
    }
    setProdTitle(status === "authenticated" ? t("resume") : t("handle"));
    if (resume) {
      setProfileResume(resume);
      if (!PassCode && !roll) {
        setBlurred(true);
      }
    }
  };

  if (status === "unauthenticated") {
    return (
      <div className="pageLevelPadding">
        <SignInToView />
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (status === "authenticated" && error) {
    return (
      <div className="pageLevelPadding">
        <HandleNotFound />
      </div>
    );
  }

  const renderProfileType = () => {
    if (!resume) {
      switch (profileType) {
        case "resume":
          return renderResume();
        case "portfolio":
          return renderPortfolio();
        default:
          return renderleetLinkView();
      }
    }

    switch (profileType) {
      case "resume":
        return renderResumeView();
      case "portfolio":
        return renderPortfolioView();
      default:
        return renderleetLinkView();
    }
  };

  const renderResume = () => (
    <div className="pageLevelPadding brand-bg pt-8">
      <Container>
        {profileResume.id && profileResume.id !== userId ? (
          <>
            {showAccessBanner && <FreeAccessBanner />}
            <ResumeView />
            <PortfolioNavBtn />
            <ChatIconButton />
          </>
        ) : (
          <>
            {userInfo.handle === handle ? (
              <ResumeSkeletonContainer />
            ) : (
              <RequestAccess />
            )}
          </>
        )}
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </div>
  );

  const renderPortfolio = () => (
    <div>
      {profileResume.id && profileResume.id !== userId ? (
        <>
          <PortfolioView />
          <PortfolioNavBtn />
          <SharePortfolio />
          <div className="pt-14">
            <Footer />
          </div>
        </>
      ) : (
        <div className="pageLevelPadding brand-bg pt-8">
          <Container>
            {userInfo.handle === handle ? (
              <ResumeSkeletonContainer />
            ) : (
              <RequestAccess />
            )}
            <div className="pt-14">
              <Footer />
            </div>
          </Container>
        </div>
      )}
    </div>
  );

  const renderResumeView = () => (
    <div className={"pageLevelPadding"} data-testid="handle">
      <Container>
        {showAccessBanner && <FreeAccessBanner />}
        <ResumeView />
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
      <PortfolioNavBtn />
      <ChatIconButton />
    </div>
  );

  const renderPortfolioView = () => (
    <div data-testid="handle">
      <PortfolioView />
      <div className="pt-14">
        <Footer />
      </div>
      <PortfolioNavBtn />
      <SharePortfolio />
    </div>
  );

  const renderleetLinkView = () => (
    <div data-testid="handle" className="brand-bg">
      <div className="w-full flex justify-center px-4 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          {leetLink?.bio ? <LeetUi /> : <LeetUiSkeleton />}
        </div>
      </div>
      <div className="pt-14">
        <Footer />
      </div>
    </div>
  );

  return (
    <>
      <NextSeo
        title={`${profileResume?.displayName || handle} | LeetCV`}
        description={
          profileResume?.description || "Professional resume on LeetCV"
        }
        canonical={`https://www.leetcv.com/r/${handle}`}
        openGraph={{
          url: `https://www.leetcv.com/r/${handle}`,
          title: `${profileResume?.displayName || handle}'s Resume | LeetCV`,
          description:
            profileResume?.description || "Professional resume on LeetCV",
          images: [
            {
              url: user?.image,
              width: 800,
              height: 600,
              alt: `${profileResume?.displayName || handle}'s Profile Picture`,
            },
          ],
          site_name: "LeetCV",
        }}
        twitter={{
          handle: `@${handle}`,
          site: "@leetcv",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <meta
          name="keywords"
          content={`resume, professional, career, skills, LeetCV, ${
            profileResume?.displayName || handle
          }`}
        />
        <meta
          name="description"
          content={
            profileResume?.description || "Professional resume on LeetCV"
          }
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profileResume?.displayName || handle,
            url: `https://www.leetcv.com/r/${handle}`,
            image: profileResume?.image,
            jobTitle: profileResume?.position || "Professional",
            description:
              profileResume?.description || "Professional resume on LeetCV",
          })}
        </script>
      </Head>
      {renderProfileType()}
    </>
  );
};

export default ProfileViewPage;
