import { formatResumeDate } from "@constants/defaults";
import dateFormat from "dateformat";
import { useTranslations } from "next-intl";
export interface DateRangeProps {
  id: string | number;
  start: string;
  end?: string;
  checked?: boolean;
  category?: string;
}

export function DateRange({ id, start, end, checked }: DateRangeProps) {
  const t = useTranslations("ProjectData");
  return (
    <div data-testid={`title-${id}`} className="text-sm">
      <span data-testid={`start-${id}`}>
        {formatResumeDate(start)}
      </span>
      {!checked && (
        <span>
          {end && " - "}
          {end && (
            <span data-testid={`end-${id}`}>
              {formatResumeDate(end) === t("checkDate")
                ? t("isPresent")
                : formatResumeDate(end)}
            </span>
          )}
        </span>
      )}
      {checked && <span>{t("present")}</span>}
    </div>
  );
}
export interface DateformateProps {
  id: string | number;
  date: string;
}
export function Dateformate({ id, date }: DateformateProps) {
  return <p data-testid={`title-${id}`}>{dateFormat(date, "mediumDate")}</p>;
}
