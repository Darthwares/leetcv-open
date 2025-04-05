import { useTranslations } from "next-intl";
import { Container } from "./container";
import Tiers from "@components/pricing/tiers";

// export function Pricing() {
export function Pricing({
  razorpayCustomerId,
}: {
  razorpayCustomerId: string;
}) {
  const t = useTranslations("Pricing");

  return (
    <section
      id="Pricing"
      aria-labelledby="pricing-title"
      className="scroll-mt-16 pt-2 pb-4 text-center sm:scroll-mt-28 sm:pt-8 sm:pb-4 lg:pt-12 lg:pb-4"
    >
      <Container>
        <p className="font-bold text-slate-800 text-3xl text-center sm:text-4xl">
          {t("heading")}
        </p>
        <p className="text-lg mt-5 text-center tracking-tight dark:text-gray-200 text-slate-600">
          {t("description")}
        </p>
      </Container>
      <div className="my-10 lg:mt-16 lg:mb-4 px-3 sm:px-6">
        <Tiers razorpayCustomerId={razorpayCustomerId!} />
      </div>
    </section>
  );
}
