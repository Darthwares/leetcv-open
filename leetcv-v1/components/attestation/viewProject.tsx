import { useRecoilState } from "recoil";
import { projectState } from "@state/state";
import { useEffect, useState } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { convertFromRaw, EditorState } from "draft-js";
import { markdownToDraft } from "markdown-draft-js";
import { DateRange } from "@components/resume/dateRange";
import ProjectSkills from "@components/projectSkills";
import ProjectImageCarousel from "@components/editor/project/projectImageCarousel";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default function ViewProject() {
  const [project] = useRecoilState(projectState);
  const [workEditorStates, setWorkEditorStates] = useState<EditorState[]>([]);

  useEffect(() => {
    const workData = markdownToDraft(project.work);
    const workContent = convertFromRaw(workData);
    setWorkEditorStates((states) => [
      ...states,
      EditorState.createWithContent(workContent),
    ]);
  }, []);

  return (
    <div
      className="relative flex flex-col overflow-auto max-h-[500px]"
      data-testid="view-project-container"
    >
      <div className="font-semibold text-left capitalize space-y-2">
        <h2 className="mb-3" data-testid="project-name">
          {project.name}
        </h2>
        {project.company && (
          <p className="text-sm text-gray-500 relative bottom-2">
            {project.company}
          </p>
        )}
        <div
          className={`${project.company ? "bottom-3" : "bottom-2"} relative`}
        >
          <div
            className="md:flex flex-col md:space-x-1 text-sm leading-none dark:text-gray-300 text-gray-500"
            data-testid="project-date-range"
          >
            <DateRange
              id={project.id}
              start={project.start}
              end={project.end}
              checked={project.checked}
              category="viewProject"
            />
          </div>
        </div>
      </div>
      <div className={"flex items-center w-full gap-3 mb-1"}>
        {project?.skills?.length !== 0 && (
          <ProjectSkills skills={[...project.skills]} />
        )}
      </div>
      <span className="text-base font-normal ">
        <div className="showWorkImpact">
          <div
            className="w-full -my-6 md:border-gray-200 px-2 sm:px-2.5"
            data-testid="project-work"
          >
            <span className="text-base text-gray-700 pl-2 px-4 font-normal fontSize editor">
              <Editor editorState={workEditorStates[0]} readOnly />
            </span>
          </div>
        </div>
      </span>
      <div
        className="flex w-full justify-start items-center print:hidden"
        data-testid="project-image-carousel"
      >
        <ProjectImageCarousel
          uniqueUploadedImages={[...new Set(project.uploadedImages)]}
          project={project}
        />
      </div>
    </div>
  );
}
