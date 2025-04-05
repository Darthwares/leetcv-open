import ProgressBar from "@components/progressBar";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";

describe("describe: Testing Progess Bar", () => {
  it("Should render Progess Bar component test results correctly", () => {
    render(
      <RecoilRoot>
        <ProgressBar />
      </RecoilRoot>
    );
    const progressBar = screen.getByTestId(`progress-bar`);
    expect(progressBar).toBeInTheDocument();
    const profileCompletion = screen.getByTestId(`progress-bar-percentage`);
    expect(profileCompletion).toBeInTheDocument();
  });
});
