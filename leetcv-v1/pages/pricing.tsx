import { GetStaticPropsContext } from "next";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageTitleState, resumeState, userIdState } from "@state/state";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Tiers from "@components/pricing/tiers";
import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import useLeetCVLaunch from "@lib/helper/useLeetcvLaunch";
import { useRouter } from "next/router";
import { handleSource } from "@constants/defaults";

export default function Pricing() {
  const t = useTranslations("Pricing");
  const setProdTitle = useSetRecoilState(pageTitleState);
  const { status } = useSession();
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const router = useRouter();
  const source = handleSource(router);
  useLeetCVLaunch({ resume, userId, source });

  const { data: razorpayCustomerId } = trpc.useQuery(
    ["fs.stripe.getRazoapayCustId"],
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    setProdTitle(t("pricing"));
  }, [razorpayCustomerId]);

  return (
    <>
      <NextSeo
        title={t("title")}
        description={t("pricingDescription")}
        key={t("key")}
        canonical={t("canonical")}
      />
      <div className="bg-white dark:bg-gray-900 py-10 sm:py-14 border-t dark:border-gray-700 border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-2 xl:px-8">
          <h2 className="text-base text-center font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-4xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-5xl">
              {t("heading")}
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg dark:text-gray-100 text-gray-600">
            {t("description")}
          </p>
          <Tiers razorpayCustomerId={razorpayCustomerId!} />
          {/* <Tiers /> */}
        </div>
      </div>
      <div className="pt-8 dark:bg-gray-900 sm:pt-6">
        <Footer />
      </div>
    </>
  );
}

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
