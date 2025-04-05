import { profileResumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";

interface FollowerCountProps {
  follow: number;
}

const FollowerCount = ({ follow }: FollowerCountProps) => {
  const t = useTranslations("PersonalSection");
  const [resume] = useRecoilState(profileResumeState);
  const [userId] = useRecoilState(userIdState);
  const shortNumber = require("short-number");

  const { data: followers } = trpc.useQuery(
    ["fs.follower.getFollowers", { id: userId, handle: resume.handle }],
    {
      enabled: !!userId && !!resume.handle,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <span className={`p-1 text-sm flex items-center`}>
      {follow === 1 && <> {shortNumber(followers?.count)}</>}
      <span className={`${follow === 1 && "pl-1.5"} text-xs md:hidden block`}>
        {follow === 1 ? t("following") : t("follow")}
      </span>
    </span>
  );
};

export default FollowerCount;
