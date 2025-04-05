import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { ReactSortable } from "react-sortablejs";
import LanguageList from "./languageList";
import { Language } from "data/models/Language";

export default function LanguageSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let languageList: Language[] = JSON.parse(
    JSON.stringify(userInfo?.languages ?? [])
  );

  const onLanguageListChange = (newLanguageList: Language[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        languages: newLanguageList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <div className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="languageList"
      >
        <ReactSortable
          className="w-full"
          list={languageList}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Language[]) => {
              onLanguageListChange(newState);
            },
            [languageList]
          )}
        >
          {userInfo?.languages &&
            userInfo?.languages?.map((language: Language, idx: number) => (
              <LanguageList key={language.id} language={language} id={idx} />
            ))}
        </ReactSortable>
      </div>
    </div>
  );
}
