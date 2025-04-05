import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeReviewState,
  isPrintingState,
  profileResumeState,
  selectedSkillState,
  showReviewModal,
} from "@state/state";
import { useSession } from "next-auth/react";
import {
  ExperienceWithMatchCount,
  GeneratedDescriptions,
  calculateAndSortExperiences,
  compareStartYearsAndMonthsDesc,
  reUsableRefiner,
} from "@constants/defaults";
import { useCallback, useMemo, useState } from "react";
import { trpc } from "@utils/trpc";
import useManageToken from "@lib/helper/useManageToken";
import React from "react";
import ExperienceContent from "./experienceContent";
import ResumeSectionHeader from "./resumeSectionHeader";

function Experiences() {
  const [profileResume, setProfileResume] = useRecoilState(profileResumeState);
  const [isPrinting] = useRecoilState(isPrintingState);
  const experiences = profileResume.experiences;
  const t = useTranslations("ExperienceData");
  const [showModal, setShowModal] = useRecoilState(showReviewModal);
  const setActiveReview = useSetRecoilState(activeReviewState);
  const [loadingExperienceId, setLoadingExperienceId] = useState<string | null>(
    null
  );
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [generatedDescriptions, setGeneratedDescriptions] =
    useState<GeneratedDescriptions>({});

  const sortedExperiences = experiences ? [...experiences] : [];
  const mutation = trpc.useMutation("fs.resume.update");
  const { deductToken } = useManageToken();
  const [selectedSkillList] = useRecoilState(selectedSkillState);

  if (sortedExperiences.length > 0) {
    sortedExperiences.sort(compareStartYearsAndMonthsDesc);
  }

  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");

  const sortedExperienceNormalView: ExperienceWithMatchCount[] = useMemo(() => {
    const sorted = calculateAndSortExperiences(experiences!, selectedSkillList);
    return sorted;
  }, [experiences, selectedSkillList, isPrinting]);

  const sortedExperiencePrintView: ExperienceWithMatchCount[] = useMemo(() => {
    const sorted = calculateAndSortExperiences(experiences!, selectedSkillList);

    const anyExperienceMatches = sorted.some(
      (experience) => experience.matchCount > 0
    );

    if (selectedSkillList.length === 0 || !anyExperienceMatches) {
      return sorted;
    } else {
      return sorted.filter((experience) => experience.matchCount > 0);
    }
  }, [experiences, selectedSkillList]);

  const refreshExperience = async (
    expId: string,
    title: string,
    description: string
  ) => {
    setLoadingExperienceId(expId);
    const response = await reUsableRefiner(title, description, "experience");
    setLoadingExperienceId(null);

    if (response.description) {
      setGeneratedDescriptions((prevDescriptions) => ({
        ...prevDescriptions,
        [expId]: response.description,
      }));
      setCurrentId(expId);
    }
  };

  const keepChanges = useCallback(
    async (expId: string) => {
      const newDescription = generatedDescriptions[expId];
      if (!newDescription) return;

      const updatedExperience = {
        ...profileResume,
        experiences: profileResume.experiences?.map((experience) =>
          experience.id === expId
            ? { ...experience, description: newDescription }
            : experience
        ),
      };

      try {
        await mutation.mutateAsync(updatedExperience);
        deductToken(50);
        setProfileResume(updatedExperience);
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
    [mutation, experiences, deductToken]
  );

  const discardChanges = (expId: string) => {
    setGeneratedDescriptions((prev) => {
      const updated = { ...prev };
      delete updated[expId];
      return updated;
    });

    setCurrentId(null);
  };

  return (
    <div className="print:mt-5">
      {experiences?.length !== 0 && (
        <div data-testid="experiences" className="w-full sm:p-0 print:-mt-4">
          {experiences?.some(
            (experience) =>
              experience?.title &&
              experience?.company &&
              experience?.start &&
              experience?.end &&
              experience?.description
          ) && <ResumeSectionHeader title={t("experience")} />}
        </div>
      )}
      <div className="">
        <div className="print:hidden block">
          <ExperienceContent
            sortedExperience={sortedExperienceNormalView}
            generatedDescriptions={generatedDescriptions}
            isPrinting={isPrinting}
            basePath={basePath}
            showModal={showModal}
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
          <ExperienceContent
            sortedExperience={sortedExperiencePrintView}
            generatedDescriptions={generatedDescriptions}
            isPrinting={isPrinting}
            showModal={showModal}
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

export default Experiences;
