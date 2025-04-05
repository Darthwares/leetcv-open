import { ChevronUpIcon, ExclamationIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import { Disclosure } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import LocationForm from "./locationForm";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";

export default function LocationList() {
  const t = useTranslations("Dashboard");
  const [userInfo] = useRecoilState(resumeState);
  const [missing, setMissing] = useState<any>();

  useEffect(() => {
    const missingField = [
      !userInfo.city && t("city"),
      !userInfo.state && t("state"),
      !userInfo.country && t("country"),
    ].find(Boolean);

    setMissing(missingField ?? "");
  }, [userInfo.city, userInfo.state, userInfo.country]);

  return (
    <div className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-1"
        data-testid="personalList"
      >
        <Disclosure>
          {({ open }) => (
            <div data-testid={`accordion`}>
              <Disclosure.Button className="dialog mb-[6px]">
                <div className="flex flex-wrap justify-between">
                  <span className="px-3" data-testid={`header-title`}>
                    {t("location")}
                  </span>
                  {missing && (
                    <span className="text-red-500 flex text-sm px-3 items-center gap-2">
                      <ExclamationIcon
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                      <span>
                        {t("add")} : {missing}
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
                <LocationForm />
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
