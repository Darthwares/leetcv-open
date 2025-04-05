import LanguageDetails from "@components/editor/language/languageDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("LanguageDetails", () => {
  xit("should render languageDetailsHeader and languageSection", () => {
    render(
      <RecoilRoot>
        <LanguageDetails />
      </RecoilRoot>
    );
    const languageDetails = screen.getByTestId("languageDetails");
    expect(languageDetails).toBeInTheDocument();
  });
});
