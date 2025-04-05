import ResumeReviewHero from "@components/resumeReview/resumeReviewHero";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ResumeReviewHero", () => {
  it("Should render ResumeReviewHero component with all elements", () => {
    render(
      <RecoilRoot>
        <ResumeReviewHero />
      </RecoilRoot>
    );

    const resumeReviewHeroContainer = screen.getByTestId("resumeReviewHero");
    expect(resumeReviewHeroContainer).toBeInTheDocument();
  });
});
