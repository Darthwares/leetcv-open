import PersonalDetailsHeader from "@components/editor/personal/PersonalDetailsHeader";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Personal Detail Header", () => {
  it("Should render Personal header components test results correctly", () => {
    render(
      <RecoilRoot>
        <PersonalDetailsHeader />
      </RecoilRoot>
    );
    const personalHeaderOverview = screen.getByTestId(`personalDetailsHeader`);
    expect(personalHeaderOverview).toBeInTheDocument();
    const personalDetails = screen.getByTestId(`personal-details`);
    expect(personalDetails).toBeInTheDocument();
  });
});
