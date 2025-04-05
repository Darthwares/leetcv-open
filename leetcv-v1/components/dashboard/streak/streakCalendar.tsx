import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface CalendarProps {
  selectedDates: Date[];
  onDateChange: (date: Date) => void;
}

const StreakCalendar: React.FC<CalendarProps> = ({
  selectedDates,
  onDateChange,
}) => {
  const today = new Date();

  const tileDisabled = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): boolean => {
    if (view === "month") {
      return !(
        date.toDateString() === today.toDateString() ||
        selectedDates.some((d) => d.toDateString() === date.toDateString())
      );
    }
    return false;
  };

  return (
    <div className="calendar-container" data-testid="streak-calendar">
      <Calendar
        onChange={(date: any) => onDateChange(date)}
        value={selectedDates[0]}
        next2Label={null}
        prev2Label={null}
        tileDisabled={tileDisabled}
        className="custom-calendar"
        tileClassName={({ date, view }) => {
          if (view === "month") {
            if (date.toDateString() === today.toDateString()) {
              return "today-date";
            }
            if (
              selectedDates.some(
                (d) => d.toDateString() === date.toDateString()
              )
            ) {
              return "active-date";
            }
            if (tileDisabled({ date, view })) {
              return "disabled-date";
            }
          }
          return "";
        }}
      />
    </div>
  );
};

export default StreakCalendar;
