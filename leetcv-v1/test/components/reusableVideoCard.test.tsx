import ReusableVideoCard from "@components/reusableVideoCard";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ReusableVideoCard", () => {
  const mockProps = {
    title: "Your Video Title",
    src: "your-video-source",
  };

  it("Should render ReusableVideoCard component with all elements", () => {
    render(
      <RecoilRoot>
        <ReusableVideoCard {...mockProps} />
      </RecoilRoot>
    );

    const reusableVideoCardContainer = screen.getByTestId(
      "reusable-video-card"
    );
    const videoTitleElement = screen.getByTestId("video-title");
    const iframeElement = screen.getByTestId("iframe");

    expect(reusableVideoCardContainer).toBeInTheDocument();
    expect(videoTitleElement).toBeInTheDocument();
    expect(iframeElement).toBeInTheDocument();
  });
});
