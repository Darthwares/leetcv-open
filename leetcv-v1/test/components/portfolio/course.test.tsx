import { Courses } from "@components/portfolio/courses";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../../testStates";

describe("CoursesList", () => {
  xit("Should render all Courses list", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <Courses />
      </RecoilRoot>
    );
    expect(screen.getByTestId("courses-container")).toBeInTheDocument();
    expect(screen.getByTestId("header-title")).toBeInTheDocument();
  });
});
