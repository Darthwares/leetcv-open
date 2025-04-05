import ExperienceDetails from "@components/editor/experience/experienceDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("describe: Experience Details", () => {
  xit("should render experience Details Header", () => {
    render(
      <RecoilRoot>
        <ExperienceDetails />
      </RecoilRoot>
    );
    const experienceDetails = screen.getByTestId("experienceDetails");
    expect(experienceDetails).toBeInTheDocument();
  });
});
