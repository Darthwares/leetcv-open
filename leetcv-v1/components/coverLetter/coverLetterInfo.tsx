import useManageToken from "@lib/helper/useManageToken";
import { fetchPostJSON } from "@lib/stripe/helper";
import {
  coverLetterDraftsVisible,
  coverLetterFormState,
  coverLetterFormVisible,
  coverLetterLoaderState,
  coverLetterState,
  coverLetterVisible,
  pageTitleState,
  resumeState,
  tokenCountState,
} from "@state/state";
import { useTranslations } from "next-intl";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";

interface FormField {
  label: string;
  type: "text" | "textarea";
  name: string;
}

export interface FormData {
  [key: string]: string;
}

const CoverLetterBody = () => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  const [userInfo] = useRecoilState(resumeState);
  const setCoverLetter = useSetRecoilState(coverLetterState);
  const setCoverLetterLoader = useSetRecoilState(coverLetterLoaderState);
  const [coverForm, setCoverForm] = useRecoilState(coverLetterFormState);
  const t = useTranslations("CoverLetter");
  const [tokens] = useRecoilState(tokenCountState);
  const setIsFormVisible = useSetRecoilState(coverLetterFormVisible);
  const setICoverLetterVisible = useSetRecoilState(coverLetterVisible);
  const setIsCoverLetterDraftVisible = useSetRecoilState(
    coverLetterDraftsVisible
  );
  const { deductToken } = useManageToken();
  const [formData, setFormData] = useState<FormData>({
    jobPosition: userInfo.position || "",
    jobDescription: "",
  });

  const initialFormFields: FormField[] = [
    { label: t("jobPosition"), type: "text", name: "jobPosition" },
    { label: t("jobExperience"), type: "text", name: "jobExperience" },
    { label: "Hiring Manager Name", type: "text", name: "jobHiringManager" },
    { label: t("company"), type: "text", name: "jobCompany" },
    { label: t("jobDescription"), type: "textarea", name: "jobDescription" },
  ];

  useEffect(() => {
    setProdTitle(t("coverLetter"));
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tokens < 1000) {
      toast.error(t("insufficientTokens"));
      return;
    }

    setCoverForm({
      ...coverForm,
      jobDescription: formData.jobDescription,
      jobCompany: formData.jobCompany,
      jobExperience: formData.jobExperience,
      jobHiringManager: formData.jobHiringManager,
      jobPosition: formData.jobPosition,
      image: userInfo.image!,
    });

    const jobDescription = formData.jobDescription
      ? formData.jobDescription.trim()
      : "";
    const jobPosition = formData.jobPosition ? formData.jobPosition.trim() : "";
    const jobExperience = formData.jobExperience
      ? formData.jobExperience.trim()
      : "";
    const company = formData.jobCompany ? formData.jobCompany.trim() : "";
    const name = userInfo.displayName ? userInfo.displayName.trim() : "";
    const jobHiringManager = formData.jobHiringManager;
    const resume = userInfo;

    if (!jobDescription || !jobPosition || !jobExperience || !company) {
      return toast.error(t("pleaseEnterAllFields"));
    }
    setIsFormVisible(false);
    setIsCoverLetterDraftVisible(true);
    setICoverLetterVisible(true);
    setCoverLetterLoader(true);
    setCoverLetter("");

    const response = await fetchPostJSON("/api/openai/coverLetter", {
      jobDescription,
      jobPosition,
      jobExperience,
      company,
      name,
      resume,
      jobHiringManager,
    });

    setCoverLetter(response.description);
    setCoverLetterLoader(false);
    toast.success(t("coverLetterGenerated"));
    deductToken(1000);
  };

  return (
    <div
      className={`p-1.5 md:py-3 sm:grid sm:gap-5 bg-white dark:bg-gray-900 print:bg-white w-full mt-4 lg:mt-0`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {initialFormFields.map((field) => (
          <div
            key={field.name}
            className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start"
          >
            <label className="text-sm font-medium flex gap-1 items-center dark:text-gray-100 text-gray-700 sm:mt-px sm:pt-2 xl:ml-10">
              <span className="">{field.label}</span>
              {field.name !== "jobHiringManager" && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              {field.type === "text" ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="inputForm rounded-md border-gray-300 dark:text-gray-100 dark:placeholder:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
                />
              ) : (
                <textarea
                  name={field.name}
                  rows={7}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="inputForm rounded-md border-gray-300 dark:text-gray-100 dark:placeholder:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
                />
              )}
            </div>
          </div>
        ))}
        <div className="w-full flex justify-end">
          <a href="#coverLetter">
            <button
              className="text-white bg-indigo-600 hover:bg-indigo-700 duration-200 transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="submit"
            >
              {t("generate")}
            </button>
          </a>
        </div>
      </form>
    </div>
  );
};
export default CoverLetterBody;
