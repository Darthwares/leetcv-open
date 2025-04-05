import { ChevronUpIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import ProfessionForm from "./professionForm";
import { resumeState } from "@state/state";
import { useRecoilState } from "recoil";

export default function ProfessionList() {
  const t = useTranslations("Dashboard");
  const [userInfo] = useRecoilState(resumeState);
  const [missingFieldError, setMissingFieldError] = useState<any>();

  useEffect(() => {
    const missingField = [
      !userInfo.position && t("position"),
      !userInfo.currentCompany && t("currentCompany"),
      userInfo.preferences?.length === 0 && t("preference"),
      userInfo.skills?.length === 0 && t("skills"),
      !userInfo.yearOfExperience && t("yoe"),
    ].find(Boolean);

    setMissingFieldError(missingField ?? "");
  }, [
    userInfo.position,
    userInfo.currentCompany,
    userInfo.preferences?.length,
    userInfo.skills?.length,
    userInfo.yearOfExperience,
  ]);

  return (
    <div className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-1 pb-1.5"
        data-testid="professionList"
      >
        <Disclosure>
          {({ open }) => (
            <div data-testid={`accordion`}>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-50 px-1 py-3 text-left text-sm font-medium text-black hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-black-500 focus-visible:ring-opacity-75">
                <div className="flex flex-wrap">
                  <span className="px-3" data-testid={`header-title`}>
                    {t("profession")}
                  </span>
                  {missingFieldError && (
                    <span className="text-red-500 flex text-sm px-3 items-center gap-2">
                      <ExclamationIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <span>
                        {t("add")} : {missingFieldError}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex">
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } chero-Icon1`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="w-full pb-2 text-sm rounded-b mb-7">
                <ProfessionForm />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
