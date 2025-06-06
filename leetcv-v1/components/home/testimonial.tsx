import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "./container";
import { GridPattern } from "./gridPattern";
import { StarRating } from "./starRating";
import avatar from "@/public/assets/avatars/avatar-1.png";

export function Testimonial({ id, children }: any) {
  const tHome = useTranslations("HomePage");
  const author = {
    name: tHome("name"),
    role: tHome("role"),
    image: avatar,
  };
  return (
    <aside
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative bg-slate-100 py-16 sm:py-32"
    >
      <h3 id={`${id}-title`} className="sr-only">
        {tHome("testimonialOf")}
        {author.name}
      </h3>
      <div className="text-slate-900/10">
        <GridPattern x="50%" patternTransform="translate(0 80)" />
      </div>
      <Container size="xs" className="relative">
        <figure>
          <div className="flex text-slate-900 sm:justify-center">
            <StarRating />
          </div>
          <blockquote className="mt-10 font-display text-4xl font-medium tracking-tight text-slate-900 sm:text-center">
            {children}
          </blockquote>
          <figcaption className="mt-10 flex items-center sm:justify-center">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-slate-200">
              <Image src={author.image} alt="image" />
            </div>
            <div className="ml-4">
              <div className="text-base font-medium leading-6 tracking-tight text-slate-900">
                {author.name}
              </div>
              <div className="mt-1 text-sm text-slate-600">{author.role}</div>
            </div>
          </figcaption>
        </figure>
      </Container>
    </aside>
  );
}
