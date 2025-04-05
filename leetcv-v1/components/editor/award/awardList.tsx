import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import { openLastAwardState, resumeState } from "@state/state";
import { Award } from "data/models/Award";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import SvgDragIcon from "../svgDragIcon";
import AwardForm from "./awardForm";
import DeleteModal from "@components/deleteModal";
import { toast } from "react-toastify";

interface AwardListProps {
  award: Award;
  id: number;
}

export default function AwardList({ award, id }: AwardListProps) {
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastAward] = useRecoilState(openLastAwardState);
  const t = useTranslations("Dashboard");
  const [openAwardModel, setOpenAwardModel] = useState(false);
  const handleDelete = useCallback(() => {
    const newList = resume?.awards?.filter((item: Award) => {
      if (item.id != resume?.awards?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("awardDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        awards: newList,
      });
    }
  }, [resume?.awards, resume]);
  return (
    <Disclosure key={award.id} defaultOpen={openLastAward}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`award-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("awardTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{award.name}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon2`}
                strokeWidth={3}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <AwardForm award={award} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenAwardModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={award.name}
              handleDelete={() => handleDelete()}
              open={openAwardModel}
              setOpen={setOpenAwardModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
