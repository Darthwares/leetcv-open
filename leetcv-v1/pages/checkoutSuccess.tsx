import BackToHome from "@components/backToHome";
import HeadSeo from "@components/headSeo";
import { CheckIcon } from "@heroicons/react/outline";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CheckoutSuccess = () => {
  const { status } = useSession();
  const router = useRouter();
  const [validate, setValidate] = useState(true);
  const { data: session } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });
  const t = useTranslations("Pricing");

  useEffect(() => {
    const hasNoSessionId = setTimeout(() => {
      if (!session) {
        router.push("/pricing");
      }
    }, 2000);
    const hasSessionId = setTimeout(() => {
      if (session) {
        setValidate(false);
      }
      router.push("/");
    }, 5000);
    return () => {
      clearTimeout(hasNoSessionId);
      clearTimeout(hasSessionId);
    };
  }, [session]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div
      data-testid="checkout"
      className="dark:bg-gray-900 h-[calc(100vh-64px)]"
    >
      <HeadSeo title={"Buy Now"} />
      <div className="flex items-center justify-center text-center pt-10">
        <div className="p-1 rounded">
          <div
            className="flex flex-col items-center p-4 space-y-4"
            data-testid="validate"
          >
            {validate ? (
              <div
                className="h-[18rem] md:h-[25rem] w-full"
                data-testid="hasValidate"
              >
                <lottie-player
                  src="/assets/lottie/validate.json"
                  background=""
                  speed="1"
                  loop
                  autoplay
                  className="bg-gradient-to-r from-indigo-100 to-pink-200"
                />
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {t("validatingYourPayment")}
                </h2>
              </div>
            ) : (
              <div className="flex flex-col items-center px-6 md:px-7 py-6 space-y-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-lg w-[95%] max-w-md bg-gray-50 dark:bg-gray-800/30 mx-auto mt-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    className="h-10 w-10 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="font-semibold text-[1.2rem] dark:text-white text-gray-900">
                  {t("paymentSuccess")}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-[15px]">
                  {t("thankYouForYourSubscription")}
                </p>
                <BackToHome />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutSuccess;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
