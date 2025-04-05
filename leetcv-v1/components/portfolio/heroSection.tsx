import Hero from "@components/portfolio/hero";
import Stats from "@components/portfolio/stats";
import { HISvg } from "@components/svg";
import { subscriptionPlanState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

const HeroSection = () => {
  const [plan] = useRecoilState(subscriptionPlanState);

  return (
    <div className="w-full">
      <section
        className={`${plan && location.pathname.includes("/p/") && "mt-16"} ${
          !plan &&
          location.pathname.includes("/p/") &&
          "pt-4 pb-10 md:pt-8 md:pb-16 lg:pt-16 lg:pb-24"
        } hero-section relative overflow-hidden z-10 w-full flex items-center py-10 md:py-16 lg:py-24 max-w-8xl mx-auto px-6 lg:px-8`}
        id="about"
      >
        <div className="intro_text hidden lg:block">
          <HISvg />
        </div>
        <div className="w-full">
          <Hero />
          <Stats />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
