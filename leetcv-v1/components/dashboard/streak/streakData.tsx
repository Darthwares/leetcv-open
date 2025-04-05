import { streakAnalyticsState } from "@state/state";
import { useSetRecoilState } from "recoil";
import MyCalendar from "./streakCalendar";
import { useTranslations } from "next-intl";
import { XIcon } from "@heroicons/react/outline";
import useStreak from "@lib/helper/useStreak";

const StreakData = () => {
  const t = useTranslations("DashboardWidget");
  const setIsOpen = useSetRecoilState(streakAnalyticsState);
  const { streakData } = useStreak();

  const selectedDates = Array.isArray(streakData)
    ? streakData.map((dateString) => new Date(dateString))
    : [];

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-4 rounded-b-2xl h-fit">
      <div className="flex flex-col gap-3 items-center w-full space-y-3 py-4">
        <div className="w-full flex justify-between items-center relative lg:bottom-3 bottom-1">
          <p className="text-3xl">🔥</p>
          <p className="text-lg font-semibold">{t("steakAnalytics")}</p>
          <XIcon
            className="w-7 cursor-pointer text-slate-700 hover:bg-gray-300 rounded-full p-1"
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <MyCalendar
          selectedDates={selectedDates}
          onDateChange={(date: Date) => {
            console.log("Selected date:", date);
            ``;
          }}
        />
      </div>
    </div>
  );
};

export default StreakData;
