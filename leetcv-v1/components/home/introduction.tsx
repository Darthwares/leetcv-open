import { Container } from "./container";
import { useTranslations } from "next-intl";
import { List } from "../../constants/defaults";
import { signIn } from "next-auth/react";

export function Introduction() {
  const tHome = useTranslations("HomePage");
  return (
    <section
      id="introduction"
      aria-labelledby="introduction-title"
      className="pt-20 pb-16 sm:pb-20 md:pt-36 lg:py-32"
      data-testid="introduction"
    >
      <h2 id="introduction-title" className="sr-only"></h2>
      <Container>
        <p
          className="font-display text-4xl font-bold tracking-tight text-slate-900"
          data-testid="introHeading"
        >
          {tHome("introHeading")}
        </p>
        <ul className="mt-8 space-y-3 text-lg tracking-tight text-slate-700">
          {List.map((feature, index) => (
            <li key={feature} className="flex" data-testid={`feature-${index}`}>
              <svg
                aria-hidden="true"
                className="h-8 w-8 flex-none fill-blue-500"
              >
                <path d="M11.83 15.795a1 1 0 0 0-1.66 1.114l1.66-1.114Zm9.861-4.072a1 1 0 1 0-1.382-1.446l1.382 1.446ZM14.115 21l-.83.557a1 1 0 0 0 1.784-.258L14.115 21Zm.954.3c1.29-4.11 3.539-6.63 6.622-9.577l-1.382-1.446c-3.152 3.013-5.704 5.82-7.148 10.424l1.908.598Zm-4.9-4.391 3.115 4.648 1.661-1.114-3.114-4.648-1.662 1.114Z" />
              </svg>
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
        <p
          className="mt-4 text-lg tracking-tight text-slate-700"
          data-testid="descriptionFour"
        >
          {tHome("descriptionFour")}
        </p>
        <p className="mt-10"
          onClick={() => {
            signIn();
          }}
        >
          <a
            href="#start-creating"
            className="text-base font-medium tracking-tight text-blue-600 hover:text-blue-800"
            data-testid="createResumeToday"
          >
            {tHome("createResumeToday")} &rarr;
          </a>
        </p>
      </Container>
    </section>
  );
}
