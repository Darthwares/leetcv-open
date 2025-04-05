import SocialMediaDetails from "@components/editor/social/socialMediaDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("SocialMediaDetails", () => {
  xit("should render SocialMediaDetailsHeader and socialSection", () => {
    render(
      <RecoilRoot>
        <SocialMediaDetails />
      </RecoilRoot>
    );
    const socialMediaDetails = screen.getByTestId("socialMediaDetails");
    expect(socialMediaDetails).toBeInTheDocument();
  });
});
