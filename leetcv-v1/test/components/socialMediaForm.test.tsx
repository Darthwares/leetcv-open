import SocialMediaForm from "@components/editor/social/socialMediaForm";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("SocialMediaForm", () => {
  it("should render socialMediaForm", () => {
    const mockSocialMedia = {
      id: "1",
      name: "Github",
      socialMediaUrl: "https://www.github.com/",
    };
    render(
      <RecoilRoot>
        <SocialMediaForm socialMedia={mockSocialMedia} />
      </RecoilRoot>
    );
    const socialMediaForm = screen.getByTestId("socialMedia");
    expect(socialMediaForm).toBeInTheDocument();
  });
});
