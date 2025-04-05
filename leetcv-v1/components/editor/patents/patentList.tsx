import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import { openLastPatentState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import SvgDragIcon from "../svgDragIcon";
import { toast } from "react-toastify";
import DeleteModal from "@components/deleteModal";
import PatentsForm from "./patentsForm";
import { Patent } from "data/models/Patent";
interface PatentListProps {
  patent: Patent;
  id: number;
}
export default function PatentList({ patent, id }: Readonly<PatentListProps>) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastPatent] = useRecoilState(openLastPatentState);
  const [openPatentModel, setOpenPatentModel] = useState(false);

  const handleDelete = useCallback(() => {
    const newList = resume?.patents?.filter((item: Patent) => {
      if (item.id != resume?.patents?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("patentDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        patents: newList,
      });
    }
  }, [resume?.patents, resume]);

  return (
    <Disclosure key={patent.id} defaultOpen={openLastPatent}>
      {({ open }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`patent-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("patentTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{patent.title}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon2`}
                strokeWidth="3"
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <PatentsForm patent={patent} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              onClick={() => {
                setOpenPatentModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={t("deleteConfirmation")}
              handleDelete={() => handleDelete()}
              open={openPatentModel}
              setOpen={setOpenPatentModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
