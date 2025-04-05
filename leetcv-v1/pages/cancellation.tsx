import Footer from "@components/home/footer";
import { pageTitleState } from "@state/state";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function CancellationPolicy() {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const t = useTranslations("Privacy");

  useEffect(() => {
    setProdTitle("Cancellation Policy");
  }, []);

  return (
    <>
      <NextSeo
        title={"Cancellation Policy | LeetCV"}
        description={t("description")}
        key={t("key")}
        canonical={t("canonical")}
      />
      <div className="w-full dark:bg-gray-900 h-full">
        <div className="max-w-5xl mx-auto px-2 md:px-10 pt-5 md:pt-16">
          <div className="py-2 px-5 rounded-md mb-2 bg-gradient-to-r from-indigo-100 to-pink-200 dark:from-gray-800 dark:to-gray-700 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl font-semibold dark:text-white">
              Cancellation Policy
            </h2>
            <h4 className="text-base pt-3 md:pt-0 dark:text-gray-100">
              Last updated: October 06, 2023
            </h4>
          </div>
          <div className="flex flex-col items-center justify-center w-full min-w-7xl">
            <div className="mt-7 privacy px-5 prose">
              <p className="dark:text-gray-200">
                LeetCV, a service provided by Darthwares Limited, with its
                registered address at{" "}
                <strong className="dark:text-gray-100">
                  21/1 Sri Balaji Nagar, Uppilipalayam main road,
                  Varadharajapuram, Coimbatore - 641015
                </strong>
                {`, ("LeetCV," "we," "us," or "our") is committed to ensuring the
                satisfaction of our valued users ("User" or "Users" or "you" or
                "your") when using our services through the LeetCV platform..
                This policy outlines our procedures and policies for
                cancellations, and it is essential that you carefully read and
                understand these terms before using our platform.`}
              </p>
              <h2 className="dark:text-white">Applicability of policy</h2>
              <ul className="dark:text-gray-200">
                <li>
                  <p>
                    1.1 Agreement to Terms: By using the LeetCV Platform and/or
                    initiating a purchase request for our services, you agree to
                    abide by the terms outlined in this Policy without any
                    modifications. If you do not agree with the terms, we
                    recommend refraining from using the LeetCV Platform.
                  </p>
                </li>
                <li>
                  <p>
                    1.2 Policy Updates: Please be aware that we may make changes
                    to the terms of this Policy from time to time. Whenever you
                    use the LeetCV Platform, we advise you to review this Policy
                    to ensure your understanding of the terms and conditions
                    applicable at that moment.
                  </p>
                </li>
              </ul>
              <h2 className="dark:text-white">Terms for cancellation</h2>
              <h3 className="dark:text-white">Cancellation of Services</h3>
              <ul className="dark:text-gray-200">
                <li>
                  <p>
                    (a) Cancellation Process: If you decide to cancel a service
                    order, please refer to the unique tracking identity number (
                    Invoice ID or registered email ID ) provided to you, and
                    send a cancellation request to{" "}
                    <a href="mailto:leetcv@darthwares.com">
                      leetcv@darthwares.com
                    </a>
                  </p>
                </li>
              </ul>
              <div>
                <h2 className="dark:text-white">LeetCV Subscription Terms</h2>
                <p className="dark:text-gray-200">
                  {`These Terms of Use govern your use of our service. As used in
                these Terms of Use, "LeetCV service", "our service" or "the
                service" means the personalized service provided by LeetCV for
                discovering and accessing LeetCV content, including all
                features and functionalities, recommendations and reviews, our
                websites, and user interfaces, as well as all content and
                software associated with our service. References to ‘you’ in
                these Terms of Use indicate the member who created the LeetCV
                account and whose payment method is charged.`}
                </p>

                <h3 className="dark:text-white">1. Acceptance of Terms</h3>
                <p className="dark:text-gray-200">
                  {`By accessing or using LeetCV's service, you
                  agree to comply with and be bound by these Terms of Use. If
                  you do not agree to these terms, please do not use the
                  Service.`}
                </p>

                <h3 className="dark:text-white">2. Membership</h3>

                <div className="pl-6">
                  <h4 className="dark:text-white">2.1. Subscription</h4>
                  <p className="dark:text-gray-200">
                    Your LeetCV membership will continue until terminated. To
                    use the Service, you must have Internet access and a
                    compatible device. You are required to provide valid payment
                    details, referred to as Payment Method. Unless you cancel
                    your membership before your billing date, you authorize us
                    to charge the membership fee for the next billing cycle to
                    your Payment Method.
                  </p>
                </div>

                <div className="pl-6">
                  <h4 className="dark:text-white">2.2. Membership Plans</h4>
                  <p className="dark:text-gray-200">
                    We offer various membership plans. Different plans may have
                    varying conditions and limitations, which will be
                    communicated during sign-up or through other available
                    means. Details of your specific LeetCV membership can be
                    found on our website under your profile name.
                  </p>
                </div>

                <h3 className="dark:text-white">3. Billing and Cancellation</h3>

                <div className="pl-6">
                  <h4 className="dark:text-white">3.1. Billing Cycle</h4>
                  <p className="dark:text-gray-200">
                    {`The membership fee and any associated charges, such as taxes
                    and transaction fees, will be charged to your Payment Method
                    on the specified payment date, as indicated on your
                    "Settings" page. The billing cycle length depends on your
                    chosen subscription type. Payment dates may change under
                    specific circumstances, and you can review your next payment
                    date on the "Billing details" link of your "Settings" page.`}
                  </p>
                </div>

                <div className="pl-6">
                  <h4 className="dark:text-white">3.2. Payment Methods</h4>
                  <p className="dark:text-gray-200">
                    You are required to provide one or more Payment Methods for
                    using the Service. In case your primary Payment Method is
                    declined or unavailable, we may charge any associated
                    Payment Method on your account. You remain responsible for
                    any outstanding payments. Failure to settle payments may
                    result in the suspension of your Service access. Certain
                    Payment Methods may entail additional fees, such as foreign
                    transaction fees; check with your Payment Method provider
                    for details.
                  </p>
                </div>

                <div className="pl-6">
                  <h4 className="dark:text-white">
                    3.3. Updating Payment Methods
                  </h4>
                  <p className="dark:text-gray-200">
                    {`You can update your Payment Methods by visiting the
                    "Settings" page. LeetCV may also update Payment Methods using
                    information from payment service providers. After any
                    update, you authorize us to continue charging the applicable
                    Payment Method(s).`}
                  </p>
                </div>

                <div className="pl-6">
                  <h4 className="dark:text-gray-200">3.4. No Refund Policy</h4>
                  <p className="dark:text-gray-200">
                    {`You can cancel your LeetCV membership at any time, retaining
                    access to the Service until the end of your current billing
                    period. Payments are generally non-refundable, and no
                    refunds or credits are provided for partial membership
                    periods or unused Service content. To cancel, follow the
                    instructions on the "Settings" page. If you initially signed
                    up for LeetCV using a third-party Payment Method, you may
                    need to cancel through that third party.`}
                  </p>
                </div>

                <div className="pl-6">
                  <h4 className="dark:text-gray-200">
                    3.5. Price and Subscription Plan Changes
                  </h4>
                  <p className="dark:text-gray-200">
                    LeetCV reserves the right to modify subscription plans and
                    service prices, with changes taking effect no earlier than
                    30 days following notice to you. We will notify you of such
                    changes in advance.
                  </p>
                </div>
              </div>
              <h3>Customer Support</h3>
              <p className="dark:text-gray-100">
                For any inquiries or concerns related to cancellations, please
                contact our customer support team at leetcv@darthwares.com.
              </p>
              <p className="dark:text-gray-100">
                At LeetCV, we are dedicated to providing a seamless and
                satisfying experience for our users
              </p>
              <h3 className="dark:text-white">Address</h3>
              <p className="dark:text-gray-100">
                21/1 Sri Balaji Nagar, Uppilipalayam main road,
                Varadharajapuram, Coimbatore - 641015
              </p>
            </div>
          </div>
        </div>
        <div className="pt-10">
          <Footer />
        </div>
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
