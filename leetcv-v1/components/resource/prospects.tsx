import { useTranslations } from "next-intl";

function ProspectResources() {
  const t = useTranslations("Prospects");

  return (
    <div
      data-testid="prospectResources"
      className="grid col-span-1 place-content-center"
    >
      <section
        id="prospects"
        aria-labelledby="prospects-title"
        className="md:scroll-mt-32 py-8 scroll-mt-7 md:py-20 lg:py-5"
      >
        <p className="mt-8 brand-grad  font-display text-2xl font-bold tracking-tight text-gray-800 text-center">
          {t("viewApprovals")}
        </p>
        <p className="my-3 text-base tracking-tight text-gray-500 text-center">
          {t("viewApprovals")}
        </p>

        <div className="flex items-center justify-center py-10 w-full h-full">
          <div className="w-80 relative">
            <lottie-player
              src="/assets/lottie/share.json"
              background="white"
              speed="1"
              loop
              autoplay
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProspectResources;
