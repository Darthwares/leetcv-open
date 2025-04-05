import { useTranslations } from "next-intl";
import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import LogOutButton from "./logOutButton";

const Logout = () => {
  const t = useTranslations("Appbar");

  return (
    <div className="w-full rounded-2xl -mt-10 lg:-mt-12">
      <div className="md:py-[20px] gap-5 flex flex-col">
        <div className="rounded-md bg-yellow-50 p-5">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon
                className="h-5 w-5 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                {t("attentionNeeded")}
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc leading-6">
                  <li>{t("signOutWarningOne")}</li>
                  <li>{t("signOutWarningTwo")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <LogOutButton />
      </div>
    </div>
  );
};

export default Logout;
