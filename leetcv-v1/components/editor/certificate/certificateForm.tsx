import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Certificate } from "data/models/Certificate";
import { resumeState } from "@state/state";
import { certificateFields, Field } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
export interface CertificateFormProps {
  certificate: Certificate;
}

export default function CertificateForm({ certificate }: CertificateFormProps) {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeCertificate, setActiveCertificate] =
    useState<Certificate>(certificate);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      certificateFields(activeCertificate).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;

      if (activeCertificate) {
        setActiveCertificate({ ...activeCertificate, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          certificates: userInfo.certificates?.map(
            (certificate: Certificate) => {
              if (certificate.id === activeCertificate?.id) {
                return { ...certificate, [id]: value };
              }
              return certificate;
            }
          ),
        });
      }
    }
  };

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`certificates`}>
            {activeCertificate &&
              certificateFields(activeCertificate).map(
                (locItem: Field, idx: number) => {
                  return (
                    <div
                      data-testid={`certificateField-${idx}`}
                      className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                      key={locItem.fieldName}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                        <label
                          htmlFor={locItem.title}
                          className="block text-sm font-medium text-gray-700"
                          data-testid={`label-${idx}`}
                        >
                          <MandatoryField item={locItem} />
                        </label>
                        <div
                          className="mt-1 sm:mt-0 sm:col-span-2"
                          data-testid={`name-${idx}`}
                        >
                          <>
                            <input
                              autoFocus={locItem.fieldName === "name"}
                              id={locItem.fieldName}
                              name={locItem.fieldName}
                              data-testid={`input-${idx}`}
                              type={locItem.type ?? "text"}
                              autoComplete={locItem.autoComplete}
                              defaultValue={locItem.defaultValue}
                              placeholder={locItem.placeholder as string}
                              onBlur={handleBlur}
                              onChange={(e) =>
                                handleError(
                                  e,
                                  certificateFields(activeCertificate).find(
                                    (field) => field.fieldName === e.target.id
                                  )?.mandatory,
                                  setFieldErrors
                                )
                              }
                              spellCheck={true}
                              className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            />
                            <ErrorMessage
                              error={fieldErrors[locItem.fieldName]}
                              id={locItem.fieldName}
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
