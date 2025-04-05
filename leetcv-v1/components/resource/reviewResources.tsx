import ReusableVideoCard from "@components/reusableVideoCard";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type ReviewResourcesProps = {
  videoSrc?: string;
  VideoTitle?: string;
};

function ReviewResources({
  videoSrc,
  VideoTitle,
}: Readonly<ReviewResourcesProps>) {
  const t = useTranslations("ReviewList");

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div data-testid="reviewResources" className="w-full">
      <section
        id="XIcon"
        aria-labelledby="review-title"
        className="scroll-mt-14 py-2 sm:scroll-mt-32 sm:pt-20 sm:pb-0 lg:pt-10 lg:pb-2 mt-10"
      >
        <div className="text-center grid place-content-center mt-6 sm:-mt-10 md:-mt-6">
          <h3
            data-testid="title"
            className="text-2xl dark:text-white text-gray-900 font-bold"
          >
            {t("noReviews")}
          </h3>
          <p
            data-testid="description"
            className="mt-2 text-base text-center dark:text-gray-300 text-gray-500 w-80 sm:w-96"
          >
            {t("noReviewsToSee")}
          </p>
        </div>
        {videoSrc && VideoTitle ? (
          <div
            data-testid="video-container"
            className="max-w-lg mx-auto mt-10 md:mb-10"
          >
            <ReusableVideoCard src={videoSrc} title={VideoTitle} />
          </div>
        ) : (
          <div
            data-testid="lottie-container"
            className="h-[18rem] md:h-[24rem] w-full md:-mt-10"
          >
            <lottie-player
              src="/assets/lottie/no-review.json"
              background=""
              speed="1"
              loop
              autoplay
              className="bg-gradient-to-r from-indigo-100 to-pink-200"
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default ReviewResources;
