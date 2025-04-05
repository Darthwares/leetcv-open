import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

const FourZeroFour = () => {
  const t = useTranslations("404");
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <>
      <section className="flex items-center p-3 md:p-16 h-[calc(100vh-64px)] dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-7xl text-center flex flex-col lg:flex-row items-center gap-10 md:gap-20">
            <div className="h-[18rem] md:h-[28rem] w-full">
              <lottie-player
                src="/assets/lottie/404-error.json"
                background=""
                speed="1"
                loop
                autoplay
                className="bg-gradient-to-r from-indigo-100 to-pink-200"
              ></lottie-player>
            </div>
            <div className="w-full">
              <p className="text-2xl font-semibold md:text-2xl">
                {t("notFound")}
              </p>
              <p className="mt-4 mb-8 ">{t("doseNotExist")}</p>
              <Link href="/">
                <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-700">
                  {t("goBackHome")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default FourZeroFour;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/pages/fourZero/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
