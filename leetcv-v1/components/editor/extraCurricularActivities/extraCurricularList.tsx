import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import SvgDragIcon from "../svgDragIcon";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { openLastExtraCurricularState, resumeState } from "@state/state";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import DeleteModal from "@components/deleteModal";
import { ExtraCurricular } from "data/models/ExtraCurricular";
import ExtraCurricularForm from "./extraCurricularForm";

interface ExtraCurricularListProps {
  activity: ExtraCurricular;
  id: number;
}
export default function ExtraCurricularList({
  activity,
  id,
}: ExtraCurricularListProps) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastIntern] = useRecoilState(openLastExtraCurricularState);
  const [openActivityModel, setOpenActivityModel] = useState(false);

  const handleDelete = useCallback(() => {
    const newList = resume?.extraCurricularActivities?.filter(
      (item: ExtraCurricular) => {
        if (item.id != resume?.extraCurricularActivities?.[id]["id"]) {
          return item;
        }
      }
    );
    toast.success(t("deletedSuccess"));
    if (resume) {
      setResume({
        ...resume,
        extraCurricularActivities: newList,
      });
    }
  }, [resume?.extraCurricularActivities, resume]);

  return (
    <Disclosure key={activity.id} defaultOpen={openLastIntern}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`extraCurricular-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("extraCurricularTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{activity.activityName}</span>
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
            <ExtraCurricularForm activity={activity} />
            <div className="w-full justify-center items-center flex gap-6">
              <button
                className="app-bar-btn flex border-red-300 hover:shadow-red-300 hover:ring-1 hover:ring-red-300 hover:border border text-red-500 md:gap-2 text-sm p-2 mt-4"
                data-testid={`deleteBtn-${id}`}
                onClick={() => {
                  setOpenActivityModel(true);
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
              title={activity.activityName!}
              handleDelete={() => handleDelete()}
              open={openActivityModel}
              setOpen={setOpenActivityModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
