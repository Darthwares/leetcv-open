import CourseDetailsHeader from "@components/editor/course/courseDetailsHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Course Detail Header", () => {
  it("Should render Course Detail Header components", () => {
    render(
      <RecoilRoot>
        <CourseDetailsHeader />
      </RecoilRoot>
    );
    const courseHeader = screen.getByTestId(`courseDetailsHeader`);
    expect(courseHeader).toBeInTheDocument();
    const courseAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(courseAddButton);
  });
});
