import { GotAllReviews } from "./resume/review/gotAllReviews";

export const ReviewList = () => {
  return (
    <div data-testid="reviewsId">
      <div
        className={` ${
          location.pathname === "/s/reviews"
            ? "w-full md:px-4 lg:px-2 min-h-[70vh]"
            : "h-[90vh] overflow-y-scroll md:px-10"
        } `}
      >
        <GotAllReviews />
      </div>
    </div>
  );
};
