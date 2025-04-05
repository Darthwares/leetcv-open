import React from "react";
import { useTranslations } from "next-intl";
import AiFeatureBlog from "./aiFeaturesBlog";
import { getConvertResumeBlogContent } from "@constants/defaults";

const ConvertResumeBlog = () => {
  const t = useTranslations("ConvertResumeBlog");
  const content = getConvertResumeBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default ConvertResumeBlog;
