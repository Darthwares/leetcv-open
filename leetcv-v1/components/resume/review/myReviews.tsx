import { ReviewList } from "@components/review";
import { XIcon } from "@heroicons/react/outline";
import { showMyReview } from "@state/state";
import { useSetRecoilState } from "recoil";
import ReviewSidebar from "./reviewSidebar";

const MyReviews = () => {
  const setShowModal = useSetRecoilState(showMyReview);

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden">
        <div className="fixed inset-0 w-full h-full bg-black opacity-100">
          <div className="flex items-center px-4 md:px-56 py-4">
            <div
              className={`relative w-full p-2  bg-white rounded-md shadow-lg`}
            >
              <div className="w-full flex gap-5 justify-end relative top-1 right-2">
                <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full">
                  <XIcon
                    className="w-5"
                    onClick={() => {
                      setShowModal(false);
                    }}
                  />
                </div>
              </div>
              <ReviewList />
            </div>
          </div>
        </div>
      </div>
      <ReviewSidebar />
    </>
  );
};

export default MyReviews;
