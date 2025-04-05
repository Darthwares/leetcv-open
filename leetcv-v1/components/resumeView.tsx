import Awards from "@components/resume/awards";
import EducationDetails from "@components/resume/educationDetails";
import Projects from "@components/resume/projects";
import ResumeHeader from "@components/resume/resumeHeader/resumeHeader";
import {
  featuredSkillsLengthState,
  openProjectIdeasSidebarState,
  profileResumeState,
  reviewState,
  shareProfileModalState,
  subscriptionPlanState,
} from "@state/state";
import { useRecoilState } from "recoil";
import Courses from "./resume/courses";
import Experiences from "./resume/experiences";
import Languages from "./resume/languages";
import Preferences from "./resume/preferences";
import Publications from "./resume/publication";
import ResumeSkills from "./resume/resumeSkills";
import SocialMediaLink from "./resume/socialMediaLink";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Certificates from "./resume/certificates";
import Hobbies from "./resume/hobbies";
import StickyHeader from "./stickyHeader";
import CreateReview from "./resume/review/createReview";
import ReviewSidebar from "./resume/review/reviewSidebar";
import Causes from "./resume/causes";
import MessageSidebar from "./messages/messageSidebar";
import PublicResumeShare from "./publicResumeShare";
import ResumeSkeletonContainer from "./resumeSkeletons/resumeSkeletonContainer";
import Patents from "./resume/patents";
import SkillsToggle from "./resume/skillsToggle";
import ExtraCurricularActivity from "./resume/extraCurricular";
import { ProfileShareModal } from "./share/resumePortfolioShare";
import StyleDropdown from "./resume/resumeStyles/styleDropdown";
import ResumeSectionHeader from "./resume/resumeSectionHeader";
import ReusableSidebar from "./reusableSideBar";
import ProjectRecommendation from "./resume/projectRecommendation";
import { useRouter } from "next/router";

export const ResumeView = () => {
  const router = useRouter();
  const [reviewSubmitted] = useRecoilState(reviewState);
  const t = useTranslations("ProfileHeader");
  const tp = useTranslations("ProjectData");
  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");
  const [userInfo] = useRecoilState(profileResumeState);
  const [featuredSkillsLength] = useRecoilState(featuredSkillsLengthState);
  const userDetails = {
    id: userInfo?.id,
    handle: userInfo?.handle,
    image: userInfo?.image!,
    displayName: userInfo?.displayName,
    position: userInfo?.position!,
  };
  const [shareProfileModal, setShareProfileModal] = useRecoilState(
    shareProfileModalState
  );
  const [openSidebar, setOpenSidebar] = useRecoilState(
    openProjectIdeasSidebarState
  );

  const [plan] = useRecoilState(subscriptionPlanState);
  useEffect(() => {
    if (reviewSubmitted) {
      toast.success(t("success"));
    }
  }, [reviewSubmitted]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <>
      {!userInfo.id ? (
        <ResumeSkeletonContainer />
      ) : (
        <>
          {location.pathname === "/s/resume" && <StyleDropdown />}
          <div className="flex flex-col md:px-0" data-testid="resumeView">
            {location.pathname !== "/s/resume" &&
              basePath !== "/openai/resume" &&
              location.pathname !== "/" && <StickyHeader />}
            {location.pathname === "/" && <PublicResumeShare />}
            <div className="xl:hidden">
              <ResumeHeader />
            </div>
            <div className="md:mt-1 print:mt-0 lg:space-x-10 print:space-x-5 print:flex-row flex flex-col lg:flex-row z-20">
              <div className="lg:w-3/4 print:w-3/4">
                <div className="hidden xl:block">
                  <ResumeHeader />
                </div>
                <div className="block lg:hidden">
                  <ResumeSkills />
                </div>
                {userInfo?.projects && (
                  <div className="resume-section-header print:hidden flex flex-col py-1 print:pt-0">
                    {featuredSkillsLength > 0 && (
                      <ResumeSectionHeader title={t("featureSkills")} />
                    )}
                    <SkillsToggle />
                  </div>
                )}
                <Experiences />
                <Projects />
                <Patents />
                {/* <Publications />
                <Awards /> */}
                <ExtraCurricularActivity />
              </div>
              <div className="lg:w-1/4 print:w-1/4 xl:mt-[12px]">
                <div className="hidden lg:block">
                  <ResumeSkills />
                </div>
                <EducationDetails />
                <Awards />
                <Courses />
                <Certificates />
                <Publications />
                <Preferences />
                <SocialMediaLink />
                <Languages />
                <Hobbies />
                <Causes />
                <MessageSidebar userInfo={userDetails} />
              </div>
            </div>
            <span data-testid="reviewSubmitted">
              {reviewSubmitted && <ToastContainer />}
            </span>
            <CreateReview />
            <ReviewSidebar />
            <ProfileShareModal
              open={shareProfileModal}
              setOpen={setShareProfileModal}
            />
            <ReusableSidebar
              open={openSidebar}
              setOpen={setOpenSidebar}
              title={tp("projectIdeas")}
              description={tp("seeAllRecommendation")}
              cssClass="fixed top-0 z-50 w-full"
            >
              {plan !== "" && location.pathname.includes("/s/") && (
                <ProjectRecommendation />
              )}
              {plan === "" && (
                <div className="flex flex-col items-center justify-center p-4">
                  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    {tp("getPersonalizedProject")}
                  </h2>
                  <p className="text-center text-gray-600 mb-6">
                    {tp("getPersonalizedProjectDescription")}
                  </p>
                  <div className="mb-2 h-80">
                    <lottie-player
                      src="/assets/lottie/project-recommendation.json"
                      background="transparent"
                      speed="1"
                      loop
                      autoplay
                    ></lottie-player>
                  </div>

                  <button
                    onClick={() => {
                      router.push("/pricing");
                      setOpenSidebar(false);
                    }}
                    className="bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out p-2"
                  >
                    {tp("upgradeNow")}
                  </button>
                </div>
              )}
            </ReusableSidebar>
          </div>
        </>
      )}
    </>
  );
};
