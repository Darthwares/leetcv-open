import ReusableHeroBanner from "@components/reusableHeroBanner";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
const reusableHeroBannerProps = {
  title: "Dummy Title",
  description: "Dummy Description",
  className: "dummy-class",
  lottieImage: <div>dummy-lottie-image</div>,
  tokensLeft: <div>dummy-tokens-left</div>,
};
describe("ReusableHeroBanner", () => {
  it("renders the reusableHeroBanner component", () => {
    render(
      <RecoilRoot>
        <ReusableHeroBanner {...reusableHeroBannerProps} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("reusableHeroBanner")).toBeInTheDocument();
  });
});
