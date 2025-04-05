import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Spinner from "@components/spinner";

describe("describe: Spinner Component", () => {
  it("Should render Spinner components test results correctly", () => {
    render(
      <RecoilRoot>
        <Spinner />
      </RecoilRoot>
    );
    const spinner = screen.getByTestId(`spinner`);
    expect(spinner).toBeInTheDocument();
  });
});
