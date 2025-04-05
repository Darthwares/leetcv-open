import ImageFallBack from "@components/imageFallBack";
import { resumeState, subscriptionPlanState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";

const ProUser = () => {
  const t = useTranslations("Appbar");
  const [resume] = useRecoilState(resumeState);
  const [plan] = useRecoilState(subscriptionPlanState);

  return (
    <div
      className="mx-4 flex relative items-center gap-4 dark:bg-slate-800/40 bg-white rounded-lg shadow px-4 py-2"
      data-testid="pro-user-container"
    >
      <div className="flex flex-col items-center py-4">
        <ImageFallBack
          imgSrc={resume?.image!}
          fallBackText={resume?.displayName}
          avatarClass="h-12 w-12 rounded-full"
          avatarImgClass="w-full h-full overflow-hidden"
          avatarFallbackClass=" h-12 w-12 rounded-full text-white text-2xl"
        />
        <span
          className={`${plan && "mobile-label"} plan`}
          data-testid="user-plan"
        >
          {plan === "Pro" && t("pro")}
          {plan === "Premium" && "Premium"}
        </span>
      </div>
      <div>
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold"
          data-testid="user-name"
        >
          {resume.displayName}
        </h5>
        <p
          id="drawer-navigation-label"
          className="text-sm font-semibold dark:text-gray-400 text-gray-500"
          data-testid="user-handle"
        >
          @{resume.handle}
        </p>
      </div>
    </div>
  );
};

export default ProUser;
