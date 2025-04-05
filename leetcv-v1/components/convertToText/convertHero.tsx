import ReusableHeroBanner from "@components/reusableHeroBanner";
import { useTranslations } from "next-intl";
import ReusablePlaceholder from "@components/reusablePlaceholder";

export default function ConvertHero() {
  const t = useTranslations("Convert");

  return (
    <div className="overflow-hidden bg-white py-6" data-testid="convert-hero">
      <div className="mx-auto max-w-7xl" data-testid="convert-hero-container">
        <ReusableHeroBanner
          title={t("convertYourResume")}
          description={t("transformYourCV")}
          className="px-6 pt-6 pb-2 md:pt-10 mb:pb-8 sm:py-8 lg:pt-12 lg:pb-10 sm:px-10 md:px-14 lg:gap-12"
          lottieImage={
            <div className="hidden lg:block lg:w-[12rem] h-44">
              <img src="/assets/convert.png" alt="convert-banner" />
            </div>
          }
        />
        <ReusablePlaceholder
          title={t("heroTitle")}
          description={t("heroDescription")}
          lottie="secured Transferring Files"
        />
      </div>
    </div>
  );
}
