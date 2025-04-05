import { livesState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

type ReFillForFreeProps = {
  setIsFreeHeartFilled: React.Dispatch<React.SetStateAction<boolean>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReFillForFree = ({
  setIsFreeHeartFilled,
  setShowModal,
}: ReFillForFreeProps) => {
  const setLives = useSetRecoilState(livesState);
  const [userId] = useRecoilState(userIdState);
  const setLeetCourseLives = trpc.useMutation([
    "fs.leetCourse.updateLeetCourseLive",
  ]);
  const setFreeHeartFilled = trpc.useMutation([
    "fs.leetCourse.updateFreeHeartFilled",
  ]);

  const handleRefill = async () => {
    setLives(5);
    setShowModal(false);
    setIsFreeHeartFilled(true);

    await setLeetCourseLives.mutateAsync({
      id: userId,
      live: 5,
    });
    await setFreeHeartFilled.mutateAsync({
      id: userId,
      isFilled: true,
    });
  };

  return (
    <div className="bg-white rounded-2xl px-5 md:px-8 pb-5 md:pb-8 w-full text-center shadow-xl">
      <div className="w-36 h-36 mx-auto">
        <lottie-player
          src="/assets/lottie/heart.json"
          speed="1"
          loop
          autoplay
        />
      </div>
      <h2 className="text-gray-900 text-2xl font-bold mb-2">
        You ran out of hearts. Have a free refill on us to keep going!
      </h2>
      <button
        onClick={handleRefill}
        className="w-full mt-6 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-colors"
      >
        REFILL FOR FREE
      </button>
    </div>
  );
};
export default ReFillForFree;
