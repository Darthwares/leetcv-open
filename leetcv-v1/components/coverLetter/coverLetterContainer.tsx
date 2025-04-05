import React, { useEffect } from "react";
import CoverLetterForm from "./coverLetterInfo";
import PreviousDrafts from "./previousDrafts";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import {
  coverLetterDraftsVisible,
  coverLetterVisible,
  userIdState,
} from "@state/state";
import CoverLetter from "./coverLetter";
import { trpc } from "@utils/trpc";
import ReusableVideoCard from "@components/reusableVideoCard";

const CoverLetterContainer = () => {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("CoverLetter");
  const [isCoverLetterDraftVisible, setIsCoverLetterDraftVisible] =
    useRecoilState(coverLetterDraftsVisible);
  const [isCoverLetterVisible] = useRecoilState(coverLetterVisible);

  const { data: letterList } = trpc.useQuery([
    "fs.coverLetter.getLetters",
    { id: userId },
  ]);

  useEffect(() => {
    if (letterList?.length === 0) {
      setIsCoverLetterDraftVisible(false);
    } else {
      setIsCoverLetterDraftVisible(true);
    }
  }, [letterList]);

  return (
    <div className="pt-6 md:pt-10 min-h-[80vh] md:min-h-[70vh] px-2 sm:px-4 md:px-2 pb-6 md:pb-0">
      {letterList?.length === 0 &&
        !isCoverLetterDraftVisible &&
        !isCoverLetterVisible && (
          <>
            <div className="w-full md:flex justify-end mb-2 lg:mb-14 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between  ">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight dark:text-white text-gray-900 text-center lg:text-left">
                {t("enclosedConsideration")}
              </h2>
            </div>
            <div className="w-full print:hidden">
              <div className="w-full flex items-start justify-start gap-2 md:gap-6 flex-col lg:flex-row mt-6 md:mt-8">
                <div className="w-full lg:w-[45%]">
                  <ReusableVideoCard
                    src="https://www.youtube.com/embed/VI31mrVRVy8?si=6MsfEVLfsW553kYB?autoplay=1&mute=1"
                    title={t("craftCoverLetter")}
                  />
                </div>
                <div className="w-full lg:w-[55%] flex justify-center flex-col">
                  <CoverLetterForm />
                </div>
              </div>
            </div>
          </>
        )}
      {letterList?.length === 0 && <CoverLetter />}
      {(letterList?.length !== 0 || isCoverLetterDraftVisible) && (
        <PreviousDrafts />
      )}
    </div>
  );
};

export default CoverLetterContainer;
