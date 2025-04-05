import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileResumeState, userIdState } from "@state/state";
import { trpc } from "utils/trpc";
import ProspectAttestation from "@components/attestation/prospectAttestation";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { useRouter } from "next/router";
import { handleSource } from "@constants/defaults";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const AttestationProspect: NextPage = () => {
  const setProfileResume = useSetRecoilState(profileResumeState);
  const [userId] = useRecoilState(userIdState);
  useDailyUserCount();
  const { data: userResume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);

  const resume = {
    handle: userResume?.handle!,
    displayName: userResume?.displayName!,
    email: userResume?.email!,
  };
  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  useEffect(() => {
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
        title={"Prospect Attestation | LeetCV"}
        description="Increase your credibility by verifying your resume with prospect attestations on LeetCV. Review and accept incoming attestation requests to showcase endorsements on your projects and enhance your job prospects."
        key={
          "LeetCV, Prospect Attestation, Resume Verification, Professional Endorsements, Career Growth"
        }
        canonical={`https://www.leetcv.com/s/prospectAttestation`}
        openGraph={{
          url: "https://www.leetcv.com/s/prospectAttestation",
          title: "Prospect Attestation | LeetCV",
          description:
            "Increase your credibility by verifying your resume with prospect attestations on LeetCV. Review and accept incoming attestation requests to showcase endorsements on your projects and enhance your job prospects.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Prospect Attestation",
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
          name: "Prospect Attestation",
          description:
            "Increase your credibility by verifying your resume with prospect attestations on LeetCV. Review and accept incoming attestation requests to showcase endorsements on your projects and enhance your job prospects.",
          url: "https://www.leetcv.com/s/prospectAttestation",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="pageLevelPadding">
          <Container loading={isLoading}>
            <ProspectAttestation />
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
      messages: require(`../../messages/${context.locale}.json`),
    },
  };
}

export default AttestationProspect;
