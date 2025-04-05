import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "./container";
import { SectionHeading } from "./sectionHeading";
import { videos } from "@constants/defaults";

export default function Build() {
  const tHome = useTranslations("HomePage");
  return (
    <section
      id="Build"
      aria-labelledby="screencasts-title"
      className="scroll-mt-16 pt-2 pb-4 sm:scroll-mt-28 sm:pt-8 sm:pb-4 lg:pt-12 lg:pb-4"
    >
      <Container>
        <SectionHeading number="2" id="screencasts-title">
          {tHome("screencastsText")}
        </SectionHeading>
        <p className="mt-8 pb-8 brand-grad font-display text-6xl font-bold tracking-tight">
          {tHome("screencastsHeading")}
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          {tHome("screencastsDescription")}
        </p>
      </Container>
      <Container size="lg" className="mt-16">
        <ol className="grid grid-cols-1 gap-y-10 gap-x-8 [counter-reset:video] sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <li key={video.title} className="[counter-increment:video]">
              <div
                className="relative flex h-44 items-center justify-center rounded-2xl px-6 shadow-lg"
                style={{
                  backgroundImage:
                    "conic-gradient(from -49.8deg at 50% 50%, #7331FF 0deg, #00A3FF 59.07deg, #4E51FF 185.61deg, #39DBFF 284.23deg, #B84FF1 329.41deg, #7331FF 360deg)",
                }}
              >
                <div className="flex overflow-hidden rounded shadow-sm">
                  <Image src={video.image} alt={video.title}/>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center rounded-lg bg-black/30 px-1.5 py-0.5 text-sm text-white [@supports(backdrop-filter:blur(0))]:bg-white/10 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 fill-current stroke-current"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6.75 10.25v-4.5L10.25 8l-3.5 2.25Z" />
                    <circle cx="8" cy="8" r="6.25" fill="none" />
                  </svg>
                  <time
                    dateTime={`${video.runtime.minutes}m ${video.runtime.seconds}s`}
                    className="ml-2"
                  >
                    {`${video.runtime.minutes}:${video.runtime.seconds
                      .toString()
                      .padStart(2, "0")}`}
                  </time>
                </div>
              </div>
              <h3 className="mt-8 text-base font-medium tracking-tight text-slate-900 before:mb-2 before:block before:font-mono before:text-sm before:text-slate-500 before:content-[counter(video,decimal-leading-zero)]">
                {video.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{video.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
