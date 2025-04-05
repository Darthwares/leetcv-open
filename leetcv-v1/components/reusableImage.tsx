import React from "react";
import ImageFallBack from "./imageFallBack";

type ReusableImageProps = {
  src: string;
  className: string;
  displayName: string;
};

const ReusableImage = ({ src, className, displayName }: ReusableImageProps) => {
  return (
    <ImageFallBack
      imgSrc={src}
      fallBackText={displayName}
      avatarClass={className}
      avatarImgClass="w-full h-full overflow-hidden"
      avatarFallbackClass={className}
    />
  );
};

export default ReusableImage;
