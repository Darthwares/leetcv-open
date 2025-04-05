import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";
interface ToolTipProps {
  tip: string;
  width: string;
}

export default function Tooltip({ tip, width }: ToolTipProps) {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
        setHover(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setClicked(!clicked);
    setHover(!hover);
  };

  return (
    <div
      data-testid={"tooltip"}
      className="relative flex items-center justify-center hover:text-gray-600 prose"
    >
      <div
        className={`relative ${hover || clicked ? "block" : ""}`}
        ref={tooltipRef}
      >
        {(hover || clicked) && (
          <div
            className={`${width} absolute bottom-0 inline-block px-4 py-3 mb-8 -ml-4 bg-gradient-to-r from-pink-100 to-indigo-50 rounded-lg z-40 transition-all duration-300`}
            style={{
              opacity: hover || clicked ? 1 : 0,
              transform: hover || clicked ? "scale(1)" : "scale(0.9)",
            }}
          >
            <span className="inline-block text-sm z-40 leading-tight relative">
              {tip}
            </span>
            <span
              className="absolute bottom-0 right-0 w-5 h-5 -mb-1 transform rotate-45 bg-gradient-to-r from-pink-100 to-indigo-50"
              style={{ left: "5%" }}
            />
          </div>
        )}
        <QuestionMarkCircleIcon
          data-testid={"tooltipIcon"}
          className="w-5 text-indigo-500 cursor-pointer"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
