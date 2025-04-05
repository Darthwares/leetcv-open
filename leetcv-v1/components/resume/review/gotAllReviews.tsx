import Filter from "@components/resume/review/filter";
import ReviewResources from "@components/resource/reviewResources";
import { countBasedOnPlan, getCurrentPage, tabs } from "@constants/defaults";
import {
  activeReviewState,
  noReviewState,
  sideBarOpenState,
  subscriptionPlanState,
  userIdState,
  pendingNotificationsState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ReviewCard from "./reviewCard";
import UpgradePlanBanner from "./upgradePlanBanner";
import ReUsablePaginationButtons from "@components/reUsablePaginationButtons";
import { RequestList } from "data/models/RequestList";

export const GotAllReviews = () => {
  const t = useTranslations("ReviewList");
  const [userId] = useRecoilState(userIdState);
  const [selectedDocument] = useRecoilState(activeReviewState);
  const [resolved, setResolved] = useState(false);
  const [noReview, setNoReview] = useRecoilState(noReviewState);
  const [resolvedTitle, setResolvedTitle] = useState(t("unresolved"));
  const [plan] = useRecoilState(subscriptionPlanState);
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [totalPages, setTotalPages] = useState(0);
  const [reviewStatus, setReviewStatus] = useState("Pending");
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const updateStatus = trpc.useMutation(["fs.review.updateStatus"]);
  const setPendingNotifications = useSetRecoilState(pendingNotificationsState);
  const youTubeVideoSrc =
    "https://www.youtube.com/embed/6W-2oaySN-E?si=yJLPXHuP-VObeD6t?autoplay=1&mute=1";

  const { data: reviewAllList, refetch } = trpc.useQuery([
    "fs.review.getReviewsByCategory",
    {
      userId,
      reviewCategory: selectedDocument.document,
      page: currentPage,
      status: reviewStatus,
    },
  ]);
  const reviewsList = reviewAllList?.reviews as RequestList[];

  const mutation = trpc.useMutation(["fs.review.create"], {
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    setResolved(resolvedTitle === t("resolved"));
  }, [resolvedTitle]);

  const count = countBasedOnPlan(plan, reviewsList?.length);

  useEffect(() => {
    if (reviewAllList?.totalPages) {
      setTotalPages(reviewAllList?.totalPages);
    }
  }, [reviewAllList]);

  useEffect(() => {
    setPendingNotifications((prev) => ({
      ...prev,
      review: false,
    }));
    updateStatus.mutateAsync({ userId, type: "review" });
  }, []);

  return (
    <div className="space-y-1" data-testid="allReviews">
      <div className="z-10 flex justify-between sticky items-center top-0 rounded-md dark:rounded-none dark:bg-gray-900 bg-white md:pt-0 mb-5">
        <div className="flex gap-5 pb-2 mt-1 dark:mt-0">
          {tabs.map((tab) => {
            return (
              <button
                className={`
                ${
                  tab.name === resolvedTitle
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 dark:text-white dark:hover:text-white hover:text-gray-700 hover:border-gray-200"
                } whitespace-nowrap flex pb-2 mb-2 px-1 border-b-2 font-medium text-sm cursor-pointer mt-1 pt-2
                `}
                key={tab.id}
                onClick={() => {
                  setResolvedTitle(tab.name);
                  setNoReview(!noReview);
                  if (tab.name === "Resolved") {
                    setReviewStatus("Resolved");
                  } else {
                    setReviewStatus("Pending");
                  }
                  setCurrentPage(1);
                }}
              >
                {tab.name}
              </button>
            );
          })}
        </div>
        <Filter setCurrentPage={setCurrentPage} />
      </div>
      {reviewsList?.length !== 0 && (
        <UpgradePlanBanner
          title={t("boostYourResume")}
          description={t("upgradePlanGotAllReview")}
        />
      )}
      {reviewsList?.length === 0 && (
        <ReviewResources
          videoSrc={youTubeVideoSrc}
          VideoTitle="A Detailed Guide on LeetCV's Feedback for Digital Resumes!"
        />
      )}
      <div
        className={`${
          reviewsList?.length !== 0 &&
          "min-h-[70vh] md:min-h-[65vh] flex flex-col justify-between"
        }`}
      >
        <div
          className={`grid md:grid-cols-2 ${
            isSideBarClosed
              ? "xl:grid-cols-3"
              : "xl:grid-cols-2 review-card-grid"
          } gap-6 grid-cols-1`}
        >
          {reviewsList?.length !== 0 &&
            reviewsList?.slice(0, count).map((reviews: RequestList) => {
              const { status } = reviews;

              const handleResolveClick = () => {
                mutation.mutate({
                  content: reviews?.content,
                  email: reviews?.email,
                  image: reviews?.image,
                  requestId: reviews?.requestId,
                  status: t("resolved"),
                  reviewCategory: selectedDocument.document,
                  userId: reviews?.userId,
                  id: reviews?.id,
                  username: reviews?.username,
                  reviewTitle: reviews?.reviewTitle,
                  requesterPosition: reviews?.requesterPosition,
                });
              };
              return (
                <React.Fragment key={reviews.id}>
                  {resolved && status === t("resolved") && (
                    <div className="flex flex-col">
                      <ReviewCard
                        reviews={reviews}
                        handleResolveClick={handleResolveClick}
                      />
                    </div>
                  )}
                  {!resolved && status !== t("resolved") && (
                    <div className="flex flex-col">
                      <ReviewCard
                        reviews={reviews}
                        handleResolveClick={handleResolveClick}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
        </div>
        {reviewsList?.length !== 0 && totalPages !== 1 && (
          <ReUsablePaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};
