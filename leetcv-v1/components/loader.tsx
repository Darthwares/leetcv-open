import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function Loader() {
  const t = useTranslations("Loader");
  const { theme } = useTheme();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="flex flex-col justify-center items-center mt-30 h-full md:h-[90vh]">
      <div className="h-72" data-testid="loader">
        <lottie-player
          src="/assets/lottie/loading.json"
          background={theme === "dark" ? "" : "white"}
          speed="1"
          loop
          autoplay
        />
      </div>
      <h2
        className="brand-grad text-2xl md:text-5xl py-4 animate-pulse"
        data-testid="loading-text"
      >
        {t("loader")}
      </h2>
    </div>
  );
}
