import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { resumeState, tokenCountState } from "@state/state";
import DescList from "@components/descList";
import { Field, personalFields } from "../fieldMap";
import ChipForm from "../chip/chipForm";
import Tooltip from "@components/tooltip";
import { CheckCircleIcon } from "@heroicons/react/outline";
import MandatoryField from "../mandatoryField";
import AvatarUploader from "./avatarUpload";
import { trpc } from "@utils/trpc";
import BecomePro from "@components/becomePro";
import { isEmail } from "@lib/helper/emailValidation";
import { FieldErrors, isValidUrl } from "@constants/defaults";
import AddressAutoComplete from "@components/addressAutoComplete";
import RefineButton from "./refineButton";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { parsePhoneNumber } from "awesome-phonenumber";
import { useSession } from "next-auth/react";

export default function PersonalForm() {
  const t = useTranslations("Dashboard");
  const { status } = useSession();
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [text, setText] = useState("");
  const [selectText, setSelectText] = useState(userInfo?.description);
  const [promptText, setPromptText] = useState<boolean>(false);
  const [generate, setGenerate] = useState("Generate");
  const [char, setChar] = useState<number>(0);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [tokens] = useRecoilState(tokenCountState);
  const [phoneNum, setPhoneNum] = useState<string | undefined>(
    userInfo.phoneNumber ?? ""
  );
  const [isPhoneNumValid, setIsPhoneNumValid] = useState<boolean>(false);
  const [isPhoneNumEditing, setIsPhoneNumEditing] = useState<boolean>(false);

  const handlePhoneNumberChange = (inputValue: string) => {
    setPhoneNum(inputValue);
    setIsPhoneNumEditing(true);
    const phoneNumber = parsePhoneNumber(inputValue);
    if (phoneNumber?.valid) {
      setIsPhoneNumValid(true);
    } else {
      setIsPhoneNumValid(false);
    }
  };

  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userInfo.id, handle: userInfo.handle }],
    {
      enabled: status === "authenticated" && !!userInfo.id,
    }
  );

  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);

  const handleRefine = async () => {
    try {
      if (tokens < 50) {
        return;
      }
      setText("");
      setGenerate("Refine");

      const resp = await fetch("/api/openai/generateDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: generate,
          descriptionText: selectText,
        }),
      });
      const response = await resp.json();
      setText(response.description.trim().replace(/[\n\r]/g, ""));
      let newTokenCount = tokens - 50;

      setTokens.mutate(
        {
          count: newTokenCount,
          handle: userInfo.handle,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPromptText(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const { id, value } = e.target;
    setChar(value.length);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [id]: value ?? "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, id } = e.target;
    setChar(value.length);
    setSelectText(value);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [id]: value.slice(0, 351) ?? "",
      });
    }
  };

  const handleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    const updateFieldError = (errorMessage: string) => {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [id]: errorMessage,
      }));
    };

    if (id === "email") {
      let errorMessage = "";

      if (!value) {
        errorMessage = t("emailMandatory");
      } else if (!isEmail(value)) {
        errorMessage = t("invalidEmail");
      }
      updateFieldError(errorMessage);
    }

    if (id === "portfolioLink") {
      let errorMessage = "";

      if (!isValidUrl(value) && value.length > 0) {
        errorMessage = t("invalidURL");
      } else if (value.length > 255) {
        errorMessage = t("urlTooLong");
      }

      updateFieldError(errorMessage);
    }
    if (id === "address" && !value) {
      updateFieldError(t("addressMandatory"));
    }

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        [id]: value ?? "",
      });
    }
  };

  const handleAcceptSave = () => {
    const description = text
      .trim()
      .replace(/[\n\r]/g, "")
      .slice(0, 350);
    setSelectText(description);
    setChar(description.length);
    setGenerate("Generate");
    setText("");
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        description: description ?? "",
      });
    }
  };

  useEffect(() => {
    if (userInfo) {
      setSelectText(userInfo?.description);
      setChar(userInfo?.description?.length!);
      setPhoneNum(userInfo?.phoneNumber);
    }
  }, [userInfo]);

  return (
    <section data-testid="descList" className="md:mt-4 mt-2">
      <DescList>
        {userInfo &&
          personalFields(userInfo).map((item: Field, index: number) => {
            return (
              <div key={index}>
                <div className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <label
                      htmlFor={item.fieldName}
                      className="text-sm font-medium flex gap-1 items-center text-gray-700 sm:mt-px sm:pt-2"
                      data-testid={`label-${item.fieldName}`}
                    >
                      <MandatoryField item={item} />
                      <span className="">
                        {item.fieldName === "hobbies" && (
                          <>
                            <div className="flex items-center justify-center md:justify-start">
                              <Tooltip
                                tip={t("hobbiesTips")}
                                width="w-48 sm:w-52 md:w-60"
                              />
                            </div>
                          </>
                        )}
                        {item.fieldName === "causesList" && (
                          <>
                            <div className="flex items-center justify-center md:justify-start">
                              <Tooltip
                                tip={t("causesTips")}
                                width="w-48 sm:w-52 md:w-60"
                              />
                            </div>
                          </>
                        )}
                      </span>
                    </label>
                    <div
                      className="mt-1 sm:mt-0 sm:col-span-2"
                      data-testid={`name-${item.fieldName}`}
                    >
                      {item.type === "file" && (
                        <AvatarUploader />
                      )}
                      {item.fieldName === "description" && (
                        <>
                          <textarea
                            id={item.fieldName}
                            name={item.fieldName}
                            data-testid={`input-${index}`}
                            cols={30}
                            rows={5}
                            autoComplete={item.autoComplete}
                            value={selectText}
                            placeholder={item.placeholder as string}
                            onBlur={(e) => handleBlur(e, index)}
                            spellCheck={true}
                            onChange={handleChange}
                            maxLength={350}
                            className="inputForm rounded-md border-gray-300 text-sm"
                          />

                          <div className="text-sm text-gray-500 flex max-w-lg justify-between w-full sm:text-sm">
                            <p className="mt-2 ml-1 md:ml-3.5 text-sm text-gray-500">
                              {t("aboutYourself")}
                            </p>
                            <span className="mt-2 text-gray-500">
                              <span>{char}</span>
                              {t("maxChar")}
                            </span>
                          </div>
                          {generate === "Refine" && tokens !== 0 && (
                            <div className="max-w-lg py-2">
                              <div className="ml-3.5">{text}</div>
                            </div>
                          )}
                          {generate === "Refine" &&
                            (promptText || text === "") && (
                              <>
                                <div className="max-w-lg flex items-center justify-center ">
                                  <div className="w-60">
                                    <lottie-player
                                      src="/assets/lottie/ai.json"
                                      background="white"
                                      speed="1"
                                      loop
                                      autoplay
                                    ></lottie-player>
                                  </div>
                                </div>
                              </>
                            )}
                          <div className="flex gap-2 mt-2 md:mt-1 max-w-lg justify-end py-2 md:gap-3">
                            {generate === "Generate" &&
                              tokens !== 0 &&
                              text === "" && (
                                <RefineButton
                                  setText={setText}
                                  selectText={selectText!}
                                  generate={"Generate"}
                                  handleRefine={handleRefine}
                                  tokens={tokens}
                                />
                              )}
                            {generate === "Refine" &&
                              tokens !== 0 &&
                              text !== "" && (
                                <RefineButton
                                  setText={setText}
                                  selectText={selectText!}
                                  generate={"Refine"}
                                  handleRefine={handleRefine}
                                  tokens={tokens}
                                />
                              )}
                            {generate === "Refine" && tokens !== 0 && text && (
                              <button
                                className="text-white px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
                                onClick={handleAcceptSave}
                              >
                                <span className="flex items-center gap-1">
                                  <CheckCircleIcon className="w-5 animate-pulse" />
                                  <span>{t("accept")}</span>
                                </span>
                              </button>
                            )}
                          </div>
                          {tokens < 200 && <BecomePro width="w-full" />}
                        </>
                      )}
                      {item.fieldName === "phoneNumber" ? (
                        <>
                          <PhoneInput
                            defaultCountry="in"
                            forceDialCode={true}
                            className="inputForm w-full bg-transparent rounded-md"
                            inputClassName="w-full text-2xl rounded-md py-2 px-4 editorPhNum"
                            value={phoneNum}
                            onChange={handlePhoneNumberChange}
                            inputProps={{
                              onBlur: (e: React.FocusEvent<HTMLInputElement>) =>
                                handleBlur(e, index),
                              id: item.fieldName,
                            }}
                          />
                          {phoneNum?.length !== 0 && (
                            <p className="text-red-500 font-medium text-xs pt-1">
                              {!isPhoneNumValid &&
                                isPhoneNumEditing &&
                                t("phoneNumNotValid")}
                            </p>
                          )}
                        </>
                      ) : (
                        item.type !== "file" &&
                        item.type !== "textarea" &&
                        item.fieldName !== "hobbies" &&
                        item.fieldName !== "causesList" &&
                        item.fieldName !== "address" && (
                          <>
                            <input
                              id={item.fieldName}
                              name={item.fieldName}
                              data-testid={`input-${index}`}
                              type={item.type ?? "text"}
                              autoComplete={item.autoComplete}
                              defaultValue={item.defaultValue}
                              placeholder={item.placeholder as string}
                              onBlur={(e) => handleBlur(e, index)}
                              onChange={handleError}
                              spellCheck={true}
                              className="inputForm rounded-md border-gray-300"
                            />
                            <p className="text-red-500 text-xs font-medium pt-1">
                              {fieldErrors[item.fieldName]}
                            </p>
                          </>
                        )
                      )}
                      {item.fieldName === "hobbies" &&
                        item.type !== "email" &&
                        item.type !== "file" &&
                        item.type !== "textarea" && (
                          <>
                            <ChipForm
                              itemList={userInfo.hobbies!}
                              property={t("hobbie")}
                              placeholder={t("enterHobbies")}
                            />
                          </>
                        )}
                      {item.fieldName === "causesList" &&
                        item.type !== "text" &&
                        item.type !== "textarea" && (
                          <>
                            <ChipForm
                              itemList={userInfo.causesList!}
                              property={t("causesList")}
                              placeholder={t("enterCauses")}
                            />
                          </>
                        )}
                      {item.fieldName === "address" && <AddressAutoComplete />}
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
