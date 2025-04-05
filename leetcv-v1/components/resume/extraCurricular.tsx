import { profileResumeState, resumeFontState } from "@state/state";
import { ExtraCurricular } from "data/models/ExtraCurricular";
import { useRecoilState } from "recoil";
import { DateRange } from "./dateRange";
import { useTranslations } from "next-intl";
import { ExtraCurricularActivitiesSvg } from "@components/svg";
import ResumeSectionHeader from "./resumeSectionHeader";

function ExtraCurricularActivity() {
  const [profileResume] = useRecoilState(profileResumeState);
  const extraCurricularActivities = profileResume.extraCurricularActivities;
  const t = useTranslations("CurricularActivities");
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <div data-testid="extraCurricularActivities">
      {extraCurricularActivities?.length !== 0 && (
        <div
          data-testid="extraCurricularActivities"
          className="w-full sm:p-0 print:mt-1"
        >
          {extraCurricularActivities?.some(
            () => extraCurricularActivities.length > 0
          ) && <ResumeSectionHeader title={t("curricularActivities")} />}
          {extraCurricularActivities?.map(
            (activities: ExtraCurricular, id: number) => {
              return (
                <div
                  key={activities.id}
                  className="flex items-start justify-between pl-5"
                >
                  <ol className="relative pl-1 border-l border-gray-200">
                    <li className="mb-2 ml-6 space-y-0.5">
                      <span className="brand-grad-bg flex absolute -left-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full ring-8 ring-white">
                        <ExtraCurricularActivitiesSvg className="w-5 h-5" />
                      </span>
                      <div
                        className={`flex gap-2 items-start font-semibold text-gray-900 `}
                      >
                        <p
                          className={`${selectedFont.className} cursor-default capitalize font-semibold print:text-sm`}
                        >
                          {activities.activityName}
                        </p>
                      </div>
                      <p
                        className={`${selectedFont.className} font-semibold text-sm text-gray-600 bg-white`}
                      >
                        {activities.organization}
                      </p>
                      <div className="mb-1 font-semibold text-sm text-gray-500">
                        <span
                          className={`${selectedFont.className} flex gap-1 w-full items-center`}
                        >
                          <DateRange
                            id={id}
                            start={activities.start!}
                            end={activities.end}
                            checked={activities.checked}
                          />
                        </span>
                      </div>
                      <p
                        data-testid={`activityDescription-${id}`}
                        className={`${selectedFont.className} text-gray-700 tracking-wide text-sm mt-4 pt-2`}
                      >
                        {activities.description!}
                      </p>
                    </li>
                  </ol>
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
}

export default ExtraCurricularActivity;
