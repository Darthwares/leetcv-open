import React from "react";
import BackgroundColor from "./backgroundColor";

const ProductHuntBadge = () => {
  return (
    <div className="bg-white mx-auto max-w-7xl dark:bg-gray-900 py-8 md:py-12">
      <div className="">
        <div className="relative isolate flex flex-col gap-10 overflow-hidden border border-gray-100 px-6 py-2 md:py-5 shadow-xl sm:rounded-3xl sm:px-24">
          <div className="flex md:flex-row flex-col gap-2 justify-center items-center md:justify-around md:gap-5 py-5 md:py-10">
            <a
              href="https://www.producthunt.com/products/leetcv/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-leetcv"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=514277&theme=light"
                alt="LeetCV - Creating&#0032;resumes&#0032;and&#0032;finding&#0032;matching&#0032;jobs | Product Hunt"
                className="w-[210px] md:w-[250px] h-[54px]"
              />
            </a>
            <a
              href="https://www.producthunt.com/products/leetcv?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-leetcv"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=514277&theme=light"
                alt="LeetCV - Creating&#0032;resumes&#0032;and&#0032;finding&#0032;matching&#0032;jobs | Product Hunt"
                className="w-[210px] md:w-[250px] h-[54px]"
              />
            </a>
          </div>
          <BackgroundColor />
        </div>
      </div>
    </div>
  );
};

export default ProductHuntBadge;
