import React from "react";
import ExperienceDetailsHeader from "./experienceDetailsHeader";
import ExperienceSection from "./experienceSection";

export default function ExperienceDetails() {
  return (
    <div data-testid="experienceDetails" id="experiences">
      <ExperienceDetailsHeader />
      <ExperienceSection />
    </div>
  );
}
