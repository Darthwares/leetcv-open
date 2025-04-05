import { UserGroupIcon } from "@heroicons/react/outline";
import { mobileMenuSidebar } from "@state/state";
import React, { ReactNode } from "react";
import { useSetRecoilState } from "recoil";

type FollowerFollowingOptions = {
  name: string;
  icon: ReactNode;
  onClick: () => void;
  count: number;
};

type FollowersFollowingProps = {
  followersFollowingList: FollowerFollowingOptions[];
};

const FollowersFollowing = ({
  followersFollowingList,
}: FollowersFollowingProps) => {
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);

  return (
    <div
      className="flex items-center justify-between gap-4 mt-4"
      data-testid="followers-Following"
    >
      {followersFollowingList.map((user, i) => (
        <button
          className="flex flex-1 items-center bg-white dark:bg-slate-800/40 justify-center gap-3 rounded-lg shadow py-2.5"
          key={user.name}
          onClick={() => {
            user.onClick();
            setIsMobileMenuSidebarOpen(false);
          }}
          data-testid={`button-${i}`}
        >
          <div className="bg-indigo-50 dark:bg-white rounded-lg w-[46px] h-[46px] flex items-center justify-center">
            <UserGroupIcon className="w-[26px] h-[26px] text-indigo-500 dark:text-gray-700" />
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-medium" data-testid={`name-${i}`}>
              {user.name}
            </div>
            <div
              className={`flex justify-start text-lg font-medium`}
              data-testid={`count-${i}`}
            >
              {user.count}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FollowersFollowing;
