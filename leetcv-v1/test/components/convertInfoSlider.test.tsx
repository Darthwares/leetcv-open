import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ConvertInfoSlider from "@components/convertToText/convertInfoSlider";

describe("ConvertInfoSlider", () => {
  it("Should render all Convert Info Slider", () => {
    render(
      <RecoilRoot>
        <ConvertInfoSlider />
      </RecoilRoot>
    );

    const convertInfoSlider = screen.getByTestId("convert-info-slider");
    expect(convertInfoSlider).toBeInTheDocument();
  });
});
