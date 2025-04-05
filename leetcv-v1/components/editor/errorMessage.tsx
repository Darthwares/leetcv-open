import { useTranslations } from "next-intl";
import React from "react";

interface ErrorMessageProps {
  error: string;
  id?: string;
}

const ErrorMessage = ({ error}: ErrorMessageProps) => {
  const t = useTranslations("Dashboard");
  return (
    <div>
      {error && (
        <p className="text-red-500 text-sm pt-1">
          <span className="capitalize">{error} </span>
          {error !== "invalidURL" && (
            <span className="">{t("isMandatory")}</span>
          )}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
