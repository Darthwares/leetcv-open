import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LightBulbIcon, XIcon } from "@heroicons/react/outline";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeDialogOpenState,
  resumeState,
  tokenCountState,
} from "@state/state";
import { Project } from "data/models/Project";
import { markdownToDraft } from "markdown-draft-js";
import { convertFromRaw, EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import { useTranslations } from "next-intl";
import GenerateButton from "./generateButton";
import { Experience } from "data/models/Experience";
import { trpc } from "@utils/trpc";
import BecomePro from "@components/becomePro";
import { useSession } from "next-auth/react";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function OpenAIDrawer(props: any) {
  const { status } = useSession();
  const {
    openAIData,
    title,
    experienceDesc,
    experienceTitle,
    property,
    lottieText,
  } = props;
  const t = useTranslations("Dashboard");
  const [open, setOpen] = React.useState(false);
  const setActiveDialogOpen = useSetRecoilState(activeDialogOpenState);
  const [resume, setResume] = useRecoilState(resumeState);
  const [generate, setGenerate] = useState("Generate");
  const [description, setDescription] = React.useState("");
  const [work, setWork] = React.useState((openAIData as Project).work);
  const [impact, setImpact] = React.useState((openAIData as Project).impact);
  const [expDesc, setExpDesc] = React.useState(
    (openAIData as Experience).description
  );
  const [workEditorStates, setWorkEditorStates] = React.useState<EditorState>();
  const [expEditorStates, setExpEditorStates] = React.useState<EditorState>();
  const [impactEditorStates, setImpactEditorStates] =
    React.useState<EditorState>();
  const [tokens] = useRecoilState(tokenCountState);

  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: resume.id, handle: resume.handle }],
    {
      enabled: status === "authenticated",
    }
  );

  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);

  React.useEffect(() => {
    setActiveDialogOpen(open);
  }, [open]);

  React.useEffect(() => {
    if (property === "project") {
      const workMarkDown = `${work}`;
      const workData = markdownToDraft(workMarkDown);
      const workContent = convertFromRaw(workData);
      setWorkEditorStates(EditorState.createWithContent(workContent));
      const impactMarkDown = `${impact}`;
      const impactData = markdownToDraft(impactMarkDown);
      const impactContent = convertFromRaw(impactData);
      setImpactEditorStates(EditorState.createWithContent(impactContent));
    } else {
      const expMarkDown = `${expDesc}`;
      const expData = markdownToDraft(expMarkDown);
      const expContent = convertFromRaw(expData);
      setExpEditorStates(EditorState.createWithContent(expContent));
    }
  }, [work, impact, expDesc]);

  const handleSave = React.useCallback(() => {
    setGenerate("Generate");
    if (property === "project") {
      setResume({
        ...resume,
        projects: resume.projects.map((p) => {
          if (p.id === openAIData.id) {
            return { ...p, work, impact };
          }
          return p;
        }),
      });
    } else {
      setResume({
        ...resume,
        experiences: resume?.experiences?.map((exp) => {
          if (exp.id === openAIData.id) {
            return { ...exp, description: expDesc };
          }
          return exp;
        }),
      });
    }

    setOpen(false);
    clearAllText();
  }, [property, openAIData, work, impact, expDesc]);

  const handleRefine = React.useCallback(async () => {
    if (tokens < 200) {
      return;
    }

    if (property === "project") {
      setGenerate("Refine");
      try {
        const resp = await fetch("/api/openai/generateWorkImpact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            descriptionText: description,
            title,
          }),
        });
        const response = await resp.json();
        setWork(response.work);
        setImpact(response.impact);

        let newTokenCount = tokens - 200;

        return setTokens.mutate(
          {
            count: newTokenCount,
            handle: resume.handle,
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
    } else {
      setGenerate("Refine");
      const resp = await fetch("/api/openai/generateExperienceWork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descriptionText: description,
          title,
        }),
      });
      const response = await resp.json();
      setExpDesc(response.experienceDescription);

      let newTokenCount = tokens - 100;

      return setTokens.mutate(
        {
          count: newTokenCount,
          handle: resume.handle,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
  }, [property, description, tokens]);

  const clearAllText = () => {
    setDescription(``);
    setWork(``);
    setImpact(``);
    setExpDesc(``);
    setGenerate("Generate");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex w-full justify-end">
        <button
          className="bg-indigo-600 flex max-w-fit inputForm text-white text-sm rounded-md px-4 py-1"
          onClick={() => {
            setOpen(!open);
            clearAllText();
          }}
        >
          <span className="max-w-fit flex gap-2 font-medium items-center text-sm">
            <LightBulbIcon className="w-7 animate-pulse" />
            <span>{t("openAiGenerator")}</span>
          </span>
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10 sm:pl-0">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form
                      onSubmit={handleSubmit}
                      className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
                    >
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-indigo-700 py-6 px-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-lg font-medium text-white capitalize">
                              {title}
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setOpen(false)}
                              >
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300">
                              {experienceDesc}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-6 pt-6 pb-5">
                              <div>
                                <label
                                  htmlFor="description"
                                  className="block text-sm font-medium text-gray-900"
                                >
                                  {experienceTitle}
                                </label>
                                <div className="mt-1">
                                  <textarea
                                    id="description"
                                    name="description"
                                    cols={40}
                                    rows={7}
                                    value={description}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    onChange={(e) =>
                                      setDescription(e.target.value)
                                    }
                                  />
                                  <div className="py-2 mb-5 pr-3">
                                    {tokens === 0 && (
                                      <BecomePro width="w-full" />
                                    )}
                                  </div>
                                  {generate === "Refine" &&
                                    (work || expDesc) && (
                                      <div className="h-[30rem] mt-1 overflow-y-scroll border border-gray-300 py-2 rounded-md w-full">
                                        {work && (
                                          <>
                                            <div className="work-impact mt-5">
                                              <Editor
                                                editorState={workEditorStates}
                                                readOnly
                                                editorClassName="mt-5"
                                              />
                                            </div>
                                            <div className="work-impact mt-5">
                                              <Editor
                                                editorState={impactEditorStates}
                                                readOnly
                                                editorClassName="mt-5"
                                              />
                                            </div>
                                          </>
                                        )}
                                        {expDesc && (
                                          <div className="work-impact mt-5">
                                            <Editor
                                              editorState={expEditorStates}
                                              readOnly
                                              editorClassName="mt-5"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  {generate === "Refine" &&
                                    !expDesc &&
                                    !work && (
                                      <div className="max-w-lg flex items-center justify-center">
                                        <div className="w-60 flex flex-col justify-center items-center mt-20">
                                          <lottie-player
                                            src="/assets/lottie/ai.json"
                                            background="white"
                                            speed="1"
                                            loop
                                            autoplay
                                          ></lottie-player>
                                          <p className="text-sm text-gray-500 ml-4">
                                            {lottieText}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {
                        <div className="flex flex-shrink-0 justify-between px-6 py-4">
                          {generate === t("refine") &&
                            (work || expDesc) &&
                            tokens > 200 && (
                              <GenerateButton
                                generate={t("refine")}
                                description={description}
                                setWork={setWork}
                                setImpact={setImpact}
                                setExpDesc={setExpDesc}
                                handleRefine={handleRefine}
                              ></GenerateButton>
                            )}
                          {generate === t("generate") && (
                            <GenerateButton
                              generate={t("generate")}
                              description={description}
                              setWork={setWork}
                              setImpact={setImpact}
                              setExpDesc={setExpDesc}
                              handleRefine={handleRefine}
                            ></GenerateButton>
                          )}
                          {(work || expDesc) && (
                            <button
                              type="button"
                              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 w-32"
                              onClick={handleSave}
                            >
                              {t("accept")}
                            </button>
                          )}
                        </div>
                      }
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
