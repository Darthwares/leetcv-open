import ExperienceList from "@components/editor/experience/experienceSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseExperience } from "../../test/testStates/basicState";

describe("ExperienceList", () => {
  xit("Should render all award list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <ExperienceList />
      </RecoilRoot>
    );

    const awardList = screen.getByTestId("awardList");
    expect(awardList).toBeInTheDocument();

    baseExperience.forEach((award, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      const awardTitle = screen.getByTestId(`award-title-${idx}`);
      fireEvent.click(awardTitle);
      const cloneIcon = screen.getByTestId(`cloneIcon-${idx}`);
      expect(cloneIcon).toBeInTheDocument();
      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();
    });
  });
});
