import AiFeatureBlog from "@components/ourAiFeatures/aiFeaturesBlog";
import { getCaseStudiesBlogContent } from "@constants/defaults";
import { useTranslations } from "next-intl";
import React from "react";

const CaseStudiesBlog = () => {
  const t = useTranslations("CaseStudiesBlog");
  const content = getCaseStudiesBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default CaseStudiesBlog;
