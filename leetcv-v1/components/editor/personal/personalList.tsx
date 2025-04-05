import { ChevronUpIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import PersonalForm from "./personalForm";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";

export default function PersonalList() {
  const t = useTranslations("Dashboard");
  const [userInfo] = useRecoilState(resumeState);
  const [missingField, setMissingField] = useState<any>();

  useEffect(() => {
    const missingField = [
      !userInfo.displayName && t("displayName"),
      !userInfo.description && "description",
      !userInfo.email && t("email"),
      !userInfo.phoneNumber && t("phoneNumber"),
      !userInfo.address && t("address"),
    ].find(Boolean);

    setMissingField(missingField ?? "");
  }, [
    userInfo.displayName,
    userInfo.email,
    userInfo.phoneNumber,
    userInfo.description,
    userInfo.hobbies?.length,
    userInfo.address,
  ]);

  return (
    <div className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="personalList"
      >
        <Disclosure defaultOpen={true}>
          {({ open }) => (
            <div data-testid={`personal-accordion`}>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-50 px-1 py-3 text-left text-sm font-medium text-black hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-black-500 focus-visible:ring-opacity-75">
                <div className="flex flex-wrap justify-between">
                  <span className="px-3" data-testid={`personal-title`}>
                    {t("personal")}
                  </span>
                  {missingField && (
                    <span className="text-red-500 flex text-sm px-3 items-center gap-2">
                      <ExclamationIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <span>
                        {t("add")} : {missingField}
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex flex-col md:flex-row md:gap-x-4">
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } chero-Icon1`}
                  />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel
                className="w-full pb-2 text-sm rounded-b mb-7"
                data-testid="disclosure-panel"
              >
                <PersonalForm />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
