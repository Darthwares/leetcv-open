import React from "react";
import PublicationDetailsHeader from "./publicationDetailsHeader";
import PublicationSection from "./publicationSection";

export default function PublicationDetails() {
  return (
    <div data-testid="publicationDetails" id="publications">
      <PublicationDetailsHeader />
      <PublicationSection />
    </div>
  );
}
