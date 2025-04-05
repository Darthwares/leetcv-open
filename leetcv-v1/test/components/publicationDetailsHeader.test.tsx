import PublicationDetailsHeader from "@components/editor/publication/publicationDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";

describe("describe: Publication Detail Header", () => {
  it("Should render Publication Detail Header components correctly", () => {
    render(
      <RecoilRoot>
        <PublicationDetailsHeader />
      </RecoilRoot>
    );
    const publicationDetailsHeader = screen.getByTestId(
      `publicationDetailsHeader`
    );
    expect(publicationDetailsHeader).toBeInTheDocument();
    const publicationAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(publicationAddButton);
  });
});
