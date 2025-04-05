import ResumeIdeaBanner from "@components/resumeReview/resumeIdeaBanner";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ResumeIdeaBanner", () => {
  it("Should render ResumeIdeaBanner component with all elements", () => {
    render(
      <RecoilRoot>
        <ResumeIdeaBanner />
      </RecoilRoot>
    );

    const resumeIdeaBannerContainer = screen.getByTestId("resumeIdeaBanner");
    expect(resumeIdeaBannerContainer).toBeInTheDocument();
  });
});
