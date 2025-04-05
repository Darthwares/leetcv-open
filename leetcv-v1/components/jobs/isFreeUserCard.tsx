import UpgradePlanBanner from "@components/resume/review/upgradePlanBanner";
import React from "react";

interface IsFreeUserCardProps {
  isFreeUser: boolean;
  src: string;
  className: string;
}
function IsFreeUserCard({ isFreeUser, src, className }: IsFreeUserCardProps) {
  return (
    <>
      {isFreeUser && (
        <div className="w-full -mt-2">
          <img src={src} alt="image" className="w-full" />
          <img src={src} alt="image" className="w-full" />
          <div
            className={className}
          >
            <UpgradePlanBanner
              title={"Unlock Full Access to All Job Openings"}
              description={
                "Upgrade your plan today and get unlimited access to all available job listings! you'll be able to view every job opportunity, including exclusive roles, without any restrictions. Don't miss out on your dream job—see all current openings by upgrading now!"
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default IsFreeUserCard;
