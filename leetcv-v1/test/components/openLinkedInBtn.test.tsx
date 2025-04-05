import OpenLinkedinButton from "@components/convertToText/openLinkedinButton";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("OpenLinkedinButton", () => {
  it("Should render OpenLinkedinButton component", () => {
    render(
      <RecoilRoot>
        <OpenLinkedinButton />
      </RecoilRoot>
    );

    const openLinkedinContainer = screen.getByTestId("open-linkedin-container");
    const title = screen.getByTestId("title");
    const openLinkedinBtn = screen.getByTestId("open-linkedin-btn");

    expect(openLinkedinContainer).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(openLinkedinBtn).toBeInTheDocument();
  });
});
