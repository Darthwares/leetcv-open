import { useEffect, useRef } from "react";

export default function EmptyCoverState() {
  const ref = useRef(null);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="w-full sm:w-[25rem] lg:w-[30rem] mt-16 md:mt-12 mb-6 md:mb-0 lg:mt-10 mx-auto">
      <lottie-player
        ref={ref}
        src="/assets/lottie/cover-letter.json"
        background=""
        speed="1"
        loop
        autoplay
        data-testid="lottie"
      />
    </div>
  );
}
