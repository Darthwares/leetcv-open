import ReusablePlaceholder from "@components/reusablePlaceholder";
import { useTranslations } from "next-intl";

export default function ResumeReviewHero() {
  const t = useTranslations("ResumeIdeas");

  return (
    <div
      className="overflow-hidden bg-white lg:px-1"
      data-testid="resumeReviewHero"
    >
      <ReusablePlaceholder
        title={t("heroTitle")}
        description={t("heroDescription")}
        lottie="job-desciption"
      />
    </div>
  );
}
