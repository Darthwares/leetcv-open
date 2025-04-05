import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import BackgroundBlur from "@components/resource/backgroundBlur";
describe("BackgroundBlur", () => {
  it("Should render Background Blur test results correctly", () => {
    render(
      <RecoilRoot>
        <BackgroundBlur />
      </RecoilRoot>
    );
    const backgroundBlur = screen.getByTestId(`backgroundBlur`);
    expect(backgroundBlur).toBeInTheDocument();
  });
});
