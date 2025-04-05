import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useRouter } from "next/router";
import React, { memo, useEffect } from "react";
import { Button } from "shadcn/components/ui/button";

interface HeaderProps {
  actionButtonText: string;
  path: string;
  title: string;
  fadedTitle: string;
}

const Header = memo(
  ({ actionButtonText, path, title, fadedTitle }: HeaderProps) => {
    const router = useRouter();

    useEffect(() => {
      import("@lottiefiles/lottie-player");
    });

    const handleExplore = (e: React.MouseEvent) => {
      e.preventDefault();
      router.push(path);
    };

    return (
      <div className="bg-gradient-to-r flex justify-between items-center from-indigo-500 to-indigo-950 rounded-3xl px-6 sm:py-0 py-6 relative overflow-hidden w-full">
        <div className="space-y-6">
          <div className="text-white/80 text-sm font-medium tracking-wide">
            {fadedTitle}
          </div>
          <h1 className="text-white sm:text-3xl text-2xl font-bold leading-tight">
            {title}
          </h1>
          <Button
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-5 py-2 rounded-full hover:bg-white/90 transition-colors"
            onClick={handleExplore}
          >
            {" "}
            {path !== "/s/course/my-course" && (
              <ArrowLeftIcon className="w-4 h-4" />
            )}
            <span className="font-medium">{actionButtonText}</span>
            {path === "/s/course/my-course" && (
              <ArrowRightIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
        <div className="w-auto hidden h-56 sm:block">
          <lottie-player
            src="/assets/lottie/course.json"
            speed="1"
            loop
            autoplay
            data-testid="lottie"
          />
        </div>
      </div>
    );
  }
);

Header.displayName = "Header";

export default Header;
