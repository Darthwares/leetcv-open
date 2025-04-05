import { useRecoilState } from "recoil";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { Project } from "data/models/Project";
import { resumeState } from "@state/state";
import ProjectList from "./projectList";

export default function ProjectSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);

  let project: Project[] = JSON.parse(JSON.stringify(userInfo?.projects ?? []));

  const onProjListChange = (newProjectList: Project[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        projects: newProjectList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <div className="flex w-full gap-0">
      <ReactSortable
        className="w-full"
        list={project}
        handle=".drag-icon"
        direction="vertical"
        delayOnTouchOnly={true}
        setList={useCallback(
          (newState: Project[]) => {
            onProjListChange(newState);
          },
          [project]
        )}
      >
        {userInfo?.projects &&
          userInfo?.projects?.map((project: Project, idx: number) => (
            <ProjectList key={project.id} project={project} id={idx} />
          ))}
      </ReactSortable>
    </div>
  );
}
