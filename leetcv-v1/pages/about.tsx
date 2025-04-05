import { NextSeo } from "next-seo";
import Footer from "@components/home/footer";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import {
  DocumentDuplicateIcon,
  EyeIcon,
  FlagIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { StickyScroll } from "@components/ui/sticky-scroll-reveal";

function About() {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("AboutUs");
  const aboutParagraphList = [
    {
      id: 0,
      text: t("aboutDescOne"),
    },
    {
      id: 1,
      text: t("aboutDescTwo"),
    },
    {
      id: 2,
      text: t("aboutDescThree"),
    },
    {
      id: 3,
      text: t("aboutDescFour"),
    },
    {
      id: 4,
      text: t("aboutDescFive"),
    },
    {
      id: 5,
      text: t("aboutDescSix"),
    },
  ];
  const features1 = [
    {
      title: "Mission",
      description: t("missionDesc"),
      icon: FlagIcon,
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/assets/about/mission.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="Mission"
          />
        </div>
      ),
    },
    {
      title: "Vision",
      description: t("visionDesc"),
      icon: EyeIcon,
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/assets/about/vision.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="vision"
          />
        </div>
      ),
    },
    {
      title: t("social"),
      description: t("socialDesc"),
      icon: UserGroupIcon,
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/assets/about/social_impact.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="social"
          />
        </div>
      ),
    },
    {
      title: t("policy"),
      description: t("policyDesc"),
      icon: DocumentDuplicateIcon,
      content: (
        <div className="h-full w-full flex items-center justify-center text-white">
          <Image
            src="/assets/about/policy.png"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="policy"
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setProdTitle(t("aboutTitle"));
  }, []);

  return (
    <div className="w-full dark:bg-gray-900">
      <NextSeo
        title={t("title")}
        description={t("aboutMetaDescription")}
        key={
          "AI Resume Builder, Mobile-Responsive Resumes, Shareable Resumes, Passcode-Protected Resumes, Job Search Optimization, Modern Resume Technology, Resume Security, Digital Resumes, Future of Resumes, Professional Resume Templates, Resume Sharing, Confidential Resumes, Resume Visibility, Resume Customization, Secure Resume Sharing, Real-Time Resume Updates, Resume Tips, Improve Hiring Chances, Resume Innovation, Competitive Job Market"
        }
        canonical={t("aboutMetaCanonical")}
      />
      <div className="max-w-7xl px-5 prose mx-auto flex justify-center items-center gap-y-5 pt-12 flex-col">
        <div className="px-0 md:px-5">
          <h2 className="text-3xl font-extrabold text-transparent text-center md:text-4xl sm:text-xl bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600">
            {t("headingOne")}
          </h2>
          <p className="text-base dark:text-gray-300 text-gray-600 w-full bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text">
            {t("paragraph")}
          </p>
          <div className="pt-10">
            <StickyScroll content={features1} />
          </div>
          <p className="text-2xl py-2 font-bold dark:text-gray-100 pt-16">
            {t("whyNeed")}
          </p>
          <ul className="list-disc about-list">
            {aboutParagraphList.map((item) => {
              return (
                <li key={item.id}>
                  <p className="text-base text-gray-600 dark:text-gray-300">
                    {item.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
export default About;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../messages/pages/about/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
