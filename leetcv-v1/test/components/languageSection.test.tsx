import LanguageSection from "@components/editor/language/languageSection";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("LanguageSection", () => {
  xit("should render languageSection", () => {
    render(
      <RecoilRoot>
        <LanguageSection />
      </RecoilRoot>
    );
    const languageSection = screen.getByTestId("languageList");
    expect(languageSection).toBeInTheDocument();
  });
});
