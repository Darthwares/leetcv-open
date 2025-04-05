import { Education } from "data/models/Education";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import EducationForm from "./educationForm";
import { TrashIcon } from "@heroicons/react/outline";
import SvgDragIcon from "../svgDragIcon";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { openLastEduState, resumeState } from "@state/state";
import { useCallback, useState } from "react";
import DeleteModal from "@components/deleteModal";
import { toast } from "react-toastify";

interface EducationListProps {
  education: Education;
  id: number;
}
export default function EducationList({ education, id }: EducationListProps) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastEducation] = useRecoilState(openLastEduState);
  const [openEduModel, setOpenEduModel] = useState(false);

  const handleDelete = useCallback(() => {
    const newList = resume?.educations?.filter((item: Education) => {
      if (item.id != resume?.educations?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("eduDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        educations: newList,
      });
    }
  }, [resume?.educations, resume]);
  return (
    <Disclosure key={education.id} defaultOpen={openLastEducation}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              className="px-5 flex space-x-2"
              data-testid={`education-title-${id}`}
              title={t("educationTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{education.degree}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon1`}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <EducationForm education={education} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenEduModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={education.degree}
              handleDelete={() => handleDelete()}
              open={openEduModel}
              setOpen={setOpenEduModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
