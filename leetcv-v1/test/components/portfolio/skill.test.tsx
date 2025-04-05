import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../testStates";
import SkillsData from "@components/portfolio/skills";
describe("SkillsData", () => {
  xit("Should render all skill data", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <SkillsData />
      </RecoilRoot>
    );
    const skillContainer = screen.getByTestId("skill-container");
    expect(skillContainer).toBeInTheDocument();

    const headerTitle = screen.getByTestId("header-title");
    expect(headerTitle).toBeInTheDocument();

    const skillItems = screen.getAllByTestId(/^skill-\d+$/);
    expect(skillItems).toHaveLength(2);
  });
});
