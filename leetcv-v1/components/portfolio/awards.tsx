import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRecoilValue } from "recoil";
import { profileResumeState } from "@state/state";
import AwardModal from "./awardsModal";
import { Award } from "data/models/Award";
import { awardInitialState } from "@constants/defaults";
import CardStackUi from "./cardStackUi";

const Awards = () => {
  const resume = useRecoilValue(profileResumeState);
  const awards = resume?.awards ?? [];

  return (
    <>
      {awards.length !== 0 && (
        <CardStackUi
          id="award"
          Card={AwardCard}
          lottiesrc="award.json"
          background="bg-gray-50"
          dir="flex-row-reverse"
        />
      )}
    </>
  );
};

export default Awards;

const AwardCard = () => {
  const resume = useRecoilValue(profileResumeState);
  const t = useTranslations("Portfolio");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState<Award>(awardInitialState);
  const awards = resume?.awards ?? [];

  const handleClick = (id: string) => {
    setIsModalOpen(true);
    const award = awards.find((award) => award.id === id);
    if (award) {
      setSelectedAward(award);
    }
  };
  return (
    <>
      {awards?.map((award) => (
        <div
          key={award.id}
          className="duration-500 group overflow-hidden rounded bg-indigo-100 p-5 flex flex-col justify-evenly sticky top-10 pt-[1.5em]"
        >
          <div className="relative">
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-72 h-72 rounded-full group-hover:translate-x-12 group-hover:translate-y-12 bg-violet-200 right-1 -bottom-24"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-12 h-12 rounded-full group-hover:translate-x-12 group-hover:translate-y-2 bg-indigo-200 right-12 bottom-12"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-36 h-36 rounded-full group-hover:translate-x-12 group-hover:-translate-y-12 bg-indigo-100 right-1 -top-12"></div>
            <div className="absolute -z-20  duration-500 group-hover:blur-none w-24 h-24 bg-purple-100 rounded-full group-hover:-translate-x-12"></div>
            <div className="z-20 flex flex-col justify-evenly w-full h-full">
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-2xl font-bold w-64 sm:w-60 md:w-72 lg:w-60 xl:w-72 truncate">
                  {award.name}
                </span>
                <p className="text-sm">{award.date}</p>
              </div>
              <p className="mb-4 line-clamp-2 font-medium">{award.awardFor}</p>
              <p className="line-clamp-2">{award.description}</p>
              <button
                className="hover:bg-gray-100 transition-all duration-200 bg-neutral-50 rounded text-neutral-800 font-extrabold w-full p-3 mt-5"
                onClick={() => handleClick(award.id)}
              >
                {t("viewDetails")}
              </button>
            </div>
          </div>
        </div>
      ))}
      <AwardModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        award={selectedAward}
      />
    </>
  );
};
