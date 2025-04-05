import WaitListHeader from "@components/waitList/waitListHeader";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("WaitListHeader", () => {
  it("renders the waitListHeader component", () => {
    render(
      <RecoilRoot>
        <WaitListHeader />
      </RecoilRoot>
    );

    expect(screen.getByTestId("waitListHeader")).toBeInTheDocument();
  });
});
