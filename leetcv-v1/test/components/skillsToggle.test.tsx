import SkillsToggle from "../../components/resume/skillsToggle";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { skillsToggleState } from "../../state/state";

const skills = [
  { name: "nodejs", count: 1, selected: false, id: 0 },
  { name: "jest", count: 1, selected: false, id: 1 },
  { name: "react", count: 0, selected: true, id: 2 },
  { name: "tailwind", count: 0, selected: true, id: 3 },
];

describe("skillsToggle", () => {
  const initializeState = ({ set }: any) => {
    set(skillsToggleState, skills);
  };
  it("Should handle empty skills", () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <SkillsToggle />
      </RecoilRoot>
    );
    for (let i = 1; i < skills.length; i++) {
      expect(screen.queryByTestId(`skill-content-${skills[i].id}`)).toBeFalsy();
    }
  });
  xit("Should handle selected state of skills", () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <SkillsToggle />
      </RecoilRoot>
    );
    skills.forEach((elem) => {
      const skillsToggle = screen.queryByText(elem.name) as HTMLButtonElement;
      expect(skillsToggle).toBeInTheDocument();
      fireEvent.click(skillsToggle);
    });
  });
  xit("Should should set right state on Click event", () => {
    render(
      <RecoilRoot initializeState={initializeState}>
        <SkillsToggle />
      </RecoilRoot>
    );
    expect(
      screen.getByTestId(`skillsToggle-${skills[0].id}`)
    ).toHaveTextContent(skills[0].name);
  });
});
