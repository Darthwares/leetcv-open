import Notification from "@components/notification";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  claimHandleState,
  resumeState,
  selectedHandleState,
  selectedStatusState,
  showButtonToggleState,
  specialCharNotAllowed,
  userIdState,
} from "@state/state";
import { trpc } from "../../utils/trpc";
import SelectHandle from "./selectHandle";
import dynamic from "next/dynamic";
import { getTourConfig } from "@lib/helper/tourConfig";
import CopyLink from "@components/copyLink";
import ActionNeededCard from "@components/actionNeededCard";

const Stepper = dynamic(() => import("../onboarding"), {
  ssr: false,
});

export default function ClaimUserHandle() {
  const [userId] = useRecoilState(userIdState);
  const isExists = trpc.useMutation("fs.handle.isExists");
  const t = useTranslations("UserName");
  const tSetting = useTranslations("Settings");
  const selectedHandle = useSetRecoilState(selectedHandleState);
  const selectedStatus = useSetRecoilState(selectedStatusState);
  const toggleButton = useSetRecoilState(showButtonToggleState);
  const [userInfo] = useRecoilState(resumeState);
  const setIsDisabled = useSetRecoilState(claimHandleState);
  const setNotAllowed = useSetRecoilState(specialCharNotAllowed);
  const [toggle] = useRecoilState(showButtonToggleState);
  const [value, setValue] = useState("");

  const [timeoutState, setTimeoutState] = useState<NodeJS.Timeout>();
  const tour = getTourConfig();

  const step = [
    {
      target: ".handleName",
      content: t("userHandleName"),
    },
    {
      target: ".visitProfile",
      content: t("checkYourResume"),
    },
    {
      target: ".edit",
      content: t("editButton"),
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value.toLowerCase();
    setValue(text);
    const checkSpace = text.includes(" ");
    const checkSpecialCharacters = /\W/.test(text);

    if (!value) {
      return;
    }

    if (checkSpecialCharacters) {
      return setNotAllowed(true);
    }
    if (checkSpace) {
      return setIsDisabled(true);
    }
    setIsDisabled(false);
    setNotAllowed(false);
    clearTimeout(timeoutState);
    const timeout = setTimeout(() => {
      selectedHandle(text);
      isExists.mutate(
        {
          handle: e.target.value,
          id: userId,
        },
        {
          onSuccess: (isPresent: boolean) => {
            selectedStatus(isPresent ? "exists" : "available");
          },
        }
      );
    }, 1000);
    setTimeoutState(timeout);
  };

  return (
    <div className="min-h-[60vh] flex flex-col" data-testid="claimUserHandle">
      <div className="hidden md:block">
        {tour.userTour === "false" && <Stepper tourConfig={step} />}
      </div>
      <div className="w-full space-y-4 px-3 mt-6 lg:mt-0 lg:py-8">
        <div className="text-xl text-gray-700 font-bold">
          <h2>{tSetting("claimHandle")}</h2>
        </div>
        <p className="max-w-5xl">{tSetting("claimHandleDescription")}</p>
        <main className="px-4 rounded-2xl max-w-5xl relative top-4 bg-indigo-50 sm:px-6 md:px-0 py-5 lg:flex-auto lg:px-8 ">
          <div className="md:px-8 md:py-4 lg:py-[20px]">
            <div className="bg-indigo-50">
              <div className=" flex justify-between items-center flex-wrap sm:flex-nowrap md:flex-nowrap">
                <div className="ml-4 md:ml-0 w-full flex flex-col gap-2.5">
                  <h3 className="text-lg leading-6 font-medium handleName">
                    <span className="mr-1">{"@"}</span>
                    {userInfo?.handle}
                  </h3>
                  <CopyLink
                    copyText={t("copy")}
                    copied={t("copied")}
                    copyClass="text-sm"
                    copiedClass="text-sm"
                    url={`${window.origin}/r/${userInfo?.handle}`}
                  />
                  <CopyLink
                    copyText={t("copyPortfolio")}
                    copied={t("copied")}
                    copyClass="text-sm"
                    copiedClass="text-sm"
                    url={`${window.origin}/p/${userInfo?.handle}`}
                  />
                </div>
                <div className="ml-4 md:ml-0 mt-4 sm:mt-0 flex-shrink-0">
                  {!toggle && (
                    <button
                      onClick={() => {
                        toggleButton(true);
                        selectedStatus("");
                        setValue("");
                      }}
                      type="button"
                      className="edit relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t("edit")}
                    </button>
                  )}
                  {toggle && (
                    <button
                      onClick={() => toggleButton(false)}
                      type="button"
                      className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {t("cancel")}
                    </button>
                  )}
                </div>
              </div>
            </div>
            {toggle && (
              <div className="mt-8 sm:w-full sm:max-w-md transition-all duration-500">
                <div className="bg-white shadow rounded-lg p-4">
                  <form
                    className="space-y-1"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div>
                      <label
                        htmlFor="username"
                        className="block font-medium text-gray-700"
                      >
                        {t("claimUserName")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="username"
                          name="username"
                          type="text"
                          autoComplete="username"
                          required
                          value={value}
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="Username"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <SelectHandle />
                  </form>
                </div>
              </div>
            )}
          </div>
        </main>
        <Notification />
      </div>
    </div>
  );
}
