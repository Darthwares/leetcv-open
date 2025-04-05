import PatentSection from "@components/editor/patents/patentSection";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("PatentSection", () => {
  it("should render PatentSection components", () => {
    render(
      <RecoilRoot>
        <PatentSection />
      </RecoilRoot>
    );
    const patentSection = screen.getByTestId("patent-section");
    expect(patentSection).toBeInTheDocument();
  });
});
