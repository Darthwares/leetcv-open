import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { memo, useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { HeroSkeleton } from "./heroSkeleton";
import { handleNavigation } from "@constants/defaults";

const Hero = () => {
  const t = useTranslations("HomePage");
  const { status } = useSession();
  const router = useRouter();
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["brand-grad", "text-gray-700", "text-gray-700"];
  const { data: resumeCount } = trpc.useQuery(["fs.public.getResumeCount"]);
  const resumeCounter: number = resumeCount ?? 0;
  const [count, setCount] = useState<number>(resumeCount ?? 0);

  useEffect(() => {
    if (resumeCounter) {
      const startingPoint = Math.floor(resumeCounter * 0.9);
      const interval = setInterval(() => {
        setCount((prevCount: number) => {
          const incrementedCount = prevCount + 100;
          return incrementedCount <= resumeCounter
            ? incrementedCount
            : resumeCounter;
        });
      }, 10);
      setCount(startingPoint);
      return () => {
        clearInterval(interval);
      };
    }
  }, [resumeCounter]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((prevIndex) => (prevIndex + 2) % colors.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <header className="w-full overflow-hidden dark:bg-gray-900 lg:dark:bg-transparent lg:bg-transparent lg:px-5 transition-all duration-1000">
        <div
          className=" pt-4 flex flex-col justify-center items-center text-center w-full"
          data-testid="hero"
        >
          <div className="py-6 lg:bg-transparent lg:pt-14 lg:pl-16 xl:pl-20">
            <div
              className="px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0 flex flex-col items-center justify-center"
              data-testid="right-hero"
            >
              <div className="text-4xl flex flex-col font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl">
                <div className="mt-2 h-10 md:h-16 w-[22rem] md:w-full flex flex-col flex-wrap md:flex-row lg:whitespace-nowrap whitespace-normal mb-2">
                  <h2>
                    <span
                      data-testid="write"
                      className={`brand-grad text-3xl md:text-5xl lg:text-6xl transition-all ease-in-out duration-700 color-${colorIndex}
                      `}
                    >
                      {t("write")}&nbsp;
                    </span>
                    <span
                      data-testid="refine"
                      className={`brand-grad text-3xl md:text-5xl lg:text-6xl transition-all ease-in-out duration-700 color-${
                        (colorIndex + 1) % colors.length
                      }`}
                    >
                      {t("refine")}&nbsp;
                    </span>
                    <span
                      data-testid="publish"
                      className={`brand-grad text-3xl md:text-5xl lg:text-6xl transition-all ease-in-out duration-700 color-${
                        (colorIndex + 2) % colors.length
                      }`}
                    >
                      {t("publish")}
                    </span>
                  </h2>
                </div>
                <div
                  data-testid={`highlightLine`}
                  className="block xl:inline text-3xl md:text-5xl w-full dark:text-gray-100 lg:whitespace-nowrap whitespace-normal "
                >
                  {t("highlightLine")}
                </div>
              </div>
              <p
                data-tut="reactour__four"
                className="mt-3 text-slate-600 dark:text-gray-100 md:text-xl"
                data-testid="description"
              >
                {t("description")}
              </p>
              <div
                className="mt-7 flex space-x-4 items-center justify-center"
                data-testid="btnLink"
                data-tut="reactour__one"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 whitespace-nowrap ">
                  <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2 place-content-center">
                    <button
                      onClick={() =>
                        handleNavigation("/s/convert", status, router)
                      }
                    >
                      <span className="primary-btn dark:shadow-none dark:hover:shadow-none dark: px-4 py-3">
                        {t("primaryButtonTxt")}
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleNavigation("/s/aiResume", status, router)
                      }
                      className="font-medium block transition-all ease-in duration-500 bg-gray-50 md:text-lg rounded-md px-4 py-3 shadow-md hover:shadow-lg shadow-indigo-400 text-indigo-600 hover:shadow-indigo-500 dark:shadow-none dark:hover:shadow-none"
                    >
                      {t("createAiResume")}
                    </button>
                  </div>
                </div>
              </div>
              {count ? (
                <HeroSkeleton>
                  <span className="animate-ping block h-1.5 w-1.5 rounded-full ring-0 ring-green-500 bg-green-800"></span>
                  <span className="w-full flex items-center gap-2">
                    <div>{count}</div>
                    <div className=""> {t("createdToday")}</div>
                  </span>
                </HeroSkeleton>
              ) : (
                <HeroSkeleton>
                  <span className="w-full animate-pulse flex items-center gap-2">
                    <div className="w-7 bg-gray-50 h-6 rounded-md dark:bg-gray-800"></div>
                    <div className="w-40 bg-gray-50 h-6 rounded-md dark:bg-gray-800">
                      {" "}
                    </div>
                  </span>
                </HeroSkeleton>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default memo(Hero);
