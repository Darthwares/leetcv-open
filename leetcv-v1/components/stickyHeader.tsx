import { AVATAR_IMAGE } from "@constants/defaults";
import { profileResumeState } from "@state/state";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Follow from "./resume/follow/follow";

const StickyHeader = () => {
  const [resume] = useRecoilState(profileResumeState);
  const [isSticky, setIsSticky] = useState(false);
  const [hideSticky, setHideSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = 400;
      setIsSticky(scrollTop > height);
      setHideSticky(scrollTop > height ? true : false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {location.pathname !== "/s/aiResume" && hideSticky && (
        <ul
          role="list"
          className={`mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 md:hidden sm:gap-6 lg:grid-cols-4 z-30 bg-white ${
            isSticky && "top-0 sticky"
          }`}
        >
          <li className="col-span-1 flex py-1">
            <div className="flex w-11 flex-shrink-0 items-center justify-center">
              <img
                src={resume.image ?? AVATAR_IMAGE}
                alt={resume.displayName!}
                className="rounded-lg"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-1 items-center justify-center w-full bg-white">
              <div className="flex-1 px-2 text-sm">
                <p className="font-medium text-gray-900 truncate w-44 text-base">
                  {resume.displayName}
                </p>
                <p className="text-gray-500 truncate w-40">{resume.position}</p>
              </div>
              {location.pathname !== "/s/convert" && (
                <div className="flex-shrink-0">
                  <Follow isSticky={isSticky} />
                </div>
              )}
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default StickyHeader;
