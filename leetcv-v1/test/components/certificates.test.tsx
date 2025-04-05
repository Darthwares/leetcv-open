import Certificates from "@components/resume/certificates";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("Certificate", () => {
  it("Should render all certificate list", () => {
    render(
      <RecoilRoot>
        <Certificates />
      </RecoilRoot>
    );

    const certificate = screen.getByTestId("certificate");
    expect(certificate).toBeInTheDocument();
  });
});
