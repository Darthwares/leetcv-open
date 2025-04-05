import AwardDetailsHeader from "@components/editor/award/awardDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Award Detail Header", () => {
  it("Should render award header components test results correctly", () => {
    render(
      <RecoilRoot>
        <AwardDetailsHeader />
      </RecoilRoot>
    );
    const awardHeaderOverview = screen.getByTestId(`awardDetailsHeader`);
    expect(awardHeaderOverview).toBeInTheDocument();
    const awardsAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(awardsAddButton);
  });
});
