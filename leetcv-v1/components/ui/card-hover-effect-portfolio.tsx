import { cn } from "@lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DateRange } from "@components/resume/dateRange";
import { validId } from "@constants/defaults";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: string;
    name: string;
    start: string;
    end: string;
    coursePlatform: string;
    courseId?: string;
    certificateLink: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemsLen = items.length;
  let cardClass = "relative group block w-full p-3 ";
  if (itemsLen === 1) {
    cardClass += "max-w-lg";
  } else if (itemsLen === 2) {
    cardClass += "md:w-80 lg:max-w-md lg:basis-full";
  } else {
    cardClass += "md:w-72 lg:max-w-sm lg:basis-full";
  }

  const isValidUrl = (url: string) => {
    return url.startsWith("https:");
  };

  return (
    <div
      className={cn(
        `flex flex-wrap py-10 justify-center ${itemsLen === 1 && "lg:w-2/5"}`,
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={
            isValidUrl(item.certificateLink) ? item.certificateLink : undefined
          }
          key={idx}
          target="_blank"
          className={cardClass}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-indigo-100 border-indigo-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle className="line-clamp-3 text-xl mb-1 mt-2">
              {item.name}
            </CardTitle>
            <div className="text-sm text-gray-500">
              <DateRange
                id={item.id}
                start={item.start}
                end={item.end}
                checked={false}
              />
            </div>
            <CardDescription className="font-medium line-clamp-2 mt-2.5 mb-1.5">
              {item.coursePlatform}
            </CardDescription>
            {item.courseId && validId(item.courseId) && (
              <CardDescription className="text-gray-600 line-clamp-2">
                {item.courseId}
              </CardDescription>
            )}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-5 md:p-6 overflow-hidden border border-gray-300 text-gray-700 dark:border-white/[0.2] group-hover:border-slate-700 relative z-10 bg-white shadow-lg hover:shadow-xl",
        className
      )}
    >
      <div className="relative z-50">
        <div>{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "capitalize font-bold dark:text-white",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "dark:text-gray-400",
        className
      )}
    >
      {children}
    </p>
  );
};
