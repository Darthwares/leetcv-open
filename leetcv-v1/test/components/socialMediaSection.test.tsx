import SocialMediaSection from "@components/editor/social/socialMediaSection";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("SocialMediaSection", () => {
  xit("should render socialMediaSection", () => {
    render(
      <RecoilRoot>
        <SocialMediaSection />
      </RecoilRoot>
    );
    const socialMediaSection = screen.getByTestId("socialList");
    expect(socialMediaSection).toBeInTheDocument();
  });
});
