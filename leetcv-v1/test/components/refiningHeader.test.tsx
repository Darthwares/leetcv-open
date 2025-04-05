import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import RefiningHeader from "@components/convertToText/refiningHeader";

describe("RefiningHeader", () => {
  it("Should render all RefiningHeader component", () => {
    render(
      <RecoilRoot>
        <RefiningHeader />
      </RecoilRoot>
    );

    const refiningHeader = screen.getByTestId("refining-header");
    expect(refiningHeader).toBeInTheDocument();
  });
});
