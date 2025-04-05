import {
  profileResumeState,
  resumeBannerColorState,
  resumeFontState,
} from "@state/state";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { ResumeHeaderDetails } from "./resumeHeaderDetails";
import MoreOptions from "./moreOptions";
import { getHandle } from "@constants/defaults";
import ImageAndQrCodeShow from "./imageAndQrCodeShow";
import ToggleQrCode from "@components/toggleQrcode";

const MobileResumeHeader = () => {
  const [resume] = useRecoilState(profileResumeState);
  const [showQR, setShowQR] = useState(false);
  const qrValue = getHandle(`${window?.origin}/r/${resume?.handle}`);
  const shouldShowButton = !resume.hiddenImage && !resume.hiddenQrCode;
  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");
  const [font] = useRecoilState(resumeFontState);
  const [selectedBannerColor] = useRecoilState(resumeBannerColorState);

  return (
    <div className="space-y-1 block md:hidden print:hidden relative">
      <div className="mt-3 relative">
        <div className="flex justify-center relative md:hidden print:hidden">
          <div className={`h-36 w-full ${selectedBannerColor}`} />
        </div>
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="print:mt-16 -mt-16 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex relative">
              <ImageAndQrCodeShow
                hiddenQrCode={resume?.hiddenQrCode!}
                hiddenImage={resume?.hiddenImage!}
                qrValue={qrValue}
                showQR={showQR}
                image={resume?.image!}
                userName={resume?.displayName!}
              />
              <div className="w-full absolute bottom-4 left-[8.5rem] flex justify-start print:hidden max-w-fit">
                <div className="pb-2">
                  {shouldShowButton && (
                    <ToggleQrCode showQR={showQR} setShowQR={setShowQR} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResumeHeaderDetails />
      {location.pathname !== "/" &&
        location.pathname !== "/s/aiResume" &&
        basePath !== "/openai/resume" &&
        location.pathname !== "/s/convert" && (
          <>
            <div className="w-full absolute top-[9.3rem] right-2 flex justify-end items-end print:hidden max-w-fit">
              <MoreOptions />
            </div>
          </>
        )}
      <div className="print:mt-5">
        {resume?.description && (
          <p
            className={`${font.className} md:pl-3 py-1 mt-2 justify-center lg:justify-start callout-bg rounded-md px-3`}
          >
            {resume?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default MobileResumeHeader;
