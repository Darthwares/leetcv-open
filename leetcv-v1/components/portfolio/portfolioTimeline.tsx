import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { AcademicCapIcon, BriefcaseIcon } from "@heroicons/react/outline";
import { useRecoilValue } from "recoil";
import { profileResumeState } from "@state/state";
import {
  compareStartYearsAndMonthsDesc,
  formatResumeDate,
} from "@constants/defaults";
import { useEffect, useState } from "react";
import { Education } from "data/models/Education";
import { Experience } from "data/models/Experience";
import { SkillSvg } from "@components/svg";
import MarkdownWithTextColor from "@components/markdownWithTextColor";

interface PortfolioTimelineProps {
  field: "Experience" | "Education";
}

const PortfolioTimeline = ({ field }: PortfolioTimelineProps) => {
  const resume = useRecoilValue(profileResumeState);
  const [datas, setDatas] = useState<(Experience | Education)[]>([]);
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<
    Set<string>
  >(new Set());

  useEffect(() => {
    const experiences = resume.experiences ?? [];
    const educations = resume.educations ?? [];
    let dataToSort: (Experience | Education)[];

    if (field === "Experience" && experiences.length) {
      dataToSort = experiences;
      // Initialize selectedExperienceIds with all experience IDs
      setSelectedExperienceIds(new Set(experiences.map((exp) => exp.id)));
    } else if (field === "Education" && educations.length) {
      dataToSort = educations;
    } else {
      return;
    }

    const sortedData = [...dataToSort].sort(compareStartYearsAndMonthsDesc);
    setDatas(sortedData);
  }, [field, resume]);

  const handleExperienceClick = (id: string) => {
    setSelectedExperienceIds((prevSelectedExperienceIds) => {
      const newSelectedExperienceIds = new Set(prevSelectedExperienceIds);
      if (newSelectedExperienceIds.has(id)) {
        newSelectedExperienceIds.delete(id);
      } else {
        newSelectedExperienceIds.add(id);
      }
      return newSelectedExperienceIds;
    });
  };

  return (
    <div className="portfolio-exp-edu pt-10 lg:pt-16">
      <VerticalTimeline lineColor="#615ae7" animate={window.innerWidth > 1280}>
        {datas.map((data, index) => {
          if (field === "Experience") {
            const experienceData = data as Experience;
            const isSelected = selectedExperienceIds.has(experienceData.id);
            return experienceData.title && experienceData.company ? (
              <VerticalTimelineElement
                key={experienceData.id}
                id={experienceData.id}
                className="vertical-timeline-element--education cursor-pointer"
                date={`${formatResumeDate(experienceData.start!)} - ${
                  experienceData.checked
                    ? "present"
                    : formatResumeDate(experienceData.end!)
                }`}
                iconStyle={{ background: "#615ae7", color: "#fff" }}
                icon={<BriefcaseIcon />}
                onTimelineElementClick={() =>
                  handleExperienceClick(experienceData.id)
                }
              >
                <h3 className="vertical-timeline-element-title capitalize font-bold">
                  {experienceData.title}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {experienceData.company}{" "}
                  {experienceData.city && `, ${experienceData.city}`}
                </h4>
                {isSelected && experienceData.description && (
                  <div className="experience-details">
                    {experienceData.description && (
                      <p className="experience-description">
                        <MarkdownWithTextColor
                          content={experienceData.description}
                        />
                      </p>
                    )}
                    {experienceData.skills &&
                      experienceData.skills?.length > 0 && (
                        <div className="flex items-end gap-1 mt-2.5">
                          <SkillSvg className="w-5 h-5 mb-1" />
                          <span className="font-bold">
                            {experienceData.skills.join(", ")}
                          </span>
                        </div>
                      )}
                  </div>
                )}
              </VerticalTimelineElement>
            ) : null;
          } else {
            const EducationData = data as Education;
            return (
              <VerticalTimelineElement
                key={EducationData.id}
                id={EducationData.id}
                className="vertical-timeline-element--education cursor-pointer"
                date={`${formatResumeDate(
                  EducationData.start!
                )} - ${formatResumeDate(EducationData.end!)}`}
                iconStyle={{ background: "#615ae7", color: "#fff" }}
                icon={<AcademicCapIcon />}
              >
                <h3 className="vertical-timeline-element-title capitalize font-bold">
                  {EducationData.degree}, {EducationData.major}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {EducationData.name}
                </h4>
                {EducationData.grade && (
                  <h5 className="vertical-timeline-element-subtitle">
                    {EducationData.grade}
                  </h5>
                )}
              </VerticalTimelineElement>
            );
          }
        })}
      </VerticalTimeline>
    </div>
  );
};

export default PortfolioTimeline;
