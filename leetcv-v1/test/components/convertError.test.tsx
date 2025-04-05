import React from "react";
import { render, screen } from "@testing-library/react";
import ConvertError from "@components/convertToText/convertError";
import { RecoilRoot } from "recoil";

describe("ConvertError Component", () => {
  it("should render the error message and reload button", () => {
    render(
      <RecoilRoot>
        <ConvertError />
      </RecoilRoot>
    );

    expect(screen.getByTestId("convert-error")).toBeInTheDocument();
    expect(screen.getByTestId("error-lottie")).toBeInTheDocument();
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    expect(screen.getByTestId("reload-btn")).toBeInTheDocument();
  });
});
