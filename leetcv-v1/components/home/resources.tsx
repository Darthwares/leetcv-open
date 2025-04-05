import { useTheme } from "next-themes";
import { Container } from "./container";
import { SectionHeading } from "./sectionHeading";
import { useTranslations } from "next-intl";

const useResources = (theme: string) => {
  const resources = [
    {
      title: "Share private with anyone",
      description:
        "Sharing is done with passcode, your recruiter can share it to their team. ",
      image: function ResumeImage() {
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#2C313D_35%,#000)]">
            <lottie-player
              src="/assets/lottie/share.json"
              background={theme === "dark" ? "" : "white"}
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        );
      },
    },
    {
      title: "Control access to your resume",
      description:
        "You can deny access and revoke permission to view your resume any time.",
      image: function VideoPlayerImage() {
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#2C313D_35%,#000)]">
            <lottie-player
              src="/assets/lottie/security-lock.json"
              background={theme === "dark" ? "" : "white"}
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        );
      },
    },
    {
      title: "Receive feedback from your Peers",
      description:
        "We have proven that getting peer feedback on resume is more valuable than hiring someone to write your resume",
      image: function VideoPlayerImage() {
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(#2C313D_35%,#000)]">
            <lottie-player
              src="/assets/lottie/customer-rating.json"
              background={theme === "dark" ? "" : "white"}
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </div>
        );
      },
    },
  ];
  return resources;
};

export function Resources() {
  const t = useTranslations("HomePage");
  const { theme } = useTheme();
  const resources = useResources(theme!);

  return (
    <section
      id="Share"
      aria-labelledby="resources-title"
      className="scroll-mt-16 pt-2 pb-4 sm:scroll-mt-28 sm:pt-8 sm:pb-4 lg:pt-12 lg:pb-4"
    >
      <Container>
        <SectionHeading
          number="2"
          id="resources-title"
          data-testid="resourcesTitle"
        >
          {t("resourcesTitle")}
        </SectionHeading>
        <h2 className="brand-header text-3xl sm:text-6xl">{t("resourcesTools")}</h2>
        <p className="mt-4 text-lg tracking-tight dark:text-gray-200 text-slate-700">
          {t("resourcesParagraph")}
        </p>
      </Container>
      <Container size="lg" className="mt-16">
        <ol className="-mx-3 grid grid-cols-1 gap-y-10 lg:grid-cols-3 lg:text-center lg:justify-items-center xl:-mx-12 xl:divide-x xl:divide-slate-400/20">
          {resources.map((resource) => (
            <li
              key={resource.title}
              className="grid auto-rows-min grid-cols-1 items-center gap-8 px-3 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-1 xl:px-12"
            >
              <div className="relative h-48 overflow-hidden rounded-2xl shadow-lg sm:h-60 lg:h-40">
                <resource.image />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight dark:text-gray-100 text-slate-800">
                  {resource.title}
                </h3>
                <p className="mt-2 text-sm dark:text-gray-200 text-slate-600">
                  {resource.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
