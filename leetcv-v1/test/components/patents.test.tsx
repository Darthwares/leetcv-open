import Patents from "@components/resume/patents";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("Patents", () => {
  it("should render Patents components", () => {
    render(
      <RecoilRoot>
        <Patents />
      </RecoilRoot>
    );
    const patentsContainer = screen.getByTestId("patents-container");
    expect(patentsContainer).toBeInTheDocument();
  });
});
