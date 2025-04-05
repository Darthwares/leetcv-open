import AiFeatureBlog from "@components/ourAiFeatures/aiFeaturesBlog";
import { getInterviewGuideBlogContent } from "@constants/defaults";
import { useTranslations } from "next-intl";
import React from "react";

const InterviewGuidesBlog = () => {
  const t = useTranslations("InterviewGuideBlog");
  const content = getInterviewGuideBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default InterviewGuidesBlog;
