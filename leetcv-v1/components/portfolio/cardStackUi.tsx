import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

interface CardStackUiProps {
  id: string;
  background?: string;
  Card: React.ComponentType;
  lottiesrc: string;
  dir:string
}

const CardStackUi = ({ id, Card, lottiesrc, background,dir }: CardStackUiProps) => {
  const t = useTranslations("Portfolio");

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <section
      id={id}
      className={`flex flex-col items-center justify-center py-12 lg:py-16 ${background}`}
      data-testid={`${id}-container`}
    >
      <div className="w-full max-w-6xl px-5 lg:px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-16 text-indigo-900 font-extrabold tracking-tight">
          {t(id)}
        </h2>
        <div className={`flex flex-col lg:${dir} gap-10 lg:gap-24`}>
          <div className="lg:sticky lg:top-10 h-[18rem] md:h-[30rem] w-full lg:w-[60%]">
            <lottie-player
              src={`/assets/lottie/${lottiesrc}`}
              background=""
              speed="1"
              loop
              autoplay
              data-testid="lottie-player"
              className="bg-gradient-to-r from-indigo-100 to-pink-200"
            ></lottie-player>
          </div>
          <div className="space-y-10 md:max-w-sm mx-auto lg:w-[40%]">
            <Card />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardStackUi;
