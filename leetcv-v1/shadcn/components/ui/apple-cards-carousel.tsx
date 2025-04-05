"use client";
import React, { useEffect, useState, createContext, useMemo } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps as NextImageProps } from "next/image";
import { handleHref } from "@constants/defaults";
import { useRouter } from "next/router";
import Link from "next/link";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  icon?: React.ReactNode;
  category: string;
  url: string;
  src: string;
  title: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };
  const contextValue = useMemo(
    () => ({
      onCardClose: handleCardClose,
      currentIndex,
    }),
    [currentIndex]
  );
  return (
    <CarouselContext.Provider value={contextValue}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-6 md:py-16 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>
          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="justify-end gap-2 mr-10 hidden lg:flex">
          <button
            className={`relative z-30 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center group hover:bg-indigo-600 transition-all duration-300 ease-in-out ${
              !canScrollLeft && "invisible"
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-white" />
          </button>
          <button
            className={`group relative z-30 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center hover:bg-indigo-600 transition-colors duration-300 ease-in-out ${
              !canScrollRight && "invisible"
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const router = useRouter();
  const href = handleHref(card.url, router);
  return (
    <Link key={index} href={href!}>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 w-56 md:w-96 overflow-hidden flex flex-col items-start justify-end relative z-10 home-carousel-image"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="flex items-center space-x-2 text-white text-lg md:text-2xl font-medium font-sans text-left"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="text-white  text-sm md:text-lg font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {card.title}
          </motion.p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.category}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </Link>
  );
};

type ImageProps = NextImageProps & { fill?: boolean };

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: ImageProps) => {
  return (
    <>
      <Image
        className={cn("transition duration-300", className)}
        src={src}
        width={width}
        height={height}
        layout={fill ? "fill" : undefined}
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt}
        {...rest}
      />
      <div className="absolute inset-0 bg-gray-800 w-full h-full opacity-30 z-10" />
    </>
  );
};
