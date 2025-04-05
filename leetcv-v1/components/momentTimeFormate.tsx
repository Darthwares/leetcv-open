import React from "react";
import Moment from "react-moment";
interface MomentTimeFormateProps {
  timeStamp?: {
    _seconds?: number;
    _nanoseconds?: number;
  };
  isSelected?: boolean;
}

const MomentTimeFormate = ({
  timeStamp,
  isSelected,
}: MomentTimeFormateProps) => {
  const time =
    (timeStamp?._seconds! + timeStamp?._nanoseconds! * 0.00000001) * 1000;
  const newDate = new Date(time);
  const isDate = <Moment>{newDate}</Moment>;
  const checkDate = isDate.props.children == "Invalid Date";
  return (
    <div data-testid="moment">
      {!checkDate && (
        <Moment
          fromNow
          className={`pr-5 text-sm ${
            isSelected ? "text-gray-100" : "text-gray-500 dark:text-gray-300"
          }`}
        >
          {newDate}
        </Moment>
      )}
    </div>
  );
};

export default MomentTimeFormate;
