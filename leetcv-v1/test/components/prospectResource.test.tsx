import ProspectResource from "../../components/resource/prospects";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ProspectResource", () => {
  it("Should show prospect Resources tests correctly", () => {
    render(
      <RecoilRoot>
        <ProspectResource />
      </RecoilRoot>
    );
    const prospectResources = screen.queryByTestId(`prospectResources`);
    expect(prospectResources).toBeTruthy();
  });
});
