import AiFeatureBlog from "@components/ourAiFeatures/aiFeaturesBlog";
import { getJobSearchTipsBlogContent } from "@constants/defaults";
import { useTranslations } from "next-intl";
import React from "react";

const JobSearchTipsBlog = () => {
  const t = useTranslations("JobSearchTipsBlog");
  const content = getJobSearchTipsBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default JobSearchTipsBlog;
