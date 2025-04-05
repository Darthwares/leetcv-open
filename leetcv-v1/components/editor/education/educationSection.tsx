import { Education } from "data/models/Education";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import EducationList from "./educationList";

export default function EducationSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let education: Education[] = JSON.parse(
    JSON.stringify(userInfo?.educations ?? [])
  );
  const onEducationListChange = (newEducationList: Education[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        educations: newEducationList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section
      id="educations"
      className="flex w-full gap-0"
      data-testid="educationList"
    >
      <div className="w-full rounded-2xl bg-white pt-2">
        <ReactSortable
          className="w-full"
          list={education}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Education[]) => {
              onEducationListChange(newState);
            },
            [education]
          )}
        >
          {userInfo?.educations &&
            userInfo?.educations?.map((education: Education, idx: number) => (
              <EducationList
                key={education.id}
                education={education}
                id={idx}
              />
            ))}
        </ReactSortable>
      </div>
    </section>
  );
}
