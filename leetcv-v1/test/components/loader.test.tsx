import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { Loader } from "@components/loader";
describe("Loader", () => {
  it("Should render Loader components", async () => {
    render(
      <RecoilRoot>
        <Loader />
      </RecoilRoot>
    );
    const loader = screen.getByTestId(`loader`);
    expect(loader).toBeInTheDocument();
    const loadingText = screen.getByTestId(`loading-text`);
    expect(loadingText).toBeInTheDocument();
  });
});

