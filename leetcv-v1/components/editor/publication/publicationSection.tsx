import { resumeState } from "@state/state";
import { Publication } from "data/models/Publication";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import PublicationList from "./publicationList";

export default function PublicationSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let publication: Publication[] = JSON.parse(
    JSON.stringify(userInfo?.publications ?? [])
  );

  const onPublicationChange = (newPublicationList: Publication[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        publications: newPublicationList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section id="publications" className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="publicationList"
      >
        <ReactSortable
          className="w-full"
          list={publication}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Publication[]) => {
              onPublicationChange(newState);
            },
            [publication]
          )}
        >
          {userInfo?.publications &&
            userInfo?.publications?.map(
              (publication: Publication, idx: number) => (
                <PublicationList
                  key={publication.id}
                  publication={publication}
                  id={idx}
                />
              )
            )}
        </ReactSortable>
      </div>
    </section>
  );
}
