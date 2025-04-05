import ReUsableWatchVideoBanner from "@components/reUsableWatchVideoBanner";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ReUsableWatchVideoBanner", () => {
  it("Should render all re-usable watchVideoBanner", () => {
    render(
      <RecoilRoot>
        <ReUsableWatchVideoBanner title="title" />
      </RecoilRoot>
    );

    const watchVideoBanner = screen.getByTestId("watchVideoBanner");
    expect(watchVideoBanner).toBeInTheDocument();
  });
});
