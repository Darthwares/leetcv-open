import BecomeProButton from "../../components/becomeProButton";
import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("BecomeProButton", () => {
  it("renders the becomeProButton component", () => {
    render(
      <RecoilRoot>
        <BecomeProButton title="Title" buttonTitle="btnTitle" />
      </RecoilRoot>
    );

    expect(screen.getByTestId("becomeProButton")).toBeInTheDocument();
  });
});
