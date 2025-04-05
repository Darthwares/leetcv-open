import EducationList from "@components/editor/education/educationSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseEducations } from "../../test/testStates/basicState";

describe("EducationList", () => {
  xit("Should render all education list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <EducationList />
      </RecoilRoot>
    );

    const educationList = screen.getByTestId("educationList");
    expect(educationList).toBeInTheDocument();

    baseEducations.forEach((education, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        education.degree
      );

      const educationtitle = screen.getByTestId(`education-title-${idx}`);
      expect(educationtitle).toBeInTheDocument();
      expect(educationtitle.textContent).toBe(education.degree);
      fireEvent.click(educationtitle);

      const trashIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(trashIcon).toBeInTheDocument();

      const deleteBtn = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteBtn).toBeInTheDocument();
      expect(deleteBtn.textContent).toBe("delete");
      fireEvent.click(deleteBtn);
    });
  });
});
