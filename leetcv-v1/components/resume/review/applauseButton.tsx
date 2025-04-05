import React, { useState, useEffect, useRef } from "react";
import cn from "classnames";
import { Hands, HandsOutline, Spark } from "@components/clapSvg"; 
import { BUBBLE_THRESHOLD, CLICK_THRESHOLD } from "@constants/defaults"; 

interface ApplauseButtonProps {
  upVoteCount: number;
  isActive:boolean
}

const ApplauseButton = ({ upVoteCount, isActive }: ApplauseButtonProps) => {
  const bubbleTimer = useRef<NodeJS.Timeout | null>(null);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const sparkTilt = Math.random() < 0.5 ? "left" : "right";

  const [applause, setTotalApplause] = useState<number>(upVoteCount);
  const [active, setIsActive] = useState<boolean>(false);
  const [clicked, setIsClicked] = useState<boolean>(false);
 
  const [shouldDecrement, setShouldDecrement] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive(true);
    setIsClicked(true);
    if (shouldDecrement) {
      setTotalApplause((prevState) => Math.max(0, prevState - 1));
    } else {
      setTotalApplause((prevState) => prevState + 1);
    }
    setShouldDecrement(!shouldDecrement);
  };

  useEffect(() => {
    if (active) {
      bubbleTimer.current = setTimeout(
        () => setIsActive(false),
        BUBBLE_THRESHOLD
      );
      clickTimer.current = setTimeout(
        () => setIsClicked(false),
        CLICK_THRESHOLD
      );
    }

    return () => {
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, [active, clicked]);

  useEffect(() => {
    setTotalApplause(upVoteCount);
  }, [upVoteCount]);

  return (
    <div className="outer-container">
      <div
        className={cn("applause-button", {
          active,
          inactive: !active,
          clicked,
        })}
        onClick={handleClick}
      >
        {isActive ? <Hands /> : <HandsOutline />}
        <div className={cn("spark-container", sparkTilt)}>
          <Spark />
        </div>
        <span className="bubble">{`+${applause}`}</span>
        {applause > 0 && <span className="counter">{applause}</span>} 
      </div>
    </div>
  );
};

export default ApplauseButton;

