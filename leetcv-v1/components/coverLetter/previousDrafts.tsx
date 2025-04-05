import {
  BookmarkIcon,
  DownloadIcon,
  TrashIcon,
  PencilAltIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import {
  coverLetterEditingState,
  coverLetterFormVisible,
  coverLetterLoaderState,
  coverLetterState,
  coverLetterVisible,
  resumeState,
  selectedLetterVisible,
  sideBarOpenState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import EmptyCoverState from "./emptyCoverState";
import { toast } from "react-toastify";
import { CoverLetterSvg } from "@components/svg";
import CoverLetterDropdown from "./coverLetterDropdown";
import CoverLetterForm from "./coverLetterInfo";
import CoverLetter from "./coverLetter";
import MomentTimeFormate from "@components/momentTimeFormate";
import DeleteModal from "../deleteModal";
import { coverLetterInitialState } from "@constants/defaults";
import ImageFallBack from "@components/imageFallBack";
import CoverLetterPrint from "./coverLetterPrint";

export interface Letter {
  id: string;
  image: string;
  jobPosition: string;
  coverLetter: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const PreviousDrafts = () => {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("CoverLetter");
  const [isFormVisible, setIsFormVisible] = useRecoilState(
    coverLetterFormVisible
  );
  const [selectedLetter, setSelectedLetter] = useState<Letter>(
    coverLetterInitialState
  );
  const [isCoverLetterVisible, setIsCoverLetterVisible] =
    useRecoilState(coverLetterVisible);
  const [isSelectedLetter, setIsSelectedLetter] = useRecoilState(
    selectedLetterVisible
  );
  const [coverLetterLoading] = useRecoilState(coverLetterLoaderState);
  const [coverLetterDelete, setCoverLetterDelete] = useState(false);
  const [isEditing, setIsEditing] = useRecoilState(coverLetterEditingState);
  const [coverLetter, setCoverLetter] = useRecoilState(coverLetterState);
  const [resume] = useRecoilState(resumeState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const deleteLetter = trpc.useMutation(["fs.coverLetter.delete"]);
  const updateLetter = trpc.useMutation(["fs.coverLetter.update"]);
  const { data: letterList, refetch } = trpc.useQuery([
    "fs.coverLetter.getLetters",
    { id: userId },
  ]);
  const [coverLetters, setCoverLetters] = useState<any>(letterList);

  const getLatestCoverLetter = (letters: any) => {
    if (letters) {
      const latestCoverLetter = letters[0];
      setSelectedLetter(latestCoverLetter);
    }
  };

  useEffect(() => {
    if (letterList) {
      const displayedLetterList = [...letterList];
      displayedLetterList.sort(
        (a, b) => b.createdAt._seconds - a.createdAt._seconds
      );
      getLatestCoverLetter(displayedLetterList);
      setCoverLetters(displayedLetterList);
    }
  }, [letterList]);

  const handleDelete = (coverLetterId: string) => {
    deleteLetter.mutate(
      {
        id: userId,
        coverLetterId,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    const remainingCoverLetters = coverLetters?.filter(
      (letter: Letter) => letter.id !== coverLetterId
    );
    setCoverLetter("");
    setCoverLetters(remainingCoverLetters);
    toast.success(t("letterDeleted"));
  };

  const handleSelect = (id: string) => {
    const selectedCoverLetter = coverLetters?.find(
      (letter: Letter) => letter.id === id
    );
    setSelectedLetter(selectedCoverLetter);
    setIsSelectedLetter(true);
    setIsFormVisible(false);
    setIsCoverLetterVisible(false);
    setCoverLetterDelete(false);
    setIsEditing(false);
  };

  const handleSaveChanges = (coverLetterId: string) => {
    if (coverLetter) {
      updateLetter.mutate(
        {
          id: userId,
          coverLetterId,
          coverLetter: coverLetter,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
      setIsEditing(false);
      setSelectedLetter((prev) => ({
        ...prev,
        id: coverLetterId,
        coverLetter,
      }));
      toast.success(t("letterUpdated"));
    }
  };

  return (
    <>
      {coverLetters?.length !== 0 && (
        <>
          {!isEditing && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {!coverLetterLoading && (
                <h2 className="text-2xl md:text-3xl dark:text-white  font-bold tracking-tight text-gray-900 print:hidden">
                  {isFormVisible
                    ? t("enclosedConsideration")
                    : t("yourPreviousDrafts")}
                </h2>
              )}
              {!coverLetterLoading && (
                <>
                  {isFormVisible ? (
                    <div className="flex justify-end md:flex-none">
                      <button
                        onClick={() => {
                          setIsSelectedLetter(true);
                          setIsFormVisible(false);
                          setCoverLetterDelete(false);
                        }}
                        type="button"
                        className="flex gap-2 space-x-2 text-white hover:bg-indigo-700 font-medium rounded-lg transition-all duration-200 bg-indigo-600 text-sm px-3 py-2.5 text-center"
                      >
                        <BookmarkIcon className="w-5 h-5" />
                        {t("goToDrafts")}
                      </button>
                    </div>
                  ) : (
                    <div className=" flex justify-end md:flex-none print:hidden">
                      <button
                        type="button"
                        className="flex gap-2 space-x-2 text-white transition-all duration-200 hover:bg-indigo-700 font-medium rounded-lg bg-indigo-600 text-sm px-3 py-2.5 text-center"
                        onClick={() => {
                          setIsFormVisible(true);
                          setIsSelectedLetter(false);
                          setIsCoverLetterVisible(false);
                          setCoverLetterDelete(false);
                        }}
                      >
                        <CoverLetterSvg />
                        {t("createCoverLetter")}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
          {coverLetters?.length === 0 ? (
            <EmptyCoverState />
          ) : (
            <div
              className={`mt-5 lg:mt-10 flex justify-between gap-5 ${
                isCoverLetterVisible
                  ? "lg:justify-center lg:gap-4 xl:gap-10"
                  : "lg:justify-start lg:gap-10 xl:gap-12"
              } lg:flex-row lg:items-start flex-col w-full`}
            >
              {!isFormVisible && !coverLetterLoading && !isEditing && (
                <div className="lg:hidden">
                  <CoverLetterDropdown
                    selectedLetter={selectedLetter}
                    setSelectedLetter={setSelectedLetter}
                    setCoverLetterDelete={setCoverLetterDelete}
                    setIsEditing={setIsEditing}
                    coverLetters={coverLetters}
                  />
                </div>
              )}
              {!isEditing && (
                <div
                  className={`lg:flex scrollbar-w-[5px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full lg:flex-col print:hidden gap-4 hidden max-w-md max-h-[80vh] overflow-hidden scrollbar scrollbar-track-transparent scrollbar-thumb-transparent overflow-y-scroll custom-scrollbar transition-all duration-200 ${
                    isSideBarClosed ? "w-auto" : "w-80 xl:w-96"
                  }`}
                >
                  {coverLetters?.map((letter: any) => (
                    <div
                      key={letter.id}
                      onClick={() => handleSelect(letter.id)}
                      className={`${
                        !isCoverLetterVisible &&
                        !isFormVisible &&
                        selectedLetter.id === letter.id
                          ? "border-gray-700 dark:border-gray-200 dark:bg-gray-800 bg-gray-50"
                          : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/60"
                      } relative flex items-center space-x-3 rounded-lg border transition-all duration-200 hover:bg-gray-50 group p-2.5 lg:p-[14px] shadow-sm ${
                        coverLetterLoading
                          ? "pointer-events-none"
                          : "cursor-pointer"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        <ImageFallBack
                          imgSrc={letter.image}
                          fallBackText={resume.displayName}
                          avatarClass="w-10 h-10 rounded-full"
                          avatarImgClass="w-full h-full rounded-full overflow-hidden"
                          avatarFallbackClass="w-10 h-10 text-white rounded-full text-2xl"
                        />
                      </div>
                      <div className="flex-1">
                        <p
                          className={`${
                            isSideBarClosed
                              ? "lg:w-44 xl:w-60"
                              : "lg:w-32 xl:w-44"
                          } text-sm font-medium truncate text-gray-900`}
                        >
                          {letter.jobPosition}
                        </p>
                        <div className="-mt-1">
                          <MomentTimeFormate timeStamp={letter.createdAt} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isCoverLetterVisible && <CoverLetter />}
              {isFormVisible && (
                <div className="w-full lg:max-w-xl xl:max-w-3xl -mt-3">
                  <CoverLetterForm />
                </div>
              )}
              {isSelectedLetter && (
                <div
                  className={`flex items-center w-full print:bg-white print:text-black ${
                    isEditing
                      ? "lg:max-w-[50rem] xl:max-w-4xl"
                      : "lg:max-w-[38rem] xl:max-w-[52rem] 2xl:max-w-4xl"
                  }  justify-center flex-col`}
                >
                  {selectedLetter?.coverLetter && (
                    <>
                      <div className="sm:px-2 md:px-3 lg:px-0">
                        <CoverLetterPrint
                          selectedLetter={selectedLetter}
                          isEditing={isEditing}
                          jobTitleVisible={true}
                        />
                      </div>
                      <div className="w-full mt-8 md:mt-5 flex gap-2 md:gap-2.5 justify-end print:hidden sm:px-2.5 md:px-3 lg:px-0 max-w-4xl">
                        {isEditing ? (
                          <>
                            <button
                              data-testid="printButton"
                              onClick={() => setIsEditing(false)}
                            >
                              <div className="flex space-x-2 text-gray-700 hover:bg-gray-300 duration-200 transition-all font-medium rounded-lg bg-gray-200 text-sm px-4 py-2.5 text-center">
                                <span>{t("cancel")}</span>
                              </div>
                            </button>
                            <button
                              data-testid="printButton"
                              onClick={() =>
                                handleSaveChanges(selectedLetter.id)
                              }
                            >
                              <div className="flex space-x-2 text-white hover:bg-indigo-700 duration-200 transition-all font-medium rounded-lg bg-indigo-600 text-sm px-3 py-2.5 text-center">
                                <CheckIcon className="w-5 h-5" />
                                <span>{t("saveChanges")}</span>
                              </div>
                            </button>
                          </>
                        ) : (
                          <button data-testid="printButton">
                            <div
                              onClick={() => {
                                setIsEditing(true);
                              }}
                              className="flex space-x-2 text-white hover:bg-indigo-700 duration-200 transition-all font-medium rounded-lg bg-indigo-600 text-sm px-3 py-2.5 text-center"
                            >
                              <PencilAltIcon className="w-5 h-5" />
                              <span>{t("edit")}</span>
                            </div>
                          </button>
                        )}
                        {!isEditing && (
                          <>
                            <button
                              data-testid="printButton"
                              onClick={() => {
                                document.title = `Cover_Letter-${selectedLetter.jobPosition}-LeetCV`;
                                window.print();
                              }}
                            >
                              <div className="flex space-x-2 text-white hover:bg-indigo-700 duration-200 transition-all font-medium rounded-lg bg-indigo-600 text-sm px-3 py-2.5 text-center">
                                <DownloadIcon className="w-5 h-5" />
                                <span>{t("download")}</span>
                              </div>
                            </button>
                            <button
                              data-testid="printButton"
                              onClick={() =>
                                setCoverLetterDelete(!coverLetterDelete)
                              }
                            >
                              <div className="flex space-x-2 text-white hover:bg-red-600 duration-200 transition-all font-medium rounded-lg bg-red-500 text-sm px-3 py-2.5 text-center">
                                <TrashIcon className="w-5 h-5" />
                                <span>{t("delete")}</span>
                              </div>
                            </button>
                          </>
                        )}
                      </div>
                      <DeleteModal
                        title={selectedLetter?.jobPosition}
                        handleDelete={() => handleDelete(selectedLetter?.id)}
                        open={coverLetterDelete}
                        setOpen={setCoverLetterDelete}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PreviousDrafts;
