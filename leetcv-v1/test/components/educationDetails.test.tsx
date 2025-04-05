import EducationDetails from "@components/editor/education/educationDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("EducationDetails", () => {
  xit("should render educationDetailsHeader and educationList", () => {
    render(
      <RecoilRoot>
        <EducationDetails />
      </RecoilRoot>
    );
    const educationDetails = screen.getByTestId("educationDetails");
    expect(educationDetails).toBeInTheDocument();
  });
});
