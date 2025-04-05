import { handleNavigation, handlePath } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Button } from "shadcn/components/ui/button";
import BackgroundBlur from "@components/resource/backgroundBlur";
import { useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import { HeroSkeleton } from "@components/home/heroSkeleton";

export default function HeroHome() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const { status } = useSession();
  const queryParams = router.query;
  const [query, setQuery] = useState<string>("");
  const path =
    handlePath[query] !== undefined ? handlePath[query] : "/s/resumeEditor";
  const { data: resumeCount } = trpc.useQuery(["fs.public.getResumeCount"]);
  const resumeCounter: number = resumeCount ?? 0;
  const [count, setCount] = useState<number>(resumeCount ?? 0);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ["brand-grad", "text-gray-700", "text-gray-700"];

  useEffect(() => {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === "true") {
        setQuery(key);
      }
    });
  }, [router.query]);

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
    <>
      <BackgroundBlur />
      <div className="flex flex-col max-w-7xl mx-auto w-full items-center justify-center p-4 mt-8 md:mt-16">
        <div className="py-2 space-y-6 text-center">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center w-full">
            <div className="text-4xl text-center flex font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl">
              <div className="mt-2 h-10 md:h-16 w-full mx-auto flex flex-wrap lg:whitespace-nowrap mb-2">
                <h1 className="text-center w-full">
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
                </h1>
              </div>
            </div>
          </div>
          <p className="text-center text-muted-foreground max-w-2xl mt-2">
            {t("craftResume")}
          </p>
        </div>
        <div>
          <Button
            className="mt-6 px-8 py-4 text-lg font-semibold bg-indigo-500 text-white rounded-full"
            onClick={() => handleNavigation(path, status, router)}
          >
            {t("tryFree")}
          </Button>
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

        <div className="mt-10 w-full max-w-7xl bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center w-full h-full">
            <iframe
              src="https://www.youtube.com/embed/ABlXLuwZHDQ?autoplay=1&mute=1&loop=1&playlist=ABlXLuwZHDQ"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[12rem] md:h-[42.2rem] rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
}
