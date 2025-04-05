import PublicationList from "@components/editor/publication/publicationSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { basePublications } from "../../test/testStates/basicState";

describe("PublicationList", () => {
  xit("Should render all Publication list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <PublicationList />
      </RecoilRoot>
    );

    const publicationList = screen.getByTestId("publicationList");
    expect(publicationList).toBeInTheDocument();

    basePublications.forEach((publication, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        publication.title
      );

      const publicationTitle = screen.getByTestId(`publication-title-${idx}`);
      expect(publicationTitle).toBeInTheDocument();
      expect(publicationTitle.textContent).toBe(publication.title);
      fireEvent.click(publicationTitle);

      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();

      const deleteAction = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteAction).toBeInTheDocument();
      expect(deleteAction.textContent).toBe("delete");
      fireEvent.click(deleteAction);
    });
  });
});
