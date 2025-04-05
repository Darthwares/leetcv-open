import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import StickyTip from "@components/editor/stickyTips";
import { tipsExperience } from "@constants/defaults";
describe("UpSell", () => {
  it("Should show UpSell", () => {
    render(
      <RecoilRoot>
        <StickyTip stickyTips={tipsExperience} />
      </RecoilRoot>
    );
    const stickyTip = screen.getByTestId(`stickyTip`);
    expect(stickyTip).toBeInTheDocument();
    const stickyButton = screen.getByTestId(`stickyButton`);
    expect(stickyButton).toBeInTheDocument();
    fireEvent.click(stickyButton);
  });
});
