import { experienceLevelData } from "@constants/defaults";
import { experienceFilterState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";

const CustomExperienceRefinement = () => {
  const t = useTranslations("AlgoliaSearch");
  const [experienceFiltering, setExperienceFiltering] = useRecoilState(
    experienceFilterState
  );
  const experienceLevel = experienceLevelData(t);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperienceFiltering(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      {experienceLevel.map((exp) => (
        <label
          className="text-gray-500 flex items-center max-w-fit hover:text-gray-900"
          key={exp.value}
        >
          <input
            type="radio"
            name={exp.value}
            value={exp.value}
            checked={experienceFiltering === exp.value}
            onChange={handleChange}
            className="mr-2"
          />
          {exp.value === t("All") ? exp.value : exp.value + t("years")}
        </label>
      ))}
    </div>
  );
};

export default CustomExperienceRefinement;
