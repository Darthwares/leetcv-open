import ViewToggle from "@components/viewToggle";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("View toggle", () => {
  it("Should show View toggle", () => {
    render(
      <RecoilRoot>
        <ViewToggle icon={<></>} state="" key={""} />
      </RecoilRoot>
    );
    const viewToggle = screen.getByTestId(`viewToggle`);
    expect(viewToggle).toBeTruthy();
  });
});
