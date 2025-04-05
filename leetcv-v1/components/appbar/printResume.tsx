import { DownloadIcon } from "@heroicons/react/outline";
import { acceptedDescriptionsState } from "@state/state";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";

const PrintResume = () => {
  const t = useTranslations("Appbar");
  const [acceptedDescriptions, setAcceptedDescriptions] = useRecoilState(
    acceptedDescriptionsState
  );
  return (
    <button data-testid="printButton">
      <div
        className="app-bar-btn dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm"
        onClick={() => {
          setAcceptedDescriptions(true);
          window.print();
          window.onafterprint = () => {
            setAcceptedDescriptions(false);
          };
        }}
        data-testid="windowPrint"
      >
        <DownloadIcon className="w-5 h-5" data-testid="printerIcon" />
        <span className="hidden md:block" data-testid="print">
          {t("download")}
        </span>
      </div>
    </button>
  );
};

export default PrintResume;
