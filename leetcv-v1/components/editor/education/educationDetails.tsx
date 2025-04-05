import React from "react";
import EducationDetailsHeader from "./educationDetailsHeader";
import EducationSection from "./educationSection";

export default function EducationDetails() {
  return (
    <div data-testid="educationDetails" id="educations">
      <EducationDetailsHeader />
      <EducationSection />
    </div>
  );
}
