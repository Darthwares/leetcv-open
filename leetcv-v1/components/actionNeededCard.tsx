import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import React from "react";

interface ActionNeededCardProps {
  cardDescription: string;
}
const ActionNeededCard = ({ cardDescription }: ActionNeededCardProps) => {
  const t = useTranslations("Settings");

  return (
    <div className="rounded-lg bg-yellow-50 p-4 max-w-5xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            {t("actionNeeded")}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{cardDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionNeededCard;
