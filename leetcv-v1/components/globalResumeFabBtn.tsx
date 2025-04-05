import { aiFeaturePaths } from "@constants/defaults";
import { DocumentTextIcon } from "@heroicons/react/outline";
import { resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

const GlobalResumeFabBtn = () => {
  const router = useRouter();
  const paths = [
    "/",
    "/s/resume",
    "/s/resumeEditor",
    "/s/messages",
    "/s/leetLink",
    "/cancel",
    "/checkoutSuccess",
  ];
  const inValidPaths = paths.includes(router.pathname);

  const mobileViewPaths = aiFeaturePaths.includes(router.pathname);
  const [resume] = useRecoilState(resumeState);

  const { data: getMessageList } = trpc.useQuery(
    [
      "fs.message.getMessageList",
      {
        receiverId: resume.id,
      },
    ],
    {
      enabled: !!resume.id,
    }
  );

  return (
    <>
      {!inValidPaths &&
        !location.pathname.includes("/r/") &&
        !location.pathname.includes("/p/") &&
        !location.pathname.includes("/l/") &&
        !location.pathname.includes("/auth/") &&
        !location.pathname.includes("/s/course") && (
          <div
            className={`fixed ${mobileViewPaths ? "lg:hidden" : ""}  ${getMessageList?.length === 0 ||
              location.pathname === "/s/portfolio"
              ? "bottom-10 md:bottom-[4.5rem] mb-8 sm:mb-3 z-30 right-4 md:right-6 lg:right-8"
              : "z-40 bottom-3 md:bottom-4 right-3 md:right-4 lg:bottom-16 lg:right-[4.5rem]"
              }`}
          >
            <button
              onClick={() => {
                router.push("/s/resume");
              }}
              className="w-10 h-10 sm:w-12 relative group sm:h-12 print:hidden rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 "
            >
              <span className="absolute -left-[6.25rem] lg:bottom-14 lg:-left-[22px] scale-0 w-24 mx-auto transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                View Resume
              </span>
              <DocumentTextIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
            </button>
          </div>
        )}
    </>
  );
};

export default GlobalResumeFabBtn;
