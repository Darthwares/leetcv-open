import React from "react";
import { useRouter } from "next/router";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";

const UpSell = () => {
  const router = useRouter();
  const t = useTranslations("UpSell");

  return (
    <div
      data-testid="upSell"
      className="grid gap-2 relative top-3 md:top-4 w-full md:mb-5"
    >
      <div
        className="flex p-4 md:mb-4 lg:mb-0 text-indigo-800 rounded-lg bg-indigo-50"
        role="alert"
        data-testid="alert"
      >
        <ChatAlt2Icon
          data-testid="icon"
          className="w-5 h-5 text-gray-500 cursor-pointer relative top-1 md:top-0"
        />{" "}
        <div className="ml-3 text-base flex flex-col md:flex-row gap-2 items-start md:items-center space-x-2">
          <span className="flex items-center gap-5">{t("haveAFeedback")}</span>
          <button
            data-testid="button"
            onClick={() => {
              router.push("/auth/signin?redirect=" + router.asPath);
            }}
            className="font-semibold underline hover:no-underline inline-flex items-center ml-0 relative right-2 md:right-0 md:ml-2 cursor-pointer text-center"
          >
            {t("login")}
            <span data-testid="testSVG">
              <svg
                aria-hidden="true"
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpSell;
