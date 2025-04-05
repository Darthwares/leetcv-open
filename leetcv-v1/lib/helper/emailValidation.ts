import validator from "validator";
interface A1EmailValidationProps {
  value: string;
  items: any;
  setErrorState: React.Dispatch<React.SetStateAction<string>>;
  t: any;
}

export function emailValidation({
  value,
  items,
  setErrorState,
  t
}: A1EmailValidationProps) {
  
  const isInListMessage = isInList(value, items)
    ? t("emailAlreadyAdded")
    : "";
  const isEmailMessage = isEmail(value)
    ? ""
    : `${value} ${t("notValidEmail")}`;
  const errorMessage = isInListMessage || isEmailMessage;

  if (errorMessage) {
    setErrorState(errorMessage);
    return false;
  }
  setErrorState("");
  return true;
}
const isInList = (email: string, items: any) => {
  return items.includes(email);
};

export const isEmail = (email: string) => {
  return validator.isEmail(email);
};
