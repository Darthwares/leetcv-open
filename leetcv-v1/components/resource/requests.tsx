import { useEffect } from "react";

interface RequestResourcesProps {
  title: string;
  message: string;
  path: string;
}
function RequestResources({
  title,
  message,
  path,
}: Readonly<RequestResourcesProps>) {
  const src =
    path === "/assets/lottie/security-lock.json" ? "w-80" : "md:w-[30rem]";
  const urlPath = location.pathname;
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div
      data-testid="requests"
      className="grid col-span-1 place-content-center"
    >
      <section
        className={`${
          urlPath !== "/blog" ? "md:py-0 py-10" : "md:-my-5 py-2 md:py-0"
        } md:scroll-mt-32 scroll-mt-7`}
      >
        <p className="mt-0 md:mt-8 brand-grad  font-display text-2xl font-bold tracking-tight text-gray-800 text-center dark:text-white">
          {title}
        </p>
        <p className="my-3 text-base md:w-[35rem] tracking-tight dark:text-gray-300 text-gray-500 text-center">
          {message}
        </p>
        <div className="flex items-center justify-center pt-10 pb-4">
          <div
            className={`${urlPath === "/blog" ? "max-w-md mx-auto h-80" : src}`}
          >
            <lottie-player src={path} background="" speed="1" loop autoplay />
          </div>
        </div>
      </section>
    </div>
  );
}

export default RequestResources;
