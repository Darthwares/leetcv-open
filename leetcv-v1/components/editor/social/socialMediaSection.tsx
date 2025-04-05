import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { SocialMedia } from "data/models/socialMedia";
import { ReactSortable } from "react-sortablejs";
import SocialMediaList from "./socialMediaList";

export default function SocialMediaSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);

  let socialList: SocialMedia[] = JSON.parse(
    JSON.stringify(userInfo?.socialMedia ?? [])
  );

  const onSocialListChange = (newSocialList: SocialMedia[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        socialMedia: newSocialList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <div className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="socialList"
      >
        <ReactSortable
          className="w-full"
          list={socialList}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: SocialMedia[]) => {
              onSocialListChange(newState);
            },
            [socialList]
          )}
        >
          {userInfo?.socialMedia &&
            userInfo?.socialMedia?.map((social: SocialMedia, idx: number) => (
              <SocialMediaList key={social.id} social={social} id={idx} />
            ))}
        </ReactSortable>
      </div>
    </div>
  );
}
