import EducationDetails from "../components/resume/educationDetails";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("should be render education component ", () => {
  const educationList = [
    {
      id: 0,
      degree: "MCA",
      grade: "A",
      major: "Computer Application",
      name: "AMIT",
      end: "2022",
      start: "2022",
    },
  ];

  xit("should render education component", () => {
    render(<EducationDetails />);

    expect(screen.getByTestId(`educations`)).toBeInTheDocument();
    expect(screen.getByTestId(`educationTitle`)).toBeInTheDocument();
    expect(screen.queryByTestId(`educationNotFound`)).toBeFalsy();
  });

  xit("should show all the education data", () => {
    render(<EducationDetails />);

    educationList.forEach((element) => {
      const degree = screen.queryByTestId(`degree-${element.id}`);
      const grade = screen.queryByTestId(`grade-${element.id}`);
      const major = screen.queryByTestId(`major-${element.id}`);
      const university = screen.queryByTestId(`university-${element.id}`);
      const duration = screen.queryByTestId(`duration-${element.id}`);

      expect(degree).toBeInTheDocument();
      expect(duration).toBeInTheDocument();
      expect(university).toBeInTheDocument();
      expect(grade).toBeInTheDocument();
      expect(major).toBeInTheDocument();
    });
  });

  xit("should show empty state", () => {
    render(<EducationDetails />);

    expect(screen.getByTestId(`educationNotFound`)).toBeInTheDocument();
  });
});
