import { profileResumeState, showReviewSidebarModal } from "@state/state";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import Filter from "./filter";
import AllReviews from "./allReviews";
import ReusableSidebar from "@components/reusableSideBar";

export default function ReviewSidebar() {
  const t = useTranslations("ReviewModal");
  const [profileResume] = useRecoilState(profileResumeState);
  const createReview: boolean = false;
  const [showReviewSidebar, setShowReviewSidebar] = useRecoilState(
    showReviewSidebarModal
  );

  return (
    <>
      <ReusableSidebar
        open={showReviewSidebar}
        setOpen={setShowReviewSidebar}
        title={createReview ? t("writeReview") : t("receivedFeedback")}
        cssClass="fixed top-0 z-50 w-full"
        description={
          <>
            {createReview ? t("writeFeedFor") : t("userGivenFeedback")}
            <strong className="text-white">
              {`${profileResume.displayName}'s`}
            </strong>{" "}
            {createReview ? t("feelFree") : t("resume")}
          </>
        }
      >
        <>
          <div className="flex flex-1 flex-col justify-between mb-8">
            <div className="divide-y divide-gray-200 px-4 sm:px-6">
              <div className="space-y-6 pb-5 pt-6">
                <div className="flex items-center justify-between">
                  <div>{t("selectSection")}</div>
                  <div className="flex gap-2">
                    <Filter />
                  </div>
                </div>
                <AllReviews />
              </div>
            </div>
          </div>
        </>
      </ReusableSidebar>
    </>
  );
}
