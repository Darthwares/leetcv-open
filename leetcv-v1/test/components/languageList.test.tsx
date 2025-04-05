import LanguageList from "@components/editor/language/languageSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseLanguages } from "../../test/testStates/basicState";

describe("LanguageList", () => {
  xit("Should render all language list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <LanguageList />
      </RecoilRoot>
    );

    const languageList = screen.getByTestId("languageList");
    expect(languageList).toBeInTheDocument();

    baseLanguages.forEach((language, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        language.name
      );

      const languageTitle = screen.getByTestId(`language-title-${idx}`);
      expect(languageTitle).toBeInTheDocument();
      expect(languageTitle.textContent).toBe(language.name);
      fireEvent.click(languageTitle);

      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();

      const deleteAction = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteAction).toBeInTheDocument();
      expect(deleteAction.textContent).toBe("delete");
      fireEvent.click(deleteAction);
    });
  });
});
