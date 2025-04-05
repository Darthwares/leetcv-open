import {
  ChartBarIcon,
  DocumentTextIcon,
  PencilAltIcon,
  RefreshIcon,
  StatusOnlineIcon,
  LightBulbIcon,
  ChatAlt2Icon,
} from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { AiSvg, ColleaguesSvg, CoverLetterSvg } from "@components/svg";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mobileMenuSidebar, resumeState } from "@state/state";
import { useProgressPercent } from "@utils/progressPercent";
import { isValidEmailDomain } from "@constants/defaults";

const FeaturesOptions = () => {
  const router = useRouter();
  const t = useTranslations("Appbar");
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);
  const { result } = useProgressPercent();
  const [resume] = useRecoilState(resumeState);
  const isEmailValid = isValidEmailDomain(resume.email);

  const sideBarOptions = [
    {
      name: t("dashboard"),
      icon: <ChartBarIcon />,
      onClick: () => {
        router.push("/s/dashboard");
      },
    },
    {
      name: t("aiResume"),
      icon: <AiSvg />,
      onClick: () => {
        router.push("/s/aiResume");
      },
    },
    {
      name: t("convertResume"),
      icon: <RefreshIcon />,
      onClick: () => {
        router.push("/s/convert");
      },
    },
    {
      name: t("yourResume"),
      icon: <DocumentTextIcon />,
      resumePercentage: result,
      onClick: () => {
        router.push("/s/resume");
      },
    },
    {
      name: t("editor"),
      icon: <PencilAltIcon />,
      onClick: () => {
        router.push("/s/resumeEditor");
      },
    },
    {
      name: t("coverLetter"),
      icon: <CoverLetterSvg />,
      onClick: () => {
        router.push("/s/coverLetter");
      },
    },
    ...(isEmailValid
      ? [
          {
            name: t("colleagues"),
            icon: <ColleaguesSvg />,
            onClick: () => {
              router.push("/s/colleagues");
            },
          },
        ]
      : []),
    {
      name: t("messages"),
      icon: <ChatAlt2Icon />,
      onClick: () => {
        router.push("/s/messages");
      },
    },
    {
      name: t("resumeIdeas"),
      icon: <LightBulbIcon />,
      onClick: () => {
        router.push("/s/resumeIdeas");
      },
    },
    {
      name: t("reviews"),
      icon: <StatusOnlineIcon />,
      onClick: () => {
        router.push("/s/reviews");
      },
    },
  ];

  let color = "";
  switch (true) {
    case result < 56:
      color = "text-red-500 bg-red-50";
      break;
    case result >= 56 && result <= 80:
      color = "text-orange-500 bg-orange-50";
      break;
    default:
      color = "text-green-500 bg-green-50";
      break;
  }

  return (
    <div
      className="flex flex-col gap-4 mt-4 text-gray-700 bg-white dark:bg-slate-800/40 pl-4 py-4 pr-3 rounded-lg shadow"
      data-testid="featuresOptions"
    >
      {sideBarOptions.map((option, i) => (
        <button
          key={option.name}
          onClick={() => {
            option.onClick();
            setIsMobileMenuSidebarOpen(false);
          }}
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
            {option.resumePercentage && (
              <span
                className={`text-xs font-medium py-1 px-3 rounded-full ${color}`}
              >
                {option.resumePercentage}% Completed
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default FeaturesOptions;
