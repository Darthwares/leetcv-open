import { ChevronUpIcon } from "@heroicons/react/solid";
import ProjectForm from "./projectForm";
import { DuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import SvgDragIcon from "../svgDragIcon";
import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as guid } from "uuid";
import {
  openLastProjectState,
  openProjectAttestSidebarState,
  resumeState,
} from "@state/state";
import { useCallback, useState } from "react";
import { Project } from "data/models/Project";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "@components/deleteModal";
interface ProjectListProps {
  project: Project;
  id: number;
}
export default function ProjectList({ project, id }: ProjectListProps) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastProject] = useRecoilState(openLastProjectState);
  const [openProjectModel, setOpenProjectModel] = useState(false);
  const setOpenProjectAttestModel = useSetRecoilState(
    openProjectAttestSidebarState
  );

  const handleDelete = useCallback(async () => {
    const newList = resume?.projects?.filter((item: Project) => {
      if (item.id != resume?.projects?.[id]["id"]) {
        return item;
      }
    });
    if (resume) {
      setResume({
        ...resume,
        projects: newList,
      });
      toast.success(t("deletedProject"));
    }

    const folderPath = `/${resume.id}/projects/${project.name}`;

    if (project?.uploadedImages?.length! > 0) {
      await fetch("/api/deleteImages/deleteFolders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          folderPath,
        }),
      })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    }
  }, [resume?.projects, resume]);

  const cloneProject = () => {
    try {
      const newProjectId = guid();
      const clonedProject = { ...project, id: newProjectId };

      if (resume) {
        setResume({
          ...resume,
          projects: [...resume.projects, clonedProject],
        });
        toast.success(`'${project.name}' ${t("cloneSuccess")}`);
      }
    } catch (error) {
      toast.error(t("errorClone"));
    }
  };

  return (
    <div key={project.id} className="w-full">
      <Disclosure defaultOpen={openLastProject}>
        {({ open }: { open: boolean }) => (
          <div data-testid={`accordion-${id}`}>
            <Disclosure.Button
              className="dialog mt-[6px]"
              onClick={() => {
                if (project && !project.uploadedImages) {
                  const newProject = {
                    ...project,
                    uploadedImages: [],
                  };
                  const newProjects = resume.projects.map((p: Project) =>
                    p.id === project.id ? newProject : p
                  );
                  setResume((prevResume) => ({
                    ...prevResume,
                    projects: newProjects,
                  }));
                }
                setOpenProjectAttestModel((prevOpenState) => ({
                  ...prevOpenState,
                  [project.id]: false,
                }));
              }}
            >
              <span
                className="px-5 flex space-x-2"
                data-testid={`project-title-${id}`}
                title={t("projectTitle")}
              >
                <span className="drag-icon pt-0.5 md:pt-0">
                  <SvgDragIcon />
                </span>
                <span className="capitalize">{project.name}</span>
              </span>
              <span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } chero-Icon1`}
                />
              </span>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full text-sm rounded-b mb-4 pt-1">
              <ProjectForm project={project} />
              <div className="w-full justify-center items-center flex gap-6">
                <button
                  className="app-bar-btn flex justify-center text-gray-500 border border-gray-300 md:gap-2 text-sm p-2 mt-4"
                  data-testid={`cloneBtn-${id}`}
                  role="button"
                  onClick={cloneProject}
                >
                  <DuplicateIcon
                    className={`w-5 h-5`}
                    data-testid={`cloneIcon-${id}`}
                  />
                  <span className="hidden md:block">{t("clone")}</span>
                </button>
                <button
                  className="app-bar-btn flex border-red-300 hover:shadow-red-300 hover:ring-1 hover:ring-red-300 hover:border border text-red-500 md:gap-2 text-sm p-2 mt-4"
                  data-testid={`deleteBtn-${id}`}
                  role="button"
                  onClick={() => {
                    setOpenProjectModel(true);
                  }}
                >
                  <TrashIcon
                    className={`trash-icon`}
                    data-testid={`deleteIcon-${id}`}
                  />
                  <span className="hidden md:block">{t("delete")}</span>
                </button>
              </div>
              <DeleteModal
                title={project.name}
                handleDelete={() => handleDelete()}
                open={openProjectModel}
                setOpen={setOpenProjectModel}
              />
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      <ToastContainer />
    </div>
  );
}
