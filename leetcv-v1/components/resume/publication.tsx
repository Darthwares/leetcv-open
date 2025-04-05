import { useTranslations } from "next-intl";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeReviewState,
  profileResumeState,
  resumeFontState,
  showReviewModal,
} from "@state/state";
import { Publication } from "data/models/Publication";
import { Dateformate } from "./dateRange";
import { useSession } from "next-auth/react";
import CreateReviewButton from "./createReviewButton";
import { generateValidHref } from "@constants/defaults";
import ResumeSectionHeader from "./resumeSectionHeader";

function Publications() {
  const { status } = useSession();
  const [profileResume] = useRecoilState(profileResumeState);
  const publications = profileResume.publications;
  const t = useTranslations("PublicationData");
  const setShowModal = useSetRecoilState(showReviewModal);
  const setActiveReview = useSetRecoilState(activeReviewState);
  const locationPathname = location.pathname;
  const basePath = locationPathname.split("/").slice(0, 3).join("/");
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <div data-testid="publication">
      {publications?.length !== 0 && (
        <div data-testid="publications" className="w-full sm:p-0 print:mt-1">
          {publications?.some(() => publications.length > 0) && (
            <ResumeSectionHeader title={t("publications")} />
          )}
          {publications?.map((publication: Publication, id: number) => {
            return (
              <div
                key={publication.id}
                className="flex items-start justify-between pl-5"
              >
                <ol className="relative pl-1 border-l border-gray-200">
                  <li className="mb-2 ml-6 space-y-0.5">
                    <span className="brand-grad-bg flex absolute -left-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full ring-8 ring-white">
                      <img
                        src="/icons/publication2.png"
                        alt={`publication-${id}`}
                        className="w-5"
                      />
                    </span>
                    <div
                      className={`flex gap-2 items-start font-semibold text-gray-900 ${
                        publication?.publicationURL
                          ? "hover:text-blue-600 cursor-pointer"
                          : ""
                      } `}
                    >
                      <a
                        className={`${
                          publication?.publicationURL
                            ? "hover:text-blue-600 external cursor-pointer"
                            : "cursor-default"
                        } ${
                          selectedFont.className
                        } capitalize font-semibold print:text-sm`}
                        href={generateValidHref(publication?.publicationURL)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {publication.title}
                      </a>
                    </div>
                    <p
                      className={`${selectedFont.className} font-semibold text-sm text-gray-600 bg-white`}
                    >
                      {publication.publisher}
                    </p>
                    <div className="mb-1 font-semibold text-sm text-gray-500">
                      <span
                        className={`${selectedFont.className} flex gap-1 w-full items-center`}
                      >
                        <Dateformate
                          id={id}
                          date={publication.publicationDate}
                        />
                      </span>
                    </div>
                    <p
                      className={`${selectedFont.className} text-gray-700 tracking-wide text-sm mt-4 pt-2`}
                    >
                      {publication.description}
                    </p>
                  </li>
                </ol>
                <div className="">
                  {location.pathname !== "/" &&
                    location.pathname !== "/s/convert" &&
                    location.pathname !== "/s/resume" &&
                    location.pathname !== "/s/resumeIdeas" &&
                    location.pathname !== "/s/aiResume" &&
                    basePath !== "/openai/resume" &&
                    status === "authenticated" && (
                      <CreateReviewButton
                        onClick={() => {
                          setShowModal(true);
                          setActiveReview({
                            document: "Publication-Review",
                            headingTitle: publication.title,
                            title: "Publication",
                          });
                        }}
                      />
                    )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Publications;
