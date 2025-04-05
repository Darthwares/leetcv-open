import HandleNotFound from "@components/handleNotFound";
import { screen, fireEvent, render } from "@testing-library/react";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("HandleNotFound", () => {
  it("renders the component", () => {
    render(<HandleNotFound />);
    expect(screen.getByTestId("handleNotFoundDiv")).toBeInTheDocument();

    expect(screen.getByTestId("handleNotFoundMessage")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("goToSearchButton"));
    
    const lottiePlayer = screen.getByTestId("lottie-player");
    expect(lottiePlayer).toBeInTheDocument();
    expect(lottiePlayer).toHaveAttribute(
      "src",
      "/assets/lottie/not-found.json"
    );
  });
});
