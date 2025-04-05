import React from "react";
import MobileResumeHeaderSkeleton from "./resumeHeader/mobileResumeHeaderSkeleton";
import DesktopResumeHeaderSkeleton from "./resumeHeader/desktopResumeHeaderSkeleton";
import ResumeSkillsSkeleton from "./resumeSkillsSkeleton";
import ProjectsSkeleton from "./projectsSkeleton";
import ReUsableSkeleton from "./reUsableSkeleton";
import ReUsableSkeletonTwo from "./reUsableSkeletonTwo";
import SocialMediaSkeleton from "./socialMediaSkeleton";
import LanguageSkeleton from "./languageSkeleton";
import ReUsableChipsSkeleton from "./reUsableChipsSkeleton";

const ResumeSkeletonContainer = () => {
  return (
    <div className="lg:py-12 pb-10">
      <MobileResumeHeaderSkeleton />
      <div className="lg:block xl:hidden">
        <DesktopResumeHeaderSkeleton />
      </div>
      <div className="md:mt-1 print:mt-0 lg:space-x-10 print:space-x-0 lg:flex lg:px-2 z-20">
        <div className="lg:w-3/4">
          <div className="hidden xl:block">
            <DesktopResumeHeaderSkeleton />
          </div>
          <div className="block mt-2.5 md:hidden">
            <ResumeSkillsSkeleton />
          </div>
          <ReUsableSkeleton isExperience={true} />
          <ProjectsSkeleton />
          <ReUsableSkeleton />
          <ReUsableSkeleton />
        </div>
        <div className="lg:w-1/4 lg:mt-3 xl:mt-0">
          <div className="hidden md:block -mt-4 lg:mt-0 xl:-mt-3">
            <ResumeSkillsSkeleton />
          </div>
          <ReUsableSkeletonTwo isEduction={true} />
          <ReUsableSkeletonTwo />
          <ReUsableSkeletonTwo />
          <ReUsableSkeletonTwo />
          <SocialMediaSkeleton />
          <LanguageSkeleton />
          <ReUsableChipsSkeleton isHobbies={true} />
          <div className="mt-5">
            <ReUsableChipsSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSkeletonContainer;
