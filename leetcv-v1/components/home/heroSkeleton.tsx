type HeroSkeletonProps = {
  children: React.ReactNode;
};

export const HeroSkeleton = ({ children }: HeroSkeletonProps) => {
  return (
    <div className="pt-10 flex md:flex-row flex-col gap-5 items-center">
      <span className="flex items-center justify-center gap-2 ">
        {children}
      </span>
    </div>
  );
};
