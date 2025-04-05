import { resumeState } from "@state/state";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import PatentList from "./patentList";
import { Patent } from "data/models/Patent";

export default function PatentSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let patents: Patent[] = JSON.parse(JSON.stringify(userInfo?.patents ?? []));

  const onPublicationChange = (newPatentList: Patent[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        patents: newPatentList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section id="patents" className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="patent-section"
      >
        <ReactSortable
          className="w-full"
          list={patents}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Patent[]) => {
              onPublicationChange(newState);
            },
            [patents]
          )}
        >
          {userInfo?.patents?.map((patent: Patent, idx: number) => (
            <PatentList key={patent.id} patent={patent} id={idx} />
          ))}
        </ReactSortable>
      </div>
    </section>
  );
}
