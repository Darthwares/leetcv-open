import Footer from "../components/home/footer";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import HeadSeo from "@components/headSeo";
import { NextSeo } from "next-seo";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import { faqs } from "../constants/defaults";

const Faq = () => {
  const t = useTranslations("Faq");
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [show, setShow] = useState<null | number>(null);

  const toggle = (i: number) => {
    if (show === i) {
      return setShow(null);
    }
    setShow(i);
  };

  useEffect(() => {
    setProdTitle(t("faqTitle"));
  }, []);

  return (
    <div data-testid="faqId">
      <HeadSeo title={t("title")} />
      <NextSeo
        title={t("title")}
        description={t("description")}
        key={t("key")}
        canonical={t("canonical")}
      />
      <div className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 md:py-24 py-12 md:px-16 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-400/20">
            <h2 className="text-2xl md:text-4xl font-bold leading-10 tracking-tight dark:text-white text-gray-900">
              {t("freqAskQuestion")}
            </h2>
            <div className="mt-10 space-y-6 divide-y divide-gray-900/10 dark:divide-gray-400/20">
              {faqs.map((items, idx) => {
                return (
                  <div key={items.question} className="w-full pt-6">
                    <div
                      className="flex w-full items-start justify-between text-left dark:text-white text-gray-900 cursor-pointer"
                      onClick={() => toggle(idx)}
                    >
                      <span className="text-base font-semibold leading-7">
                        {items.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        {show === idx ? (
                          <MinusIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </span>
                    </div>
                    <div className="mt-2 pr-12">
                      <p
                        className={
                          show === idx
                            ? "block lg:w-[50rem] text-base leading-7 dark:text-gray-200 text-gray-600"
                            : "hidden"
                        }
                      >
                        {items.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
