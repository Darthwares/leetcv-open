import Projects from "../components/resume/projects";
import { render, screen } from "@testing-library/react";
import React from "react";

xdescribe("shuld be render project component ", () => {
  const projectList = [
    {
      id: 0,
      name: "xyz",
      skills: ["java", "C++", "NodeJs", "React"],
      company: "Darthwares",
      title: "Software Developer",
      start: "2022",
      end: "On-going",
      impact: "impact was something, impact was something,impact was somet",
      work: "Work is not impact Work is not impact  not impact ",
    },
  ];

  xit("should render Project component", () => {
    render(<Projects />);
    const project = screen.getByTestId("project-skill");
    expect(project).toBeInTheDocument();
  });
  xit("should show all the Project test results correctly", () => {
    render(<Projects />);
    projectList.forEach((element) => {
      const company = screen.getByTestId(`company-${element.id}`);
      const impact = screen.getByTestId(`impact-${element.id}`);
      const work = screen.getByTestId(`work-${element.id}`);
      const name = screen.getByTestId(`name-${element.id}`);
      const start = screen.getByTestId(`start-${element.id}`);
      const end = screen.getByTestId(`end-${element.id}`);
      const workTitle = screen.getByTestId(`workTitle-${element.id}`);
      expect(company).toBeInTheDocument();
      expect(impact).toBeInTheDocument();
      expect(work).toBeInTheDocument();
      expect(name).toBeDefined();
      expect(start).toBeInTheDocument();
      expect(end).toBeInTheDocument();
      expect(workTitle).toBeInTheDocument();
    });
  });
  xit("should show No project", () => {
    render(<Projects />);
    expect(screen.getByTestId(`noproject`)).toBeInTheDocument();
  });
});
