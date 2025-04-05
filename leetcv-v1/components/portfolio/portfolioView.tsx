import { BentoProjects } from "./projectContainer";
import React, { useEffect, useState } from "react";
import HeroSection from "./heroSection";
import { useRecoilState } from "recoil";
import {
  have90daysAccessState,
  profileResumeState,
  shareProfileModalState,
  subscriptionPlanState,
} from "@state/state";
import Publications from "./publication";
import ExperienceEducation from "./experienceEducaion";
import Contact from "./contact";
import Certification from "./certification";
import { Courses } from "./courses";
import SkillsData from "./skills";
import { Loader } from "@components/loader";
import Awards from "./awards";
import Banner from "./banner";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import FreeAccessBanner from "@components/freeAccessBanner";
import { ProfileShareModal } from "@components/share/resumePortfolioShare";

const PortfolioView = () => {
  const [userInfo] = useRecoilState(profileResumeState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const router = useRouter();
  const setRecordVisit = trpc.useMutation(["fs.viewCount.recordVisit"]);
  const [showComp, setShowComp] = useState<boolean>(false);
  const [showCanAccessBanner, setShowCanAccessBanner] =
    useState<boolean>(false);
  const [showUpSellBanner, setShowUpSellBanner] = useState<boolean>(false);
  const [canAccess] = useRecoilState(have90daysAccessState);
  const [shareProfileModal, setShareProfileModal] = useRecoilState(
    shareProfileModalState
  );

  const blurImage = [
    "/assets/portfolio-blur/one.png",
    "/assets/portfolio-blur/two.png",
    "/assets/portfolio-blur/three.png",
    "/assets/portfolio-blur/four.png",
  ];

  useEffect(() => {
    const { showcase } = router.query;
    if (showcase === "true") {
      setRecordVisit.mutate({
        handle: userInfo.handle,
        userName: userInfo.displayName,
        userId: userInfo.id,
      });
    }
  }, [userInfo.handle]);

  useEffect(() => {
    if (plan) {
      setShowComp(true);
      setShowUpSellBanner(false);
      setShowCanAccessBanner(false);
    } else {
      if (canAccess) {
        setShowCanAccessBanner(true);
        setShowComp(true);
        setShowUpSellBanner(false);
      } else {
        setShowUpSellBanner(true);
        setShowComp(false);
        setShowCanAccessBanner(false);
      }
    }
  }, [plan, canAccess]);

  if (!userInfo.id) {
    return <Loader />;
  }

  return (
    <>
      {showCanAccessBanner && <FreeAccessBanner />}
      {showUpSellBanner && <Banner />}
      <HeroSection />
      {showComp && (
        <div className="relative">
          <SkillsData />
          <BentoProjects />
          <ExperienceEducation />
          <Awards />
          <Courses />
          <Certification />
          <Publications />
          <Contact />
        </div>
      )}
      {!showComp &&
        blurImage.map((s: string) => (
          <img
            key={s}
            src={s}
            alt={s.split("/").pop() ?? ""}
            className="w-full h-[15rem] md:h-[30rem] lg:h-[40rem]"
          />
        ))}
      <ProfileShareModal
        open={shareProfileModal}
        setOpen={setShareProfileModal}
      />
    </>
  );
};

export default PortfolioView;
