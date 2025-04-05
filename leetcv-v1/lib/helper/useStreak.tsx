import { userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

const useStreak = () => {
  const { status } = useSession();
  const [userId] = useRecoilState(userIdState);
  const { data: streakData } = trpc.useQuery(
    ["fs.streak.getStreak", { userId: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  return {
    streakData,
  };
};

export default useStreak;
