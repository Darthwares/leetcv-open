import { useTranslations } from "next-intl";
import React from "react";
import { useWizard } from "react-use-wizard";

export default function Stepper() {
  const t = useTranslations("Wizard");
  const { activeStep } = useWizard();

  const steps = [
    {
      id: 1,
      number: <p className="text-indigo-600">{t("one")}</p>,
      label: <p className="text-indigo-600">{t("personal")}</p>,
      color: "indigo",
    },
    {
      id: 2,
      number: 2,
      label:
        activeStep > 0 ? (
          <p className="text-indigo-600">{t("skills")}</p>
        ) : (
          <p className="text-slate-500 dark:text-gray-200">{t("skills")}</p>
        ),
      color: activeStep > 0 ? "indigo" : "slate",
    },
    {
      id: 3,
      number: 3,
      label:
        activeStep > 1 ? (
          <p className="text-indigo-600">{t("project")}</p>
        ) : (
          <p className="text-slate-500 dark:text-gray-200">{t("project")}</p>
        ),
      color: activeStep > 1 ? "indigo" : "slate",
    },
  ];

  return (
    <div className="w-full" data-testid="stepperLine">
      <ol
        className="flex items-center justify-evenly w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white dark:bg-gray-800/50 dark:border-gray-700 border border-gray-200 rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4"
        data-testid="steps"
      >
        {steps.map((step) => (
          <li
            key={step.id}
            className="flex items-center"
            data-testid={`step-${step.id}`}
          >
            <span
              className={`flex flex-col md:flex-row items-center justify-center w-5 h-5 mr-2 text-xs border border-${step.color}-500 dark:border-${step.color}-700 text-${step.color}-700 rounded-full shrink-0 dark:text-${step.color}-100 space-y-5`}
            >
              {step.number}
            </span>
            <span
              className={`text-sm whitespace-nowrap sm:inline-flex sm:ml-2 text-${
                step.number === 1 ? "indigo" : step.color
              }-600`}
            >
              {step.label}
            </span>
            {step.id === 1 || step.id === 2 ? (
              <svg
                aria-hidden="true"
                className={`w-4 h-4 ml-2 sm:ml-4 dark:text-${step.color}-200 text-${step.color}-600`}
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
  );
}
