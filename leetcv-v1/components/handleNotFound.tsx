import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function HandleNotFound() {
  const t = useTranslations("HandleNotFound");
  const router = useRouter();
  
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div
      className="flex items-center justify-center"
      data-testid="handleNotFoundDiv"
    >
      <div className="flex flex-col-reverse md:flex-row w-full items-center gap-8 py-10 md:gap-0">
        <div className="w-full flex flex-col justify-center text-center items-center mb-10">
          <p
            className="text-lg md:text-2xl font-semibold"
            data-testid="handleNotFoundMessage"
          >
            {t("handleNotFound")}
          </p>
          <button
            className="pt-10 flex cursor-pointer z-10 approveOrDeny"
            data-testid="goToSearchButton"
            onClick={() => {
              router.push("/search");
            }}
          >
            <span className="primary-btn px-4 py-2 text-sm">
              {t("goToSearch")}
            </span>
          </button>
        </div>
        <div className="h-[18rem] md:h-[30rem] w-full">
          <lottie-player
            src="/assets/lottie/not-found.json"
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
