import React, { useState, useEffect } from "react";
import { ArrowUpIcon } from "@heroicons/react/solid";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 800) {
      setIsVisible(true);
      return;
    }
    setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-14 right-3.5 md:bottom-[4.5rem] md:right-5 lg:bottom-20 lg:right-9 transition-all duration-700 cursor-pointer z-50">
      {isVisible && (
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center bg-black/60 text-white text-center rounded-md"
          onClick={scrollToTop}
        >
          <ArrowUpIcon className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
