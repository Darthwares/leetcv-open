import AwardDetails from "./award/awardDetails";
import dynamic from "next/dynamic";
import { getTourConfig } from "@lib/helper/tourConfig";
import { useTranslations } from "next-intl";
import CertificateDetails from "./certificate/certificateDetails";
import PersonalDetails from "./personal/personalDetails";
import ExperienceDetails from "./experience/experienceDetails";
import ProjectDetails from "./project/projectDetails";
import EducationDetails from "./education/educationDetails";
import CourseDetails from "./course/courseDetails";
import PublicationDetails from "./publication/publicationDetails";
import SocialMediaDetails from "./social/socialMediaDetails";
import LanguageDetails from "./language/languageDetails";
import PatentDetails from "./patents/patentDetails";
import ExtraCurricularDetails from "./extraCurricularActivities/extraCurricularDetails";

const Stepper = dynamic(() => import("../onboarding"), {
  ssr: false,
});

export default function ResumeForm() {
  const tour = getTourConfig();
  const t = useTranslations("ResumeForm");

  const steps = [
    {
      target: ".personalDetails",
      content: t("personalDetails"),
    },
    {
      target: ".projectDetails",
      content: t("enterProjects"),
    },
    {
      target: ".experienceDetails",
      content: t("experienceDetails"),
    },
    {
      target: ".educationDetails",
      content: t("educationDetails"),
    },
    {
      target: ".courseDetails",
      content: t("courseDetails"),
    },
    {
      target: ".certificateDetails",
      content: t("certificateDetails"),
    },
    {
      target: ".awardDetails",
      content: t("awardsAndAchievements"),
    },
    {
      target: ".socialDetails",
      content: t("socialMedia"),
    },
    {
      target: ".extraCurricularDetails",
      content: t("extraCurricularActivites"),
    },
  ];

  return (
    <>
      <div className="hidden md:block">
        {tour.editor === "false" && <Stepper tourConfig={steps} />}
      </div>
      <div className="my-4 relative pt-3" data-testid="resume">
        <div className="personalDetails">
          <PersonalDetails />
        </div>
        <div className="experienceDetails">
          <ExperienceDetails />
        </div>
        <div className="projectDetails">
          <ProjectDetails />
        </div>
        <div className="educationDetails">
          <EducationDetails />
        </div>
        <div className="courseDetails">
          <CourseDetails />
        </div>
        <div className="certificateDetails">
          <CertificateDetails />
        </div>
        <div className="patentDetails">
          <PatentDetails />
        </div>
        <div className="publicationDetails">
          <PublicationDetails />
        </div>
        <div className="awardDetails">
          <AwardDetails />
        </div>
        <div className="languageDetails">
          <LanguageDetails />
        </div>
        <div className="socialDetails">
          <SocialMediaDetails />
        </div>
        <div className="extraCurricularActivitiesDetails">
          <ExtraCurricularDetails />
        </div>
      </div>
    </>
  );
}
