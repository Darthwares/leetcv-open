import HeadSeo from "@components/headSeo";
import { POST_SIGNIN_LANDING } from "constants/pages";
import { GetServerSidePropsContext } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFirebase } from "@lib/firebase";
import { logEvent } from "@firebase/analytics";

const marketingProgramList = "marketingProgramList";
const influencers = "influencers";

async function socialMediaPromotion(
  analytics: any,
  socialMedia: string,
  programType: string
) {
  try {
    logEvent(analytics, "select_promotion", {
      marketing_program: socialMedia,
    });

    await fetch("/api/marketing_program", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hit: 1,
        socialMedia,
        programType,
      }),
    });
  } catch (error) {
    console.error("Error occurred during social media promotion:", error);
  }
}

export default function SignIn({ providers }: any) {
  const { status } = useSession();
  const router = useRouter();
  const t = useTranslations("SignIn");
  const { analytics } = useFirebase();
  const { marketing_program, influencer } = router.query;

  useEffect(() => {
    if (status === "authenticated") {
      const redirectUrl = sessionStorage.getItem("redirect");
      if (redirectUrl) {
        router.push(decodeURIComponent(redirectUrl));
      } else if (router.query.redirect) {
        const decodedRedirect = decodeURIComponent(
          router.query.redirect as string
        );
        router.push(decodedRedirect);
      } else {
        router.push(POST_SIGNIN_LANDING);
      }
    }
  }, [status]);
  useEffect(() => {
    if (analytics && status === "authenticated" && marketing_program) {
      switch (marketing_program) {
        case "instagram":
          socialMediaPromotion(analytics, "instagram", marketingProgramList);
          break;
        case "facebook":
          socialMediaPromotion(analytics, "facebook", marketingProgramList);
          break;
        case "linkedIn":
          socialMediaPromotion(analytics, "linkedIn", marketingProgramList);
          break;
        case "github":
          socialMediaPromotion(analytics, "github", marketingProgramList);
          break;
        case "twitter":
          socialMediaPromotion(analytics, "twitter", marketingProgramList);
          break;
        case "youtube":
          socialMediaPromotion(analytics, "youtube", marketingProgramList);
          break;
        case "discord":
          socialMediaPromotion(analytics, "discord", marketingProgramList);
          break;
        case "google-ads":
          socialMediaPromotion(analytics, "google-ads", marketingProgramList);
          break;
        case "theneerIdaivelai_youtube":
          socialMediaPromotion(
            analytics,
            "theneerIdaivelai_youtube",
            marketingProgramList
          );
          break;
        case "leetcv-instagram":
          socialMediaPromotion(
            analytics,
            "leetcv-instagram",
            marketingProgramList
          );
          break;
        case "others":
          socialMediaPromotion(analytics, "others", marketingProgramList);
          break;
        default:
          break;
      }
    }
  }, [analytics, marketing_program]);

  // localhost:3000/?marketing_program=theneerIdaivelai_youtube&launch=true

  useEffect(() => {
    if (analytics && status === "authenticated" && influencer) {
      switch (influencer) {
        case "deepika-saini":
          socialMediaPromotion(analytics, "deepika-saini", influencers);
          break;
        case "ritika-singh":
          socialMediaPromotion(analytics, "ritika-singh", influencers);
          break;
        case "neha-malhotra":
          socialMediaPromotion(analytics, "neha-malhotra", influencers);
          break;
        case "esha-bajaj":
          socialMediaPromotion(analytics, "esha-bajaj", influencers);
          break;
        case "tanvi-khandelwal":
          socialMediaPromotion(analytics, "tanvi-khandelwal", influencers);
          break;
        default:
          break;
      }
    }
  }, [analytics, influencer]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div>
      <HeadSeo title={process.env.NEXT_PUBLIC_PRODUCT_NAME as string} />
      {status === "authenticated" && (
        <div className="h-[100vh] flex brand-bg justify-center items-center">
          <h2 className="brand-grad text-2xl md:text-5xl py-4 animate-pulse">
            {t("signin")}
          </h2>
        </div>
      )}
      {status === "unauthenticated" && (
        <div className="h-[100vh] flex brand-bg">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-48 xl:px-48">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <p className="brand-grad text-3xl tracking-tighter">
                  {process.env.NEXT_PUBLIC_PRODUCT_NAME}
                </p>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                  {t("signInAccount")}
                </h2>
              </div>

              <div className="mt-8">
                <div>
                  <div>
                    <div className="mt-1 flex flex-col gap-3 items-center justify-center">
                      {providers &&
                        Object.values(providers)?.map((provider: any) => {
                          const providerName =
                            provider.name === "Twitter (Legacy)"
                              ? "Twitter"
                              : provider.name;
                          return (
                            <div key={providerName}>
                              <button
                                onClick={() => {
                                  signIn(provider.id, {
                                    redirectTo: "/s/dashboard",
                                  });
                                }}
                                className="w-full inline-flex flex-row justify-center h-12 py-2 px-12 md:px-24 border border-gray-300 items-center rounded-md shadow-sm bg-white font-semibold text-gray-600 hover:shadow-lg hover:shadow-indigo-300 hover:ring-1 hover:ring-indigo-400 whitespace-nowrap"
                              >
                                <span className="h-6 pt-[2px] pr-4">
                                  {getSignInIcon(providerName)}
                                </span>
                                <span>
                                  {t("signInWith")} {providerName}
                                </span>
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex relative w-0 flex-1 justify-center items-center">
            <div className="h-1/2">
              <lottie-player
                src="/assets/lottie/website-development.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getSignInIcon(provider: string) {
  switch (provider) {
    case "Discord":
      return (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="#738adb"
          viewBox="0 0 30 30"
        >
          <path d="M25.12,6.946c-2.424-1.948-6.257-2.278-6.419-2.292c-0.256-0.022-0.499,0.123-0.604,0.357 c-0.004,0.008-0.218,0.629-0.425,1.228c2.817,0.493,4.731,1.587,4.833,1.647c0.478,0.278,0.638,0.891,0.359,1.368 C22.679,9.572,22.344,9.75,22,9.75c-0.171,0-0.343-0.043-0.501-0.135C21.471,9.598,18.663,8,15.002,8 C11.34,8,8.531,9.599,8.503,9.615C8.026,9.892,7.414,9.729,7.137,9.251C6.86,8.775,7.021,8.164,7.497,7.886 c0.102-0.06,2.023-1.158,4.848-1.65c-0.218-0.606-0.438-1.217-0.442-1.225c-0.105-0.235-0.348-0.383-0.604-0.357 c-0.162,0.013-3.995,0.343-6.451,2.318C3.564,8.158,1,15.092,1,21.087c0,0.106,0.027,0.209,0.08,0.301 c1.771,3.11,6.599,3.924,7.699,3.959c0.007,0.001,0.013,0.001,0.019,0.001c0.194,0,0.377-0.093,0.492-0.25l1.19-1.612 c-2.61-0.629-3.99-1.618-4.073-1.679c-0.444-0.327-0.54-0.953-0.213-1.398c0.326-0.443,0.95-0.541,1.394-0.216 C7.625,20.217,10.172,22,15,22c4.847,0,7.387-1.79,7.412-1.808c0.444-0.322,1.07-0.225,1.395,0.221 c0.324,0.444,0.23,1.066-0.212,1.392c-0.083,0.061-1.456,1.048-4.06,1.677l1.175,1.615c0.115,0.158,0.298,0.25,0.492,0.25 c0.007,0,0.013,0,0.019-0.001c1.101-0.035,5.929-0.849,7.699-3.959c0.053-0.092,0.08-0.195,0.08-0.301 C29,15.092,26.436,8.158,25.12,6.946z M11,19c-1.105,0-2-1.119-2-2.5S9.895,14,11,14s2,1.119,2,2.5S12.105,19,11,19z M19,19 c-1.105,0-2-1.119-2-2.5s0.895-2.5,2-2.5s2,1.119,2,2.5S20.105,19,19,19z" />
        </svg>
      );
    case "Reddit":
      return (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="#FF4500"
          viewBox="0 0 30 30"
        >
          <path d="M 17.662109 2 C 15.565005 2 14 3.7131367 14 5.6621094 L 14 9.0351562 C 11.24971 9.1810926 8.7344872 9.9143634 6.7265625 11.064453 C 5.9527826 10.321405 4.9166871 9.991448 3.9121094 9.9921875 C 2.8229214 9.9929893 1.7094525 10.370413 0.94140625 11.234375 L 0.92382812 11.253906 L 0.90625 11.273438 C 0.16947928 12.194228 -0.12225605 13.427747 0.07421875 14.652344 C 0.25365009 15.770711 0.90137168 16.893419 2.0273438 17.628906 C 2.0199689 17.753058 2 17.874618 2 18 C 2 22.962 7.832 27 15 27 C 22.168 27 28 22.962 28 18 C 28 17.874618 27.980031 17.753058 27.972656 17.628906 C 29.098628 16.893419 29.74635 15.770711 29.925781 14.652344 C 30.122256 13.427747 29.830521 12.194228 29.09375 11.273438 L 29.076172 11.253906 L 29.058594 11.234375 C 28.290448 10.370294 27.177168 9.9929893 26.087891 9.9921875 C 25.08323 9.991448 24.046988 10.321133 23.273438 11.064453 C 21.265513 9.9143634 18.75029 9.1810926 16 9.0351562 L 16 5.6621094 C 16 4.6830821 16.565214 4 17.662109 4 C 18.182797 4 18.817104 4.2609042 19.810547 4.609375 C 20.650361 4.9039572 21.743308 5.2016984 23.140625 5.2910156 C 23.474875 6.2790874 24.402814 7 25.5 7 C 26.875 7 28 5.875 28 4.5 C 28 3.125 26.875 2 25.5 2 C 24.561213 2 23.747538 2.5304211 23.320312 3.3007812 C 22.125831 3.2346294 21.248238 2.9947078 20.472656 2.7226562 C 19.568849 2.4056271 18.738422 2 17.662109 2 z M 3.9121094 11.992188 C 4.3072494 11.991896 4.6826692 12.095595 4.9921875 12.263672 C 3.8881963 13.18517 3.0505713 14.261821 2.5449219 15.4375 C 2.2764358 15.106087 2.114647 14.734002 2.0507812 14.335938 C 1.9430146 13.664243 2.1440212 12.966045 2.4628906 12.552734 C 2.7642172 12.228395 3.3144613 11.992626 3.9121094 11.992188 z M 26.085938 11.992188 C 26.683756 11.992627 27.235874 12.22849 27.537109 12.552734 C 27.855979 12.966045 28.056985 13.664243 27.949219 14.335938 C 27.885353 14.734002 27.723564 15.106087 27.455078 15.4375 C 26.949429 14.261821 26.111804 13.18517 25.007812 12.263672 C 25.316626 12.095792 25.690955 11.991896 26.085938 11.992188 z M 10 14 C 11.105 14 12 14.895 12 16 C 12 17.105 11.105 18 10 18 C 8.895 18 8 17.105 8 16 C 8 14.895 8.895 14 10 14 z M 20 14 C 21.105 14 22 14.895 22 16 C 22 17.105 21.105 18 20 18 C 18.895 18 18 17.105 18 16 C 18 14.895 18.895 14 20 14 z M 20.238281 19.533203 C 19.599281 21.400203 17.556 23 15 23 C 12.444 23 10.400719 21.400969 9.7617188 19.667969 C 10.911719 20.600969 12.828 21.267578 15 21.267578 C 17.172 21.267578 19.088281 20.600203 20.238281 19.533203 z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "Google":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path
            fill="#fbc02d"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#e53935"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4caf50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1565c0"
            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
      );
    case "Twitter":
      return (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="#1DA1F1"
          viewBox="0 0 20 20"
        >
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
        >
          <path
            fill="#999"
            d="M16 0C7.163 0 0 7.163 0 16c0 8.836 7.163 16 16 16s16-7.164 16-16c0-8.837-7.163-16-16-16z"
          />
          <path
            fill="#FFF"
            d="M24.294 22.942v-6.137c0-3.288-1.755-4.818-4.096-4.818-1.889 0-2.735 1.039-3.206 1.768v-1.517h-3.558c.047 1.005 0 10.704 0 10.704h3.558v-5.978c0-.319.023-.639.117-.867.257-.639.842-1.301 1.825-1.301 1.288 0 1.803.981 1.803 2.42v5.727l3.557-.001zM9.685 10.777c1.24 0 2.013-.823 2.013-1.85-.023-1.05-.773-1.849-1.99-1.849s-2.012.799-2.012 1.849c0 1.028.772 1.85 1.967 1.85h.022zm1.779 12.165V12.238H7.907v10.704h3.557z"
          />
        </svg>
      );
    case "GitHub":
      return (
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers, messages: require(`../../messages/${locale}.json`) },
  };
}
