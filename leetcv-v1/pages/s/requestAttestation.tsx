import Container from "@components/container";
import type { GetStaticPropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileResumeState, userIdState } from "@state/state";
import { trpc } from "utils/trpc";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import RequestAttestations from "@components/attestation/requestAttestation";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const AttestationRequest: NextPage = () => {
  const setProfileResume = useSetRecoilState(profileResumeState);
  const [userId] = useRecoilState(userIdState);
  useDailyUserCount();

  const { data: resume, isLoading } = trpc.useQuery([
    "fs.resume.get",
    { id: userId },
  ]);

  useEffect(() => {
    if (resume) {
      setProfileResume(resume);
    }
  }, [resume]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Request Attestation | LeetCV"}
        description="Verify your resume with attestation requests on LeetCV. Send attestations to your connections and track the status of your requests to enhance your job prospects."
        key={
          "LeetCV, Request Attestation, Resume Verification, Professional Endorsements, Career Growth"
        }
        canonical={`https://www.leetcv.com/s/requestAttestation`}
        openGraph={{
          url: "https://www.leetcv.com/s/requestAttestation",
          title: "Request Attestation | LeetCV",
          description:
            "Verify your resume with attestation requests on LeetCV. Send attestations to your connections and track the status of your requests to enhance your job prospects.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Request Attestation",
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
          name: "Request Attestation",
          description:
            "Verify your resume with attestation requests on LeetCV. Send attestations to your connections and track the status of your requests to enhance your job prospects.",
          url: "https://www.leetcv.com/s/requestAttestation",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <div className="pageLevelPadding">
          <Container loading={isLoading}>
            <RequestAttestations />
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

export default AttestationRequest;
