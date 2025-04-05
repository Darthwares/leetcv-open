import FeatureContent from "@components/home/featureContent";
import FeatureImage from "@components/home/featureImage";
import { SvgDotGrid } from "@components/svgGrid";
import { useFeatures } from "@constants/defaults";
import { useTranslations } from "next-intl";

export default function ExploreFeatures() {
  const t = useTranslations("Feature");
  const features = useFeatures(t);

  return (
    <div className="max-w-7xl mx-auto" id="features-list">
      {features.map((feature) => (
        <div key={feature.id} className="relative overflow-hidden py-4 lg:py-6">
          <SvgDotGrid />
          <main className="mx-auto mt-8 lg:mt-10 max-w-7xl px-4 grid lg:grid-cols-2 items-center grid-cols-1 gap-10">
            <FeatureContent
              id={feature.id}
              src={feature.contentVideoSrc}
              orderStyle={feature.contentOrderStyle}
              heading={feature.heading}
              subHeading={feature.subHeading}
              description={feature.description}
              directedLink={feature.directedLink}
            />
            <FeatureImage
              id={feature.id}
              src={feature.imageSrc}
              orderStyle={feature.imageOrderStyle}
            />
          </main>
        </div>
      ))}
    </div>
  );
}
