import PatentDetails from "@components/editor/patents/patentDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("PatentDetails", () => {
  it("should render PatentDetails components", () => {
    render(
      <RecoilRoot>
        <PatentDetails />
      </RecoilRoot>
    );
    const patentDetails = screen.getByTestId("patentDetails");
    expect(patentDetails).toBeInTheDocument();
  });
});
