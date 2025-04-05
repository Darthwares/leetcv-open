import ReusableVideoCard from "@components/reusableVideoCard";
import { useTheme } from "next-themes";
import { useEffect } from "react";

interface RequestResourcesProps {
  title: string;
  message: string;
  path?: string;
  videoSrc?: string;
  VideoTitle?: string;
}
function RequestResources({
  title,
  message,
  path,
  videoSrc,
  VideoTitle,
}: Readonly<RequestResourcesProps>) {
  const src =
    path === "/assets/lottie/security-lock.json" ? "w-80" : "md:w-[30rem]";
  const urlPath = location.pathname;
  const { theme } = useTheme();
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div
      data-testid="request-Resources"
      className="grid col-span-1 place-content-center"
    >
      <section
        className={`${
          urlPath !== "/blog" ? "md:py-0 py-10" : "md:-my-5 py-2 md:py-0"
        } md:scroll-mt-32 scroll-mt-7 ${urlPath==="/portfolio" && "flex flex-col items-center"}`}
      >
        <p
          data-testid="title"
          className="mt-0 md:mt-8 brand-grad  font-display text-2xl font-bold tracking-tight text-gray-800 dark:text-white text-center"
        >
          {title}
        </p>
        <p
          data-testid="message"
          className="my-3 text-base md:w-[35rem] tracking-tight text-gray-500 dark:text-gray-200 text-center"
        >
          {message}
        </p>
        {path && (
          <div
            data-testid="lottie-path"
            className="flex items-center justify-center py-4"
          >
            <div
              className={`${
                urlPath === "/blog" ? "max-w-md mx-auto h-80" : src
              }`}
            >
              <lottie-player
                src={path}
                background={theme === "dark" ? "" : "white"}
                speed="1"
                loop
                autoplay
              />
            </div>
          </div>
        )}
        {videoSrc && VideoTitle && (
          <div
            data-testid="video-src"
            className="max-w-lg mx-auto mt-10 md:mb-10"
          >
            <ReusableVideoCard src={videoSrc} title={VideoTitle} />
          </div>
        )}
      </section>
    </div>
  );
}

export default RequestResources;
