import React, { useRef } from "react";
import { useTranslations } from "next-intl";
import { UploadResumeSvg } from "@components/svg";

type ConvertFileInputProps = {
  error: boolean;
  hasFile: boolean;
  handleFile: (file: File) => void;
  fetchingText: boolean;
};

const ConvertFileInput = ({
  error,
  handleFile,
  fetchingText,
}: ConvertFileInputProps) => {
  const t = useTranslations("Convert");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  return (
    <div
      className="bg-white w-full rounded-lg"
      data-testid="file-input-container"
    >
      <div className="my-5 flex flex-col w-full items-center ">
        <div className="pt-2 w-full" data-testid="file-input">
          {!error && (
            <>
              <div
                className="relative block w-full rounded-lg border-2 border-dashed border-gray-400 p-6 lg:p-12 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex justify-center">
                  <UploadResumeSvg />
                </div>
                <div className="mt-4 flex flex-col sm:flex-row text-sm justify-center leading-6 text-gray-900">
                  <label
                    htmlFor="resume"
                    className="relative cursor-pointer whitespace-nowrap rounded-md bg-transparent font-semibold text-indigo-700 focus-within:outline-none hover:text-indigo-900"
                  >
                    <span>{t("uploadResume")}</span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="resume"
                      name="resume"
                      accept=".pdf,.docx,.doc"
                      className="sr-only"
                      onChange={handleFileChange}
                      disabled={fetchingText}
                    />
                  </label>
                  <p className="pl-1" data-testid="description">
                    {t("dragOrDrop")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConvertFileInput;
