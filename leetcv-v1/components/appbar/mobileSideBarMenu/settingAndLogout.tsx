import { CogIcon, LogoutIcon } from "@heroicons/react/outline";
import { mobileMenuSidebar, signOutModelOpen } from "@state/state";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { useSetRecoilState } from "recoil";

const SettingAndLogout = () => {
  const router = useRouter();
  const t = useTranslations("Appbar");
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);
  const setIsSignOutModelOpen = useSetRecoilState(signOutModelOpen);

  const options = [
    {
      name: t("settings"),
      icon: <CogIcon />,
      onClick: () => {
        router.push("/s/settings/privacy");
        setIsMobileMenuSidebarOpen(false);
      },
    },
    {
      name: t("signOut"),
      icon: <LogoutIcon />,
      onClick: () => {
        setIsSignOutModelOpen(true);
      },
    },
  ];

  return (
    <div
      className="flex flex-col gap-4 mt-4 text-gray-700 bg-white dark:bg-slate-800/40 pl-4 py-4 pr-3 rounded-lg shadow"
      data-testid="setting-logout-container"
    >
      {options.map((option, i) => (
        <button
          key={option.name}
          onClick={option.onClick}
          className="w-full flex items-center justify-between"
          data-testid={`button-${i}`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-indigo-50 dark:bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <div
                className="w-5 h-5 text-indigo-500 dark:text-gray-700"
                data-testid={`icon-${i}`}
              >
                {option.icon}
              </div>
            </div>
            <div
              className="text-sm font-medium dark:text-gray-100"
              data-testid={`name-${i}`}
            >
              {option.name}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SettingAndLogout;
