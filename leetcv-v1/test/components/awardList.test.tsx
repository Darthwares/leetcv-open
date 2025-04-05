import AwardList from "@components/editor/award/awardSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseAwards } from "../../test/testStates/basicState";

describe("AwardList", () => {
  xit("Should render all award list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <AwardList />
      </RecoilRoot>
    );

    const awardList = screen.getByTestId("awardList");
    expect(awardList).toBeInTheDocument();

    baseAwards.forEach((award, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        award.name
      );

      const awardTitle = screen.getByTestId(`award-title-${idx}`);
      expect(awardTitle).toBeInTheDocument();
      expect(awardTitle.textContent).toBe(award.name);
      fireEvent.click(awardTitle);

      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();

      const deleteAction = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteAction).toBeInTheDocument();
      expect(deleteAction.textContent).toBe("delete");
      fireEvent.click(deleteAction);
    });
  });
});
