import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  profileImageState,
  profileResumeState,
  prospectApprovalState,
  resumeState,
  userIdState,
} from "@state/state";
import { useSession } from "next-auth/react";
import { Loader } from "@components/loader";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import Head from "next/head";
import { trpc } from "@utils/trpc";
import { LeetUi } from "shadcn/components/component/leetUi";
import type { GetServerSidePropsContext, NextPage } from "next";
import HandleNotFound from "@components/handleNotFound";
import LeetUiSkeleton from "@components/leetLink/leetUiSkeleton";

const LeetLinkViewPage: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
  const setProspectApproval = useSetRecoilState(prospectApprovalState);
  const { handle, leetLink_source } = router.query;
  const [profileResume, setProfileResume] = useRecoilState(profileResumeState);
  const setProfileImage = useSetRecoilState(profileImageState);
  const [userInfo] = useRecoilState(resumeState);

  const setLeetLinkUsersList = trpc.useMutation([
    "fs.viewCount.recordLeetLinkUsersList",
  ]);

  const { data: user } = trpc.useQuery(
    ["fs.resume.getUser", { id: profileResume.id }],
    {
      enabled: !!profileResume.id,
    }
  );

  const { isLoading } = trpc.useQuery([
    "fs.leetLink.getLeetLink",
    { id: profileResume.id },
  ]);

  useEffect(() => {
    if (status === "authenticated" && leetLink_source) {
      setLeetLinkUsersList.mutate({
        handle: userInfo.handle,
        userName: userInfo.displayName,
        userId,
        source: leetLink_source as string,
      });
    }
  }, [userInfo.handle, status, router.query]);

  useEffect(() => {
    if (profileResume) {
      setProfileImage(user?.image);
    }
  }, [profileResume]);

  const {
    data: resumeWithoutPasscode,
    isLoading: isLoadingWithoutPasscode,
    error,
  } = trpc.useQuery(
    ["fs.public.getResumeWithoutPasscode", { handle: handle! as string }],
    {
      onError: (err) => {
        console.error("Error fetching data:", err);
      },
    }
  );

  useEffect(() => {
    if (!isLoadingWithoutPasscode && resumeWithoutPasscode) {
      setProfileResume(resumeWithoutPasscode);
    }
  }, [location.pathname, isLoadingWithoutPasscode, resumeWithoutPasscode]);

  useEffect(() => {
    if (status === "authenticated") {
      setProspectApproval(profileResume.id !== "");
    }
  }, [profileResume.id]);

  if (isLoadingWithoutPasscode) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="pageLevelPadding">
        <HandleNotFound />
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title={`${profileResume?.displayName || handle} | LeetCV`}
        description={
          profileResume?.description || "Professional profile link on LeetCV"
        }
        canonical={`https://www.leetcv.com/l/${handle}`}
        openGraph={{
          url: `https://www.leetcv.com/l/${handle}`,
          title: `${profileResume?.displayName || handle}'s Leet Link | LeetCV`,
          description:
            profileResume?.description || "Professional profile link on LeetCV",
          images: [
            {
              url: profileResume?.image!,
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
            profileResume?.description || "Professional profile link on LeetCV"
          }
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profileResume?.displayName || handle,
            url: `https://www.leetcv.com/l/${handle}`,
            image: profileResume?.image,
            jobTitle: profileResume?.position || "Professional",
            description:
              profileResume?.description ||
              "Professional profile link on LeetCV",
          })}
        </script>
      </Head>
      <div data-testid="handle">
        <div className={`w-full flex justify-center px-4 lg:px-8 brand-bg`}>
          <div className={`w-full mx-auto md:max-w-lg`}>
            {isLoading ? <LeetUiSkeleton /> : <LeetUi />}
          </div>
        </div>
        <div className="pt-14">
          <Footer />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default LeetLinkViewPage;
