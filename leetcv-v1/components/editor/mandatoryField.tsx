import React from "react";
import { Field } from "./fieldMap";
import { useTranslations } from "next-intl";

interface MandatoryFieldProps {
  item: Field;
}

const MandatoryField = ({ item }: MandatoryFieldProps) => {
  const t = useTranslations("Dashboard");
  return (
    <span>
      {item.title}
      {item.mandatory && (
        <span className="text-red-500 text-sm"> {t("star")}</span>
      )}
      {!item.mandatory && item.fieldName !== "description" && (
        <span className="text-xs text-gray-500"> ({t("optional")})</span>
      )}
    </span>
  );
};

export default MandatoryField;
