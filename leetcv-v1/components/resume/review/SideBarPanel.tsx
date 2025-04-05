import {
  AwardsReview,
  EducationsReview,
  ProjectsReview,
  reviewsList,
} from "@constants/defaults";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { activeReviewState } from "@state/state";
import { useRecoilState } from "recoil";

export const SideBarPanel = () => {
  const [reviewTitle, setReviewTitle] = useRecoilState(activeReviewState);

  return (
    <>
      {reviewsList.map((review, id) => {
        const { titleLocKey, document } = review;

        return (
          <h2
            key={review.id}
            className={`${
              titleLocKey === reviewTitle.title && `text-white bg-[#4F46E5]`
            } cursor-pointer  pr-5 p-2 rounded-lg bg-indigo-50`}
            onClick={() => {
              if (
                document === EducationsReview ||
                document === ProjectsReview ||
                document === AwardsReview
              ) {
                setReviewTitle({
                  document: document,
                  headingTitle: "",
                  title: titleLocKey,
                });
              }
            }}
          >
            <div className="flex items-center gap-3 w-full justify-between">
              <p>{titleLocKey}</p>
              {titleLocKey === reviewTitle.title && (
                <CheckCircleIcon className="w-5 text-white" />
              )}
            </div>
          </h2>
        );
      })}
    </>
  );
};
