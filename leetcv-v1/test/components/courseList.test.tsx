import CourseList from "@components/editor/course/courseSection";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../test/testStates";
import { baseCourses } from "../../test/testStates/basicState";

describe("CourseList", () => {
  xit("Should render all course list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <CourseList />
      </RecoilRoot>
    );

    const courseList = screen.getByTestId("courseList");
    expect(courseList).toBeInTheDocument();

    baseCourses.forEach((course, idx) => {
      expect(screen.getByTestId(`accordion-${idx}`)).toBeInTheDocument();
      expect(screen.getByTestId(`accordion-${idx}`)).not.toBeFalsy();
      expect(screen.getByTestId(`accordion-${idx}`)).toHaveTextContent(
        course.name
      );

      const courseTitle = screen.getByTestId(`course-title-${idx}`);
      expect(courseTitle).toBeInTheDocument();
      expect(courseTitle.textContent).toBe(course.name);
      fireEvent.click(courseTitle);

      const deleteIcon = screen.getByTestId(`deleteIcon-${idx}`);
      expect(deleteIcon).toBeInTheDocument();

      const deleteAction = screen.getByTestId(`deleteBtn-${idx}`);
      expect(deleteAction).toBeInTheDocument();
      expect(deleteAction.textContent).toBe("delete");
      fireEvent.click(deleteAction);
    });
  });
});
