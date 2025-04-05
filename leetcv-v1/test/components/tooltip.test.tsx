import Tooltip from "@components/tooltip";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("Tool tip", () => {
  it("Should show Tool tip", () => {
    render(
      <RecoilRoot>
        <Tooltip tip="" key={""} />
      </RecoilRoot>
    );
    const tooltip = screen.getByTestId(`tooltip`);
    expect(tooltip).toBeTruthy();
    const tooltipIcon = screen.getByTestId(`tooltipIcon`);
    expect(tooltipIcon).toBeTruthy();
    fireEvent.click(tooltipIcon);
    fireEvent.change(tooltipIcon);
  });
});
