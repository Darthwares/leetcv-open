import EducationForm from "@components/editor/education/educationForm";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Education Form", () => {
  const educationList = {
    id: "0",
    name: "Computer Application",
    start: "10/10/2018",
    end: "10/10/2022",
    major: "Computer Application",
    degree: "M.tech",
    grade: "100",
  };

  const allEducation = [
    {
      id: "0",
      name: "Computer Application",
      start: "10/10/2018",
      end: "10/10/2022",
      major: "Computer Application",
      degree: "M.tech",
      grade: "100",
    },
  ];

  it("Should render Chip components test results correctly", () => {
    render(
      <RecoilRoot>
        <EducationForm education={educationList} />
      </RecoilRoot>
    );
    const AwardOverview = screen.getByTestId(`educations`);
    expect(AwardOverview).toBeInTheDocument();

    allEducation.forEach((_award, idx) => {
      expect(screen.getByTestId(`input-${idx}`)).toBeInTheDocument();
    });
  });
});
