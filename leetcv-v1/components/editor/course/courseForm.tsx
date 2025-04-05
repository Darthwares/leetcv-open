import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Course } from "data/models/Course";
import { resumeState } from "@state/state";
import { courseFields, Field } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
export interface CourseFormProps {
  course: Course;
}
export default function CourseForm({ course }: CourseFormProps) {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeCourse, setActiveCourse] = useState<Course>(course);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      courseFields(activeCourse).find((field) => field.fieldName === e.target.id)
        ?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;

      if (activeCourse) {
        setActiveCourse({ ...activeCourse, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          courses: userInfo.courses?.map((localCourse: Course) => {
            if (localCourse.id === activeCourse?.id) {
              return { ...localCourse, [id]: value };
            }
            return localCourse;
          }),
        });
      }
    }
  };
  
  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`courses`}>
            {activeCourse &&
              courseFields(activeCourse).map(
                (localItem: Field, idx: number) => {
                  return (
                    <div
                      data-testid={`courseField-${idx}`}
                      className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                      key={localItem.fieldName}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                        <label
                          htmlFor={localItem.title}
                          className="block text-sm font-medium text-gray-700"
                          data-testid={`label-${idx}`}
                        >
                          <MandatoryField item={localItem} />
                        </label>
                        <div
                          className="mt-1 sm:mt-0 sm:col-span-2"
                          data-testid={`name-${idx}`}
                        >
                          <>
                            <input
                              autoFocus={localItem.fieldName === "name"}
                              id={localItem.fieldName}
                              name={localItem.fieldName}
                              data-testid={`input-${idx}`}
                              type={localItem.type ?? "text"}
                              autoComplete={localItem.autoComplete}
                              defaultValue={localItem.defaultValue}
                              placeholder={localItem.placeholder as string}
                              onBlur={handleBlur}
                              onChange={(e) =>
                                handleError(
                                  e,
                                  courseFields(activeCourse).find(
                                    (field) => field.fieldName === e.target.id
                                  )?.mandatory,
                                  setFieldErrors
                                )
                              }
                              spellCheck={true}
                              className="inputForm rounded-md border-gray-300"
                            />
                            <ErrorMessage
                              error={fieldErrors[localItem.fieldName]}
                              id={localItem.fieldName}
                            />
                          </>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
