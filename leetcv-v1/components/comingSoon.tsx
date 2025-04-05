import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import Footer from "./home/footer";

export function ComingSoon() {
  const t = useTranslations("ComingSoon");
  const ref = useRef(null);
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div
      className="flex flex-col justify-center items-center mt-30"
      data-testid="comingSoon"
    >
      <div className="h-72">
        <lottie-player
          ref={ref}
          src="/assets/lottie/coming-soon.json"
          background="white"
          speed="1"
          loop
          autoplay
          data-testid="lottie"
        ></lottie-player>
      </div>
      <h2
        className="brand-grad text-2xl md:text-5xl py-4 animate-pulse"
        data-testid="comingSoonHeading"
      >
        {t("comingSoon")}
      </h2>
      <p data-testid="comingSoonSocial">{t("socialMedia")}</p>
      <Footer />
    </div>
  );
}
