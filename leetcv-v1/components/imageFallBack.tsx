import { getFirstLetter, getRandomBgColor } from "@constants/defaults";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../shadcn/components/ui/avatar";

type ImageFallBackProps = {
  imgSrc: string;
  fallBackText: string;
  avatarClass: string;
  avatarImgClass: string;
  avatarFallbackClass: string;
};

const ImageFallBack = ({
  imgSrc,
  fallBackText,
  avatarClass,
  avatarImgClass,
  avatarFallbackClass,
}: ImageFallBackProps) => {
  const firstChar = getFirstLetter(fallBackText);
  const rgb = getRandomBgColor(fallBackText);

  return (
    <Avatar className={avatarClass}>
      <AvatarImage src={imgSrc} alt={fallBackText} className={avatarImgClass} />
      <AvatarFallback
        className={`${avatarFallbackClass} capitalize text-white`}
        style={{ background: `${rgb}` }}
      >
        {firstChar}
      </AvatarFallback>
    </Avatar>
  );
};

export default ImageFallBack;
