import { FireSvg } from "@components/svg";
import { LockClosedIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";

import React from "react";

type StreakCardProps = {
  days: string[];
};

const StreakCard = ({ days }: StreakCardProps) => {
  const today = new Date().toLocaleString("en-US", { weekday: "long" });
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-500 mb-2">
            {days?.length || 0} {days?.length <= 1 ? "day" : "days"} streak
          </h2>
          <p className="text-md text-gray-600">
            Do a lesson today to {days?.length > 0 ? "continue" : "start"} a new
            streak!
          </p>
        </div>
        <FireSvg className="w-14 h-14 text-indigo-500" />
      </div>

      <div className="flex justify-between items-center mt-4 px-2 py-4 bg-white rounded-lg shadow-inner">
        {daysOfWeek.map((day, index) => {
          const dayMatch =
            days?.some((streakDate) => {
              const streakDateObj = new Date(streakDate);
              return streakDateObj.getDay() === index;
            }) || false;
          return (
            <div className="flex flex-col gap-1" key={index}>
              <div
                className={`flex items-center justify-center ${day === today ? "text-indigo-500 font-bold" : "text-gray-500"
                  }`}
              >
                {day[0]}
              </div>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${dayMatch
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-500"
                  }`}
              >
                {dayMatch && <CheckIcon strokeWidth={3} className="w-5 h-5" />}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default StreakCard;
