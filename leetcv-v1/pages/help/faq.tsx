import Footer from "../../components/home/footer";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import HeadSeo from "@components/headSeo";
import { NextSeo } from "next-seo";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";

const Faq = () => {
  const t = useTranslations("Faq");
  const [show, setShow] = useState<null | number>(null);

  const faq = [
    {
      title: t("QuestionOne"),
      description: t("descriptionOne"),
    },
    {
      title: t("QuestionTwo"),
      description: t("descriptionTwo"),
    },
    {
      title: t("QuestionTwo"),
      description: t("descriptionTwo"),
    },
    { title: t("QuestionTwo"), description: t("descriptionTwo") },
    { title: t("QuestionTwo"), description: t("descriptionTwo") },
  ];

  const toggle = (i: number) => {
    if (show === i) {
      return setShow(null);
    }
    setShow(i);
  };

  return (
    <div data-testid="faqId">
      <HeadSeo title={t("faq")} />
      <NextSeo
        title={t("faq")}
        description="Get answers to your questions on our FAQ page, find solutions to common issues quickly."
        key={"FAQ, LeetCV"}
        canonical="https://www.leetcv.com/help/faq"
      />
      <div>
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <div className="flex flex-col items-center justify-center gap-8 w-full">
              <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 w-full border-transparent border-black md:px-14">
                Frequently asked questions
              </h2>
              <div className="text-2xl text-gray-900 w-full border-transparent border-black md:px-14 grid gap-4 cursor-pointer">
                {faq.map((items, idx) => {
                  return (
                    <div key={items.title} className="w-full">
                      <div
                        className="flex w-full justify-between"
                        onClick={() => toggle(idx)}
                      >
                        <h2 className="text-base font-semibold leading-7">
                          {items.title}
                        </h2>
                        <div className="w-10">
                          {show === idx ? (
                            <MinusIcon className={`w-5`} />
                          ) : (
                            <PlusIcon className={`w-5`} />
                          )}
                        </div>
                      </div>
                      <p
                        className={
                          show === idx
                            ? "block lg:w-[50rem] text-base text-gray-600 w-full max-w-7xl py-4 font-semibold leading-7"
                            : "hidden"
                        }
                      >
                        {items.description}
                      </p>
                    </div>
                  );
                })}
              </div>
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
      messages: require(`../../messages/pages/faq/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
