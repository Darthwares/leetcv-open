import { render, screen } from "@testing-library/react";
import React from "react";
import Awards from "@components/resume/awards";
import { RecoilRoot } from "recoil";

describe("Awards", () => {
  xit("should render Award component", () => {
    render(
      <RecoilRoot>
        <Awards />
      </RecoilRoot>
    );
    const dateRange = screen.getByTestId("dateRange");
    expect(dateRange).not.toBeInTheDocument();
  });
});
