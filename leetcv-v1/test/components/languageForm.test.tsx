import LanguageForm from "@components/editor/language/languageForm";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("LanguageForm", () => {
  it("should render languageForm", () => {
    const mockLanguage = {
      read: true,
      write: false,
      speak: true,
      id: "123",
      name: "English",
    };

    render(
      <RecoilRoot>
        <LanguageForm language={mockLanguage} />
      </RecoilRoot>
    );
    const languageForm = screen.getByTestId("language");
    expect(languageForm).toBeInTheDocument();
  });
});
