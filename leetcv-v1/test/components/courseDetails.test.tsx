import CourseDetails from "@components/editor/course/courseDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("CourseDetails", () => {
  xit("should render courseDetails component", () => {
    render(
      <RecoilRoot>
        <CourseDetails />
      </RecoilRoot>
    );
    const courseDetails = screen.getByTestId("courseDetails");
    expect(courseDetails).toBeInTheDocument();
  });
});
