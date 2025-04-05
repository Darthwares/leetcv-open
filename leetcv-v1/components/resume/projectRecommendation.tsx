import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { resumeState, tokenCountState } from "@state/state";
import { trpc } from "@utils/trpc";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import useManageToken from "@lib/helper/useManageToken";

interface ProjectData {
  basic: string[];
  medium: string[];
  hard: string[];
}

const ProjectRecommendation: React.FC = () => {
  const [data, setData] = useState<ProjectData | null>(null);
  const t = useTranslations("ProjectData");
  const [userInfo] = useRecoilState(resumeState);
  const [loading, setLoading] = useState(false);
  const { data: projectIdeas, refetch } = trpc.useQuery([
    "fs.projectIdeas.getProjectIdeas",
    { id: userInfo.id },
  ]);
  const [tokens] = useRecoilState(tokenCountState);
  const setProjectIdeas = trpc.useMutation([
    "fs.projectIdeas.saveProjectIdeas",
  ]);
  const levelsOrder = ["basic", "medium", "hard"] as const;
  const { deductToken } = useManageToken();

  const handleCheck = async () => {
    try {
      if (projectIdeas) {
        setData({
          basic: Array.isArray(projectIdeas.basic) ? projectIdeas.basic : [],
          medium: Array.isArray(projectIdeas.medium) ? projectIdeas.medium : [],
          hard: Array.isArray(projectIdeas.hard) ? projectIdeas.hard : [],
        });
      } else {
        await generateProjectIdeas();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateProjectIdeas = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/openai/getProjectRecmmendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resume: userInfo }),
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const fetchedData: ProjectData = await response.json();

      const completeData: ProjectData = {
        basic: Array.isArray(fetchedData.basic) ? fetchedData.basic : [],
        medium: Array.isArray(fetchedData.medium) ? fetchedData.medium : [],
        hard: Array.isArray(fetchedData.hard) ? fetchedData.hard : [],
      };

      setData(completeData);

      deductToken(500);

      if (completeData) {
        await setProjectIdeas.mutateAsync({
          id: userInfo.id,
          projectIdeas: completeData,
        });
      }

      refetch();
    } catch (error) {
      console.error("Error generating project ideas:", error);
      toast.error(t("failedToGenerate"));
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectIdeas = async () => {
    if (tokens < 500) {
      toast.error(t("notEnoughToken"));
      return;
    }
    await generateProjectIdeas();
  };

  useEffect(() => {
    if (userInfo) {
      handleCheck();
    }
  }, [userInfo]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <div
      data-testid="recommendation"
      className="bg-indigo-50 h-full overflow-y-auto"
    >
      {loading && (
        <div className="h-full w-full p-4 xl:w-4/5 m-auto">
          <lottie-player
            src="/assets/lottie/loading.json"
            background=""
            speed="1"
            loop
            autoplay
            className="bg-gradient-to-r from-indigo-100 to-pink-200"
          />
        </div>
      )}
      {!loading && data && (
        <div className="p-4">
          {levelsOrder.map((level) => {
            const projects = data[level];
            return (
              <div key={level} className="mb-6 text-gray-800">
                <h2 className="text-xl font-semibold mb-3 capitalize">
                  {level}
                </h2>
                <ol className="list-decimal pl-5 text-gray-900">
                  {projects.map((project: string, index: number) => {
                    const [title, description] = project.split(":");
                    return (
                      <li key={index} className="mb-1 text-base">
                        <span className="font-bold">{title}:</span>
                        <span className="text-gray-500">{description}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      )}
      {!loading && data && (
        <div className="flex sticky z-40 bottom-0 bg-white flex-shrink-0 justify-between px-6 py-4">
          <button
            type="button"
            className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 w-32"
            onClick={fetchProjectIdeas}
          >
            {t("regenerate")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectRecommendation;
