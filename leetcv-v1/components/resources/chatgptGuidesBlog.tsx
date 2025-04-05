import AiFeatureBlog from "@components/ourAiFeatures/aiFeaturesBlog";
import { getChatGPTJobGuideContent } from "@constants/defaults";
import { useTranslations } from "next-intl";
import React from "react";

const ChatgptGuidesBlog = () => {
  const t = useTranslations("ChatGptJobGuideBlog");
  const content = getChatGPTJobGuideContent(t);

  return <AiFeatureBlog {...content} />;
};

export default ChatgptGuidesBlog;
