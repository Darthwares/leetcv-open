import React from "react";
import CertificateDetailsHeader from "./certificateDetailsHeader";
import CertificateSection from "./certificateSection";

export default function CertificateDetails() {
  return (
    <div data-testid="certificateDetails" id="certificates">
      <CertificateDetailsHeader />
      <CertificateSection />
    </div>
  );
}
