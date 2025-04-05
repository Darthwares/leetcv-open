import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/outline";
import { openLastCertificateState, resumeState } from "@state/state";
import { Certificate } from "data/models/Certificate";
import { useTranslations } from "next-intl";
import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import SvgDragIcon from "../svgDragIcon";
import CertificateForm from "./certificateForm";
import DeleteModal from "@components/deleteModal";
import { toast } from "react-toastify";

interface CertificateListProps {
  certificate: Certificate;
  id: number;
}
export default function CertificateList({
  certificate,
  id,
}: Readonly<CertificateListProps>) {
  const t = useTranslations("Dashboard");
  const [resume, setResume] = useRecoilState(resumeState);
  const [openLastCertificate] = useRecoilState(openLastCertificateState);
  const [openCertificateModel, setOpenCertificateModel] = useState(false);
  const handleDelete = useCallback(() => {
    const newList = resume?.certificates?.filter((item: Certificate) => {
      if (item.id != resume?.certificates?.[id]["id"]) {
        return item;
      }
    });
    toast.success(t("CertificateDeleteToastMsg"));
    if (resume) {
      setResume({
        ...resume,
        certificates: newList,
      });
    }
  }, [resume?.certificates, resume]);
  return (
    <Disclosure key={certificate.id} defaultOpen={openLastCertificate}>
      {({ open }: { open: boolean }) => (
        <div data-testid={`accordion-${id}`}>
          <Disclosure.Button className="dialog mb-[6px]">
            <span
              data-testid={`certificate-title-${id}`}
              className="px-5 flex space-x-2"
              title={t("certificateTitle")}
            >
              <span className="drag-icon pt-0.5 md:pt-0">
                <SvgDragIcon />
              </span>
              <span>{certificate.name}</span>
            </span>
            <span>
              <ChevronUpIcon
                className={`${open ? "rotate-180 transform" : ""} chero-Icon2`}
                strokeWidth={3}
              />
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
            <CertificateForm certificate={certificate} />
            <button
              className="app-bar-btn flex text-red-500 md:gap-2 text-sm py-2 mx-auto mt-4"
              data-testid={`deleteBtn-${id}`}
              role="button"
              onClick={() => {
                setOpenCertificateModel(true);
              }}
            >
              <TrashIcon
                className={`trash-icon`}
                data-testid={`deleteIcon-${id}`}
              />
              <span className="hidden md:block">{t("delete")}</span>
            </button>
            <DeleteModal
              title={certificate.name}
              handleDelete={() => handleDelete()}
              open={openCertificateModel}
              setOpen={setOpenCertificateModel}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
