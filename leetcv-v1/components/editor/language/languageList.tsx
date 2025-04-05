import { ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import SvgDragIcon from "../svgDragIcon";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { openLastLanguageState, resumeState } from "@state/state";
import { useCallback, useState } from "react";
import LanguageForm from "./languageForm";
import { Language } from "data/models/Language";
import DeleteModal from "@components/deleteModal";
import { toast } from "react-toastify";

interface LanguageListProps {
  language: Language;
  id: number;
}
export default function LanguageList({ language, id }: LanguageListProps) {
  const t = useTranslations("Dashboard");
  const [openLastLanguage] = useRecoilState(openLastLanguageState);
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLanguageModel, setOpenLanguageModel] = useState(false);
  const handleDelete = useCallback(() => {
    const newList = resume?.languages?.filter((item: Language) => {
      if (item.id != resume?.languages?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("languageDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        languages: newList,
      });
    }
  }, [resume?.languages, resume]);
  return (
    <Disclosure key={language.id} defaultOpen={openLastLanguage}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              className="px-5 flex space-x-2"
              data-testid={`language-title-${id}`}
              title={t("languageTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span className="capitalize">{language.name}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon1`}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-3">
            <LanguageForm language={language} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenLanguageModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={language.name}
              handleDelete={() => handleDelete()}
              open={openLanguageModel}
              setOpen={setOpenLanguageModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
