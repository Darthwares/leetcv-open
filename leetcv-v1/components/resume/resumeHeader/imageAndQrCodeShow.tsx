import ImageFallBack from "@components/imageFallBack";
import React from "react";
import { QRCode } from "react-qrcode-logo";

interface ImageAndQrCodeShowProps {
  hiddenImage: boolean;
  hiddenQrCode: boolean;
  showQR: boolean;
  qrValue: string;
  image: string;
  userName: string;
}

const ImageAndQrCodeShow = ({
  hiddenImage,
  hiddenQrCode,
  showQR,
  qrValue,
  image,
  userName,
}: ImageAndQrCodeShowProps) => {
  let contentToDisplay = null;

  if (!hiddenImage && !hiddenQrCode) {
    contentToDisplay = showQR ? (
      <QRCode qrStyle="dots" value={qrValue} size={108} />
    ) : (
      <ImageFallBack
        imgSrc={image}
        fallBackText={userName}
        avatarClass="w-32 h-32 md:h-28 md:w-24 rounded-md ring-2 ring-white sm:h-32 sm:w-32"
        avatarImgClass="w-full h-full overflow-hidden"
        avatarFallbackClass="w-32 h-32 md:h-28 md:w-24 rounded-md ring-2 ring-white sm:h-32 sm:w-32 text-white text-6xl"
      />
    );
  } else if (!hiddenImage) {
    contentToDisplay = (
      <ImageFallBack
        imgSrc={image}
        fallBackText={userName}
        avatarClass="w-32 h-32 md:h-28 md:w-24 rounded-md ring-2 ring-white sm:h-32 sm:w-32"
        avatarImgClass="w-full h-full overflow-hidden"
        avatarFallbackClass="w-32 h-32 md:h-28 md:w-24 rounded-md ring-2 ring-white sm:h-32 sm:w-32 text-white text-6xl"
      />
    );
  } else if (!hiddenQrCode) {
    contentToDisplay = <QRCode qrStyle="dots" value={qrValue} size={108} />;
  }

  return <div>{contentToDisplay}</div>;
};

export default ImageAndQrCodeShow;
