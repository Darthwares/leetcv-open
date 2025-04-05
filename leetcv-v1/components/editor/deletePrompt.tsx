import { ExclamationIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";

export interface DeletePromptProps {
  title?: string;
  actionHandle: () => void;
  setConfirmationVisible: React.Dispatch<React.SetStateAction<boolean>>;
  message?: string;
}
export default function DeletePrompt({
  title,
  actionHandle,
  setConfirmationVisible,
  message,
}: DeletePromptProps) {
  const t = useTranslations("Dashboard");

  return (
    <div className="relative w-full max-w-lg p-8 mx-auto bg-white rounded-md border-2 border-red-300 shadow-md shadow-red-200">
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900 capitalize">
            {title}
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {message ?? t("deleteMessage")}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 gap-4 md:gap-0 items-center flex justify-end">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-5 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => setConfirmationVisible(false)}
        >
          <span>{t("no")}</span>
        </button>
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-5 py-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => {
            actionHandle();
            setConfirmationVisible(false);
          }}
        >
          <span>{t("yes")}</span>
        </button>
      </div>
    </div>
  );
}
