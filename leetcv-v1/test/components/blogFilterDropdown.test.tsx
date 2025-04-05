import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import BlogFilterDropdown from "@components/blogFilterDropdown";

describe("BlogFilterDropdown", () => {
  it("renders the BlogFilterDropdown component", () => {
    const categories = ["Categories1", "Categories2", "Categories3"];
    const selected = "Categories1";
    const handleClick = jest.fn();

    render(
      <RecoilRoot>
        <BlogFilterDropdown
          blogCategories={categories}
          selected={selected}
          handleClick={handleClick}
        />
      </RecoilRoot>
    );

    expect(screen.getByTestId("blogFilterDropdown")).toBeInTheDocument();
  });
});
