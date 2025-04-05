import AppBar from "@components/appbar/appBar";
import HeadSeo from "@components/headSeo";
import { useRouter } from "next/router";
import React from "react";
import { useTranslations } from "next-intl";

function Offline() {
  const route = useRouter();
  const t = useTranslations("Offline");
  return (
    <div>
      <HeadSeo title={t("title")} />
      <AppBar />
      <div className="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:flex md:place-items-center lg:px-8 justify-center mt-20">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-indigo-600 sm:text-5xl">
              {t("404")}
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  {t("pageNotFound")}
                </h2>
                <p className="mt-1 text-base text-gray-500">{t("tryAgain")}</p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  onClick={() => route.push("/")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("back")}
                </button>
                <button
                  onClick={() => route.push("/")}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t("contact")}
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Offline;

export function getStaticProps({ locale }) {
  return {
    props: {
      messages: require(`../messages/pages/offline/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
