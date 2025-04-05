import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pageTitleState,
  resumeState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { useTranslations } from "next-intl";
import { trpc } from "@utils/trpc";
import { GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import Footer from "@components/home/footer";
import { useSession } from "next-auth/react";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const Tokens = () => {
  const { status } = useSession();
  const t = useTranslations("Tokens");
  const [couponCode, setCouponCode] = useState("");
  const [userInfo] = useRecoilState(resumeState);
  const create = trpc.useMutation("fs.coupons.create");
  const [coupon, setCoupon] = useState("");
  const [tokens, setTokens] = useRecoilState(tokenCountState);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [userId] = useRecoilState(userIdState);
  useDailyUserCount();

  const { data: coupons } = trpc.useQuery([
    "fs.coupons.getPromoCode",
    { id: userInfo.id },
  ]);

  const {
    data: tokenCount,
    refetch,
    isLoading,
  } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId, handle: userInfo.handle }],
    {
      enabled: status === "authenticated" && !!userInfo.id,
    }
  );

  useEffect(() => {
    setProdTitle(t("settings"));
    if (tokenCount !== undefined) {
      setTokens(tokenCount);
    }
  }, [tokenCount, setTokens, userInfo.id]);

  const handleCouponCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const enteredCode = event.target.value.trim();
    setCouponCode(enteredCode);
  };

  const handleRedeemCouponCode = () => {
    const isCouponCodeValid = coupons?.couponCode === couponCode;

    const hasRedeemedCouponCode = coupons?.isRedeemCouponCode;

    const isEligibleForRedemption = isCouponCodeValid && !hasRedeemedCouponCode;

    if (!couponCode) {
      toast.error(t("provideCoupon"));
      return;
    }

    if ((hasRedeemedCouponCode && isCouponCodeValid) || coupon === couponCode) {
      toast.warn(t("alreadyRedeemedCoupon"));
      setCouponCode("");
      return;
    }

    if (!isEligibleForRedemption) {
      toast.error(t("invalidCouponCode"));
      return;
    } else {
      create.mutate(
        {
          id: userInfo?.id,
          couponCode,
        },
        {
          onSuccess: () => {
            refetch();
            toast.success(t("redeemSuccess"));
            setCoupon(couponCode);
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    }
    setCouponCode("");
  };

  useEffect(() => {
    setProdTitle(t("settings"));
    setTokens(tokenCount);
  }, [tokenCount]);

  return (
    <>
      <NextSeo
        title={"Available Tokens | LeetCV"}
        description="Unlock premium features on LeetCV with available tokens. Use tokens to refine and optimize your AI-generated resume, ensuring it stands out to potential employers."
        key={
          "LeetCV, Available Tokens, Premium Features, AI Resume Optimization, Settings"
        }
        canonical={`https://www.leetcv.com/s/settings/tokens`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/tokens",
          title: "Available Tokens | LeetCV",
          description:
            "Unlock premium features on LeetCV with available tokens. Use tokens to refine and optimize your AI-generated resume, ensuring it stands out to potential employers.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Available Tokens",
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
          name: "Available Tokens",
          description:
            "Unlock premium features on LeetCV with available tokens. Use tokens to refine and optimize your AI-generated resume, ensuring it stands out to potential employers.",
          url: "https://www.leetcv.com/s/settings/tokens",
        })}
      </script>
      <Container loading={isLoading}>
        <div className="w-full space-y-4 px-3 mt-6 lg:mt-0 min-h-[60vh] lg:py-8">
          <h2 className="text-xl text-gray-700 font-bold">
            {t("availableTokens")}
          </h2>
          <p className="max-w-5xl">{t("planUserDescription")}</p>
          <div className="w-full rounded-2xl bg-indigo-50 max-w-5xl p-5 relative top-4 md:px-1 md:py-2">
            <div className="md:py-5 md:px-5 lg:px-[35px] gap-5 flex flex-col justify-between">
              <div className="flex gap-2 items-center">
                <p className="text-base font-semibold">{t("totalTokens")} -</p>
                <p className="space-y-2 text-center">
                  <span className="flex items-center gap-2">
                    <span className="text-xl font-bold">{tokens}</span>
                  </span>
                </p>
              </div>
              <div className="w-full items-start">
                <div className="flex gap-2 pb-4">
                  <div className="flex flex-col">
                    <p className="text-sm mb-2 font-medium leading-6 text-gray-600">
                      {t("redeemCouponCode")}
                    </p>
                    <input
                      type="text"
                      name="redeemTokens"
                      id="redeemTokens"
                      className="peer block w-full border rounded-md bg-gray-50 py-1.5 text-gray-600 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Enter coupon code here"
                      value={couponCode}
                      onChange={handleCouponCodeChange}
                    />
                  </div>
                  <div className="sm:mt-4 flex sm:justify-end items-end justify-center gap-x-3">
                    <button
                      onClick={handleRedeemCouponCode}
                      className="inline-flex cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-700"
                    >
                      {t("redeem")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
        <div className="pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default Tokens;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
