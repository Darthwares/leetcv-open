import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { fetchingTextState } from "@state/state";
import { useTranslations } from "next-intl";
import { CheckCircleIcon } from "@heroicons/react/solid";

type StepperProps = {
  file: File | string;
};

export default function Stepper({ file }: StepperProps) {
  const [fetchingText] = useRecoilState(fetchingTextState);
  const t = useTranslations("Convert");
  const fetchingDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (file && fetchingDiv.current) {
      fetchingDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [file]);

  const steps = [
    {
      id: 1,
      number: fetchingText ? (
        <CheckCircleIcon className="w-5 text-indigo-500" />
      ) : (
        <p className="text-indigo-600">{t("one")}</p>
      ),
      label: <p className="text-indigo-600 ">{t("uploadFile")}</p>,
      color: "indigo",
    },
    {
      id: 2,
      number: 2,
      label: t("converting"),
      color: fetchingText ? "indigo" : "gray",
    },
    {
      id: 3,
      number: 3,
      label: t("review"),
      color: "gray",
    },
  ];
  return (
    <>
      <div ref={fetchingDiv} className={file && "pt-5 lg:pt-0"} />
      <div className="flex items-center  w-full">
        <ol className="flex items-center justify-center w-full p-4 space-x-2 text-xs md:text-base font-medium text-center text-gray-500 bg-gradient-to-l from-indigo-50 to-pink-100 border border-gray-200 rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4">
          {steps.map((step) => (
            <li key={step.id} className="flex items-center">
              <span
                className={`md:flex-row flex flex-col  items-center  w-5 h-5 mr-2  border border-${step.color}-500 justify-center shrink-0 text-${step.color}-600 rounded-full space-y-5`}
              >
                {step.number}
              </span>
              <span
                className={`sm:inline-flex whitespace-nowrap sm:ml-2 text-${
                  step.number === 1 ? "indigo" : step.color
                }-600`}
              >
                {step.label}
              </span>
              {step.id === 1 || step.id === 2 ? (
                <svg
                  aria-hidden="true"
                  className={`sm:ml-4 text-${step.color}-600 ml-2 w-4 h-4`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  ></path>
                </svg>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
