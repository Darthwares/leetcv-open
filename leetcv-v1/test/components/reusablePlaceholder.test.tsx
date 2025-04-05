import ReusablePlaceholder from "@components/reusablePlaceholder";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ReusablePlaceholder", () => {
  const mockProps = {
    title: "Your Title",
    description: "Your Description",
    lottie: "your-lottie-file",
  };

  it("Should render ReusablePlaceholder component with all elements", () => {
    render(
      <RecoilRoot>
        <ReusablePlaceholder {...mockProps} />
      </RecoilRoot>
    );

    const placeholderContainer = screen.getByTestId(
      "reusable-placeholder-container"
    );
    const titleElement = screen.getByTestId("title");
    const descriptionElement = screen.getByTestId("description");
    const linkButton = screen.getByTestId("link-btn");
    const lottieContainer = screen.getByTestId("lottie-container");

    expect(placeholderContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(linkButton).toBeInTheDocument();
    expect(lottieContainer).toBeInTheDocument();
  });
});
