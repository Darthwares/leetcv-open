import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  coverLetterFormVisible,
  coverLetterVisible,
  resumeState,
  selectedLetterVisible,
} from "@state/state";
import MomentTimeFormate from "@components/momentTimeFormate";
import { Letter } from "./previousDrafts";
import { classNames } from "@utils/classNames";
import ImageFallBack from "@components/imageFallBack";

type CoverLetterDropdownProps = {
  selectedLetter: Letter;
  setSelectedLetter: (letter: Letter) => void;
  coverLetters: any;
  setCoverLetterDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CoverLetterDropdown({
  selectedLetter,
  setSelectedLetter,
  coverLetters,
  setCoverLetterDelete,
  setIsEditing,
}: Readonly<CoverLetterDropdownProps>) {
  const setIsFormVisible = useSetRecoilState(coverLetterFormVisible);
  const setIsSelectedLetter = useSetRecoilState(selectedLetterVisible);
  const setIsCoverLetterVisible = useSetRecoilState(coverLetterVisible);
  const [resume] = useRecoilState(resumeState);

  const handleSelect = (id: string) => {
    const selectedCoverLetter = coverLetters.find(
      (letter: Letter) => letter.id === id
    );
    setSelectedLetter(selectedCoverLetter);
    setIsSelectedLetter(true);
    setIsFormVisible(false);
    setIsCoverLetterVisible(false);
    setCoverLetterDelete(false);
    setIsEditing(false);
  };

  return (
    <Listbox value={selectedLetter} onChange={setSelectedLetter}>
      {({ open }) => (
        <div className="relative mt-2 print:hidden">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:leading-6 dark:bg-gray-800 dark:hover:bg-gray-800 dark:ring-gray-600">
            <span className="flex items-center">
              <ImageFallBack
                imgSrc={selectedLetter.image}
                fallBackText={resume.displayName}
                avatarClass="w-7 h-7 rounded-full"
                avatarImgClass="w-full h-full rounded-full overflow-hidden"
                avatarFallbackClass="w-7 h-7 text-white rounded-full text-2xl"
              />
              <span className="ml-3 block truncate dark:text-gray-100">
                {selectedLetter.jobPosition}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-slate-100 scrollbar-thumb-gray-300 max-h-[17rem] w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 dark:bg-gray-800 ring-black ring-opacity-5 focus:outline-none text-sm">
              {coverLetters?.map((letter: Letter) => {
                return (
                  <Listbox.Option key={letter.id} value={letter}>
                    <div
                      onClick={() => handleSelect(letter.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Space") {
                          handleSelect(letter.id);
                        }
                      }}
                      className={classNames(
                        selectedLetter.id === letter.id
                          ? "bg-indigo-600 dark:bg-gray-900/60 text-white"
                          : "text-gray-900 dark:text-gray-100",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )}
                    >
                      <div className="flex items-center">
                        <ImageFallBack
                          imgSrc={letter.image}
                          fallBackText={resume.displayName}
                          avatarClass="w-8 h-8 rounded-full"
                          avatarImgClass="w-full h-full rounded-full overflow-hidden"
                          avatarFallbackClass="w-8 h-8 text-white rounded-full text-2xl"
                        />
                        <div>
                          <span
                            className={classNames(
                              selectedLetter.id === letter.id
                                ? "font-medium"
                                : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {letter.jobPosition}
                          </span>
                          <div
                            className={classNames(
                              selectedLetter.id === letter.id
                                ? "text-white"
                                : "text-gray-400",
                              " -mt-1 ml-3"
                            )}
                          >
                            <MomentTimeFormate
                              isSelected={selectedLetter.id === letter.id}
                              timeStamp={letter.createdAt}
                            />
                          </div>
                        </div>
                      </div>
                      {selectedLetter.id === letter.id ? (
                        <span className="absolute inset-y-0 right-0 text-white flex items-center pr-4">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  </Listbox.Option>
                );
              })}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
