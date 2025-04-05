import ReusableHeroBanner from "@components/reusableHeroBanner";
import ReusablePlaceholder from "@components/reusablePlaceholder";
import { useTranslations } from "next-intl";

export default function CoverHero() {
  const t = useTranslations("CoverLetter");

  return (
    <div
      className="overflow-hidden bg-white  dark:bg-gray-900 py-6 lg:px-1"
      data-testid="coverLetterHero"
    >
      <div className="mx-auto max-w-7xl" data-testid="coverLetterHeroContainer">
        <ReusableHeroBanner
          title={t("coverLetterTitle")}
          description={t("coverLetterDescription")}
          className="px-6 pt-6 pb-2 lg:pb-2 lg:pt-4 md:px-14 sm:py-8 md:pt-8 md:pb-6 sm:px-10 lg:gap-12"
          lottieImage={
            <div className="hidden h-60 lg:block p-0 lg:w-1/4">
              <lottie-player
                src="/assets/lottie/writing-letter.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              />
            </div>
          }
        />
        <ReusablePlaceholder
          title={t("heroTitle")}
          description={t("heroDescription")}
          lottie="cover-letter"
        />
      </div>
    </div>
  );
}
