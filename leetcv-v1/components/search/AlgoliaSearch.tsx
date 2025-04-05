import {
  experienceFilterState,
  experienceSortingState,
  hitsAvailableState,
  hitsDataState,
  resumeState,
  showPublicResume,
} from "@state/state";
import algoliasearch from "algoliasearch/lite";
import { Resume } from "data/models/UserInfo";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { connectSearchBox, connectHits } from "react-instantsearch-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import ImageFallBack from "@components/imageFallBack";
import {
  applyFiltersAndSort,
  getDefaultBasicDetails,
} from "@constants/defaults";
import { ArrowPath } from "@components/svg";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ""
);

const DEFAULT_DESCRIPTION = getDefaultBasicDetails().description;

const LoadingSkeleton = () => (
  <div className="grid sm:grid-cols-2 gap-5">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="animate-pulse">
        <div className="rounded-lg border border-gray-300 px-4 pb-5">
          <div className="flex items-center lg:items-start gap-3">
            <div className="relative flex items-start space-x-3 py-5 w-full">
              <div className="flex flex-col items-center gap-y-2 justify-center">
                <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((j) => (
              <div key={j} className="h-6 w-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Hits = ({ hits }: any) => {
  const t = useTranslations("AlgoliaSearch");
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo] = useRecoilState(resumeState);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [experienceFiltering] = useRecoilState(experienceFilterState);
  const [hitsData, setHitsData] = useState(hits);
  const [expSorting] = useRecoilState(experienceSortingState);
  const setHitsAvailable = useSetRecoilState(hitsAvailableState);
  const setGlobalHitsData = useSetRecoilState(hitsDataState);

  useEffect(() => {
    setHitsData(hits);
    setGlobalHitsData(hits);
  }, [hits]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  useEffect(() => {
    if (hits) {
      setIsLoading(false);
      setSearchPerformed(true);
    }
  }, [hits]);

  useEffect(() => {
    setIsLoading(true);
    setHitsAvailable(false);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setHitsAvailable(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [hits]);

  const extractLocation = (address: string) => {
    const parts = address.split(",").map((part) => part.trim());
    const country = parts.pop(); // Last part
    const state = parts.pop(); // Second last part
    const city = parts.pop(); // Third last part

    return { city, state, country };
  };

  useEffect(() => {
    let data = applyFiltersAndSort(
      hits,
      DEFAULT_DESCRIPTION,
      t,
      experienceFiltering,
      expSorting
    );
    setHitsData(data);
    setGlobalHitsData(data);
  }, [experienceFiltering, expSorting, hits]);

  return (
    <div className="overflow-hidden bg-white sm:rounded-md max-w-6xl mx-auto">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {searchPerformed &&
            hitsData &&
            hitsData.length === 0 &&
            !isLoading && (
              <div className="lg:-ml-52">
                <div className="h-[18rem] md:h-[30rem] w-full ">
                  <lottie-player
                    src="/assets/lottie/not-found.json"
                    background=""
                    speed="1"
                    loop
                    autoPlay
                    className="bg-gradient-to-r from-indigo-100 to-pink-200"
                  ></lottie-player>
                </div>
                <div className="text-center text-gray-500 text-bold flex flex-col -mt-6">
                  <span className="font-extrabold text-indigo-400 text-2xl md:text-4xl">
                    {t("noRecord")}
                  </span>
                  <span className="mt-2">{t("coulntFind")}</span>
                  <span className="">{t("tryRefresh")}</span>
                </div>
                <button
                  className="bg-indigo-500 text-white flex gap-1 mx-auto mt-3 p-2 px-3 rounded-md hover:bg-indigo-600"
                  onClick={() => window.location.reload()}
                >
                  <ArrowPath className="w-5 h-5" />
                  {t("refresh")}
                </button>
              </div>
            )}
          <ul role="list" className="grid sm:grid-cols-2 gap-5">
            {hitsData?.map((hit: Resume) => {
              const { city, state, country } = extractLocation(
                hit.address ?? ""
              );

              return (
                <div key={hit.handle}>
                  {
                    <li>
                      <a
                        href={
                          hit.handle === userInfo.handle
                            ? `/s/resume`
                            : `/r/${hit.handle}`
                        }
                        rel="noreferrer"
                      >
                        <div>
                          <div className="cursor-pointer rounded-lg border border-gray-300 px-4 pb-5">
                            <div className="flex items-center lg:items-start gap-3">
                              <div className="relative flex items-start space-x-3 py-5 w-full">
                                <div className="flex flex-col items-center gap-y-2 justify-center">
                                  <ImageFallBack
                                    imgSrc={hit.image!}
                                    fallBackText={hit?.displayName}
                                    avatarClass="w-16 h-16 rounded-md overflow-hidden"
                                    avatarImgClass="w-full h-full border-gray-200 bg-indigo-100"
                                    avatarFallbackClass="w-16 h-16 rounded-md text-white text-4xl"
                                  />
                                  {hit.private && (
                                    <span className="inline-flex items-center rounded-md bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                                      {t("private")}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="focus:outline-none">
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    <p className="text-base font-medium text-gray-900 w-48 truncate">
                                      {hit?.displayName}
                                    </p>
                                    <p className="truncate w-48 md:w-full text-sm text-gray-500">
                                      {hit?.position}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                      {city && <p>{city}</p>}
                                      {state && <p>{state}</p>}
                                      {country && <p>{country}</p>}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-900 ">
                              <p className="w-full line-clamp-3">
                                {hit.description}
                              </p>
                            </div>
                            <div
                              className="flex gap-1 flex-wrap mt-2"
                              data-testid="project-skills"
                            >
                              {hit.skills &&
                                hit.skills.slice(0, 4).map((skill, index) => {
                                  return (
                                    <div
                                      className="text-md max-w-fit w-32 truncate px-[10px] py-1 rounded-lg border font-light text-sm align-center capitalize"
                                      title={skill}
                                      key={index}
                                    >
                                      {skill && skill.length > 10 ? (
                                        <>{skill.slice(0, 10)}...</>
                                      ) : (
                                        skill
                                      )}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  }
                </div>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export const ResumeHit = connectHits(Hits);

const SearchBox = ({ currentRefinement, refine }: any) => {
  const t = useTranslations("AlgoliaSearch");
  const setShowPublicResume = useSetRecoilState(showPublicResume);
  return (
    <form noValidate action="" role="search" className="max-w-7xl mx-auto">
      <input
        className="py-3 input mt-5 md:mt-10 md:mb-3"
        placeholder={t("searchResumes")}
        data-testid="searchId"
        value={currentRefinement}
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
        onChange={(event) => {
          refine(event.currentTarget.value);
          setShowPublicResume(event.currentTarget.value.length == 0);
        }}
      />
    </form>
  );
};

export const CustomSearchBox = connectSearchBox(SearchBox);
