import { Award } from "data/models/Award";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import { resumeState } from "../../../state/state";
import AwardList from "./awardList";

export default function AwardSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let award: Award[] = JSON.parse(JSON.stringify(userInfo?.awards ?? []));

  const onAwardListChange = (newAwardList: Award[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        awards: newAwardList,
      });
    }
    setResumeChanged(true);
  };

  return (
    <section id="awards" className="flex w-full gap-0">
      <div className="w-full rounded-2xl bg-white pt-2" data-testid="awardList">
        <ReactSortable
          className="w-full"
          list={award}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Award[]) => {
              onAwardListChange(newState);
            },
            [award]
          )}
        >
          {userInfo?.awards &&
            userInfo?.awards?.map((award: Award, idx: number) => (
              <AwardList award={award} id={idx} key={award.id} />
            ))}
        </ReactSortable>
      </div>
    </section>
  );
}
