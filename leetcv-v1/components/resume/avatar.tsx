import AttestedUserList from "@components/attestation/attestedUserList";
import { AnimatedTooltip } from "@components/ui/animated-tooltip";
// import { AnimatedTooltip } from "@components/ui/animated-tooltip";
import { shortNumber } from "@constants/defaults";
import {
  attestedRequestState,
  projectState,
  showAttestedList,
} from "@state/state";
import { useTranslations } from "next-intl";
import React, { useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const Avatar = (props: any) => {
  const { project } = props;
  const t = useTranslations("Dashboard");
  const [attestedRequest] = useRecoilState(attestedRequestState);
  const [attest, setAttest] = useRecoilState(showAttestedList);
  const setProjectState = useSetRecoilState(projectState);

  const filteredRequests = useMemo(() => {
    if (!attestedRequest) return [];
    return attestedRequest.filter(
      (req: any) => req?.project?.name === project?.name
    );
  }, [attestedRequest, project]);

  return (
    <div className="max-w-7xl mx-auto w-full">
      {filteredRequests?.length !== 0 && (
        <p className="text-lg py-2 font-semibold">
          {t("attestedBy")} {filteredRequests?.length}
        </p>
      )}
      <div className="flex justify-start items-center">
        <div className="flex flex-row items-center mb-5 w-full">
          <AnimatedTooltip items={filteredRequests} />
          {filteredRequests.length > 3 && (
            <>
              <div
                className="relative h-12 sm:h-14 w-12 sm:w-14 border border-gray-200 shadow-md rounded-full flex justify-center cursor-pointer items-center text-center bg-white print:hidden"
                onClick={() => {
                  setProjectState(project);
                  setAttest(true);
                }}
              >
                <span className="text-xs text-slate-900 font-medium">
                  {t("view")}
                  <br />
                  {t("all")}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      {attest && <AttestedUserList />}
    </div>
  );
};
export default Avatar;
