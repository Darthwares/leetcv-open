import { GetStaticPropsContext } from "next";
import { useEffect } from "react";
import {
  interviewState,
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
import WizardStep from "@components/interview/wizard";
import { checkIfProUser, handleSource } from "@constants/defaults";
import { Button } from "shadcn/components/ui/button";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Interview as InterviewType } from "types/dashboardTypes";
import { useTranslations } from "next-intl";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

export default function Interview() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const setAllInterviews = useSetRecoilState(interviewState);
  const setTokens = useSetRecoilState(tokenCountState);
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });
  const t = useTranslations("Interview");
  useDailyUserCount();

  const { data: tokenCount } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId, handle: resume.handle }],
    { enabled: status === "authenticated" }
  );

  const { data: interviews, refetch } = trpc.useQuery(
    ["fs.mockInterviewRouter.getAllMockInterviews", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  const { data: isProMember, isLoading } = trpc.useQuery(
    ["fs.stripe.proUser"],
    {
      enabled: status === "authenticated",
    }
  );

  const collegeDomain = process.env.NEXT_PUBLIC_MOCK_INTERVIEW_EMAIL_DOMAIN!;
  const allowedDomains = collegeDomain
    ?.split(",")
    .map((domain) => domain.trim());
  const isCollegeEmailUser = allowedDomains?.some((domain) =>
    session?.user?.email?.endsWith(domain)
  );

  const isProUser = checkIfProUser(isProMember);
  const isEligibleForWizard = isCollegeEmailUser || isProUser;
  // const isEligibleForWizard = isCollegeEmailUser;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  useEffect(() => {
    setProdTitle("Mock Interview");
    setTokens(tokenCount);

    if (interviews) {
      setAllInterviews(interviews);
    }
  }, [tokenCount, isProMember, interviews]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <>
      <NextSeo
        title={"Mock Interview | LeetCV"}
        description="Our mock interview session offers a thorough practice run with expert feedback to help you polish your answers, manage interview stress, and approach your next interview with confidence."
        canonical={`https://www.leetcv.com/s/interview`}
        openGraph={{
          url: "https://www.leetcv.com/s/interview",
          title: "Mock Interview | LeetCV",
          description:
            "Our mock interview session offers a thorough practice run with expert feedback to help you polish your answers, manage interview stress, and approach your next interview with confidence.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "Mock Interview",
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
          name: "Mock Interview",
          description:
            "Our mock interview session offers a thorough practice run with expert feedback to help you polish your answers, manage interview stress, and approach your next interview with confidence.",
          url: "https://www.leetcv.com/s/interview",
        })}
      </script>
      <div className="dark:bg-gray-900">
        <Container loading={isLoading}>
          <div className="flex-grow overflow-y-auto pt-5 pb-12">
            {isEligibleForWizard ? (
              <WizardStep />
            ) : (
              <div className="py-5">
                <div className="flex flex-col w-full lg:flex-row items-center justify-center py-5 gap-8">
                  <div className="w-full h-80">
                    <lottie-player
                      src="/assets/lottie/interview.json"
                      background="transparent"
                      speed="1"
                      loop
                      autoplay
                    />
                  </div>
                  <div className="w-full px-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      {t("readyToAceInterview")}
                    </h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
                      {t("getExpertFeedback")}
                    </p>
                    <div className="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-300">
                      <p>{t("upgradeToAccessPremiumFeatures")}</p>
                    </div>
                    <div className="mt-5 space-y-2">
                      {[
                        t("personalizedFeedback"),
                        t("industrySpecificQuestions"),
                        t("videoInterviewPractice"),
                      ].map((feature) => (
                        <div key={feature} className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          <p className="ml-2 text-gray-600 dark:text-gray-300">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10">
                      <Button
                        onClick={() => router.push("/pricing")}
                        className="bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                      >
                        {t("upgradeToPro")}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="pt-14">
            <Footer />
          </div>
        </Container>
      </div>
    </>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
