import { useTheme } from "next-themes";
import { GridPattern } from "./gridPattern";
import { SectionHeading } from "./sectionHeading";
import { useTranslations } from "next-intl";

export function Design() {
  const t = useTranslations("HomePage");
  const { theme } = useTheme();

  return (
    <section
      id="Design"
      aria-labelledby="author-title"
      className="relative scroll-mt-2 pt-2 sm:scroll-mt-2 sm:pt-3 lg:pt-3 dark:bg-gray-950"
    >
      <div className="absolute inset-x-0 bottom-0 top-1/2 text-slate-900/10 [mask-image:linear-gradient(transparent,white dark:bg-gray-900)]">
        <GridPattern x="50%" y="100%" />
      </div>
      <div className="relative mx-auto max-w-5xl pt-16 sm:px-6 dark:bg-gray-950">
        <div className="bg-gradient-to-r from-indigo-100 to-pink-200 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-900 pt-px sm:rounded-6xl">
          <div className="relative mx-auto -mt-16 h-44 w-44 overflow-hidden rounded-full dark:bg-gray-950 bg-slate-200 md:float-right md:h-64 md:w-64 md:[shape-outside:circle(40%)] lg:mr-20 lg:h-72 lg:w-72">
            <lottie-player
              src="/assets/lottie/cv-analysis.json"
              background={theme === "dark" ? "" : "white"}
              speed="1"
              loop
              autoplay
            />
          </div>
          <div className="px-4 py-10 sm:px-10 sm:py-16 md:py-20 lg:px-20 lg:pt-32 lg:pb-12 dark:bg-gray-900">
            <SectionHeading number="3" id="author-title">
              {t("author")}
            </SectionHeading>
            <h2 className="mt-8 font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              <span className="block brand-grad text-6xl pb-2">
                {t("authorName")}
              </span>
              <span className="block text-indigo-600 xl:inline">
                {t("authorTitle")}
              </span>
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-gray-300">
              {t("authorPara")}
            </p>
            <a
              className="inline-flex items-center text-base font-medium tracking-tight text-blue-600 mt-8"
              href="https://www.twitter.com/leetcv/"
              target="_blank"
              rel="noreferrer"
            >
              <svg aria-hidden="true" className="h-10 w-10 fill-current">
                <path d="M13.817 33.753c12.579 0 19.459-10.422 19.459-19.458 0-.297 0-.592-.02-.884a13.913 13.913 0 0 0 3.411-3.543 13.65 13.65 0 0 1-3.928 1.077 6.864 6.864 0 0 0 3.007-3.784 13.707 13.707 0 0 1-4.342 1.66 6.845 6.845 0 0 0-11.655 6.239A19.417 19.417 0 0 1 5.654 7.915a6.843 6.843 0 0 0 2.117 9.128 6.786 6.786 0 0 1-3.104-.853v.086a6.842 6.842 0 0 0 5.487 6.704 6.825 6.825 0 0 1-3.088.116 6.847 6.847 0 0 0 6.39 4.75A13.721 13.721 0 0 1 3.334 30.68a19.36 19.36 0 0 0 10.483 3.066" />
              </svg>
              <span className="ml-4">{t("authorTwitter")}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
