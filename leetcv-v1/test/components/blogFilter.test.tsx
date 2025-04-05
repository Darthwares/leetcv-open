import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import BlogFilter from "@components/blogFilter";

describe("BlogFilter", () => {
  it("renders the BlogFilter component in the parent component", () => {
    render(
      <RecoilRoot>
        <BlogFilter posts={[]} setBlogs={() => {}} />
      </RecoilRoot>
    );

    expect(screen.getByTestId("blogFilter")).toBeInTheDocument();
  });
});
