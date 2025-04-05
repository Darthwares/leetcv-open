import { CheckCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useEffect } from "react";
interface FeatureSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
  reverse?: boolean;
  listItems?: string[];
}
const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  imageUrl,
  linkText,
  linkUrl,
  reverse,
  listItems,
}) => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <section className="grid gap-8 grid-cols-1 lg:grid-cols-2 place-items-center">
      <div
        className={`flex flex-col space-y-4 text-left  ${
          reverse ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        {listItems && (
          <ul className="space-y-3 text-left">
            {listItems.map((item, index) => (
              <li
                key={index}
                className="flex font-medium text-gray-800 space-x-2"
              >
                <CheckCircleIcon className="text-green-600 w-5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {linkText && linkUrl && (
          <Link href={linkUrl} className="text-primary" prefetch={false}>
            {linkText}
          </Link>
        )}
      </div>
      <div
        className={`flex justify-center ${
          reverse ? "lg:order-1" : "lg:order-2"
        }`}
      >
        <div className="md:h-96 max-w-xl">
          <lottie-player
            src={imageUrl}
            alt={title}
            speed="1"
            loop
            autoplay
            data-testid="lottie"
          ></lottie-player>
        </div>
      </div>
    </section>
  );
};

interface AIFeatureProps {
  sections: FeatureSectionProps[];
  description: string;
}
const AIFeature: React.FC<AIFeatureProps> = ({ sections, description }) => {
  return (
    <div className="section no-top-space bg-gradient-to-r from-pink-500 to-indigo-500 flex flex-col items-center justify-center w-full py-10 pb-20 ">
      <img
        src="/assets/curve.svg"
        alt="leetCV asset"
        className="divider divider-top"
      />
      <div className="container-copy max-w-[85rem] mx-auto px-5">
        <header className="text-center">
          <h2 className=" md:text-3xl text-2xl text-center font-bold text-white mt-10">
            Features and Benefits
          </h2>
          <p className="mt-6 text-lg max-w-2xl text-center text-white">
            {description}
          </p>
        </header>
        <div className="flex flex-col items-center w-full px-4 py-8 bg-[#f5f7fb] md:px-8 rounded-md mt-12 sm:mt-24">
          <div className="my-12 sm:my-24 sm:px-10 space-y-20 sm:space-y-36">
            {sections.map((section, index) => (
              <FeatureSection key={index} {...section} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIFeature;
