import { useTranslations } from "next-intl";
import React from "react";
import { PhotographIcon, QrcodeIcon } from "@heroicons/react/outline";

type ToggleQrCodeProps = {
  showQR: boolean;
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleQrCode = ({ showQR, setShowQR }: ToggleQrCodeProps) => {
  const t = useTranslations("PersonalSection");

  return (
    <button
      className="px-2 app-bar-btn flex items-center gap-1 text-sm border border-gray-400 py-1"
      onClick={() => {
        setShowQR(!showQR);
      }}
      data-testid="toggle-qr-code-btn"
    >
      {showQR ? (
        <PhotographIcon className="w-5 h-5 lg:w-[18px] lg:h-[18px]" />
      ) : (
        <QrcodeIcon className="w-5 h-5 lg:w-[18px] lg:h-[18px]" />
      )}

      <span className="whitespace-nowrap text-xs">
        {showQR ? t("showAvatar") : t("showQR")}
      </span>
    </button>
  );
};

export default ToggleQrCode;
