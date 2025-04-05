import Footer from "@components/home/footer";
import {
  changesPrivacy,
  childrenPrivacy,
  contactUs,
  definition,
  linkToOtherWebsite,
  personalData,
  retention,
  transfer,
  usesData,
} from "@constants/defaults";
import { pageTitleState } from "@state/state";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function Privacy() {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Privacy");

  useEffect(() => {
    setProdTitle("Privacy");
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
            <h2 className="text-2xl font-semibold dark:text-white">
              Privacy Policy
            </h2>
            <h4 className="text-base dark:text-gray-100">
              Last updated: August 19, 2022
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-7xl">
            <div className="mt-7 privacy px-5 prose">
              <p className="dark:text-gray-300">
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You.
              </p>
              <p className="dark:text-gray-300">
                We use Your Personal data to provide and improve the Service. By
                using the Service, You agree to the collection and use of
                information in accordance with this Privacy Policy.
              </p>
              <h2 className="dark:text-white mt-8 -mb-8">
                Interpretation and Definitions
              </h2>
              <h2 className="dark:text-white">Interpretation</h2>
              <p className="dark:text-gray-300">
                The words of which the initial letter is capitalized have
                meanings defined under the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </p>
              <h2 className="dark:text-white">Definitions</h2>
              {definition.map((def) => {
                return (
                  <div key={def.id}>
                    <p className="dark:text-gray-300">{def.title}</p>
                    <ul>
                      {def.list.map((item) => {
                        return (
                          <li key={item.id}>
                            <p className="dark:text-gray-300">
                              <strong className="dark:text-white">
                                {item.strongText}
                              </strong>{" "}
                              {item.listText}
                            </p>
                          </li>
                        );
                      })}
                      <li>
                        <p className="dark:text-gray-300">
                          <strong className="dark:text-white">Company</strong>{" "}
                          (referred to as either &quot;the Company&quot;,
                          &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
                          this Agreement) refers to Darthwares, 23/1 Balaji
                          Nagar, Uppilipalayam, Coimbatore, TamilNadu - 641015.
                        </p>
                      </li>
                      <li>
                        <p className="dark:text-gray-300">
                          <strong className="dark:text-white">Website</strong>{" "}
                          refers to LeetCV, accessible from{" "}
                          <a
                            href="https://www.leetcv.com"
                            target="_blank"
                            rel="noreferrer"
                          >
                            https://www.leetcv.com
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                );
              })}
              <h2 className="dark:text-white md:mt-10 mt-6 -mb-8">
                Collecting and Using Your Personal Data
              </h2>
              <h2 className="dark:text-white">Types of Data Collected</h2>
              <h3 className="dark:text-white">Personal Data</h3>
              <p className="dark:text-gray-200">
                While using Our Service, We may ask You to provide Us with
                certain personally identifiable information that can be used to
                contact or identify You. Personally identifiable information may
                include, but is not limited to:
              </p>
              <ul className="dark:text-gray-200">
                <li>
                  <p>Email address</p>
                </li>
                <li>
                  <p>First name and last name</p>
                </li>
                <li>
                  <p>Usage Data</p>
                </li>
              </ul>
              <h3 className="dark:text-white">Usage Data</h3>
              {usesData.map((item) => {
                return (
                  <div key={item.id}>
                    <p className="dark:text-gray-200">{item.desc}</p>
                  </div>
                );
              })}
              <h3 className="dark:text-white">
                Tracking Technologies and Cookies
              </h3>
              <p className="dark:text-gray-200">
                We use Cookies and similar tracking technologies to track the
                activity on Our Service and store certain information. Tracking
                technologies used are beacons, tags, and scripts to collect and
                track information and to improve and analyze Our Service. The
                technologies We use may include:
              </p>
              <ul className="dark:text-gray-300">
                <li>
                  <strong className="dark:text-white">
                    Cookies or Browser Cookies.
                  </strong>{" "}
                  A cookie is a small file placed on Your Device. You can
                  instruct Your browser to refuse all Cookies or to indicate
                  when a Cookie is being sent. However, if You do not accept
                  Cookies, You may not be able to use some parts of our Service.
                  Unless you have adjusted Your browser setting so that it will
                  refuse Cookies, our Service may use Cookies.
                </li>
                <li>
                  <strong className="dark:text-white">Flash Cookies.</strong>{" "}
                  Certain features of our Service may use local stored objects
                  (or Flash Cookies) to collect and store information about Your
                  preferences or Your activity on our Service. Flash Cookies are
                  not managed by the same browser settings as those used for
                  Browser Cookies. For more information on how You can delete
                  Flash Cookies, please read &quot;Where can I change the
                  settings for disabling, or deleting local shared
                  objects?&quot;
                </li>
                <li>
                  <strong className="dark:text-white">Web Beacons.</strong>{" "}
                  Certain sections of our Service and our emails may contain
                  small electronic files known as web beacons (also referred to
                  as clear gifs, pixel tags, and single-pixel gifs) that permit
                  the Company, for example, to count users who have visited
                  those pages or opened an email and for other related website
                  statistics (for example, recording the popularity of a certain
                  section and verifying system and server integrity).
                </li>
              </ul>
              <p className="dark:text-gray-200">
                Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                Cookies. Persistent Cookies remain on Your personal computer or
                mobile device when You go offline, while Session Cookies are
                deleted as soon as You close Your web browser. Learn more about
                cookies on the{" "}
                <a
                  href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                  target="_blank"
                  rel="noreferrer"
                  className="dark:text-white"
                >
                  Privacy Policies website
                </a>{" "}
                article.
              </p>
              <p className="dark:text-gray-200">
                We use both Session and Persistent Cookies for the purposes set
                out below:
              </p>
              <ul className="dark:text-white">
                <li>
                  <p>
                    <strong className="dark:text-white">
                      Necessary / Essential Cookies
                    </strong>
                  </p>
                  <p>Type: Session Cookies</p>
                  <p>Administered by: Us</p>
                  <p className="dark:text-gray-300">
                    Purpose: These Cookies are essential to provide You with
                    services available through the Website and to enable You to
                    use some of its features. They help to authenticate users
                    and prevent fraudulent use of user accounts. Without these
                    Cookies, the services that You have asked for cannot be
                    provided, and We only use these Cookies to provide You with
                    those services.
                  </p>
                </li>
                <li>
                  <p>
                    <strong className="dark:text-white">
                      Cookies Policy / Notice Acceptance Cookies
                    </strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p className="dark:text-gray-300">
                    Purpose: These Cookies identify if users have accepted the
                    use of cookies on the Website.
                  </p>
                </li>
                <li>
                  <p>
                    <strong className="dark:text-white">
                      Functionality Cookies
                    </strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Us</p>
                  <p className="dark:text-gray-300">
                    Purpose: These Cookies allow us to remember choices You make
                    when You use the Website, such as remembering your login
                    details or language preference. The purpose of these Cookies
                    is to provide You with a more personal experience and to
                    avoid You having to re-enter your preferences every time You
                    use the Website.
                  </p>
                </li>
                <li>
                  <p>
                    <strong className="dark:text-white">
                      Tracking and Performance Cookies
                    </strong>
                  </p>
                  <p>Type: Persistent Cookies</p>
                  <p>Administered by: Third-Parties</p>
                  <p className="dark:text-gray-300">
                    Purpose: These Cookies are used to track information about
                    traffic to the Website and how users use the Website. The
                    information gathered via these Cookies may directly or
                    indirectly identify you as an individual visitor. This is
                    because the information collected is typically linked to a
                    pseudonymous identifier associated with the device you use
                    to access the Website. We may also use these Cookies to test
                    new pages, features or new functionality of the Website to
                    see how our users react to them.
                  </p>
                </li>
              </ul>
              <p className="dark:text-gray-300">
                For more information about the cookies we use and your choices
                regarding cookies, please visit our Cookies Policy or the
                Cookies section of our Privacy Policy.
              </p>
              <h2 className="dark:text-white">Use of Your Personal Data</h2>
              {personalData.map((personal) => {
                return (
                  <div key={personal.id}>
                    <p className="dark:text-gray-200">{personal.title}</p>
                    <ul>
                      {personal.list.map((item) => {
                        return (
                          <li key={item.id}>
                            <p className="dark:text-gray-300">
                              <strong className="dark:text-white">
                                {item.strongText}
                              </strong>{" "}
                              {item.listText}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              <p className="dark:text-gray-200">
                We may share Your personal information in the following
                situations:
              </p>
              <ul className="dark:text-gray-300">
                <li>
                  <strong className="dark:text-white">
                    With Service Providers:
                  </strong>{" "}
                  We may share Your personal information with Service Providers
                  to monitor and analyze the use of our Service, for payment
                  processing, to contact You.
                </li>
                <li>
                  <strong className="dark:text-white">
                    For business transfers:
                  </strong>{" "}
                  We may share or transfer Your personal information in
                  connection with, or during negotiations of, any merger, sale
                  of Company assets, financing, or acquisition of all or a
                  portion of Our business to another company.
                </li>
                <li>
                  <strong className="dark:text-white">With Affiliates:</strong>{" "}
                  We may share Your information with Our affiliates, in which
                  case we will require those affiliates to honor this Privacy
                  Policy. Affiliates include Our parent company and any other
                  subsidiaries, joint venture partners or other companies that
                  We control or that are under common control with Us.
                </li>
                <li>
                  <strong className="dark:text-white">
                    With business partners:
                  </strong>{" "}
                  We may share Your information with Our business partners to
                  offer You certain products, services or promotions.
                </li>
                <li>
                  <strong className="dark:text-white">With other users:</strong>{" "}
                  when You share personal information or otherwise interact in
                  the public areas with other users, such information may be
                  viewed by all users and may be publicly distributed outside.
                </li>
                <li>
                  <strong className="dark:text-white">With Your consent</strong>
                  : We may disclose Your personal information for any other
                  purpose with Your consent.
                </li>
              </ul>
              <h2 className="dark:text-white">
                Retention of Your Personal Data
              </h2>
              {retention.map((item) => {
                return (
                  <div key={item.id}>
                    <p className="dark:text-gray-200">{item.desc}</p>
                  </div>
                );
              })}
              <h2 className="dark:text-white">
                Transfer of Your Personal Data
              </h2>
              {transfer.map((item) => {
                return (
                  <div key={item.id}>
                    <p className="dark:text-gray-300">{item.desc}</p>
                  </div>
                );
              })}
              <h2 className="dark:text-white">
                Disclosure of Your Personal Data
              </h2>
              <h3 className="dark:text-white">Business Transactions</h3>
              <p className="dark:text-gray-300">
                If the Company is involved in a merger, acquisition or asset
                sale, Your Personal Data may be transferred. We will provide
                notice before Your Personal Data is transferred and becomes
                subject to a different Privacy Policy.
              </p>
              <h3 className="dark:text-white">Law enforcement</h3>
              <p className="dark:text-gray-300">
                Under certain circumstances, the Company may be required to
                disclose Your Personal Data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
              </p>
              <h3 className="dark:text-white">Other legal requirements</h3>
              <p className="dark:text-gray-300">
                The Company may disclose Your Personal Data in the good faith
                belief that such action is necessary to:
              </p>
              <ul className="dark:text-gray-300">
                <li>Comply with a legal obligation</li>
                <li>
                  Protect and defend the rights or property of the Company
                </li>
                <li>
                  Prevent or investigate possible wrongdoing in connection with
                  the Service
                </li>
                <li>
                  Protect the personal safety of Users of the Service or the
                  public
                </li>
                <li>Protect against legal liability</li>
              </ul>
              <h2 className="dark:text-white">
                Security of Your Personal Data
              </h2>
              <p className="dark:text-gray-300">
                The security of Your Personal Data is important to Us, but
                remember that no method of transmission over the Internet, or
                method of electronic storage is 100% secure. While We strive to
                use commercially acceptable means to protect Your Personal Data,
                We cannot guarantee its absolute security.
              </p>
              <h2 className="dark:text-white mt-8">
                Detailed Information on the Processing of Your Personal Data
              </h2>
              <p className="dark:text-gray-300">
                The Service Providers We use may have access to Your Personal
                Data. These third-party vendors collect, store, use, process and
                transfer information about Your activity on Our Service in
                accordance with their Privacy Policies.
              </p>
              <h2 className="dark:text-white">Analytics</h2>
              <p className="dark:text-gray-300">
                We may use third-party Service providers to monitor and analyze
                the use of our Service.
              </p>
              <ul className="dark:text-gray-300">
                <li>
                  <p>
                    <strong className="dark:text-white">Firebase</strong>
                  </p>
                  <p className="dark:text-gray-300">
                    Firebase is an analytics service provided by Google Inc.
                  </p>
                  <p>
                    You may opt-out of certain Firebase features through your
                    mobile device settings, such as your device advertising
                    settings or by following the instructions provided by Google
                    in their Privacy Policy:{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="dark:text-white"
                    >
                      click here
                    </a>
                  </p>
                  <p>
                    {` We also encourage you to review the Google's policy for safeguarding
            your data:`}{" "}
                    <a
                      href="https://support.google.com/analytics/answer/6004245"
                      rel="noreferrer"
                      target="_blank"
                    >
                      click here
                    </a>
                  </p>
                  <p>
                    {`For more information on what type of information Firebase collects,
            please visit the How Google uses data when you use our partners'
            sites or apps webpage:`}{" "}
                    <a
                      href="https://policies.google.com/technologies/partner-sites"
                      rel="noreferrer"
                      target="_blank"
                      className="dark:text-white"
                    >
                      click here
                    </a>
                  </p>
                </li>
              </ul>
              <h2 className="dark:text-white">Email Marketing</h2>
              <p className="dark:text-gray-300">
                We may use Your Personal Data to contact You with newsletters,
                marketing or promotional materials and other information that
                may be of interest to You. You may opt-out of receiving any, or
                all, of these communications from Us by following the
                unsubscribe link or instructions provided in any email We send
                or by contacting Us.
              </p>
              <p className="dark:text-gray-300">
                We may use Email Marketing Service Providers to manage and send
                emails to You.
              </p>
              <ul className="dark:text-gray-300">
                <li>
                  <p>
                    <strong className="dark:text-white">Mailchimp</strong>
                  </p>
                  <p>
                    Mailchimp is an email marketing sending service provided by
                    The Rocket Science Group LLC.
                  </p>
                  <p>
                    For more information on the privacy practices of Mailchimp,
                    please visit their Privacy policy:{" "}
                    <a
                      href="https://mailchimp.com/legal/privacy/"
                      rel="noreferrer"
                      target="_blank"
                      className="dark:text-white"
                    >
                      click here
                    </a>
                  </p>
                </li>
              </ul>
              <h2 className="dark:text-white">Payments</h2>
              <p className="dark:text-gray-300">
                We may provide paid products and/or services within the Service.
                In that case, we may use third-party services for payment
                processing (e.g. payment processors).
              </p>
              <p className="dark:text-gray-300">
                We will not store or collect Your payment card details. That
                information is provided directly to Our third-party payment
                processors whose use of Your personal information is governed by
                their Privacy Policy. These payment processors adhere to the
                standards set by PCI-DSS as managed by the PCI Security
                Standards Council, which is a joint effort of brands like Visa,
                Mastercard, American Express and Discover. PCI-DSS requirements
                help ensure the secure handling of payment information.
              </p>
              <ul className="dark:text-gray-300">
                <li>
                  <p>
                    <strong className="dark:text-white">Stripe</strong>
                  </p>
                  <p>
                    Their Privacy Policy can be viewed at{" "}
                    <a
                      href="https://stripe.com/us/privacy"
                      rel="noreferrer"
                      target="_blank"
                      className="dark:text-white"
                    >
                      click here
                    </a>
                  </p>
                </li>
              </ul>
              <h2 className="dark:text-white mt-8">{`Children's Privacy`}</h2>
              {childrenPrivacy.map((item) => {
                return (
                  <p
                    className="dark:text-gray-300 relative -top-4"
                    key={item.id}
                  >
                    {item.desc}
                  </p>
                );
              })}
              <h2 className="dark:text-white mt-8">Links to Other Websites</h2>
              {linkToOtherWebsite.map((item) => {
                return (
                  <p
                    className="dark:text-gray-300 relative -top-4"
                    key={item.id}
                  >
                    {item.desc}
                  </p>
                );
              })}
              <h2 className="dark:text-white mt-8">
                Changes to this Privacy Policy
              </h2>
              {changesPrivacy.map((item) => {
                return (
                  <p
                    className="dark:text-gray-300 relative -top-4"
                    key={item.id}
                  >
                    {item.desc}
                  </p>
                );
              })}
              <h2 className="dark:text-white mt-8">Contact Us</h2>
              {contactUs.map((contact) => {
                return (
                  <div key={contact.id} className="mb-14">
                    <p className="dark:text-gray-300 relative -top-4">
                      {contact.title}
                    </p>
                    <ul>
                      {contact.list.map((item) => {
                        return (
                          <li key={item.id}>
                            <p className="dark:text-gray-300">{item.desc}</p>
                          </li>
                        );
                      })}
                      <li>
                        <p className="dark:text-gray-300">
                          By visiting this page on our website:{" "}
                          <a
                            href="https://www.blogs.leetcv.com/"
                            rel="noreferrer"
                            target="_blank"
                            className="dark:text-white"
                          >
                            www.blogs.leetcv.com
                          </a>
                        </p>
                      </li>
                    </ul>
                  </div>
                );
              })}
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
