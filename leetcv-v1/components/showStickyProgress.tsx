import { useProgressPercent } from "@utils/progressPercent";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
interface ShowStickyProgressProps {
  sticky: boolean;
}
const ShowStickyProgress = ({ sticky }: ShowStickyProgressProps) => {
  const { result } = useProgressPercent();

  return (
    <div>
      {sticky && (
        <div className="flex w-full items-center gap-2 pr-5 relative right-0">
          <div title="Resume Progress">
            <CircularProgressbar
              value={result}
              text={`${result}%`}
              className="w-8 h-8 md:w-10 md:h-10"
              backgroundPadding={0}
              styles={buildStyles({
                backgroundColor: "#FFFFFF",
                textSize: "30px",
                textColor: "#4F45E4",
                pathColor: "#4F45E4",
                trailColor: "transparent",
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowStickyProgress;
