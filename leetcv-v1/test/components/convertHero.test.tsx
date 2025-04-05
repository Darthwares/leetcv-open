import ConvertHero from "@components/convertToText/convertHero";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ConvertHero", () => {
  it("Should render ConvertHero component with all elements", () => {
    render(
      <RecoilRoot>
        <ConvertHero />
      </RecoilRoot>
    );

    const convertHeroContainer = screen.getByTestId("convert-hero");
    const heroContainer = screen.getByTestId("convert-hero-container");

    expect(convertHeroContainer).toBeInTheDocument();
    expect(heroContainer).toBeInTheDocument();
  });
});
