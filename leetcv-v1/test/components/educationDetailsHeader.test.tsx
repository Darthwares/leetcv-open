import EducationDetailsHeader from "@components/editor/education/educationDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: education Detail Header", () => {
  it("Should render education header components test results correctly", () => {
    render(
      <RecoilRoot>
        <EducationDetailsHeader />
      </RecoilRoot>
    );
    const educationHeaderOverview = screen.getByTestId(
      `educationDetailsHeader`
    );
    expect(educationHeaderOverview).toBeInTheDocument();
    const eduAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(eduAddButton);
  });
});
