import { Experience } from "data/models/Experience";
import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  DuplicateIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import SvgDragIcon from "../svgDragIcon";
import ExperienceForm from "./experienceForm";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { openLastExpState, resumeState } from "@state/state";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "@components/deleteModal";
import { v4 as guid } from "uuid";

interface ExperienceListProps {
  experience: Experience;
  id: number;
}
export default function ExperienceList({
  experience,
  id,
}: ExperienceListProps) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastExp] = useRecoilState(openLastExpState);
  const [openExpModel, setOpenExpModel] = useState(false);

  const handleDelete = useCallback(() => {
    const newList = resume?.experiences?.filter((item: Experience) => {
      if (item.id != resume?.experiences?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("expDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        experiences: newList,
      });
    }
  }, [resume?.experiences, resume]);

  const cloneExperience = () => {
    try {
      const newExperienceId = guid();
      const clonedExperienceData = { ...experience, id: newExperienceId };

      if (resume) {
        setResume({
          ...resume,
          experiences: [...resume.experiences!, clonedExperienceData],
        });
        toast.success(`'${experience.title}' ${t("cloneSuccess")}`);
      }
    } catch (error) {
      toast.error(t("errorClone"));
    }
  };

  return (
    <Disclosure key={experience.id} defaultOpen={openLastExp}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`experience-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("experienceTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{experience.title}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } w-[14px] md:mr-6 text-purple-500`}
                strokeWidth={3.5}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <ExperienceForm experience={experience} />
            <div className="w-full justify-center items-center flex gap-6">
              <button
                className="app-bar-btn flex justify-center text-gray-500 border border-gray-300 md:gap-2 text-sm p-2 mt-4"
                data-testid={`cloneBtn-${id}`}
                role="button"
                onClick={cloneExperience}
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
                  setOpenExpModel(true);
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
              title={experience.title!}
              handleDelete={() => handleDelete()}
              open={openExpModel}
              setOpen={setOpenExpModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
