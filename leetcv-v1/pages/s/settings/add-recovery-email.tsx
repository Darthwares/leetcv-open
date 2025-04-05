import { GetStaticPropsContext } from "next";
import { DocumentDuplicateIcon } from "@heroicons/react/outline";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Notification from "@components/notification";
import { trpc } from "@utils/trpc";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  pageTitleState,
  showRecoveredResumeState,
  userIdState,
} from "@state/state";
import emailjs from "emailjs-com";
import { LoadingSvg } from "@components/svg";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Container from "@components/container";
import ActionNeededCard from "@components/actionNeededCard";
import Footer from "@components/home/footer";
import useDailyUserCount from "@lib/helper/useDailyUserCount";

const AddRecoveryEmail = () => {
  const [email, setEmail] = useState("");
  const setProdTitle = useSetRecoilState(pageTitleState);
  const setIsResumeVisible = useSetRecoilState(showRecoveredResumeState);
  const addRecoveryEmail = trpc.useMutation("fs.recoverEmail.addRecoveryEmail");
  const t = useTranslations("Settings");
  const { data: session } = useSession();
  useDailyUserCount();

  const [userId] = useRecoilState(userIdState);
  const {
    data: recoveryCode,
    refetch,
    isLoading,
  } = trpc.useQuery(["fs.recoverEmail.getRecoverCode", { id: userId }]);

  const isButtonDisabled = addRecoveryEmail.isLoading;

  const addHandleRecoveryEmail = (e: any) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    const isNotValidEmail = process.env
      .NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN!.split(",")
      .some((domain) => email.endsWith(domain));

    if (isNotValidEmail) {
      return toast.error(t("enterPersonalMail"));
    }

    setIsResumeVisible(true);
    addRecoveryEmail.mutate(
      {
        id: userId,
        email,
      },
      {
        onError: (error) => {
          toast.error(error.message);
        },
        onSuccess: () => {
          refetch();
          emailjs
            .sendForm(
              process.env.NEXT_PUBLIC_SERVICE_ID!,
              process.env.NEXT_PUBLIC_RECOVERY_ACCOUNT_TEMPLATE_ID!,
              e.target,
              process.env.NEXT_PUBLIC_USER_ID
            )
            .then(() => {
              toast.success(t("recoveryCode"));
              setEmail("");
            })
            .catch((e) => {
              toast.error(e.message);
            });
        },
      }
    );
  };

  useEffect(() => {
    setProdTitle(t("settings"));
  }, []);

  return (
    <>
      <NextSeo
        title={"Add Secondary Email | LeetCV"}
        description="Add a secondary email to your LeetCV account to ensure continuous access. This is especially useful if your primary email is restricted by your institute or college."
        key={"LeetCV, Add Secondary Email, Account Settings, Recovery Email"}
        canonical={`https://www.leetcv.com/s/settings/add-recovery-email`}
        openGraph={{
          url: "https://www.leetcv.com/s/settings/add-recovery-email",
          title: "Add Secondary Email | LeetCV",
          description:
            "Add a secondary email to your LeetCV account to ensure continuous access. This is especially useful if your primary email is restricted by your institute or college.",
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Add Secondary Email",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Add Secondary Email",
          description:
            "Add a secondary email to your LeetCV account to ensure continuous access. This is especially useful if your primary email is restricted by your institute or college.",
          url: "https://www.leetcv.com/s/settings/add-recovery-email",
        })}
      </script>
      <Container loading={isLoading}>
        <div className="w-full space-y-8 px-3 mt-6 lg:mt-0 lg:py-8 min-h-[60vh]">
          <h2 className="text-xl text-gray-700 font-bold">
            {t("addSecondaryEmail")}
          </h2>
          <ActionNeededCard cardDescription={t("addSecondaryEmailDesc")} />
          <div className="rounded-2xl bg-indigo-50 p-5 md:py-0 md:pb-4 md:px-1 max-w-5xl">
            <div className="lg:py-[20px] md:px-8">
              <div className="bg-indigo-50">
                <div className="-ml-4 flex justify-between items-center flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap">
                  {recoveryCode && (
                    <div className="ml-4 mt-4 space-y-2 w-full">
                      <h3 className="leading-6 font-medium handleName pb-1">
                        {t("yourRecoveryCode")}
                      </h3>
                      <div className="flex items-center gap-2 w-full overflow-x-scroll">
                        <span className="mt-1 text-gray-500 rounded-md px-2 bg-gray-200">
                          {recoveryCode?.recoverCode?.slice(0, 6)}
                          {t("dot")}
                        </span>
                        <div>
                          <DocumentDuplicateIcon
                            onClick={() => {
                              copy(`${recoveryCode?.recoverCode}`, {
                                debug: true,
                              });
                              toast.success(t("copiedToClipBoard"));
                            }}
                            className="w-5 h-5 text-indigo-400 cursor-pointer visitProfile"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <form
                className="space-y-1 mt-3 max-w-sm"
                onSubmit={addHandleRecoveryEmail}
              >
                <div>
                  <label htmlFor="recoveryEmail" className="block font-medium">
                    {t("addSecondaryEmail")}
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      id="recoveryEmail"
                      name="recoveryEmail"
                      type="email"
                      autoComplete="email"
                      value={email || ""}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={t("enterSecondaryEmail")}
                    />
                    <input
                      id="currentUserEmail"
                      name="currentUserEmail"
                      type="email"
                      autoComplete="email"
                      value={session?.user?.email!}
                      readOnly={true}
                      className="hidden"
                    />
                    <input
                      id="senderEmail"
                      name="senderEmail"
                      type="email"
                      autoComplete="email"
                      value={email}
                      readOnly={true}
                      className="hidden"
                    />
                    <input
                      id="recoveryCode"
                      name="recoveryCode"
                      type="text"
                      value={recoveryCode?.recoverCode}
                      readOnly={true}
                      className="hidden"
                    />
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="submit"
                        className={`relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
                          isButtonDisabled
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={isButtonDisabled}
                      >
                        {addRecoveryEmail.isLoading ? <LoadingSvg /> : null}
                        {t("add")}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <Notification />
          </div>
        </div>
        <div className=" pt-14">
          <Footer />
        </div>
      </Container>
    </>
  );
};

export default AddRecoveryEmail;

export function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${locale}.json`),
      now: new Date().getTime(),
    },
  };
}
