import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ShowSharableLinks from "@components/settings/referral/showSharableLinks";

describe("ShowSharableLinks", () => {
  it("Should render showSharableLinks component", () => {
    render(
      <RecoilRoot>
        <ShowSharableLinks />
      </RecoilRoot>
    );

    const showSharableLinks = screen.getByTestId("showSharableLinks");
    expect(showSharableLinks).toBeInTheDocument();
  });
});
