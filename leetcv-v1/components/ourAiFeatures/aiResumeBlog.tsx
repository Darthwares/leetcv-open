import React from "react";
import { useTranslations } from "next-intl";
import AiFeatureBlog from "./aiFeaturesBlog";
import { getAiResumeBlogContent } from "@constants/defaults";

const AiResumeBlog = () => {
  const t = useTranslations("AiResumeBlog");
  const content = getAiResumeBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default AiResumeBlog;
