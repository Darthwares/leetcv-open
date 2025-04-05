import LanguageHeader from "@components/editor/language/languageHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Language Header", () => {
  it("Should render language header components test results correctly", () => {
    render(
      <RecoilRoot>
        <LanguageHeader />
      </RecoilRoot>
    );
    const languageHeader = screen.getByTestId(`languageHeader`);
    expect(languageHeader).toBeInTheDocument();
    const languageAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(languageAddButton);
  });
});
