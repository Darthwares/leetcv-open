import { ChevronUpIcon } from "@heroicons/react/solid";
import { Disclosure } from "@headlessui/react";
import SocialMediaForm from "./socialMediaForm";
import { TrashIcon } from "@heroicons/react/outline";
import SvgDragIcon from "../svgDragIcon";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { openLastSocialState, resumeState } from "@state/state";
import { useCallback, useState } from "react";
import { SocialMedia } from "data/models/socialMedia";
import { toast } from "react-toastify";
import DeleteModal from "@components/deleteModal";
interface SocialMediaListProps {
  social: SocialMedia;
  id: number;
}
export default function SocialMediaList({ social, id }: SocialMediaListProps) {
  const t = useTranslations("Dashboard");
  const [openLastSocial] = useRecoilState(openLastSocialState);
  const [resume, setResume] = useRecoilState(resumeState);
  const [openSocialModel, setOpenSocialModel] = useState(false);
  const handleDelete = useCallback(() => {
    const newList = resume?.socialMedia?.filter((item: SocialMedia) => {
      if (item.id != resume?.socialMedia?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("socialMediaDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        socialMedia: newList,
      });
    }
  }, [resume?.socialMedia, resume]);

  return (
    <Disclosure key={social.id} defaultOpen={openLastSocial}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              className="px-5 flex space-x-2"
              data-testid={`social-title-${id}`}
              title={t("socialTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span className="capitalize">{social.name}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon1`}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <SocialMediaForm socialMedia={social} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenSocialModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={social.name!}
              handleDelete={() => handleDelete()}
              open={openSocialModel}
              setOpen={setOpenSocialModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
