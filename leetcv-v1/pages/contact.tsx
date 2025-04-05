import Footer, { footerSocialMedia } from "@components/home/footer";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import { GetStaticPropsContext } from "next";
import emailjs from "emailjs-com";
import { useSetRecoilState } from "recoil";
import { pageTitleState } from "@state/state";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ContactField, contactList, validateEmail } from "@constants/defaults";
import { useTranslations } from "next-intl";
import { SvgGrid } from "@components/svgGrid";
import { NextSeo } from "next-seo";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumber } from "awesome-phonenumber";
import { useTheme } from "next-themes";

export default function Contact() {
  const t = useTranslations("Contact");
  const [phoneNum, setPhoneNum] = useState("");
  const [isPhoneNumValid, setIsPhoneNumValid] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [isNumThere, setIsNumThere] = useState<boolean>(false);
  const setProdTitle = useSetRecoilState(pageTitleState);
  const isValidEmail = validateEmail(email);
  const { theme } = useTheme();

  const handlePhoneNumberChange = (inputValue: string) => {
    setPhoneNum(inputValue);
    const phoneNumber = parsePhoneNumber(inputValue);
    if (phoneNumber?.valid) {
      setIsPhoneNumValid(true);
    } else {
      setIsPhoneNumValid(false);
    }
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    if (!phoneNum || phoneNum.length < 9) {
      setIsNumThere(true);
    } else if (isValidEmail && isPhoneNumValid) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID!,
          process.env.NEXT_PUBLIC_TEMPLATE_ID!,
          e.target,
          process.env.NEXT_PUBLIC_USER_ID!
        )
        .then(
          () => {
            toast.success(t("success"));
          },
          () => {
            toast.error(t("error"));
          }
        );
    }
    e.target.reset();
  };

  useEffect(() => {
    setProdTitle(t("contact"));
  }, []);

  return (
    <>
      <NextSeo
        title={t("title")}
        description={t("description")}
        key={t("key")}
        canonical={t("canonical")}
      />
      <div>
        <div className=" py-8 dark:bg-gray-900 md:py-16 md:px-6">
          <div className="relative mx-auto max-w-7xl bg-white dark:bg-gray-900">
            <h2 className="sr-only">{t("contactUs")}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="relative overflow-hidden bg-gradient-to-r dark:from-gray-800 dark:to-gray-700 from-indigo-200 to-pink-300 py-10 px-6 sm:px-10 xl:p-12 rounded-t-md lg:rounded-t-none lg:rounded-tl-md lg:rounded-bl-md">
                <SvgGrid />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {t("contactInfo")}
                </h3>
                <p className="mt-6 max-w-3xl text-base text-gray-900 dark:text-gray-100">
                  {t("contactDesc")}
                </p>
                <dl className="mt-8 space-y-6">
                  <dt>
                    <span className="sr-only">{t("phoneNumber")}</span>
                  </dt>

                  <dt>
                    <span className="sr-only">{t("email")}</span>
                  </dt>
                  <dd className="flex text-base text-gray-900 hover:text-indigo-500 dark:text-gray-100 dark:hover:text-gray-300">
                    <MailIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <a
                      href="mailto:leetcv@darthwares.com"
                      target={"_blank"}
                      rel="noreferrer"
                      className="ml-3"
                    >
                      {t("leetcvEmail")}
                    </a>
                  </dd>
                  <dd className="flex text-base text-gray-900 hover:text-indigo-500 dark:text-gray-100 dark:hover:text-gray-300">
                    <PhoneIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <a
                      href={`tel:${t("contactNumber")}`}
                      target={"_blank"}
                      rel="noreferrer"
                      className="ml-3"
                    >
                      {t("contactNumber")}
                    </a>
                  </dd>
                  <dd className="flex text-base text-gray-900 hover:text-indigo-500 dark:text-gray-100 dark:hover:text-gray-300">
                    <LocationMarkerIcon
                      className="h-6 w-6 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div className="ml-3">{t("leetcvAddress")}</div>
                  </dd>
                </dl>
                <ul
                  role="list"
                  className="mt-8 flex space-x-8 justify-center items-center md:space-x-12 lg:space-x-6"
                >
                  {footerSocialMedia.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target={"_blank"}
                        rel="noreferrer"
                        className={`${
                          item.name === "Facebook" && "relative top-1"
                        } text-gray-900 dark:text-gray-100 dark:hover:text-gray-300 hover:text-indigo-500`}
                      >
                        <span className="sr-only">{item.name}</span>
                        <item.icon className={`h-6 w-6`} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="py-10 px-6 sm:px-10 lg:col-span-2 border rounded-b-md lg:rounded-b-none border-gray-200 dark:border-gray-700 lg:rounded-tr-md lg:rounded-br-md xl:p-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {t("sentMessage")}
                </h3>
                <form
                  onSubmit={handleOnSubmit}
                  className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  {contactList?.map((item: ContactField) => {
                    return (
                      <div key={item.fieldName}>
                        <label
                          htmlFor={item.title}
                          className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          {item.title}
                        </label>
                        <div className="mt-1">
                          {item.title === "Phone Number" ? (
                            <>
                              <PhoneInput
                                defaultCountry="in"
                                forceDialCode={true}
                                className="block w-full bg-transparent rounded-md"
                                inputClassName={`block w-full rounded-md  py-2 px-4 ${
                                  theme === "dark" && "editorPhNum-dark"
                                } editorPhNum shadow-sm`}
                                value={phoneNum}
                                onChange={handlePhoneNumberChange}
                                countrySelectorStyleProps={{
                                  buttonClassName:
                                    theme === "dark"
                                      ? "phone-num-dark-btn"
                                      : undefined,
                                }}
                              />
                              <p className="text-xs font-medium text-red-500 pl-1 pt-1">
                                {phoneNum.length > 9 &&
                                  !isPhoneNumValid &&
                                  t("phoneNumNotValid")}
                                {isNumThere &&
                                  phoneNum.length < 9 &&
                                  t("enterPhNum")}
                              </p>
                            </>
                          ) : (
                            <>
                              <input
                                type={item.type}
                                name={item.fieldName}
                                id={item.fieldName}
                                autoComplete="given-name"
                                className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm dark:bg-gray-800 dark:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500"
                                required={true}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (item.title === "Email") {
                                    setEmail(e.target.value);
                                  }
                                }}
                              />
                              {item.title === "Email" && (
                                <p className="text-xs font-medium text-red-500 pl-1 pt-1">
                                  {email.length > 7 &&
                                    !isValidEmail &&
                                    t("emailNotValid")}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor={t("subject")}
                      className="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      {t("subject")}
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100  focus:ring-indigo-500"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex justify-between">
                      <label
                        htmlFor={t("message")}
                        className="text-sm font-medium text-gray-900 dark:text-gray-100"
                      >
                        {t("message")}
                      </label>
                      <span
                        id="message-max"
                        className="text-sm text-gray-500 dark:text-gray-300"
                      >
                        {t("maxChars")}
                      </span>
                    </div>
                    <div className="mt-1">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        className="w-full rounded-md border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100"
                        aria-describedby="message-max"
                        defaultValue={""}
                        required={true}
                        maxLength={500}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:flex sm:justify-end">
                    <button
                      type="submit"
                      className={`${
                        !isPhoneNumValid || !isValidEmail
                          ? "opacity-70 cursor-default"
                          : "opacity-100 cursor-pointer"
                      } inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 sm:w-auto`}
                    >
                      {t("submit")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
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
