import PublicResumeShare from "@components/publicResumeShare";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("PublicResumeShare", () => {
  it("Should render the public resume share component", () => {
    render(
      <RecoilRoot>
        <PublicResumeShare />
      </RecoilRoot>
    );

    const publicResumeShare = screen.getByTestId("public-resume-share");
    expect(publicResumeShare).toBeInTheDocument();
    const linkElement = screen.getByTestId("public-resume-share-link");
    expect(linkElement).toBeInTheDocument();
    const shareButton = screen.getByTestId("public-resume-share-btn");
    expect(shareButton).toBeInTheDocument();
    fireEvent.click(shareButton);
  });
});
