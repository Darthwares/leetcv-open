import RequestResources from "@components/resource/requestsResources";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("RequestResources", () => {
  const mockProps = {
    title: "Your Title",
    message: "Your Message",
    path: "/assets/lottie/security-lock.json",
    videoSrc: "your-video-source",
    VideoTitle: "Your Video Title",
  };

  it("Should render RequestResources component with all elements", () => {
    render(
      <RecoilRoot>
        <RequestResources {...mockProps} />
      </RecoilRoot>
    );

    const requestResourcesContainer = screen.getByTestId("request-Resources");
    const titleElement = screen.getByTestId("title");
    const messageElement = screen.getByTestId("message");
    const lottiePathElement = screen.getByTestId("lottie-path");
    const videoSrcElement = screen.getByTestId("video-src");

    expect(requestResourcesContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
    expect(lottiePathElement).toBeInTheDocument();
    expect(videoSrcElement).toBeInTheDocument();
  });
});
