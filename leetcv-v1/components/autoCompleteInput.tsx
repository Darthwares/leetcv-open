import { useTranslations } from "next-intl";
import {
  AutoComplete,
  AutoCompleteChangeParams,
} from "primereact/autocomplete";
import React from "react";

interface AutoCompleteInputProps {
  inputId: string;
  inputValue: any;
  placeholder?: string;
  items: Array<string>;
  search: (event: { query: string }) => void;
  handleBlur?: (
    e: React.ChangeEvent<HTMLInputElement> | AutoCompleteChangeParams
  ) => void;
  handleInputChange: (e: AutoCompleteChangeParams) => void;
  handleAutoCompleteKeyDown?: (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => void;
  className: string;
  inputClassName: string;
}

const AutoCompleteInput = (props: Readonly<AutoCompleteInputProps>) => {
  const {
    inputId,
    inputValue,
    placeholder,
    items,
    search,
    handleBlur,
    handleInputChange,
    handleAutoCompleteKeyDown,
    className,
    inputClassName,
  } = props;
  const t = useTranslations("Dashboard");

  return (
    <div data-testid="autoCompleteInput" className="w-full">
      <AutoComplete
        inputId={inputId}
        value={inputValue}
        placeholder={placeholder}
        suggestions={items}
        completeMethod={search}
        onBlur={handleBlur}
        onChange={handleInputChange}
        onKeyDown={handleAutoCompleteKeyDown}
        className={className}
        inputClassName={inputClassName}
      />
      {!inputValue && inputId !== "hobbies" && (
        <p className="text-red-500 text-sm pt-1">
          <span className="capitalize">{inputId}</span> {t("isMandatory")}
        </p>
      )}
    </div>
  );
};

export default AutoCompleteInput;
