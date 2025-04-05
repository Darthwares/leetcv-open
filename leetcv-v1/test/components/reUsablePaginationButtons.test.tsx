import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ReUsablePaginationButtons from "@components/reUsablePaginationButtons";

describe("ReUsablePaginationButtons", () => {
  it("Should render re usable pagination buttons", () => {
    render(
      <RecoilRoot>
        <ReUsablePaginationButtons
          currentPage={1}
          totalPages={10}
          setCurrentPage={() => {}}
        />
      </RecoilRoot>
    );

    const pagination = screen.getByTestId("pagination");
    expect(pagination).toBeInTheDocument();
  });
});
