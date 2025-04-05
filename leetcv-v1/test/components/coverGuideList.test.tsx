import ConvertGuideList from "@components/convertToText/convertGuideList";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("ConvertGuideList", () => {
  it("Should render ConvertGuideList component with all elements", () => {
    render(
      <RecoilRoot>
        <ConvertGuideList />
      </RecoilRoot>
    );

    const convertGuideListContainer = screen.getByTestId("convert-guide-list");
    const title = screen.getByTestId("title");
    const stepsList = screen.getByTestId("steps-list");

    expect(convertGuideListContainer).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(stepsList).toBeInTheDocument();
  });
});
