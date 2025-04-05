import BackToHome from "@components/backToHome";
import HeadSeo from "@components/headSeo";
import { XIcon } from "@heroicons/react/outline";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CancelSubscription = () => {
  const router = useRouter();
  const { status } = useSession();
  const t = useTranslations("Pricing");

  const { data: session } = trpc.useQuery(["fs.stripe.proUser"], {
    enabled: status === "authenticated",
  });

  useEffect(() => {
    const hasSessionId = setTimeout(() => {
      if (session) {
        setTimeout(() => {
          router.push("/pricing");
        }, 500);
      }
    }, 2500);

    const hasNoSessionId = setTimeout(() => {
      if (!session) {
        router.push("/pricing");
      }
    }, 2000);
    return () => {
      clearTimeout(hasNoSessionId);
      clearTimeout(hasSessionId);
    };
  }, [session]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div data-testid="cancel" className="dark:bg-gray-900 h-[calc(100vh-64px)]">
      <HeadSeo title={"Buy Now"} />
      <div className="flex items-center justify-center text-center pt-10">
        <div className="p-1 rounded">
          <div className="flex flex-col items-center px-6 md:px-7 py-6 space-y-4 border border-gray-100 dark:border-gray-700 shadow-xl rounded-lg w-[95%] max-w-md bg-gray-50 dark:bg-gray-800/30 mx-auto mt-10">
            <div className="rounded-full bg-red-100 w-16 h-16 flex items-center justify-center">
              <XIcon className="text-red-600 w-10 h-10" />
            </div>
            <p className="font-semibold text-[1.2rem] dark:text-white text-gray-900">
              {" "}
              {t("paymentFailed")}
            </p>
            <p className="text-[15px] dark:text-gray-400 text-gray-600">
              {t("paymentFailedDescription")}
            </p>
            <BackToHome />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CancelSubscription;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
