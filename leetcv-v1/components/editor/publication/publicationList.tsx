import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import { openLastPublicationState, resumeState } from "@state/state";
import { Publication } from "data/models/Publication";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import SvgDragIcon from "../svgDragIcon";
import PublicationForm from "./publicationForm";
import { toast } from "react-toastify";
import DeleteModal from "@components/deleteModal";
interface PublicationListProps {
  publication: Publication;
  id: number;
}
export default function PublicationList({
  publication,
  id,
}: PublicationListProps) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastPublication] = useRecoilState(openLastPublicationState);
  const [openPublicationModel, setOpenPublicationModel] = useState(false);

  const handleDelete = useCallback(() => {
    const newList = resume?.publications?.filter((item: Publication) => {
      if (item.id != resume?.publications?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("publicationDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        publications: newList,
      });
    }
  }, [resume?.publications, resume]);

  return (
    <Disclosure key={publication.id} defaultOpen={openLastPublication}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`publication-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("publicationTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{publication.title}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon2`}
                strokeWidth="3"
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <PublicationForm publication={publication} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenPublicationModel(true);
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
              open={openPublicationModel}
              setOpen={setOpenPublicationModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
