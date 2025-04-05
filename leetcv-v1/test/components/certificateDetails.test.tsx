import CertificateDetails from "@components/editor/certificate/certificateDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("CertificateDetails", () => {
  xit("should render CertificateDetails components", () => {
    render(
      <RecoilRoot>
        <CertificateDetails />
      </RecoilRoot>
    );
    const certificateDetails = screen.getByTestId("certificateDetails");
    expect(certificateDetails).toBeInTheDocument();
  });
});
