import { useTranslations } from "next-intl";
import ReusableHeroBanner from "@components/reusableHeroBanner";
import TokensLeft from "./tokensLeft";

export default function WaitListHeader() {
  const t = useTranslations("WaitList");

  return (
    <div
      className="relative max-w-7xl mx-auto lg:px-1"
      data-testid="waitListHeader"
    >
      <ReusableHeroBanner
        title={t("aIResume")}
        description={t("aIPoweredResume")}
        className="px-6 py-8 sm:px-12 lg:gap-16"
        tokensLeft={<TokensLeft />}
        lottieImage={
          <div className="hidden lg:block lg:w-[26rem] h-52 -mr-8">
            <img
              src="/assets/robo.png"
              className="w-full h-full"
              alt="waitlist access"
            />
          </div>
        }
      />
    </div>
  );
}
