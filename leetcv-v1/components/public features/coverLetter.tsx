import Link from "next/link";
interface FeatureSectionProps {
  title: string;
  description: string;
  imageUrl: string;
  linkText: string;
  linkUrl: string;
  reverse?: boolean;
  listItems?: string[];
}
function FeatureSection({
  title,
  description,
  imageUrl,
  linkText,
  linkUrl,
  reverse,
  listItems,
}: FeatureSectionProps) {
  return (
    <section
      className={`grid gap-8 grid-cols-1 lg:grid-cols-2 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex flex-col items-center space-y-4 text-center lg:items-start lg:text-left ${
          reverse ? "order-2 lg:order-1" : ""
        }`}
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        {listItems && (
          <ul className="space-y-2 text-left">
            {listItems.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <CheckIcon className="text-primary" />
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
        className={`flex justify-center ${reverse ? "order-1 lg:order-2" : ""}`}
      >
        <img src={imageUrl} alt={title} className="rounded-lg shadow-lg" />
      </div>
    </section>
  );
}
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
interface AIFeatureProps {
  sections?: FeatureSectionProps[];
}
export default function CoverLetter({ sections = [] }: AIFeatureProps) {
  return (
    <>
      <div className="section no-top-space bg-gradient-to-r from-pink-500 to-indigo-500 flex flex-col items-center justify-center w-full py-10">
        <img src="/assets/curve.svg" alt="leetCV asset" className="divider divider-top" />
        <div className="container-copy max-w-[85rem] mx-auto px-5 pt-12">
          <header className="text-center">
            <h2 className="md:text-3xl text-2xl text-center font-bold text-white">
              Features and Benefits
            </h2>
            <p className="mt-4 text-lg max-w-2xl text-center text-white">
              Get expertly-crafted headlines and about sections, tailored to
              your target job functions, that will help you stand out from the
              competition and get noticed by recruiters and hiring managers.
            </p>
          </header>
          <div className="flex flex-col items-center w-full px-4 py-8 bg-[#f5f7fb] md:px-8 rounded-md mt-24">
            <div className="my-24 sm:px-10 space-y-36">
              {sections.map((section, index) => (
                <FeatureSection key={index} {...section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
