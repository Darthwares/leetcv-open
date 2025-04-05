import { resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const useDailyUserCount = () => {
  const { status } = useSession();
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const setDailyUserCount = trpc.useMutation(["fs.dailyUser.incrementVisit"]);

  useEffect(() => {
    if (status === "authenticated" && (userId || resume?.id)) {
      setDailyUserCount.mutate({
        userId: userId ?? resume?.id,
      });
    }
  }, [status, userId, resume]);
};

export default useDailyUserCount;
