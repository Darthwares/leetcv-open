import { LightBulbIcon, PlusIcon } from "@heroicons/react/outline";
import { resumeState } from "@state/state";
import { Project } from "data/models/Project";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import Chip from "./chip";
import { AutoCompleteChangeParams } from "primereact/autocomplete";
import { predefinedHobbies } from "@constants/defaults";
import AutoCompleteInput from "@components/autoCompleteInput";
import ErrorMessage from "../errorMessage";
import { Experience } from "data/models/Experience";
export interface ChipFormProps {
  itemList: string[];
  property: string;
  placeholder: string;
}

const ChipForm = (props: any) => {
  const { itemList, property, placeholder, project, isProject } = props;
  const [inputValue, setInputValue] = useState("");
  const [resume, setResume] = useRecoilState(resumeState);
  const [chipInput, setChipInput] = useState<string[]>(itemList || []);
  const [items, setItems] = useState<string[]>([]);
  const t = useTranslations("Dashboard");
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  let label = "";
  switch (property) {
    case "hobbies":
      label = t("hobbie");
      break;
    case "causesList":
      label = t("causes");
      break;
    case "preferences":
      label = t("preferences");
      break;
    default:
      label = t("skill");
  }

  const checkProjectSkills = (newValue: string) => {
    const selectedProject = resume.projects?.find(
      (proj: Project) => proj.id === project?.id
    );
    return selectedProject?.skills?.some(
      (skill: string) =>
        skill.toLowerCase().trim() === newValue.toLowerCase().trim()
    );
  };

  const checkExperienceSkills = (newValue: string) => {
    const selectedProject = resume?.experiences?.find(
      (exp: Experience) => exp.id === project?.id
    );
    return selectedProject?.skills?.some(
      (skill: string) =>
        skill.toLowerCase().trim() === newValue.toLowerCase().trim()
    );
  };

  const checkSkills = (newValue: string) => {
    return resume?.skills?.some(
      (skill: string) =>
        skill.toLowerCase().trim() === newValue.toLowerCase().trim()
    );
  };

  const checkPreferences = (newValue: string) => {
    return resume?.preferences?.some(
      (preference: string) =>
        preference.toLowerCase().trim() === newValue.toLowerCase().trim()
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    let selectedSkill = false;
    let selectedPreferences = false;

    if (property === "skills") {
      if (isProject === "true") {
        selectedSkill = checkProjectSkills(newValue)!;
      } else {
        selectedSkill = checkSkills(newValue)!;
      }

      if (selectedSkill) {
        setErrorMsg(`${newValue} ${t("skillAlreadyAdded")}`);
        setError(true);
      } else {
        setErrorMsg("");
        setError(false);
      }
    }
    if (property === "expSkills") {
      selectedSkill = checkExperienceSkills(newValue)!;
    }

    if (property === "preferences") {
      selectedPreferences = checkPreferences(newValue)!;

      if (selectedPreferences) {
        setErrorMsg(`${newValue} ${t("preferenceAlreadyAdded")}`);
        setError(true);
      } else {
        setErrorMsg("");
        setError(false);
      }
    }
  };

  const handleAddChip = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (inputValue && !error) {
      const chips = inputValue.split(",").map((chip) => chip.trim());
      setChipInput([...chipInput, ...chips]);
      const chipsValue = [...new Set([...itemList, ...chips])];
      if (property === "skills" && isProject === "true") {
        setResume({
          ...resume,
          projects: resume.projects?.map((proj: Project) => {
            if (proj.id === project?.id) {
              return {
                ...proj,
                [property]: chipsValue,
              };
            }
            return proj;
          }),
        });
      }
      else if (property === "expSkills") {
        setResume({
          ...resume,
          experiences: resume.experiences?.map((exp: Experience) => {
            if (exp.id === project?.id) {
              return {
                ...exp,
                ["skills"]: chipsValue,
              };
            }
            return exp;
          }),
        })
      }
      else {
        setResume({
          ...resume,
          [property]: chipsValue,
        });
      }
      setInputValue("");
    }
  };

  const handleDeleteChip = (chip: string) => {
    setChipInput(chipInput.filter((item) => item !== chip));
    const chipsValue = itemList?.filter((item: string) => item !== chip);
    if (property === "skills" || property === "preferences" || property === "expSkills") {
      if (inputValue.toLocaleLowerCase() === chip.toLocaleLowerCase()) {
        setErrorMsg("");
        setError(false);
      }
    }
    if (property === "skills" && isProject === "true") {
      setResume({
        ...resume,
        projects: resume.projects?.map((proj: Project) => {
          if (proj.id === project?.id) {
            return {
              ...proj,
              [property]: chipsValue,
            };
          }
          return proj;
        }),
      });
    }
    else if (property === "expSkills") {
       setResume({
         ...resume,
         experiences: resume.experiences?.map((exp: Experience) => {
           if (exp.id === project?.id) {
             return {
               ...exp,
               ["skills"]: chipsValue,
             };
           }
           return exp;
         }),
       });
    } else {
      setResume({
        ...resume,
        [property]: chipsValue,
      });
    }
  };

  const handleInputChange = (e: AutoCompleteChangeParams) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddChip(e);
    }
  };

  const search = (event: { query: string }) => {
    const query = event.query.toLowerCase();
    const selectedHobbies = resume.hobbies?.map((hobbie) =>
      hobbie.toLowerCase()
    );
    const filteredHobbies = predefinedHobbies.filter(
      (hobbie) =>
        hobbie.toLowerCase().startsWith(query) &&
        !selectedHobbies?.includes(hobbie.toLowerCase())
    );
    setItems(filteredHobbies);
  };

  return (
    <div className={`space-y-${itemList?.length === 0 ? 0 : 3}`}>
      <div className="flex justify-start">
        {itemList?.length > 0 && (
          <>
            <div className="mt-1 sm:mt-0 sm:col-span-2 w-full">
              <div className="flex flex-col justify-between items-stretch w-full gap-3">
                <div className="flex items-stretch border py-2 border-gray-200 gap-3 overflow-y-scroll rounded-lg max-w-lg p-1">
                  <div className="flex flex-wrap gap-1">
                    {itemList?.map((item: string, index: number) => (
                      <div key={item}>
                        <Chip
                          label={item}
                          onDelete={() => handleDeleteChip(item)}
                        />
                        {index !== itemList?.length - 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {(property === "skills" || property === "preferences") &&
                errorMsg && (
                  <p className="text-red-500 text-xs font-medium pl-1 pt-1">
                    {errorMsg}
                  </p>
                )}
            </div>
          </>
        )}
      </div>
      <div className="mt-1 sm:mt-0 sm:col-span-2 mb-1 w-full">
        <form
          onSubmit={handleAddChip}
          data-testid="addChip"
          className="flex flex-row md:block items-center gap-2"
        >
          <button
            type="submit"
            data-testid="addSubmit"
            className="add-btn bg-indigo-600 py-2.5 md:hidden"
          >
            <PlusIcon
              className="-ml-1 mr-0.5 w-4 text-white"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-white">{t("add")}</span>
          </button>
          {property === "hobbies" ? (
            <AutoCompleteInput
              inputId={property}
              inputValue={inputValue}
              items={items}
              placeholder={placeholder}
              search={search}
              handleInputChange={handleInputChange}
              handleAutoCompleteKeyDown={handleKeyDown}
              className={"inputForm rounded-lg"}
              inputClassName={"hobby-input inputForm"}
            />
          ) : (
            <input
              className="bg-white max-w-lg focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg px-4 block w-full appearance-none leading-normal"
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          )}
        </form>
        {property === "skills" && itemList?.length === 0 && (
          <span className="md:hidden flex ml-20 max-w-lg">
            <ErrorMessage error={"Skills"} id={property} />
          </span>
        )}
        <div className="md:block hidden">
          {property === "skills" && itemList?.length === 0 && (
            <span className="hidden md:block max-w-lg">
              <ErrorMessage error={"Skills"} id={property} />
            </span>
          )}
          <div className="flex pt-1 space-x-1 items-center">
            <span>
              <LightBulbIcon className="w-5 text-indigo-500" />
            </span>
            <span className="text-xs text-gray-500">
              {`Type ${label} name and press enter key`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChipForm;
