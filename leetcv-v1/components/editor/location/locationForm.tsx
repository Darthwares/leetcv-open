import DescList from "@components/descList";
import { resumeState } from "@state/state";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Field, locationFields } from "../fieldMap";
import MandatoryField from "../mandatoryField";

export default function LocationForm() {
  const [userInfo, setUserInfo] = useRecoilState(resumeState)
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const firstEmptyField = locationFields(userInfo).find(
      (field: Field, index: number) =>
        !field.defaultValue && !inputRefs.current[index]?.value
    );
    if (firstEmptyField) {
      const firstEmptyFieldIndex = locationFields(userInfo).findIndex(
        (field: Field) => field.fieldName === firstEmptyField.fieldName
      );
      if (inputRefs.current[firstEmptyFieldIndex]) {
        inputRefs.current[firstEmptyFieldIndex].focus();
      }
    }
  }, [userInfo.city, userInfo.state, userInfo.country]);

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { id, value } = e.target;
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [id]: value ?? "",
      });
    }
    if (!value) {
      const nextField = locationFields(userInfo)[index + 1];
      if (nextField) {
        const nextFieldElement = inputRefs.current[index + 1];
        if (nextFieldElement && nextFieldElement.value === "") {
          nextFieldElement.focus();
        }
      }
    }
  };
  return (
    <section
      id="#personaldetails"
      data-testid="descList"
      className="md:mt-4 mt-2"
    >
      <DescList>
        {userInfo &&
          locationFields(userInfo).map((localField: Field, index: number) => {
            return (
              <div key={localField.fieldName}>
                <div className={`py-3 px-1.5 sm:grid sm:gap-4 bg-white`}>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <label
                      htmlFor={localField.fieldName}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      data-testid={`label-${localField.fieldName}`}
                    >
                      <MandatoryField item={localField} />
                    </label>
                    <div
                      className="mt-1 sm:mt-0 sm:col-span-2"
                      data-testid={`name-${localField.fieldName}`}
                    >
                      <>
                        <input
                          id={localField.fieldName}
                          name={localField.fieldName}
                          data-testid={`input-${localField.fieldName}`}
                          type={localField.type ?? "text"}
                          autoComplete={localField.autoComplete}
                          defaultValue={localField.defaultValue}
                          placeholder={localField.defaultValue as string}
                          disabled={localField.readonly}
                          onBlur={(e) => handleBlur(e, index)}
                          className="inputForm rounded-md border-gray-300"
                          ref={(ref) => {
                            inputRefs.current[index] = ref as HTMLInputElement;
                          }}
                        />
                      </>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </DescList>
    </section>
  );
}
