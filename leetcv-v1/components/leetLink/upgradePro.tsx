import { useRouter } from "next/router";
import { useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";

export default function UpgradePro() {
  const t = useTranslations("LeetLink");
  const router = useRouter();
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <div
      className="overflow-hidden bg-white sm:rounded-md mx-auto"
      data-testid="leetLinkNonPro"
    >
      <div className="flex flex-col w-full items-center gap-8 py-10 md:gap-0">
        <div className="w-full flex flex-col justify-center text-center items-center mb-10">
          <p className="text-lg md:text-2xl font-semibold" data-testid="">
            {t("nonProUiTitle")}
          </p>
          <p
            className="my-3 px-4 sm:px-6 text-base md:w-[35rem] tracking-tight text-gray-500 dark:text-gray-200 text-center"
            data-testid=""
          >
            {t("nonProUiDescription")}
          </p>
          <button
            className="bg-indigo-600 text-white px-5 py-3 mt-6 rounded-3xl gap-1 flex items-center transform hover:-translate-y-1 transition duration-400"
            onClick={() => router.push("/pricing")}
          >
            <SparklesIcon className="w-5 h-5" />
            {t("upgradeNow")}
          </button>
        </div>
        <div className="h-[18rem] md:h-[28rem] w-full">
          <lottie-player
            src="/assets/lottie/access-granted.json"
            background=""
            speed="1"
            loop
            autoplay
            data-testid="lottie-player"
            className="bg-gradient-to-r from-indigo-100 to-pink-200"
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}
