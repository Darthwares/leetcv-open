import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { defaultImage } from "@constants/defaults";

export const AnimatedTooltip = ({ items }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item: any, idx: number) => {
        return (
          <div
            className="-mr-4  relative group"
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex === idx && (
                <motion.a
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md max-w-fit flex-shrink bg-black z-50 shadow-xl px-4 py-2"
                  href={`${window.location.origin}/r/${item.approvalHandle}`}
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold truncate max-w-[120px] text-center text-white relative z-30 text-[14px]">
                    {item.requesterName}
                  </div>
                  <div className="text-white text-center pt-1 text-xs">
                    {item.requesterPosition}
                  </div>
                </motion.a>
              )}
            </AnimatePresence>
            <img
              onMouseMove={handleMouseMove}
              src={
                item.requesterImage
                  ? item.requesterImage
                  : defaultImage(item?.userId)
              }
              alt={item.requesterName}
              referrerPolicy="no-referrer"
              className="object-cover !m-0 !p-0 object-top rounded-full h-12 sm:h-14 w-12  sm:w-14 border-2 border-white relative transition duration-500 group-hover:scale-100 group-hover:z-30"
            />
          </div>
        );
      })}
    </>
  );
};
