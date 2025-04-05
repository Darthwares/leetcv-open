import ProjectDetailsHeader from "@components/editor/project/projectDetailsHeader";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Project Detail Header", () => {
  it("Should render Project header components test results correctly", () => {
    render(
      <RecoilRoot>
        <ProjectDetailsHeader />
      </RecoilRoot>
    );
    const projectHeaderOverview = screen.getByTestId(`projectDetailsHeader`);
    expect(projectHeaderOverview).toBeInTheDocument();
    const ProjectDetails = screen.getByTestId(`add-button`);
    expect(ProjectDetails).toBeInTheDocument();
  });
});
