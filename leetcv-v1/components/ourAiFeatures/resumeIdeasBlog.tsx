import React from "react";
import { useTranslations } from "next-intl";
import AiFeatureBlog from "./aiFeaturesBlog";
import { getResumeIdeasBlogContent } from "@constants/defaults";

const ResumeIdeasBlog = () => {
  const t = useTranslations("ResumeIdeasBlog");
  const content = getResumeIdeasBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default ResumeIdeasBlog;
