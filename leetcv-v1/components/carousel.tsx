import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

const Carousel = (props: any) => {
  const { children, show } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children?.length);
  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children?.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleTouchStart = (e: any) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e: any) => {
    const touchDown = touchPosition;
    if (touchDown === null) {
      return;
    }
    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;
    if (diff > 5) {
      next();
    }
    if (diff < -5) {
      prev();
    }
    setTouchPosition(null);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 && (
          <button
            onClick={prev}
            className="left-arrow flex items-center justify-center bg-black/70 text-white"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
        )}
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {children}
          </div>
        </div>
        {currentIndex < length - show && (
          <button
            onClick={next}
            className="right-arrow flex items-center justify-center bg-black/70 text-white"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Carousel;
