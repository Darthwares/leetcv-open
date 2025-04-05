import Footer from "@components/home/footer";
import { termsOfService } from "@constants/defaults";
import { pageTitleState } from "@state/state";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Terms() {
  const t = useTranslations("Terms");
  const setProdTitle = useSetRecoilState(pageTitleState);

  useEffect(() => {
    setProdTitle(t("terms"));
  }, []);

  return (
    <>
      <NextSeo
        title={t("title")}
        description={t("description")}
        key={t("key")}
        canonical={t("canonical")}
      />
      <div className="w-full dark:bg-gray-900 h-full">
        <div className="max-w-5xl mx-auto px-2 md:px-10 pt-5 md:pt-16">
          <div className="py-2 px-5 rounded-md mb-2 bg-gradient-to-r from-indigo-100 to-pink-200 dark:from-gray-800 dark:to-gray-700 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold">Terms of Service</h2>
            <h4 className="text-base">Last updated: April 24, 2023</h4>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-7xl">
            <div className="mt-7 privacy px-5 prose">
              <p className="dark:text-gray-200">
                {`Please read these Terms of Service ('Terms') carefully before
                using the `}
                <a href="https://leetcv.com/" className="dark:text-white">
                  LeetCV
                </a>
                {` website (the
                "Service") operated by`}
                {`LeetCV ("us", "we", or "our"). Your access to and use of the
              Service is conditioned on your acceptance of and compliance with
              these Terms. These Terms apply to all visitors, users, and others
              who access or use the Service.`}
              </p>
              <div className="-space-y-7">
                {termsOfService.map((terms) => {
                  return (
                    <div key={terms.title} className="-space-y-3">
                      <h2 className="dark:text-white">{terms.title}</h2>
                      <p className="dark:text-gray-200 relative -top-3.5">
                        {terms.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div>
                <h2 className="dark:text-white">
                  Limitation of Liability and Disclaimer of Warranties
                </h2>
                <h3 className="dark:text-white">Limitation of Liability</h3>
                <p className="dark:text-gray-200">
                  LeetCV and its affiliates, officers, directors, employees, and
                  agents shall not be held liable for any direct, indirect,
                  incidental, consequential, or special damages arising out of
                  or in any way related to your use of this website or its
                  services. This includes, but is not limited to, loss of data,
                  loss of profits, or any other economic or non-economic losses.
                </p>
                <h3 className="dark:text-white">Disclaimer of Warranties</h3>
                <p className="dark:text-gray-200">
                  {`This website and its content are provided on an "as-is" and
                  "as-available" basis. LeetCV makes no warranties, either
                  expressed or implied, regarding the accuracy, completeness, or
                  reliability of the information provided on this website. Your
                  use of this website is at your own risk. We do not warrant
                  that the website will be error-free, uninterrupted, or free
                  from viruses or other harmful components.`}
                </p>
                <h2 className="dark:text-white">Rules of Conduct</h2>
                <h3 className="dark:text-white">Prohibited Activities</h3>
                <p className="dark:text-gray-200">
                  Users of LeetCV are prohibited from engaging in any of the
                  following activities:
                </p>
                <ul className="dark:text-gray-200">
                  <li>(i) Violating any applicable laws and regulations.</li>
                  <li>
                    (ii) Uploading, posting, or transmitting any content that is
                    defamatory, obscene, indecent, or otherwise objectionable.
                  </li>
                  <li>
                    (iii) Impersonating any person or entity or falsely stating
                    or otherwise misrepresenting your affiliation with a person
                    or entity.
                  </li>
                  <li>
                    {`(iv) Attempting to gain unauthorized access to the website's
                    systems or networks.`}
                  </li>
                  <li>
                    (v) Engaging in any conduct that disrupts or interferes with
                    the normal operation of the website.
                  </li>
                </ul>
                <h3 className="dark:text-white">b. User Responsibilities</h3>
                <ul className="dark:text-gray-200">
                  <li>
                    <p>a. Age Restriction</p>
                    <p>
                      Users must be at least 15 years of age to use this
                      website. By using our services, you affirm that you are of
                      legal age.
                    </p>
                  </li>
                  <li>
                    <p>b. Geographic Restrictions</p>
                    <p>
                      This website is intended for use by individuals worldwide.
                      However, LeetCV makes no representation that the content
                      on this website is appropriate or available in all
                      geographic locations. It is your responsibility to ensure
                      that your use of our services complies with local laws and
                      regulations in your jurisdiction.
                    </p>
                    <p>
                      By using this website, you agree to abide by these Terms
                      and Conditions. LeetCV reserves the right to update or
                      modify these terms at any time without prior notice. It is
                      your responsibility to review these terms periodically.
                    </p>
                  </li>
                </ul>
                <h3 className="dark:text-white">Contact Us</h3>
                <p className="dark:text-gray-200">
                  If you have any questions about these Terms, please contact us
                  at{" "}
                  <a
                    className="dark:text-white"
                    href="mailto:leetcv@darthwares.com"
                  >
                    leetcv@darthwares.com
                  </a>
                </p>
                <h3 className="dark:text-white">Address</h3>
                <p className="dark:text-gray-200">
                  21/1 Sri Balaji Nagar, Uppilipalayam main road,
                  Varadharajapuram, Coimbatore - 641015
                </p>
              </div>
              <div className="pb-10">
                <p className="dark:text-gray-200">
                  Thank you for using LeetCV. We appreciate your trust in our
                  services and look forward to helping you create and manage
                  your professional online presence. If you have any questions
                  or need assistance, please {`don't`} hesitate to reach out to
                  us at
                  <a
                    href="mailto:leetcv@darthwares.com"
                    target={"_blank"}
                    rel="noreferrer"
                    className="ml-2 dark:text-white"
                  >
                    leetcv@darthwares.com
                  </a>
                </p>
                <p className="dark:text-gray-200">
                  By using our Service, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                  We wish you success in your career and hope that our platform
                  contributes to your professional growth.
                </p>
              </div>
            </div>
          </div>
        </div>
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
