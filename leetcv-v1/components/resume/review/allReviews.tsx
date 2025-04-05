import ReviewResources from "@components/resource/reviewResources";
import { tabs, countBasedOnPlan } from "@constants/defaults";
import {
  activeReviewState,
  noReviewState,
  profileResumeState,
  subscriptionPlanState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import ReviewDetails from "./reviewDetails";
import UpgradePlanBanner from "./upgradePlanBanner";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const AllReviews = () => {
  const t = useTranslations("ReviewList");
  const [userId] = useRecoilState(userIdState);
  const [selectedDocument] = useRecoilState(activeReviewState);
  const [resolved, setResolved] = useState(false);
  const [resume] = useRecoilState(profileResumeState);
  const [noReview, setNoReview] = useRecoilState(noReviewState);
  const [resolvedTitle, setResolvedTitle] = useState(t("unresolved"));
  const [plan] = useRecoilState(subscriptionPlanState);

  useEffect(() => {
    setResolved(resolvedTitle === t("resolved"));
  }, [resolvedTitle]);

  const { data: reviews } = trpc.useQuery([
    "fs.review.get",
    {
      requestId: resume.id,
      userId,
      reviewCategory: selectedDocument.document,
    },
  ]);

  const filteredRequests = reviews
    ? reviews.filter((review) =>
        resolved ? review.status === "Resolved" : review.status !== "Resolved"
      )
    : [];

  const count = countBasedOnPlan(plan, reviews?.length!);

  return (
    <div className="space-y-1" data-testid="allReviews">
      <div className="z-20 w-full sticky items-center top-0 mb-5">
        <div className="pb-2 mt-1">
          <nav className="isolate flex w-full divide-x divide-gray-200 rounded-lg shadow">
            {tabs.map((tab, tabIdx) => (
              <button
                key={tab.name}
                onClick={(e) => {
                  e.preventDefault();
                  setResolvedTitle(tab.name);
                  setNoReview(!noReview);
                }}
                className={classNames(
                  tab.name === resolvedTitle
                    ? "text-gray-900 "
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-2 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
                )}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    tab.name === resolvedTitle
                      ? "bg-indigo-500"
                      : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
      {filteredRequests?.length > 0 && (
        <UpgradePlanBanner
          title={t("boostYourResume")}
          description={t("upgradePlanAllReview")}
        />
      )}
      {filteredRequests?.length === 0 && <ReviewResources />}
      <div className="space-y-4 w-full">
        {reviews?.length !== 0 &&
          reviews?.slice(0, count).map((review) => {
            const { status } = review;
            return (
              <React.Fragment key={review.id}>
                {resolved && status === t("resolved") && (
                  <ReviewDetails reviews={review} />
                )}
                {!resolved && status !== t("resolved") && (
                  <ReviewDetails reviews={review} />
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default AllReviews;
