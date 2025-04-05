import MomentTimeFormate from "@components/momentTimeFormate";
import React, { useState } from "react";
import ReviewResolve from "./reviewResolve";
import { ReviewSchema } from "data/models/Review";
import Modal from "@components/modal";
import ImageFallBack from "@components/imageFallBack";
import { sideBarOpenState } from "@state/state";
import { useRecoilState } from "recoil";
interface CheckResolvedProps {
  reviews: ReviewSchema;
  handleResolveClick: () => void;
}

const ReviewCard = ({ reviews, handleResolveClick }: CheckResolvedProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const displayContent = reviews?.content?.slice(0, 70);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`rounded-lg relative border border-gray-300 dark:bg-gray-800/20 dark:border-gray-600 p-4 ${
        reviews?.status !== "Resolved" ? "md:h-60" : "md:h-[12.5rem]"
      } ${isSideBarClosed ? "lg:h-[11rem]" : "lg:h-48 xl:h-44"}`}
      style={{
        transition: "height 300ms ease-in-out",
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <div className="md:flex md:flex-col md:gap-4 lg:block">
          <div className="flex items-start gap-3 pb-3 mb:pb-0 lg:pb-2">
            <ImageFallBack
              imgSrc={reviews?.image!}
              fallBackText={reviews?.username}
              avatarClass="w-12 h-12 rounded-md"
              avatarImgClass="w-full h-full overflow-hidden"
              avatarFallbackClass="w-12 h-12 text-white rounded-md text-3xl"
            />
            <div className="w-full flex justify-between items-center">
              <div className="w-full">
                <div className="flex w-full justify-between align-middle items-center">
                  <a
                    href={`${location.origin}/r/${reviews?.requesterHandle}`}
                    rel="noreferrer"
                    className={`first-line:font-medium dark:text-white text-gray-900 hover:text-blue-600 truncate ${
                      reviews?.status !== "Resolved"
                        ? "w-60 md:w-60"
                        : "w-40 md:w-32"
                    } sm:w-72 ${
                      isSideBarClosed ? "lg:w-52 xl:w-36" : "lg:w-28 xl:w-56"
                    } reqUserName`}
                  >
                    {reviews?.username}
                  </a>
                  {reviews?.status === "Resolved" && (
                    <span className="flex gap-2 items-center px-2 sm:px-3 md:px-2 transition-all duration-300 border border-transparent py-1 font-medium rounded-full text-green-800 text-sm bg-green-100 dark:bg-white dark:text-green-600 lg:absolute top-4 right-3">
                      {"Resolved"}
                    </span>
                  )}
                  {reviews?.status !== "Resolved" && (
                    <span className="hidden sm:block md:hidden lg:block lg:absolute top-4 right-3">
                      <ReviewResolve
                        onResolveClick={handleResolveClick}
                        status={reviews?.status}
                      />
                    </span>
                  )}
                </div>
                <MomentTimeFormate timeStamp={reviews.createdAt} />
              </div>
            </div>
          </div>
          <h4 className="mt-2 md:-mt-1 lg:mt-2 text-base font-semibold text-gray-900 capitalize truncate w-[19rem] sm:w-[28rem] md:w-64 lg:w-[25rem] dark:text-gray-200 xl:w-[20rem] projectTitle">
            {reviews?.reviewTitle}
          </h4>
          <p className="mt-3 md:-mt-1 lg:mt-3 text-sm font-medium dark:text-gray-300 text-gray-700">
            {displayContent}
            {reviews?.content?.length > 80 && (
              <button
                type="button"
                onClick={openModal}
                className="p-1 text-indigo-500"
              >
                {"...Read more"}
              </button>
            )}
          </p>
        </div>
        <div>
          {reviews?.status !== "Resolved" && (
            <div className="flex justify-end mt-2 md:mt-0 sm:hidden md:block lg:hidden">
              <span>
                <ReviewResolve
                  onResolveClick={handleResolveClick}
                  status={reviews?.status}
                />
              </span>
            </div>
          )}
        </div>
      </div>
      <Modal
        content={reviews?.content}
        title={reviews?.reviewTitle}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default ReviewCard;
