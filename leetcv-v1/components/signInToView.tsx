import React, { useEffect, useState } from "react";
import ProfileCard from "./profileCard";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import RequestCardSkeleton from "./requestCardSkeleton";

export default function SignInToView() {
  const [skeletonView, setSkeletonView] = useState(true);
  const router = useRouter();
  const { handle, passcode } = router.query;
  const { data: publicResumeData } = trpc.useQuery([
    "fs.public.getProfile",
    { handle: handle as string },
  ]);
  const { data: publicResume } = trpc.useQuery([
    "fs.public.getPublicResume",
    { handle: handle as string, passcode: Number(passcode) },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (publicResumeData !== undefined) {
        setSkeletonView(false);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [publicResumeData]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="flex items-center justify-center h-full w-full brand-bg">
      <div className="flex flex-col lg:flex-row max-w-[90rem] mx-auto items-center gap-y-10 justify-between md:gap-20 lg:gap-24 xl:gap-36 p-5 px-4 my-8 mg:my-10">
        {skeletonView ? <RequestCardSkeleton /> : <ProfileCard />}
        {!publicResume && (
          <div className="h-[18rem] md:h-[25rem] w-full lg:max-w-md">
            <lottie-player
              src="/assets/lottie/login.json"
              background=""
              speed="1"
              loop
              autoplay
              className="bg-gradient-to-r from-indigo-100 to-pink-200"
            />
          </div>
        )}
      </div>
    </div>
  );
}
