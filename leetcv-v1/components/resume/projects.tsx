import { Project } from "data/models/Project";
import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeReviewState,
  attestedRequestState,
  isPrintingState,
  profileResumeState,
  selectedSkillState,
  showReviewModal,
} from "@state/state";
import "react-vertical-timeline-component/style.min.css";
import {
  GeneratedDescriptions,
  calculateAndSortProjects,
  reUsableRefiner,
} from "@constants/defaults";
import { useCallback, useMemo, useState } from "react";
import { trpc } from "@utils/trpc";
import useManageToken from "@lib/helper/useManageToken";
import React from "react";
import ProjectContent from "./projectContent";
import ResumeSectionHeader from "./resumeSectionHeader";

function Projects() {
  const t = useTranslations("ProjectData");
  const setShowModal = useSetRecoilState(showReviewModal);
  const [resume, setResume] = useRecoilState(profileResumeState);
  const setActiveReview = useSetRecoilState(activeReviewState);
  const [attestedRequest] = useRecoilState(attestedRequestState);
  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");
  const [isPrinting] = useRecoilState(isPrintingState);
  const [loadingExperienceId, setLoadingExperienceId] = useState<string | null>(
    null
  );
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [generatedDescriptions, setGeneratedDescriptions] =
    useState<GeneratedDescriptions>({});
  const mutation = trpc.useMutation("fs.resume.update");
  const { deductToken } = useManageToken();
  const [selectedSkillList] = useRecoilState(selectedSkillState);

  interface ProjectWithMatchCount extends Project {
    matchCount: number;
  }

  const sortedProjectsNormalView: ProjectWithMatchCount[] = useMemo(() => {
    const sorted = calculateAndSortProjects(resume.projects, selectedSkillList);
    return sorted;
  }, [resume.projects, selectedSkillList, isPrinting]);

  const sortedProjectsPrintView: ProjectWithMatchCount[] = useMemo(() => {
    const sorted = calculateAndSortProjects(resume.projects, selectedSkillList);

    const anyProjectMatches = sorted.some((project) => project.matchCount > 0);

    if (selectedSkillList.length === 0 || !anyProjectMatches) {
      return sorted;
    } else {
      return sorted.filter((project) => project.matchCount > 0);
    }
  }, [resume.projects, selectedSkillList]);

  const refreshExperience = async (
    projectId: string,
    title: string,
    description: string
  ) => {
    setLoadingExperienceId(projectId);
    const response = await reUsableRefiner(title, description, "project");
    setLoadingExperienceId(null);

    if (response.description) {
      setGeneratedDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [projectId]: response.description,
      }));
      setCurrentId(projectId);
    }
  };

  const keepChanges = useCallback(
    async (expId: string) => {
      const newDescription = generatedDescriptions[expId];
      if (!newDescription) return;

      const updatedWork = {
        ...resume,
        projects: resume.projects?.map((project) =>
          project.id === expId ? { ...project, work: newDescription } : project
        ),
      };

      try {
        await mutation.mutateAsync(updatedWork);
        setResume(updatedWork);
        deductToken(50);
        setGeneratedDescriptions((prev) => {
          const updated = { ...prev };
          delete updated[expId];
          return updated;
        });
        setCurrentId(null);
      } catch (error) {
        console.error("Failed to update experience:", error);
      }
    },
    [mutation, resume.projects]
  );

  const discardChanges = (projectId: string) => {
    setGeneratedDescriptions((prev) => {
      const updated = { ...prev };
      delete updated[projectId];
      return updated;
    });

    setCurrentId(null);
  };

  if (resume.projects?.length === 0) {
    return null;
  }

  return (
    <div data-testid={"project-skill"}>
      {resume.projects && (
        <div className="print:mt-1">
          <ResumeSectionHeader title={t("project")} />
        </div>
      )}
      <div>
        <div className="print:hidden block">
          <ProjectContent
            sortedProjects={sortedProjectsNormalView}
            generatedDescriptions={generatedDescriptions}
            attestedRequest={attestedRequest}
            isPrinting={isPrinting}
            basePath={basePath}
            setShowModal={setShowModal}
            setActiveReview={setActiveReview}
            loadingExperienceId={loadingExperienceId}
            currentId={currentId}
            refreshExperience={refreshExperience}
            setCurrentId={setCurrentId}
            keepChanges={keepChanges}
            discardChanges={discardChanges}
          />
        </div>
        <div className="print:block hidden">
          <ProjectContent
            sortedProjects={sortedProjectsPrintView}
            generatedDescriptions={generatedDescriptions}
            attestedRequest={attestedRequest}
            isPrinting={isPrinting}
            basePath={basePath}
            setShowModal={setShowModal}
            setActiveReview={setActiveReview}
            loadingExperienceId={loadingExperienceId}
            currentId={currentId}
            refreshExperience={refreshExperience}
            setCurrentId={setCurrentId}
            keepChanges={keepChanges}
            discardChanges={discardChanges}
          />
        </div>
      </div>
    </div>
  );
}
export default Projects;
