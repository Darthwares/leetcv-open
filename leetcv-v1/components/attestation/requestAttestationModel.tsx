import { subscriptionPlanState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { Project } from "data/models/Project";
import React from "react";
import { useRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import { countBasedOnPlan, shouldRenderAttestation } from "@constants/defaults";
import AttestationContent from "./attestationContent";
import UpgradePlanBanner from "@components/resume/review/upgradePlanBanner";
import { useTranslations } from "next-intl";
interface RequestAttestationModelProps {
  project: Project;
}

const RequestAttestationModel = ({ project }: RequestAttestationModelProps) => {
  const [userId] = useRecoilState(userIdState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const t = useTranslations("Attestation");

  const { data: requestsAttestation } = trpc.useQuery([
    "fs.attestation.getProspectsCount",
    { userId },
  ]);
  const count = countBasedOnPlan(plan, requestsAttestation!);

  return (
    <>
      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
        {shouldRenderAttestation(plan, count, requestsAttestation!) ? (
          <AttestationContent project={project} />
        ) : (
          <div className="px-2">
            <UpgradePlanBanner
              title={t("upgradePlanTitle")}
              description={t("upgradePlanDesc")}
            />
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default RequestAttestationModel;
