import ExperienceDetailsHeader from "@components/editor/experience/experienceDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: experience Detail Header", () => {
  it("Should render experience header components test results correctly", () => {
    render(
      <RecoilRoot>
        <ExperienceDetailsHeader />
      </RecoilRoot>
    );
    const experienceHeaderOverview = screen.getByTestId(
      `experienceDetailsHeader`
    );
    expect(experienceHeaderOverview).toBeInTheDocument();
    const expAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(expAddButton);
  });
});
