import React, { useEffect, useState } from "react";
import {
  FlagIcon as OutlineFlagIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { FlagIcon as SolidFlagIcon } from "@heroicons/react/solid";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { activeReviewState } from "@state/state";
import MomentTimeFormate from "@components/momentTimeFormate";
import ApplauseButton from "./applauseButton";
import { useRouter } from "next/router";
interface ReviewProps {
  reviews: any;
}
interface ButtonOptionProps {
  text: string;
  icon: JSX.Element;
  count: number;
  handleFunction: () => void;
}
const ButtonWithIcon = ({ reviews }: ReviewProps) => {
  const [reviewTitle] = useRecoilState(activeReviewState);
  const router = useRouter();
  const { handle } = router.query;
  const [counter, setCounter] = useState({
    like: reviews?.upVoteCount,
    flag: reviews?.flagCount,
  });
  const [active, setActive] = useState({
    like: false,
    flag: false,
  });

  const addVote = trpc.useMutation(["fs.review.setUpVote"]);
 

  const likeClicked = () => {
    const currentlyActive = active.like;
    const newLikeCount = currentlyActive ? counter.like - 1 : counter.like + 1;

    setActive((prevState) => ({
      ...prevState,
      like: !currentlyActive,
      flag: false,
    }));

    setCounter((prevState) => ({
      ...prevState,
      like: newLikeCount,
    }));

    addVote.mutate({
      flagCount: reviews?.flagCount ? reviews?.flagCount : 0,
      handle: handle as string,
      id: reviews?.id,
      upVoteCount: newLikeCount,
      handleCollection: reviewTitle.document,
    });
  };

  const flagClicked = () => {
   
    const currentlyActive = active.flag;
    const newFlagCount = currentlyActive ? counter.flag - 1 : counter.flag + 1;

    setActive((prevState) => ({
      ...prevState,
      flag: !currentlyActive,
      like: prevState.like,
    }));

    setCounter((prevState) => ({
      ...prevState,
      flag: newFlagCount,
    }));

    addVote.mutate({
      flagCount: newFlagCount,
      handle: handle as string,
      id: reviews?.id,
      upVoteCount: reviews?.upVoteCount ? reviews?.upVoteCount : 0,
      handleCollection: reviewTitle.document,
    });
  };

  const buttonOptions: ButtonOptionProps[] = [
    {
      text: "flag",
      icon: active.flag ? (
        <SolidFlagIcon
          className="text-indigo-500 w-6 h-6 hover:scale-125"
          aria-hidden="true"
        />
      ) : (
        <OutlineFlagIcon
          className="text-gray-400 w-6 h-6 hover:scale-125"
          strokeWidth={1}
          aria-hidden="true"
        />
      ),
      count: counter.flag,
      handleFunction: flagClicked,
    },
    {
      text: "like",
      icon: (
        <ApplauseButton
          upVoteCount={reviews.upVoteCount}
          isActive={active.like}
        />
      ),
      count: counter.like,
      handleFunction: () => {
        likeClicked();
      },
    },
  ];
  useEffect(() => { }, [reviews]);
  
  return (
    <div className="flex items-center w-full justify-between">
      <div className="flex items-center space-x-5 w-full">
        {buttonOptions.map((option) => (
          <span key={option.text} className="flex items-center text-sm">
            <button
              onClick={option.handleFunction}
              type="button"
              className="inline-flex items-center space-x-2 hover:text-gray-500"
            >
              {option.icon}
            </button>
          </span>
        ))}
      </div>
      <div className="text-xs inline-flex justify-end w-full font-medium gap-1">
        <ClockIcon className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
        <MomentTimeFormate timeStamp={reviews?.createdAt} />
      </div>
    </div>
  );
};
export default ButtonWithIcon;
