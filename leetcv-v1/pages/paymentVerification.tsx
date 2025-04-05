import React, { useState, useEffect } from "react";
import { GetStaticPathsContext } from "next";
import { useRecoilState } from "recoil";
import { razorPayPaymentState } from "@state/state";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { WarningSvg } from "@components/svgGrid";

const PaymentVerification = () => {
  const t = useTranslations("PaymentVerification");
  const [verificationStatus, setVerificationStatus] = useState(
    "Processing payment..."
  );
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [razorPayPayment, setRazorPayPayment] =
    useRecoilState(razorPayPaymentState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaymentSuccess(true);
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    import("@lottiefiles/lottie-player").then(() => {
      if (paymentSuccess) {
        setTimeout(() => {
          setLottieLoaded(true);
        }, 1000);
      }
    });
  }, [paymentSuccess]);

  return (
    <div className="flex flex-col items-center justify-center md:mt-12 p-4">
      <div className="text-center">
        <div className="w-full flex justify-center  flex-col  items-center space-y-7">
          {verificationStatus === t("unavailablePayment") && (
            <div className="h-96 w-full">
              <lottie-player
                src="/assets/lottie/paymentNotFound.json"
                background=""
                speed="1"
                autoplay
                className="bg-gradient-to-r from-indigo-100 to-pink-200"
              />
            </div>
          )}
          <div
            className={`text-2xl font-semibold ${
              loading
                ? "text-gray-800"
                : verificationStatus === t("unavailablePayment")
                ? "text-gray-800"
                : "text-green-600"
            }`}
          >
            {verificationStatus === "Processing payment..." ? (
              <p>Processing payment...</p>
            ) : (
              verificationStatus
            )}
          </div>
          {verificationStatus === t("unavailablePayment") && (
            <>
              <p className={`text-gray-600 md:w-[35rem] w-full`}>
                {t("contactSupport")}
              </p>

              <Link href="/">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-700">
                  {t("goToHome")}
                </a>
              </Link>
            </>
          )}
        </div>

        {paymentSuccess && (
          <div className="mt-4">
            <div className="h-64 w-full">
              <lottie-player
                src="/assets/lottie/paymentSuccess.json"
                background=""
                speed="1"
                autoplay
                className="bg-gradient-to-r from-indigo-100 to-pink-200"
              />
            </div>
            {lottieLoaded && (
              <div className="flex flex-col items-center justify-center gap-7">
                <p className="text-2xl font-semibold text-gray-800">
                  {t("paymentSuccessful")}
                </p>
                <p className={`text-gray-600 md:w-[30rem] w-full`}>
                  {t("planPurchasedDescription")}
                </p>
                <Link href={"/s/resumeEditor"}>
                  <a
                    rel="noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-700"
                  >
                    {t("continue")}
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}

        {loading && (
          <div className="h-32 w-full space-y-4 mt-4">
            <div className="space-y-4">
              <div className="h-96 w-full">
                <lottie-player
                  src="/assets/lottie/validate.json"
                  background=""
                  speed="1"
                  loop
                  autoplay
                  className="bg-gradient-to-r from-indigo-100 to-pink-200"
                />
              </div>
              <p className="text-lg">{t("pleaseWait")}...</p>
            </div>
            <div className="text-sm md:text-lg p-3 w-full rounded-md text-start space-y-2 mt-12">
              <div className="flex gap-1.5 sm:gap-2 rounded-lg mt-4 py-2.5 px-2 sm:px-3">
                <WarningSvg />
                <div className="flex flex-col gap-2">
                  <p className="">{t("avoidRefreshing")}</p>
                  <p className="">{t("completePayment")}.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentVerification;

export function getStaticProps({ defaultLocale }: GetStaticPathsContext) {
  return {
    props: {
      messages: require(`../messages/${defaultLocale}.json`),
      now: new Date().getTime(),
    },
  };
}
