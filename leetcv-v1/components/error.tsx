import { convertLanguages } from "@constants/defaults";
import { useAutoSave } from "@lib/helper/useAutoSave";
import { resumeState } from "@state/state";
import { NextPageContext } from "next";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps): JSX.Element {
  const { handleAutoSave } = useAutoSave();
  const t = useTranslations("500");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    handleAutoSave();
  }, [userInfo]);

  return (
    <div className="dark:bg-gray-900 h-[calc(100vh-64px)]">
      {statusCode ? (
        <section className="flex items-center h-full p-3 md:p-16">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-7xl text-center flex flex-col lg:flex-row items-center gap-1 md:gap-20">
              <div className="h-[18rem] md:h-[25rem] w-full">
                <lottie-player
                  src="/assets/lottie/error-500.json"
                  background=""
                  speed="1"
                  loop
                  autoplay
                  className="bg-gradient-to-r from-indigo-100 to-pink-200"
                />
              </div>
              <div className="w-full flex flex-col items-center ">
                <p className="text-2xl font-semibold md:text-2xl dark:text-white">
                  {t("500Title")}
                </p>
                <p className="mt-4 mb-8 w-80 md:w-96 flex flex-wrap dark:text-gray-200">
                  {t("500Description")}
                </p>
                <a
                  href={`/`}
                  onClick={() => {
                    if (
                      userInfo?.languages &&
                      userInfo.languages.every(
                        (lang) => typeof lang === "string"
                      )
                    ) {
                      const updatedLanguages = convertLanguages(
                        userInfo.languages
                      );
                      setUserInfo({
                        ...userInfo,
                        languages: updatedLanguages,
                      });
                    }
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {t("500Button")}
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        "An error occurred on client"
      )}
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = res?.statusCode || err?.statusCode || 404;
  return { statusCode };
};

export default Error;
