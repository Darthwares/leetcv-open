import { resumeState } from "@state/state";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import ExtraCurricularList from "./extraCurricularList";
import { ExtraCurricular } from "data/models/ExtraCurricular";

export default function ExtraCurricularSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let activity: ExtraCurricular[] = JSON.parse(
    JSON.stringify(userInfo?.extraCurricularActivities ?? [])
  );

  const onExtraCurricularListChange = (newActivityList: ExtraCurricular[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        extraCurricularActivities: newActivityList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section id="internships" className="flex w-full gap-0">
      <div className="w-full pt-2" data-testid="internshipList">
        <ReactSortable
          className="w-full"
          list={activity}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: ExtraCurricular[]) => {
              onExtraCurricularListChange(newState);
            },
            [activity]
          )}
        >
          {userInfo?.extraCurricularActivities?.map(
            (activity: ExtraCurricular, idx: number) => (
              <ExtraCurricularList
                key={activity.id}
                activity={activity}
                id={idx}
              />
            )
          )}
        </ReactSortable>
      </div>
    </section>
  );
}
