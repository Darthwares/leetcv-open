import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { AVATAR_IMAGE, reviews } from "@constants/defaults";
import { useTranslations } from "next-intl";
import BackgroundColor from "@components/backgroundColor";
import FeedbackSkeleton from "@components/feedbackSkeleton";

function StarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5).keys()].map((index, id) => (
        <StarIcon
          key={id}
          className={clsx(
            "h-5 w-5",
            rating > index ? "fill-indigo-500" : "fill-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function Review({ title, body, author, rating, className, ...props }) {
  let animationDelay = useMemo(() => {
    let possibleAnimationDelays = [
      "0s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0.4s",
      "0.5s",
    ];
    return possibleAnimationDelays[
      Math.floor(Math.random() * possibleAnimationDelays.length)
    ];
  }, []);

  return (
    <figure
      className={clsx(
        "animate-fade-in rounded-3xl bg-white dark:bg-gray-900 p-6 opacity-0 shadow-md",
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <blockquote className="text-gray-900">
        <div className="space-y-2">
          <p className="text-lg dark:text-gray-100 font-medium leading-6 before:content-['“'] after:content-['”']">
            {title}
          </p>
          <StarRating rating={rating} />
        </div>
        <p className="mt-3 text-base leading-7 dark:text-gray-200">{body}</p>
      </blockquote>
      <div className="flex gap-3 pt-3">
        <img src={AVATAR_IMAGE} alt="leetCV" className="w-10 h-10 rounded-full" />
        <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400 before:content-['–_']">
          {author}
        </figcaption>
      </div>
    </figure>
  );
}

function splitArray(array, numParts) {
  return array.reduce((result, item, index) => {
    const partitionIndex = index % numParts;
    if (!result[partitionIndex]) {
      result[partitionIndex] = [];
    }
    result[partitionIndex].push(item);
    return result;
  }, []);
}

function ReviewColumn({
  className,
  reviews,
  reviewClassName = () => {},
  msPerPixel = 0,
}) {
  let columnRef = useRef(null);
  let [columnHeight, setColumnHeight] = useState(0);
  let duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    let resizeObserver = new window.ResizeObserver(() => {
      columnRef && setColumnHeight(columnRef.current?.offsetHeight);
    });

    resizeObserver.observe(columnRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={columnRef}
      className={clsx("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration }}
    >
      {reviews?.concat(reviews).map((review, reviewIndex) => (
        <Review
          key={reviewIndex}
          aria-hidden={reviewIndex >= reviews.length}
          className={reviewClassName(reviewIndex % reviews.length)}
          {...review}
        />
      ))}
    </div>
  );
}

function ReviewGrid() {
  let containerRef = useRef();
  let isInView = useInView(containerRef, { once: true, amount: 0.4 });
  let columns = splitArray(reviews, 3);
  columns = [columns[0], columns[1], splitArray(columns[2], 2)];

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView ? (
        <>
          <ReviewColumn
            reviews={[...columns[0], ...columns[2].flat(), ...columns[1]]}
            reviewClassName={(reviewIndex) =>
              clsx(
                reviewIndex >= columns[0].length + columns[2][0].length &&
                  "md:hidden",
                reviewIndex >= columns[0].length && "lg:hidden"
              )
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...columns[1], ...columns[2][1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= columns[1].length && "lg:hidden"
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={columns[2].flat()}
            className="hidden lg:block"
            msPerPixel={10}
          />
        </>
      ) : (
        <FeedbackSkeleton />
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32  dark:bg-gradient-to-b dark:from-[#fffbfe2c] bg-gradient-to-b from-[#fffbfe]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32  dark:bg-gradient-to-t dark:from-[#fffbfe2c] bg-gradient-to-t from-[#fffbfe]" />
    </div>
  );
}

export default function Feedback() {
  const t = useTranslations("FeedBack");

  return (
    <>
      <div className="py-8">
        <div className="mx-auto">
          <div className="relative isolate overflow-hidden dark:border-none border border-gray-100">
            <div className="">
              <section
                id="feedback"
                aria-labelledby="feedback-title"
                className="pt-8 md:pt-12 max-w-7xl justify-center flex mx-auto"
              >
                <div>
                  <h2
                    className="mt-2 text-center font-bold text-slate-800 text-2xl sm:text-4xl"
                    id="feedback-title"
                  >
                    {t("everyOneChanging")}
                  </h2>
                  <p className="px-4 mt-5 md:px-6 text-lg tracking-tight text-center dark:text-gray-100 text-slate-700">
                    {t("description")}
                  </p>
                  <div className="px-4">
                    <ReviewGrid />
                  </div>
                </div>
              </section>
            </div>
            <BackgroundColor />
          </div>
        </div>
      </div>
    </>
  );
}
