import { resumeState } from "@state/state";
import { Experience } from "data/models/Experience";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import ExperienceList from "./experienceList";

export default function ExperienceSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let experience: Experience[] = JSON.parse(
    JSON.stringify(userInfo?.experiences ?? [])
  );

  const onExperienceListChange = (newExperienceList: Experience[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        experiences: newExperienceList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section id="experiences" className="flex w-full gap-0">
      <div className="w-full pt-2" data-testid="experienceList">
        <ReactSortable
          className="w-full"
          list={experience}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Experience[]) => {
              onExperienceListChange(newState);
            },
            [experience]
          )}
        >
          {userInfo?.experiences &&
            userInfo?.experiences?.map(
              (experience: Experience, idx: number) => (
                <ExperienceList
                  key={experience.id}
                  experience={experience}
                  id={idx}
                />
              )
            )}
        </ReactSortable>
      </div>
    </section>
  );
}
