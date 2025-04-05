import React, { useEffect, useState } from "react";
import {
  LogoutIcon,
  DocumentTextIcon,
  PaperClipIcon,
  LockClosedIcon,
  GiftIcon,
} from "@heroicons/react/outline";
import PrivacySettings from "@components/settings/privacySettings";
import PrivateLink from "./privateLink";
import SyncApp from "./syncApp";
import Unsubscribe from "./unsubscribe";
import Logout from "@components/logout";
import { useRecoilState } from "recoil";
import { resumeState, userIdState } from "@state/state";
import TokenManager from "@components/tokenManager";
import useMessengerToken from "@lib/firebase/setMessenger";
import { subscriptionPlanState } from "@state/state";
import { DatabaseSvg, SyncSvg, UnsubscribeSvg } from "@components/svg";
import { useTranslations } from "next-intl";
import RecoverOldAccount from "./recoverOldAccount";
import ActionNeededCard from "@components/actionNeededCard";
import { useSession } from "next-auth/react";
import ReferralCode from "./referral/referralCode";
import { useRouter } from "next/router";
import { classNames } from "@utils/classNames";
import SettingDropdown from "./settingDropdown";
import ClaimUserHandle from "./claimUserHandle";

export interface SettingOption {
  name: string;
  icon: React.ReactNode;
  description: string;
  planUserDescription?: string;
  component: React.ReactNode;
  className?: string;
}

const useSettingOptions = (
  t: any,
  includeAddRecovery: boolean = true
): SettingOption[] => {
  const settingOptions: SettingOption[] = [
    {
      name: t("resumePrivacy"),
      icon: <LockClosedIcon />,
      description: t("resumePrivacyDescription"),
      component: <PrivacySettings />,
    },
    {
      name: t("claimHandle"),
      icon: <DocumentTextIcon />,
      description: t("claimHandleDescription"),
      component: <ClaimUserHandle />,
    },
    {
      name: t("recoverOldAccount"),
      icon: <DatabaseSvg />,
      description: t("recoverOldAccountDesc"),
      component: <RecoverOldAccount />,
    },
    {
      name: t("referralCode"),
      icon: <GiftIcon />,
      description: t("referralCodeDescription"),
      component: <ReferralCode />,
    },
    {
      name: t("privateLink"),
      icon: <PaperClipIcon />,
      description: t("privateLinkDescription"),
      component: <PrivateLink />,
    },
    {
      name: t("syncLeetCv"),
      icon: <SyncSvg />,
      description: t("syncDescription"),
      component: <SyncApp />,
    },
    {
      name: t("unsubscribe"),
      icon: <UnsubscribeSvg />,
      description: t("unsubscribeDescription"),
      component: <Unsubscribe />,
    },
    {
      name: t("signOut"),
      icon: <LogoutIcon />,
      component: <Logout />,
      className: "hidden lg:flex",
    },
  ].filter(Boolean) as SettingOption[];

  return settingOptions;
};

const Settings = () => {
  const t = useTranslations("Settings");
  const [userId] = useRecoilState(userIdState);
  const { data: session } = useSession();

  const shouldUseSetting = process.env
    .NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN!.split(",")
    .some((domain) => session?.user?.email!.endsWith(domain));

  const settings: SettingOption[] = useSettingOptions(t, shouldUseSetting);
  const currentItem = settings.find(
    (item: SettingOption) => item.name === t("resumePrivacy")
  );
  const [selected, setSelected] = useState<SettingOption>(currentItem!);
  const [plan] = useRecoilState(subscriptionPlanState);
  const [resume] = useRecoilState(resumeState);
  const { targetToken } = useMessengerToken();
  const router = useRouter();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const handleParam = urlParams.get("handle");
  const referParam = urlParams.get("refer");

  useEffect(() => {
    if (handleParam && referParam) {
      const couponCodeItem = settings.find(
        (item) => item.name === t("referralCode")
      );
      setSelected(couponCodeItem!);
    }
  }, []);

  const handleClick = (name: string) => {
    const newSelectedItem = settings.find((item) => item.name === name);
    setSelected(newSelectedItem!);
    if (handleParam && referParam) {
      router.push("/s/settings/privacy");
    }
  };

  return (
    <>
      <TokenManager
        userId={userId}
        resumeDisplayName={resume.displayName}
        targetToken={targetToken!}
      />
      <SettingDropdown
        selected={selected}
        setSelected={setSelected}
        settings={settings}
      />

      <div className="mx-auto max-w-7xl md:flex md:gap-x-4 lg:gap-x-6 md:mt-14 lg:mt-0 lg:px-2">
        <aside className=" py-4 md:block md:w-64 lg:flex-none lg:border-0 lg:py-12 hidden z-10">
          <nav className="flex-none px-4 sm:px-6 md:px-0">
            <ul
              role="list"
              className="flex gap-x-3 gap-y-2 whitespace-nowrap md:flex-col"
            >
              {settings
                .filter(
                  (item: SettingOption) =>
                    !(
                      item.name === "Unsubscribe" &&
                      plan !== "Pro" &&
                      plan !== "Premium"
                    )
                )
                .map((item: SettingOption) => (
                  <button
                    onClick={() => handleClick(item.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClick(item.name);
                      }
                    }}
                    key={item.name}
                    className={classNames(
                      item.name === selected?.name
                        ? "bg-gray-50 text-indigo-600 border-l-4 border-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50 border-l-4 border-transparent",
                      `group flex gap-x-3 ${item.className} rounded-sm py-2 pl-2 pr-3 text-sm leading-6 font-semibold cursor-pointer`
                    )}
                  >
                    <div
                      className={classNames(
                        item.name === selected?.name
                          ? "text-indigo-600"
                          : "text-gray-500 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                    >
                      {item.icon}
                    </div>
                    {item.name}
                  </button>
                ))}
            </ul>
          </nav>
        </aside>

        <main className="px-4 min-h-[55vh] sm:min-h-[50vh] pt-8 sm:px-6 md:px-0 lg:flex-auto md:pl-7 lh:pl-0 lg:px-8 md:pt-4 lg:pt-7 md:border-l-[1px] md:border-gray-200 lg:mt-6">
          <div className="mx-auto max-w-2xl space-y-2 md:space-y-4 xl:space-y-6 lg:mx-0 lg:max-w-none">
            {selected?.component ? (
              <>
                <div className="text-xl text-gray-700 font-bold hidden md:block">
                  <p>{selected.name}</p>
                </div>
                <div className="flex flex-col gap-y-8">
                  <div className="text-gray-500">
                    {selected.name === "Available Tokens" ? (
                      <p>
                        {plan === "Pro" || plan === "Premium"
                          ? selected.planUserDescription
                          : selected.description}
                      </p>
                    ) : (
                      <>
                        {selected.name === t("addSecondaryEmail") ||
                        selected.name === t("recoverOldAccount") ? (
                          <ActionNeededCard
                            cardDescription={selected.description}
                          />
                        ) : (
                          <p>{selected.description}</p>
                        )}
                      </>
                    )}
                  </div>
                  <div key={selected.name} className="text-gray-600">
                    {selected.component}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </main>
      </div>
    </>
  );
};

export default Settings;
