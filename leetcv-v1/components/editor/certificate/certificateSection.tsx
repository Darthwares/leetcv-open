import { resumeState } from "@state/state";
import { Certificate } from "data/models/Certificate";
import React, { useCallback, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { useRecoilState } from "recoil";
import CertificateList from "./certificateList";

export default function CertificateSection() {
  const [resumeChanged, setResumeChanged] = useState(false);
  const [resume] = useRecoilState(resumeState);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  let certificate: Certificate[] = JSON.parse(
    JSON.stringify(userInfo?.certificates ?? [])
  );

  const onCertificateListChange = (newCertificateList: Certificate[]) => {
    if (userInfo && resumeChanged) {
      setUserInfo({
        ...userInfo,
        certificates: newCertificateList,
      });
    }
    setResumeChanged(true);
  };
  return (
    <section id="certificates" className="flex w-full gap-0">
      <div
        className="w-full rounded-2xl bg-white pt-2"
        data-testid="certificateList"
      >
        <ReactSortable
          className="w-full"
          list={certificate}
          handle=".drag-icon"
          direction="vertical"
          delayOnTouchOnly={true}
          setList={useCallback(
            (newState: Certificate[]) => {
              onCertificateListChange(newState);
            },
            [certificate]
          )}
        >
          {resume?.certificates &&
            resume?.certificates?.map(
              (certificate: Certificate, idx: number) => (
                <CertificateList
                  certificate={certificate}
                  id={idx}
                  key={certificate.id}
                />
              )
            )}
        </ReactSortable>
      </div>
    </section>
  );
}
