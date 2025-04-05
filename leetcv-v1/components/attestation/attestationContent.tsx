import { LoaderSvg } from "@components/svg";
import { useAttestInstructions } from "@constants/defaults";
import {
  MailIcon,
  PaperAirplaneIcon,
  StopIcon,
} from "@heroicons/react/outline";
import { emailValidation } from "@lib/helper/emailValidation";
import {
  emailListState,
  openProjectAttestSidebarState,
  resumeState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { Project } from "data/models/Project";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as guid } from "uuid";

interface AttestationContentProps {
  project: Project;
}

const AttestationContent = ({ project }: AttestationContentProps) => {
  const [items, setItems] = useState<any>([]);
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const [value, setValue] = useState("");
  const t = useTranslations("Attestation");
  const [errorState, setErrorState] = useState("");
  const setRequest = trpc.useMutation("fs.attestation.create");
  const [email, setEmail] = useRecoilState(emailListState);
  const [isLoading, setIsLoading] = useState(false);
  const setOpenProjectAttestModel = useSetRecoilState(
    openProjectAttestSidebarState
  );
  const instructions = useAttestInstructions(t);

  const handleAdd = () => {
    const trimValue = value.trim();

    if (trimValue === resume.email) {
      return toast.error(t("selfAttestation"));
    }
    if (
      trimValue &&
      emailValidation({ value: trimValue, items, setErrorState, t })
    ) {
      setItems([...items, trimValue]);
      setValue("");
    }
  };

  const handleDelete = (item: string) => {
    let filterItem = items.filter((i: string) => i !== item);
    setItems(filterItem);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      handleAdd();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setEmail(event.target.value);
    setErrorState("");
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpenProjectAttestModel((prevOpenState) => ({
      ...prevOpenState,
      [project.id]: false,
    }));
    setItems([]);
  };

  return (
    <div className="relative flex-1 px-4 py-3">
      <div className="flex items-center gap-2 pt-2">
        <MailIcon className="w-5 h-5 text-indigo-600" />
        <p>{t("enterEmail")}</p>
      </div>
      <div className={`${items.length > 0 && "requestAttestedUserList "}  `}>
        {items.map((item: any) => {
          return (
            <div className={`tag-item `} key={item}>
              {item}
              <button
                type="button"
                className={`button`}
                onClick={() => handleDelete(item)}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      <div className="py-4  ">
        <div className="flex space-x-2">
          <input
            className="emailChipInput requestAttestedEmailList"
            value={value}
            type="email"
            autoFocus={true}
            placeholder={t("placeholderText")}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <button
            className={`${
              value
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            } requestAttestationAddBtn`}
            type="button"
            onClick={handleAdd}
          >
            {t("add")}
          </button>
        </div>
        {errorState && <p className="error">{errorState}</p>}
      </div>
      <div className="flex justify-between absolute bottom-6 w-full pr-10 md:pr-12">
        <button
          type="button"
          className="requestAttestationCancelBtn max-w-fit"
          onClick={handleClick}
        >
          {t("cancel")}
        </button>
        <button
          type="button"
          className={`requestAttestationSendBtn max-w-fit flex items-center gap-2 ${
            items.length === 0 || isLoading
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={items.length === 0 || isLoading}
          onClick={async () => {
            setIsLoading(true);
            try {
              await setRequest.mutateAsync(
                {
                  email: email,
                  emailList: items,
                  id: userId,
                  image: resume.image!,
                  name: resume.displayName,
                  project,
                  requesterEmail: resume.email,
                  uid: guid(),
                  status: t("pending"),
                },
                {
                  onError: (error) => {
                    toast.error(error.message);
                  },
                  onSuccess: () => {
                    toast.success(t("success"));
                  },
                }
              );
             
              setOpenProjectAttestModel((prevOpenState) => ({
                ...prevOpenState,
                [project.id]: false,
              }));
              setItems([]);
            } catch (error) {
            } finally {
              setIsLoading(false);
            }
          }}
        >
          {isLoading ? (
            <LoaderSvg />
          ) : (
            <PaperAirplaneIcon className="w-4 rotate-45" />
          )}
          <span>{isLoading ? t("sending") : t("sendRequest")}</span>
        </button>
      </div>
      {items.length === 0 && (
        <div className="w-full bg-slate-100 rounded-md p-5 mt-3">
          <ul className="flex flex-col gap-4 pl-4">
            {instructions.map((text) => (
              <li key={text} className="text-sm text-indigo-600 list-disc">
                {text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttestationContent;
