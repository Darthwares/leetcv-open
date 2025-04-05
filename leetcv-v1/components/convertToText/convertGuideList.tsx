import { steps } from "@constants/defaults";
import { useTranslations } from "next-intl";

export default function ConvertGuideList() {
  const t = useTranslations("Convert");
  return (
    <div className="bg-white rounded-xl pt-3" data-testid="convert-guide-list">
      <h2
        data-testid="title"
        className="font-semibold px-5 rounded-t-lg py-3 bg-gradient-to-l from-indigo-50 to-pink-100"
      >
        {t("stepsToConvert")}
      </h2>
      <div className="px-[1px]">
        <ol
          data-testid="steps-list"
          className="list-disc list-inside text-sm px-5 py-2 border-x"
        >
          {steps.map((step, index) => (
            <li
              key={step.key}
              className={`py-2 ${
                index < steps.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <span className="font-semibold">{step.title}:</span>{" "}
              {step.description}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
