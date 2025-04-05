import { StarIcon } from "@heroicons/react/solid";
import { profileResumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const StarResume = () => {
  const router = useRouter();
  const { handle } = router.query;
  const [userId] = useRecoilState(userIdState);
  const [resume, setResume] = useRecoilState(profileResumeState);
  const t = useTranslations("PersonalSection");
  const shortNumber = require("short-number");

  const { data: ratings, refetch } = trpc.useQuery([
    "fs.rating.getRating",
    { id: userId, handle: handle! as string },
  ]);
  const [hasRated, setHasRated] = useState<boolean>(true);
  const setToken = trpc.useMutation(["fs.notification.starNotification"]);

  const setRating = trpc.useMutation(["fs.rating.setRating"], {
    onSuccess: () => {
      return refetch();
    },
  });

  const delRating = trpc.useMutation(["fs.rating.deleteRating"], {
    onSuccess: () => {
      return refetch();
    },
  });

  useEffect(() => {
    if (resume) {
      setResume({
        ...resume,
        rating: ratings?.count,
      });
    }
  }, [ratings?.count]);

  return (
    <div className="flex items-center gap-1 ">
      <div
        className="app-bar-btn text-sm py-1 gap-2"
        onClick={() => {
          if (ratings?.currentUser === 0) {
            setToken.mutate({
              handle: handle! as string,
              userId,
            });
            setRating.mutate(
              {
                handle: handle! as string,
                id: userId,
                count: ratings?.count,
              },
              {
                onSuccess: () => {
                  return refetch();
                },
              }
            );
            return;
          }

          if (ratings?.currentUser === 1) {
            delRating.mutate(
              {
                handle: handle! as string,
                id: userId,
                count: ratings?.count,
              },
              {
                onSuccess: () => {
                  return refetch();
                },
              }
            );
          }

          setHasRated(!hasRated);
        }}
      >
        <StarIcon
          className={`w-4 ${ratings?.currentUser === 1 && "text-yellow-500"} `}
        />
        <span className="hidden md:block">
          {ratings?.currentUser === 1 ? t("starred") : t("star")}
        </span>
        {ratings?.count && (
          <span className="hidden md:flex bg-gray-200 rounded-full p-1 w-5 h-5 items-center justify-center">
            {shortNumber(ratings?.count)}
          </span>
        )}
      </div>
    </div>
  );
};

export default StarResume;
