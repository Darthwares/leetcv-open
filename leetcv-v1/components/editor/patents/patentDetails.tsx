import React from "react";
import PatentDetailsHeader from "./patentDetailsHeader";
import PatentSection from "./patentSection";

export default function PatentDetails() {
  return (
    <div data-testid="patentDetails" id="patents">
      <PatentDetailsHeader />
      <PatentSection />
    </div>
  );
}
