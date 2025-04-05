import React from "react";
import AwardDetailsHeader from "./awardDetailsHeader";
import AwardSection from "./awardSection";

export default function AwardDetails() {
  return (
    <div data-testid="awardDetails" id="awards">
      <AwardDetailsHeader />
      <AwardSection />
    </div>
  );
}
