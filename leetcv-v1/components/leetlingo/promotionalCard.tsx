import React, { useEffect } from "react";
import { useRouter } from "next/router";
const GlassCard = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg rounded-xl p-6 w-full relative overflow-hidden border border-white/20">
      <div className="mb-2">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-md inline-block font-bold text-sm">
          FEATURED CONTENT
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="text-gray-800 text-2xl font-bold">
          Start Learning Today
        </h2>
        <p className="text-gray-600">
          Join millions of learners! Master skills and earn certificates. Start
          your journey today!
        </p>
      </div>
      <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg mt-6 transition-all"
        onClick={() => {
          router.push("/s/course");
        }}
      >
        EXPLORE COURSES
      </button>
      <div className="absolute -right-8 -top-8 w-32 h-32">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-red-300 opacity-40 blur-xl"></div>
      </div>
    </div>
  );
};
const LottieCard = () => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div className="mt-5 w-full lg:block hidden">
      <lottie-player
        src="/assets/lottie/learn-now.json"
        background=""
        speed="1"
        loop
        autoplay
        data-testid="lottie-player"
        className="bg-gradient-to-r from-indigo-100 to-pink-200"
      ></lottie-player>
    </div>
  );
};

const PromoCards = () => {
  return (
    <div className="p-2 lg:p-0 lg:pt-12 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-8 mx-auto w-full lg:max-w-sm">
        <GlassCard />
        <LottieCard />
      </div>
    </div>
  );
};

export default PromoCards;
