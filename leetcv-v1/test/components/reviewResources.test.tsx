import ReviewResources from "@components/resource/reviewResources";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ReviewResources", () => {
  const mockProps = {
    videoSrc: "your-video-source",
    VideoTitle: "Your Video Title",
  };

  it("Should render ReviewResources component with all elements", () => {
    render(
      <RecoilRoot>
        <ReviewResources {...mockProps} />
      </RecoilRoot>
    );

    const reviewResourcesContainer = screen.getByTestId("reviewResources");
    const titleElement = screen.getByTestId("title");
    const descriptionElement = screen.getByTestId("description");

    expect(reviewResourcesContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();

    const { videoSrc, VideoTitle } = mockProps;
    if (videoSrc && VideoTitle) {
      const videoContainer = screen.getByTestId("video-container");
      expect(videoContainer).toBeInTheDocument();
    } else {
      const lottieContainer = screen.getByTestId("lottie-container");
      expect(lottieContainer).toBeInTheDocument();
    }
  });
});
