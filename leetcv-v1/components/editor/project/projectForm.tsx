import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Project } from "data/models/Project";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import {
  noTokenErrorState,
  openProjectAttestSidebarState,
  projectState,
  resumeState,
  tokenCountState,
} from "@state/state";
import { Field, projectFields } from "../fieldMap";
import ChipForm from "../chip/chipForm";
import Tooltip from "@components/tooltip";
import MandatoryField from "../mandatoryField";
import MultipleImageUploader from "./multipleImageUpload";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import ReusableSidebar from "@components/reusableSideBar";
import RequestAttestationModel from "@components/attestation/requestAttestationModel";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
import { trpc } from "@utils/trpc";
import RefineText from "@components/refineText";
import { useSession } from "next-auth/react";
const RichEditor = dynamic(() => import("../../richEditor"), {
  ssr: false,
});
export interface ProjectFormProps {
  project: Project;
}
export default function ProjectForm({ project }: ProjectFormProps) {
  const { status } = useSession();
  const t = useTranslations("Dashboard");
  const tAttest = useTranslations("Attestation");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeProject, setActiveProject] = useState<Project>(project);
  const setProjectState = useSetRecoilState(projectState);
  const setNoTokenErrorState = useSetRecoilState(noTokenErrorState);
  const [openProjectAttestModel, setOpenProjectAttestModel] = useRecoilState(
    openProjectAttestSidebarState
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [text, setText] = useState("");
  const [tokens] = useRecoilState(tokenCountState);
  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);
  const [projectWork, setProjectWork] = React.useState(project.work);
  const [generate, setGenerate] = useState("Generate");
  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userInfo.id, handle: userInfo.handle }],
    {
      enabled: status === "authenticated",
    }
  );
  if (tokens < 200) {
    setNoTokenErrorState(true);
  }
  const handleCheckboxChange = (e: any) => {
    const { checked } = e.target as HTMLInputElement;
    if (activeProject) {
      setActiveProject({ ...activeProject, ["checked"]: checked });
    }
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        projects: userInfo.projects?.map((proj: Project) => {
          if (proj.id === activeProject?.id) {
            return { ...proj, ["checked"]: checked };
          }
          return proj;
        }),
      });
    }
  };
  const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value === undefined ||
      e.target.value === null ||
      (e.target.value === "" &&
        projectFields(activeProject).find(
          (field) => field.fieldName === e.target.id
        )?.mandatory)
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;
      if (activeProject) {
        setActiveProject({ ...activeProject, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          projects: userInfo.projects?.map((proj: Project) => {
            if (proj.id === activeProject?.id) {
              return { ...proj, [id]: value };
            }
            return proj;
          }),
        });
      }
    }
  };
  const handleRefine = async () => {
    try {
      if (tokens < 200) {
        setNoTokenErrorState(true);
        return;
      }
      setText("");
      setGenerate("Refine");

      const resp = await fetch("/api/openai/generateWorkImpact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: generate,
          descriptionText: project.work,
        }),
      });
      const response = await resp.json();

      setText(response.work);
      setProjectWork(response.work);

      let updatedTokenCount = tokens - 200;

      return setTokens.mutate(
        {
          count: updatedTokenCount,
          handle: userInfo.handle,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleAcceptSave = React.useCallback(() => {
    setGenerate("Generate");
    setNoTokenErrorState(false);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        projects: userInfo.projects.map((p) => {
          if (p.id === activeProject.id) {
            return { ...p, work: projectWork };
          }
          return p;
        }),
      });
    }
    setText("");
  }, [project.work, projectWork]);
  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 rounded-lg transition duration-700 ease-in-out">
      <div className="flex gap-5 p-3 w-full justify-between">
        <div className="w-full md:mt-4">
          <div data-testid={`projects`}>
            {activeProject &&
              projectFields(activeProject).map((item: Field, idx: number) => {
                let data = item.defaultValue
                  ?.toString()
                  .toLowerCase()
                  .split(",");
                let unique = [...new Set(data)];
                return (
                  <div
                    className={` ${
                      item.fieldName === "end" &&
                      item.defaultValue === "true" &&
                      "md:pt-0 md:pb-2"
                    } ${
                      item.fieldName === "description" && "md:pb-3 md:pt-0"
                    } p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                    key={item.fieldName}
                    data-testid={`projectField-${idx}`}
                  >
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                      <label
                        htmlFor={item.title}
                        className="text-sm font-medium flex gap-1 items-center text-gray-700"
                        data-testid={`label-${idx}`}
                      >
                        <MandatoryField item={item} />
                        <span>
                          {item.fieldName === "skills" && (
                            <>
                              <div className="flex items-center justify-center md:justify-start">
                                <Tooltip
                                  tip={t("projectSkillsTips")}
                                  width={"w-48 md:w-64"}
                                />
                              </div>
                            </>
                          )}
                        </span>
                      </label>
                      <div
                        className="mt-1 sm:mt-0 sm:col-span-2"
                        data-testid={`name-${idx}`}
                      >
                        {item.fieldName === t("work") && (
                          <>
                            <RichEditor
                              placeholder={t("workDetail")}
                              markdownData={project}
                              property="work"
                            />
                            <RefineText
                              generate={generate}
                              tokens={tokens}
                              text={text}
                              setText={setText}
                              selectText={projectWork}
                              handleRefine={handleRefine}
                              handleAcceptSave={handleAcceptSave}
                              t={t}
                            />
                          </>
                        )}
                        {item.fieldName === "end" && (
                          <>
                            <div className="">
                              {item.defaultValue !== "true" && (
                                <div>
                                  <input
                                    id={item.fieldName}
                                    name={item.fieldName}
                                    data-testid={`input-${idx}`}
                                    type={item.type ?? "text"}
                                    autoComplete={item.autoComplete}
                                    defaultValue={unique}
                                    placeholder={item.defaultValue as string}
                                    onBlur={handleBlur}
                                    onChange={(e) =>
                                      handleError(
                                        e,
                                        projectFields(activeProject).find(
                                          (field) =>
                                            field.fieldName === e.target.id
                                        )?.mandatory,
                                        setFieldErrors
                                      )
                                    }
                                    spellCheck={true}
                                    className="inputForm rounded-md border-gray-300 text-sm"
                                  />
                                  <ErrorMessage
                                    error={fieldErrors[item.fieldName]}
                                    id={item.fieldName}
                                  />
                                </div>
                              )}
                              <div
                                className={`${
                                  item.defaultValue === "true" && ""
                                } flex pt-2 items-center space-x-2`}
                              >
                                <input
                                  type="checkbox"
                                  checked={item.defaultValue === "true"}
                                  onChange={handleCheckboxChange}
                                  className="inputForm rounded-md border-gray-300 text-sm"
                                />
                                <span className="text-gray-700 font-medium">
                                  {t("present")}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                        {item.type !== "textarea" &&
                          item.fieldName !== "skills" &&
                          item.fieldName !== "description" &&
                          item.fieldName !== "attestations" &&
                          item.multiple !== true &&
                          item.fieldName !== "end" && (
                            <>
                              <input
                                autoFocus={item.fieldName === "name"}
                                id={item.fieldName}
                                name={item.fieldName}
                                data-testid={`input-${idx}`}
                                type={item.type ?? "text"}
                                autoComplete={item.autoComplete}
                                defaultValue={unique}
                                placeholder={item.defaultValue as string}
                                onBlur={handleBlur}
                                onChange={(e) =>
                                  handleError(
                                    e,
                                    projectFields(activeProject).find(
                                      (field) => field.fieldName === e.target.id
                                    )?.mandatory,
                                    setFieldErrors
                                  )
                                }
                                spellCheck={true}
                                className="inputForm rounded-md border-gray-300 text-sm"
                              />
                              <ErrorMessage
                                error={fieldErrors[item.fieldName]}
                              />
                            </>
                          )}
                        {item.type !== "textarea" &&
                          item.fieldName !== "skills" &&
                          item.type === "file" && (
                            <MultipleImageUploader project={project} />
                          )}
                        {item.fieldName === "skills" && (
                          <ChipForm
                            project={project}
                            itemList={project.skills}
                            property="skills"
                            isProject={"true"}
                            placeholder={t("projectSkills")}
                          />
                        )}
                        {item.fieldName === "attestations" && (
                          <>
                            <div className="w-full sm:grid sm:grid-cols-3 sm:gap-10 sm:items-start">
                              <div className="sm:mt-0 sm:col-span-2 ">
                                <div className="flex items-center space-x-5">
                                  <button
                                    type="button"
                                    className={`px-4 py-1.5 flex gap-1 items-center rounded-md cursor-pointer overflow-hidden duration-300 ease-out text-white bg-indigo-600`}
                                    onClick={() => {
                                      setProjectState(project);
                                      setOpenProjectAttestModel(
                                        (prevOpenState) => ({
                                          ...prevOpenState,
                                          [project.id]: true,
                                        })
                                      );
                                    }}
                                  >
                                    <PaperAirplaneIcon className="rotate-45 transform h-4 w-4 text-white-500 hover:text-white-800 cursor-pointer" />
                                    {t("request-Attestations")}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            <ReusableSidebar
              open={openProjectAttestModel[project.id]}
              setOpen={(newState) => {
                setOpenProjectAttestModel((prevOpenState) => ({
                  ...prevOpenState,
                  [project.id]: newState,
                }));
              }}
              title={tAttest("sentRequestForAttestation")}
              description={tAttest("projectValidation")}
            >
              <RequestAttestationModel project={project} />
            </ReusableSidebar>
          </div>
        </div>
      </div>
    </div>
  );
}
