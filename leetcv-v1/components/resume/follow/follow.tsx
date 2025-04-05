import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { profileResumeState, resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import FollowerCount from "./followerCount";

const Follow = ({ isSticky }: any) => {
  const setFollowers = trpc.useMutation(["fs.follower.setFollowers"]);
  const delFollowers = trpc.useMutation(["fs.follower.deleteFollowers"]);
  const router = useRouter();
  const t = useTranslations("PersonalSection");
  const [resume, setResume] = useRecoilState(profileResumeState);
  const [userId] = useRecoilState(userIdState);
  const { handle } = router.query;
  const [userInfo] = useRecoilState(resumeState);

  const followerNotification = trpc.useMutation([
    "fs.notification.followerNotification",
  ]);
  const { data: followers, refetch } = trpc.useQuery(
    ["fs.follower.getFollowers", { id: userId, handle: resume.handle }],
    {
      enabled: !!userId && !!resume.handle,
      refetchOnWindowFocus: false,
    }
  );
  const [hasFollowed, setHasFollowed] = useState<boolean>(true);

  useEffect(() => {
    if (resume) {
      setResume({
        ...resume,
        followers: followers?.count,
      });
    }
  }, [followers?.count]);

  return (
    <div
      className={`${
        isSticky ? "follow-button gap-0.5" : `app-bar-btn text-sm py-1 gap-0.5`
      }  `}
      onClick={() => {
        setHasFollowed(!hasFollowed);
        if (followers?.currentUser === 0) {
          followerNotification.mutate({
            handle: handle! as string,
            userId,
          });
          setFollowers.mutate(
            {
              handle: handle! as string,
              id: userId,
              userHandle: userInfo.handle,
              userImage: userInfo.image!,
              name: userInfo.displayName,
              profession: userInfo.position!,
            },
            {
              onSuccess: () => {
                return refetch();
              },
            }
          );
          return;
        }

        if (followers?.currentUser === 1) {
          delFollowers.mutate(
            {
              handle: handle! as string,
              id: userId,
            },
            {
              onSuccess: () => {
                return refetch();
              },
            }
          );
        }
      }}
    >
      <span>
        {followers?.currentUser === 1 ? (
          <CheckIcon className={`w-4 text-sm`} />
        ) : (
          <PlusIcon className={`w-4 text-sm`} />
        )}
      </span>

      <div className="flex items-center gap-2">
        {!isSticky && (
          <span className="md:flex hidden">
            {followers?.currentUser === 1 ? t("following") : t("follow")}
          </span>
        )}
        <>
          <div className="md:block hidden">
            <FollowerCount follow={followers?.currentUser!} />
          </div>
          <div className="md:hidden block">
            {isSticky && <FollowerCount follow={followers?.currentUser!} />}
          </div>
        </>
      </div>
    </div>
  );
};

export default Follow;
