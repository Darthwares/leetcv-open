import ExperienceForm from "@components/editor/experience/experienceForm";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Experience Form", () => {
  const experience = {
    description: "This was an Adventure Camping experience",
    title: "Adventure Camping",
    company: "Thunder Brand",
    start: "10-10-2022",
    end: "16-10-2022",
    id: "01267",
  };

  const allExperiences = [
    {
      description: "This was an Adventure Camping experience",
      title: "Job Title",
      company: "Thunder Brand",
      start: "10-10-2022",
      end: "16-10-2022",
      id: "label-0",
    },
  ];

  xit("Should render Chip components test results correctly", () => {
    jest.mock("@utils/trpc", () => ({
      useMutation: jest.fn(() => [jest.fn()]), // Mock trpc.useMutation
    }));

    jest.mock("recoil", () => ({
      // Mock useRecoilState
      useRecoilState: jest.fn().mockReturnValue([{}, jest.fn()]),
    }));

    // Mock the OpenAI API
    jest.mock("openai", () => ({
      Configuration: jest.fn(),
      OpenAIApi: jest.fn().mockReturnValue({
        createCompletion: jest.fn().mockResolvedValue({
          data: {
            choices: [{ text: "mocked text" }],
          },
        }),
      }),
    }));

    render(
      <RecoilRoot>
        <ExperienceForm experience={experience} />
      </RecoilRoot>
    );
    const experienceOverview = screen.getByTestId(`experiences`);
    expect(experienceOverview).toBeInTheDocument();
  });
});
