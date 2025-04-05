import { profileResumeState } from "@state/state";
import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import { useSetRecoilState } from "recoil";
import {
  publicResume as defaultResume,
  publicUsersList,
} from "@constants/publicResume";
import { publicUsers } from "@constants/defaults";

const MarqueSlider = () => {
  const setResume = useSetRecoilState(profileResumeState);

  useEffect(() => {
    if (!publicUsersList || publicUsersList.length === 0) {
      return setResume(defaultResume);
    }
    const randomIndex = Math.floor(Math.random() * publicUsersList.length);
    setResume(publicUsersList[randomIndex] as any);
  }, [publicUsersList, setResume, defaultResume]);

  const handleSelect = (id: string) => {
    const selectedUser: any = publicUsersList.find(
      (resume) => resume.id === id
    );
    if (selectedUser) {
      setResume(selectedUser);
    }
  };

  return (
    <div className="dark:bg-gray-900">
      <Marquee pauseOnHover loop={10} speed={35} gradient>
        <div className="flex gap-5 py-10">
          {publicUsers?.map((resume) => {
            return (
              <button
                key={resume.id}
                className="rounded-md p-2 px-5 bg-white dark:bg-gray-800/60 dark:text-white backdrop-blur"
                onClick={() => handleSelect(resume.id)}
              >
                <p className="index-resume-btn dark:bg-gray-800/40 dark:text-white font-bold text-base">
                  {resume.displayName}
                </p>
                <p className="text-sm index-resume-btn dark:bg-gray-800/40 dark:text-gray-200">
                  {resume.position}
                </p>
              </button>
            );
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueSlider;
