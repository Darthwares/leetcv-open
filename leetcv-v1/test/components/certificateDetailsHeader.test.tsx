import CertificateDetailsHeader from "@components/editor/certificate/certificateDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Certificate Detail Header", () => {
  it("Should render Certificate Detail Header components correctly", () => {
    render(
      <RecoilRoot>
        <CertificateDetailsHeader />
      </RecoilRoot>
    );
    const certificateDetailsHeader = screen.getByTestId(
      `certificateDetailsHeader`
    );
    expect(certificateDetailsHeader).toBeInTheDocument();
    const certificateAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(certificateAddButton);
  });
});
