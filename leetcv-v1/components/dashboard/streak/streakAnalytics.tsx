import { CalendarSvg } from "@components/svg";
import {
  calculateStreaks,
  countLoginDaysThisMonth,
  countLoginDaysThisYear,
} from "@constants/defaults";
import useStreak from "@lib/helper/useStreak";
import { streakAnalyticsState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const StreakAnalytics = () => {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("Streak");
  const setOpen = useSetRecoilState(streakAnalyticsState);

  const { data: streakPoint } = trpc.useQuery(
    ["fs.streak.getStreakPoints", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const { streakData } = useStreak();

  const selectedDates = Array.isArray(streakData)
    ? streakData.map((dateString) => new Date(dateString))
    : [];

  const streakCount = calculateStreaks(selectedDates);
  const loggedInDaysThisMonth = countLoginDaysThisMonth(selectedDates);
  const loggedInDaysThisYear = countLoginDaysThisYear(selectedDates);
  const displayStreakCount = !streakCount ? 0 : streakCount;

  const data = [
    { count: displayStreakCount, label: "days streak", emoji: "🔥" },
    { count: loggedInDaysThisMonth, label: "days this month" },
    { count: loggedInDaysThisYear, label: "days this year" },
    { count: streakPoint?.points, label: "points earned" },
  ];

  return (
    <div className="bg-white text-gray-900 px-1 sm:px-2 py-6 rounded-2xl w-full mx-auto flex flex-col items-center justify-center ">
      <div className="sm:flex w-full justify-between sm:mb-2">
        <h2 className="text-2xl font-bold flex w-full justify-start gap-2">
          {t("streakAnalytics")}
        </h2>
        <div className="flex justify-end w-full">
          <button
            onClick={() => setOpen(true)}
            className="text-indigo-500 mt-2 sm:mt-0 app-bar-btn border border-indigo-400 transition-all duration-300 text-sm flex gap-2 px-2 items-center font-medium relative left-0.5"
          >
            {t("viewCalendar")}
            <CalendarSvg />
          </button>
        </div>
      </div>
      <div className="w-full space-y-5">
        <dl className="mt-3 grid grid-cols-2 divide-x divide-y divide-gray-200 overflow-hidden rounded-lg bg-white lg:shadow md:grid-cols-4 md:divide-y-0 border">
          {data.map((item) => (
            <div key={item.label} className="p-4 sm:p-5 lg:px-4 xl:px-5">
              <dt className="text-sm font-medium sm:text-base capitalize text-gray-800">
                {item.label}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-3xl font-semibold text-indigo-600">
                  {item.count}
                  {item.emoji && item.count > 0 && (
                    <span className="text-2xl relative -top-0.5">
                      {item.emoji}
                    </span>
                  )}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default StreakAnalytics;
