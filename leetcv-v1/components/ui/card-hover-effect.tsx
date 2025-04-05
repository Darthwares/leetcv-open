import ImageFallBack from "@components/imageFallBack";
import { cn } from "@lib/utils";
import { sideBarOpenState } from "@state/state";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: {
    displayName: string;
    description?: string;
    handle: string;
    image?: string;
    position?: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2",
        className,
        isSideBarClosed ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-3"
      )}
    >
      {items?.map((item, idx) => (
        <a
          href={`${window.location.origin}/r/${item?.handle}`}
          key={item?.handle}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <>
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
              <div className="flex sm:flex-row flex-col gap-5">
                <div className="bg-white rounded-3xl sm:hidden block">
                  <div className="flex flex-col gap-2 items-center py-[15px] relative">
                    <span className="overlay-card bg-gradient-to-b from-indigo-300 to-pink-400"></span>
                    <div className="card-image">
                      <ImageFallBack
                        imgSrc={item?.image!}
                        fallBackText={item.displayName}
                        avatarClass="card-img"
                        avatarImgClass="card-img"
                        avatarFallbackClass="card-img text-white text-4xl"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-3 pb-8  rounded-b-lg">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">
                        {item.displayName}
                      </CardTitle>
                      <p className="text-slate-900 line-clamp-1">
                        {item.position}
                      </p>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>

                <ImageFallBack
                  imgSrc={item?.image!}
                  fallBackText={item.displayName}
                  avatarClass="sm:rounded-full rounded-xl hidden sm:block w-full sm:w-24 sm:h-24"
                  avatarImgClass="sm:rounded-full rounded-xl w-full sm:w-24 sm:h-24"
                  avatarFallbackClass="sm:rounded-full rounded-xl w-full sm:w-24 sm:h-24 text-white text-4xl"
                />
                <div className="sm:block hidden">
                  <CardTitle className="text-lg line-clamp-1">
                    {item.displayName}
                  </CardTitle>
                  <p
                    className={`${
                      isSideBarClosed ? "lg:text-sm" : "lg:text-base"
                    } xl:text-base text-slate-900 line-clamp-1`}
                  >
                    {item.position}
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </div>
            </Card>
          </>
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
        "rounded-2xl h-full w-full overflow-hidden border border-gray-300 text-gray-700 dark:border-white/[0.2] shadow-md group-hover:border-slate-700 relative z-10 bg-white ",
        className
      )}
    >
      <div className="relative z-10">
        <div className="sm:p-4">{children}</div>
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
      className={cn("text-slate-900 font-bold tracking-wide mt-4", className)}
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
        "mt-4 sm:mt-8 text-zinc-700 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
