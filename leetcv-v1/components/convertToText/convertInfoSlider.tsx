import { convertInfoSlider } from "@constants/defaults";
import React, { useEffect, useState } from "react";
import cn from "classnames";
import { determinePlacement } from "@lib/stripe/helper";
import { DetermineStatus } from "@components/ui/icons";

const ConvertInfoSlider = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const halfwayIndex: number = Math.ceil(convertInfoSlider.slides.length / 2);
  const itemHeight: number = 100;
  const shuffleThreshold: number = halfwayIndex * itemHeight;
  const visibleStyleThreshold: number = shuffleThreshold / 2;
  const visitedItems = new Array(convertInfoSlider.slides.length).fill(false);

  const checkVisitedItems = (currentIndex: number) => {
    visitedItems.every((visited, index) =>
      index === currentIndex ? true : visited
    );
  };

  const autoRotateCarousel = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === convertInfoSlider.slides.length - 1) {
        checkVisitedItems(prevIndex);
        return 0;
      }
      return prevIndex + 1;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(autoRotateCarousel, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center" data-testid="convert-info-slider">
      {convertInfoSlider.slides.map((item, i) => (
        <button
          type="button"
          onClick={() => setActiveIndex(i)}
          className={cn(
            "carousel-item flex gap-5 mt-3 mx-auto items-start justify-center max-w-full w-72 text-left h-full tracking-wide",
            {
              active: activeIndex === i,
              visible:
                Math.abs(
                  determinePlacement(
                    i,
                    activeIndex,
                    halfwayIndex,
                    convertInfoSlider.slides.length,
                    shuffleThreshold,
                    itemHeight
                  )!
                ) <= visibleStyleThreshold,
            }
          )}
          key={item.id}
          style={{
            transform: `translateY(${determinePlacement(
              i,
              activeIndex,
              halfwayIndex,
              convertInfoSlider.slides.length,
              shuffleThreshold,
              itemHeight
            )!}px)`,
          }}
        >
          <DetermineStatus activeIndex={activeIndex} i={i} />
          {item.text}
        </button>
      ))}
    </div>
  );
};

export default ConvertInfoSlider;
