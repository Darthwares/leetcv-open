import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import {
  convertFirestoreTimestampToDate,
  getDifferenceInDays
} from "@constants/defaults";
import { useRecoilState, useSetRecoilState } from "recoil";
import { have90daysAccessState, userIdState } from "@state/state";

const FreePortfolioAccess = () => {
  const [userId] = useRecoilState(userIdState);
  const { status } = useSession();
  const { data: getEndDate, isLoading: isLoadingEndDate } = trpc.useQuery(
    ["fs.freeAccess.getEndDate", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );
  const [freeAccessDate, setFreeAccessDate] = useState<Date>(new Date());
  const setCanAccess = useSetRecoilState(have90daysAccessState);

  useEffect(() => {
    if (status === "authenticated" && !isLoadingEndDate) {
      if (getEndDate === false) {
        setCanAccess(false);
      } else {
        const endDate = convertFirestoreTimestampToDate(getEndDate);
        setFreeAccessDate(endDate);
        setCanAccess(endDate > new Date());
      }
    }
  }, [getEndDate, isLoadingEndDate, status, userId]);

  return freeAccessDate > new Date()
    ? getDifferenceInDays(new Date(), freeAccessDate)
    : 0;
};

export default FreePortfolioAccess;
