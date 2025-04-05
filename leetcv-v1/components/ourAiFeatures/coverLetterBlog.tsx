import React from "react";
import { useTranslations } from "next-intl";
import AiFeatureBlog from "./aiFeaturesBlog";
import { getCoverLetterBlogContent } from "@constants/defaults";

const CoverLetterBlog = () => {
  const t = useTranslations("CoverLetterBlog");
  const content = getCoverLetterBlogContent(t);

  return <AiFeatureBlog {...content} />;
};

export default CoverLetterBlog;
