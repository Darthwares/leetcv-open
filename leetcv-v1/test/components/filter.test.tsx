import Filter from "@components/resume/review/filter";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("Check Filter Component", () => {
  xit("Should render all Filter list", () => {
    render(
      <RecoilRoot>
        <Filter />
      </RecoilRoot>
    );

    const listbox = screen.getByTestId("listbox");
    expect(listbox).toBeInTheDocument();
  });
});
