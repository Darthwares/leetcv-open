import WaitListAccess from "@components/waitList/waitlistAccess";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("WaitListAccess", () => {
  it("renders the WaitListAccess component", () => {
    render(
      <RecoilRoot>
        <WaitListAccess />
      </RecoilRoot>
    );
    expect(screen.getByTestId("waitListAccess")).toBeInTheDocument();
  });
});
