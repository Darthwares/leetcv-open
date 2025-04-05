import { profileResumeState } from "@state/state";
import React from "react";
import { QRCode } from "react-qrcode-logo";
import { useRecoilState } from "recoil";

const QrCode = () => {
  const [resume] = useRecoilState(profileResumeState);
  const qrValue = `${window?.origin}/r/${resume?.handle}`;

  return (
    <div className="hidden md:block print:hidden" data-testid="qrCode">
      <div className="md:flex justify-center pb-4 lg:hidden hidden print:hidden">
        <QRCode qrStyle="dots" value={qrValue} size={120} />
      </div>
    </div>
  );
};

export default QrCode;
