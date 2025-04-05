import {
  openProjectIdeasSidebarState,
  resumeColorState,
  resumeFontState,
  resumeState,
  tokenCountState,
} from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { RecommendationSvg } from "@components/svg";
import { toast } from "react-toastify";
import { trpc } from "@utils/trpc";

type ResumeSectionHeaderProps = {
  title: string;
};

const colorClasses = {
  slate: "bg-slate-50 ",
  gray: "bg-gray-50 ",
  pink: "bg-pink-50 ",
  rose: "bg-rose-50 ",
  red: "bg-red-50 ",
  orange: "bg-orange-50 ",
  yellow: "bg-yellow-50 ",
  lime: "bg-lime-50 ",
  green: "bg-green-50 ",
  emerald: "bg-emerald-50 ",
  teal: "bg-teal-50 ",
  cyan: "bg-cyan-50 ",
  sky: "bg-sky-50 ",
  blue: "bg-blue-50 ",
  indigo: "bg-indigo-50 ",
  violet: "bg-violet-50 ",
  purple: "bg-purple-50 ",
  fuchsia: "bg-fuchsia-50 ",
};

const ResumeSectionHeader = ({ title }: ResumeSectionHeaderProps) => {
  const [selectedColor] = useRecoilState(resumeColorState);
  const [selectedFont] = useRecoilState(resumeFontState);
  const setOpenSidebar = useSetRecoilState(openProjectIdeasSidebarState);
  const [tokens] = useRecoilState(tokenCountState);
  const [userInfo] = useRecoilState(resumeState);
  const t = useTranslations("ProjectData");
  const isProject =
    location.pathname === "/s/resume" && title === t("project");

  const { data: projectIdeas } = trpc.useQuery(
    ["fs.projectIdeas.getProjectIdeas", { id: userInfo.id }],
    {
      enabled: location.pathname === "/s/resume",
    }
  );

  const handleCheck = () => {
    if (!projectIdeas && tokens < 500) {
      toast.error(t("notEnoughToken"));
      return;
    }
    setOpenSidebar(true);
  };

  return (
    <div
      className={`resume-section-header ${
        isProject ? "flex justify-between items-center" : ""
      }`}
    >
      <p
        className={`${
          colorClasses[selectedColor as keyof typeof colorClasses]
        } ${selectedFont.className}`}
      >
        {title}
      </p>
      {isProject && (
        <button
          className="print:hidden relative text-sm p-1 app-bar-btn border border-indigo-600 rounded-md mx-0 group"
          onClick={handleCheck}
        >
          <span className="relative flex items-center text-xs text-indigo-600">
            <RecommendationSvg className="w-6 h-6 sm:w-8 sm:h-8" />
          </span>
          <span className="absolute whitespace-nowrap bottom-0.5 right-[3rem] scale-0 transition-all rounded bg-gray-800 px-3 py-2 text-xs text-white group-hover:scale-100">
            {t("projectIdeas")}
          </span>
        </button>
      )}
    </div>
  );
};

export default ResumeSectionHeader;
