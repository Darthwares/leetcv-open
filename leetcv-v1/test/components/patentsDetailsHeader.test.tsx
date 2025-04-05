import PatentDetailsHeader from "@components/editor/patents/patentDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";

describe("describe: Patent Detail Header", () => {
  it("Should render Patent Detail Header components correctly", () => {
    render(
      <RecoilRoot>
        <PatentDetailsHeader />
      </RecoilRoot>
    );
    const patentDetailsHeader = screen.getByTestId(`patentDetailsHeader`);
    expect(patentDetailsHeader).toBeInTheDocument();
    const patentAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(patentAddButton);
  });
});
