import { useEffect, useRef, useState, useCallback } from "react";
import { XIcon } from "@heroicons/react/outline";
import { FunnelIconSvg } from "@components/svg";
import { ResumeHit } from "@components/search/AlgoliaSearch";
import { CustomRefinementListComponent } from "./customRefinement";
import {
  ClearRefinements,
  connectHits,
  ToggleRefinement,
} from "react-instantsearch-dom";
import CustomExperienceRefinement from "./customExperienceRefinement";
import CustomSortByExp from "./customSortByExp";
import { refinementData } from "@constants/defaults";
import { useTranslations } from "next-intl";
import { experienceFilterState, experienceSortingState } from "@state/state";
import { useSetRecoilState } from "recoil";

const MobileSearchFilter = ({ hits }: { hits: any }) => {
  const t = useTranslations("AlgoliaSearch");
  const filterRef = useRef<HTMLDivElement>(null);

  const toggleFilters = useCallback((action: "open" | "close") => {
    if (filterRef.current) {
      filterRef.current.classList.toggle("hidden", action === "close");
      filterRef.current.classList.toggle("visible", action === "open");
    }
  }, []);

  return (
    <div className="bg-white seacrhInputs">
      <div>
        <FilterSidebar
          filterRef={filterRef}
          closeFilters={() => toggleFilters("close")}
          t={t}
        />
        <main className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-end my-4">
            <FilterButtons openFilters={() => toggleFilters("open")} />
          </div>
          <section aria-labelledby="products-heading" className="pb-24">
            <h2 id="products-heading" className="sr-only">
              Resumes
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <FilterForm />
              </form>
              <div className="lg:col-span-3">
                <ResumeHit />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const FilterSidebar = ({
  filterRef,
  closeFilters,
  t,
}: {
  filterRef: React.RefObject<HTMLDivElement>;
  closeFilters: () => void;
  t: any;
}) => (
  <div ref={filterRef} className="relative z-40 hidden lg:hidden">
    <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />
    <div className="fixed inset-0 z-40 flex">
      <div className="relative md:mt-16 ml-auto flex h-full w-full max-w-lg transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full">
        <div className="flex items-center justify-between py-2 px-8 sticky top-0 bg-white z-20 border-y border-gray-300">
          <h2 className="text-lg font-bold text-gray-900">{t("filters")}</h2>
          <button
            type="button"
            onClick={closeFilters}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
          >
            <span className="sr-only">Close menu</span>
            <XIcon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <form className="mt-4 px-10 pb-10">
          <FilterForm />
        </form>
      </div>
    </div>
  </div>
);

const FilterForm = () => {
  const t = useTranslations("AlgoliaSearch");
  const refinement = refinementData(t);

  return (
    <div className="block">
      <h3 className="sr-only">Filter Categories</h3>
      <PublicResumeToggle t={t} />
      <RefinementList refinement={refinement} />
      <ExperienceFilter t={t} />
    </div>
  );
};

const PublicResumeToggle = ({ t }: { t: any }) => (
  <div className="public-resume">
    <p className="font-bold text-left border-b border-gray-300 pb-2">
      {t("publicResumes")}
    </p>
    <ToggleRefinement
      attribute="private"
      label="Only Public Profiles"
      value={false}
      defaultRefinement={null}
      className="text-gray-500 hover:text-gray-900"
    />
  </div>
);

const RefinementList = ({ refinement }: { refinement: any[] }) => (
  <div className="refinment-list">
    {refinement.map((r) => (
      <div className="my-8" key={r.attribute}>
        <p className="font-bold text-left border-b border-gray-300 mb-2 pb-2">
          {r.label}
        </p>
        <CustomRefinementListComponent attribute={r.attribute} />
      </div>
    ))}
  </div>
);

const ExperienceFilter = ({ t }: { t: any }) => (
  <div className="experience-filter my-2">
    <p className="font-bold text-left border-b border-gray-300 mb-2 pb-2">
      {t("experience")}
    </p>
    <CustomExperienceRefinement />
  </div>
);

const FilterButtons = ({ openFilters }: { openFilters: () => void }) => {
  const t = useTranslations("AlgoliaSearch");
  const setExpSorting = useSetRecoilState(experienceSortingState);
  const setExperienceFiltering = useSetRecoilState(experienceFilterState);

  const handleCustomFilters = useCallback(() => {
    setExpSorting("relevance");
    setExperienceFiltering(t("All"));
  }, [setExpSorting, setExperienceFiltering, t]);

  return (
    <div className="flex items-center gap-2">
      <div id="sort-by">
        <CustomSortByExp />
      </div>
      <ResetButton onClick={handleCustomFilters} t={t} />

      <button
        type="button"
        onClick={openFilters}
        className="text-gray-400 hover:text-gray-500 lg:hidden"
      >
        <span className="sr-only">Filters</span>
        <FunnelIconSvg aria-hidden="true" className="h-5 w-5" />
      </button>
    </div>
  );
};

const ResetButton = ({ onClick, t }: { onClick: () => void; t: any }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  useEffect(() => {
    const button = document.querySelector(".ais-ClearRefinements-button");
    if (button) {
      const checkButtonState = () =>
        setIsButtonDisabled((button as HTMLButtonElement).disabled);
      checkButtonState();
      const observer = new MutationObserver(checkButtonState);
      observer.observe(button, {
        attributes: true,
        attributeFilter: ["disabled"],
      });
      return () => observer.disconnect();
    }
  }, []);

  return (
    <div className="text-sm cursor-pointer text-gray-900 font-semibold border-gray-300 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 py-2 px-3">
      {isButtonDisabled ? (
        <button onClick={onClick}>{t("reset")}</button>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClick();
            }
          }}
        >
          <ClearRefinements
            translations={{
              reset: t("reset"),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default connectHits(MobileSearchFilter);
