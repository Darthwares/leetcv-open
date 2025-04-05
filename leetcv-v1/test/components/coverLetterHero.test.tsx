import CoverHero from "@components/coverLetter/coverLetterHero";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ConvertHero", () => {
  it("Should render ConvertHero component with all elements", () => {
    render(
      <RecoilRoot>
        <CoverHero />
      </RecoilRoot>
    );

    const convertHeroContainer = screen.getByTestId("coverLetterHero");
    const heroContainer = screen.getByTestId("coverLetterHeroContainer");

    expect(convertHeroContainer).toBeInTheDocument();
    expect(heroContainer).toBeInTheDocument();
  });
});
