import { useRecoilState } from "recoil";
import { useState } from "react";
import { resumeState } from "@state/state";
import { SocialMedia } from "data/models/socialMedia";
import DescList from "@components/descList";
import { Field, socialMediaFields } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { AutoCompleteChangeParams } from "primereact/autocomplete";
import {
  FieldErrors,
  handleError,
  predefinedSocialMedia,
} from "@constants/defaults";
import AutoCompleteInput from "@components/autoCompleteInput";
import ErrorMessage from "../errorMessage";

export interface SocialMediaFormProps {
  socialMedia: SocialMedia;
}

export default function SocialMediaForm({ socialMedia }: SocialMediaFormProps) {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeSocialMedia, setActiveSocialMedia] =
    useState<SocialMedia>(socialMedia);
  const [items, setItems] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement> | AutoCompleteChangeParams
  ) => {
    if (
      !e.target.value &&
      socialMediaFields(activeSocialMedia).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;
      if (activeSocialMedia) {
        setActiveSocialMedia({ ...activeSocialMedia, [id]: value.trim() });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          socialMedia: userInfo.socialMedia?.map((social: SocialMedia) => {
            if (social.id === activeSocialMedia?.id) {
              return { ...social, [id]: value.trim() };
            }
            return social;
          }),
        });
      }
    }
  };

  const search = (event: { query: string }) => {
    const query = event.query.toLowerCase();
    const filteredSocialMedia = predefinedSocialMedia.filter((socialMedia) =>
      socialMedia.toLowerCase().startsWith(query)
    );
    setItems(filteredSocialMedia);
  };

  return (
    <section
      id="#socialMediaDetails"
      data-testid="socialMedia"
      className="w-full md:p-3"
    >
      <DescList>
        {userInfo &&
          socialMediaFields(activeSocialMedia).map((item: Field) => {
            return (
              <div key={item.fieldName}>
                <div className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <label
                      htmlFor={item.title}
                      className="text-sm font-medium flex gap-1 items-center text-gray-700"
                      data-testid={`label-${item.title}`}
                    >
                      <MandatoryField item={item} />
                    </label>
                    <div
                      className="mt-1 sm:mt-0 sm:col-span-2"
                      data-testid={`name-${item.fieldName}`}
                    >
                      <>
                        {item.fieldName === "socialMediaUrl" && (
                          <>
                            <input
                              autoFocus={item.fieldName === "socialMediaUrl"}
                              id={item.fieldName}
                              name={item.fieldName}
                              data-testid={`input-${item.fieldName}`}
                              type={item.type ?? "text"}
                              autoComplete={item.autoComplete}
                              defaultValue={item.defaultValue}
                              placeholder={item.defaultValue as string}
                              disabled={item.readonly}
                              onBlur={handleBlur}
                              onChange={(e) =>
                                handleError(
                                  e,
                                  socialMediaFields(activeSocialMedia).find(
                                    (field) => field.fieldName === e.target.id
                                  )?.mandatory,
                                  setFieldErrors
                                )
                              }
                              spellCheck={true}
                              className="inputForm rounded-md border-gray-300"
                            />
                          </>
                        )}
                        <ErrorMessage
                          error={fieldErrors[item.fieldName]}
                          id={item.fieldName}
                        />
                        {item.fieldName === "name" && (
                          <>
                            <AutoCompleteInput
                              inputId={item.fieldName}
                              inputValue={item.defaultValue}
                              items={items}
                              search={search}
                              handleInputChange={(
                                e: AutoCompleteChangeParams
                              ) =>
                                setActiveSocialMedia({
                                  ...activeSocialMedia,
                                  [item.fieldName]: e.target.value,
                                })
                              }
                              handleBlur={handleBlur}
                              className={"inputForm rounded-md text-sm"}
                              inputClassName={"w-full rounded-md text-sm"}
                            />
                          </>
                        )}
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
