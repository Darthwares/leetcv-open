import React from "react";
import ExtraCurricularDetailsHeader from "./extraCurricularDetailsHeader";
import ExtraCurricularSection from "./extraCurricularSection";

export default function ExtraCurricularDetails() {
  return (
    <div data-testid="extraCurricularActivitiesDetails" id="extraCurricularActivities">
      <ExtraCurricularDetailsHeader />
      <ExtraCurricularSection />
    </div>
  );
}
