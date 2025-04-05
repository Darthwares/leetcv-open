import {
  coverLetterDraftsVisible,
  coverLetterEditingState,
  coverLetterFormState,
  coverLetterLoaderState,
  coverLetterState,
  coverLetterVisible,
  selectedLetterVisible,
  sideBarOpenState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  BookmarkIcon,
  CheckIcon,
  DownloadIcon,
  PencilAltIcon,
} from "@heroicons/react/outline";
import { v4 as guid } from "uuid";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Letter } from "./previousDrafts";
import {
  coverLetterInitialState,
  coverLetterResponsiveClasses,
} from "@constants/defaults";
import CoverLetterPrint from "./coverLetterPrint";

const CoverLetter = () => {
  const [coverLetterExists] = useRecoilState(coverLetterLoaderState);
  const [coverFormDetails] = useRecoilState(coverLetterFormState);
  const t = useTranslations("CoverLetter");
  const [coverLetter, setCoverLetter] = useRecoilState(coverLetterState);
  const [userId] = useRecoilState(userIdState);
  const setIsCoverLetterVisible = useSetRecoilState(coverLetterVisible);
  const setIsSelectedLetter = useSetRecoilState(selectedLetterVisible);
  const setIsCoverLetterDraftVisible = useSetRecoilState(
    coverLetterDraftsVisible
  );
  const [isEditing, setIsEditing] = useRecoilState(coverLetterEditingState);
  const [selectedLetter, setSelectedLetter] = useState<Letter>(
    coverLetterInitialState
  );
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const responsiveClasses = coverLetterResponsiveClasses(
    isEditing,
    isSideBarClosed
  );

  const { refetch } = trpc.useQuery([
    "fs.coverLetter.getLetters",
    { id: userId },
  ]);

  const mutateCoverLetter = trpc.useMutation(["fs.coverLetter.create"], {
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    const generatedCoverLetter = {
      id: userId,
      coverLetter: coverLetter,
      jobPosition: coverFormDetails.jobPosition,
      image: coverFormDetails.image,
      createdAt: {
        _seconds: Math.floor(Date.now() / 1000),
        _nanoseconds: 0,
      },
    };
    setSelectedLetter(generatedCoverLetter);
  }, [coverLetter]);

  const handleSave = () => {
    if (!coverLetter) {
      return;
    }
    setIsCoverLetterDraftVisible(true);
    mutateCoverLetter.mutate({
      id: userId,
      coverLetter: coverLetter,
      coverLetterId: guid(),
      jobPosition: coverFormDetails.jobPosition,
      image: coverFormDetails.image,
    });
    setCoverLetter("");
    toast.success("Saved");
    setIsCoverLetterVisible(false);
    setIsSelectedLetter(true);
  };

  return (
    <div
      className={`md:px-10 lg:px-4 xl:px-0 ${responsiveClasses} px-2 mx-auto`}
      id="coverLetter"
    >
      {!coverLetter && coverLetterExists && (
        <div
          className={`flex flex-col min-h-[70vh] lg:min-h-[60vh] w-full items-center justify-center`}
        >
          <div className="w-full h-full sm:w-[28rem] sm:h-[22rem]">
            <lottie-player
              src="/assets/lottie/ai.json"
              background="white"
              speed="1"
              loop
              autoplay
            />
          </div>
          <p className="animate-pulse">{t("generatingCoverLetter")}</p>
        </div>
      )}
      {coverLetter && (
        <div className="space-y-5 w-full">
          <h2 className="w-full mt-2 lg:mt-0 text-2xl lg:text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl print:hidden">
            {t("yourCoverLetter")}
          </h2>
          <div className="relative left-1 print:bg-white space-y-5">
            <CoverLetterPrint
              selectedLetter={selectedLetter}
              isEditing={isEditing}
              jobTitleVisible={false}
            />
          </div>
          <div
            className={`justify-end flex flex-col sm:flex-row ${
              isEditing ? "gap-0" : "gap-4 sm:gap-3"
            } print:hidden mt-5`}
          >
            <div className="flex justify-end">
              <button data-testid="printButton">
                <div
                  onClick={() => {
                    setIsEditing(!isEditing);
                  }}
                  className="flex space-x-2 text-white transition-all duration-200 hover:bg-indigo-600 font-medium rounded-lg bg-indigo-500 text-sm px-3 py-2.5 text-center"
                >
                  {!isEditing ? (
                    <>
                      <PencilAltIcon className="w-5 h-5" />
                      <span>{t("edit")}</span>
                    </>
                  ) : (
                    <>
                      <CheckIcon className="w-5 h-5" />
                      <span>{t("saveChanges")}</span>
                    </>
                  )}
                </div>
              </button>
            </div>
            <div className="flex items-center gap-2 justify-end">
              {!isEditing && (
                <>
                  <button
                    data-testid="printButton"
                    onClick={() => {
                      document.title = `Cover_Letter-${coverFormDetails.jobPosition}-LeetCV`;
                      window.print();
                    }}
                  >
                    <div className="flex space-x-2 text-white transition-all duration-200 hover:bg-indigo-600 font-medium rounded-lg bg-indigo-500 text-sm px-3 py-2.5 text-center">
                      <DownloadIcon className="w-5 h-5" />
                      <span>{t("download")}</span>
                    </div>
                  </button>
                  <button data-testid="printButton">
                    <div
                      onClick={handleSave}
                      className="flex space-x-2 text-white hover:bg-indigo-600 font-medium rounded-lg transition-all duration-200 bg-indigo-500 text-sm px-2 sm:px-3 py-2.5 text-center"
                    >
                      <BookmarkIcon className="w-5 h-5" />
                      <span>{t("save")}</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverLetter;
