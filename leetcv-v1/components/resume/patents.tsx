import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeFontState } from "@state/state";
import { Dateformate } from "./dateRange";
import { generateValidHref } from "@constants/defaults";
import { Patent } from "data/models/Patent";
import ResumeSectionHeader from "./resumeSectionHeader";

function Patents() {
  const [profileResume] = useRecoilState(profileResumeState);
  const patents = profileResume.patents;
  const t = useTranslations("PatentsData");
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <div data-testid="patents-container">
      {patents?.length !== 0 && (
        <div data-testid="patents" className="w-full sm:p-0 print:mt-1">
          {patents?.some(() => patents.length > 0) && (
            <ResumeSectionHeader title={t("patents")} />
          )}
          {patents?.map((patent: Patent, id: number) => {
            return (
              <div
                key={patent.id}
                className="flex items-start justify-between pl-5"
              >
                <ol className="relative pl-1 border-l border-gray-200">
                  <li className="mb-2 ml-6 space-y-0.5">
                    <span className="brand-grad-bg flex absolute -left-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full ring-8 ring-white">
                      <img
                        src="/icons/publication2.png"
                        alt={patent.title}
                        className="w-5"
                      />
                    </span>
                    <div
                      className={`flex gap-2 items-start font-semibold text-gray-900 ${
                        patent?.patentURL
                          ? "hover:text-blue-600 cursor-pointer"
                          : ""
                      } `}
                      data-testid={`title-${id}`}
                    >
                      <a
                        className={`${
                          patent?.patentURL
                            ? "hover:text-blue-600 external cursor-pointer"
                            : "cursor-default"
                        } ${selectedFont.className} capitalize font-semibold`}
                        href={generateValidHref(patent?.patentURL!)}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {patent.title}
                      </a>
                    </div>
                    <p
                      data-testid={`patentNumber-${id}`}
                      className={`${selectedFont.className} font-semibold text-sm text-gray-600 bg-white`}
                    >
                      {patent.patentNumber}
                    </p>
                    {patent.isPatentIssued && (
                      <div className="mb-1 font-semibold text-sm text-gray-500">
                        <span
                          className={`${selectedFont.className} flex gap-1 w-full items-center`}
                        >
                          <Dateformate id={id} date={patent.patentIssueDate!} />
                        </span>
                      </div>
                    )}
                    <div className="w-full py-1 flex items-center gap-1.5 flex-wrap">
                      {patent?.patentMembers?.map((member) => (
                        <span
                          key={member.id}
                          className={`${selectedFont.className} text-gray-700 capitalize border rounded-md px-2.5 py-1 font-medium text-sm`}
                        >
                          {member.name}
                        </span>
                      ))}
                    </div>
                    <p
                      data-testid={`patentDescription-${id}`}
                      className={`${selectedFont.className} text-gray-700 tracking-wide text-sm mt-4 pt-2`}
                    >
                      {patent.patentDescription}
                    </p>
                  </li>
                </ol>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Patents;
