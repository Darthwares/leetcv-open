import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { Badges } from "@components/search/badges";
describe("Search Card", () => {
  it("Should render Search Card test results correctly", () => {
    render(
      <RecoilRoot>
        <Badges name="project" length={2} />
      </RecoilRoot>
    );
    const badges = screen.getByTestId(`badges`);
    expect(badges).toBeInTheDocument();
  });
});
