import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import CoverLetterEditor from "../../components/coverLetter/coverLetterEditor";

describe("CoverLetterEditor", () => {
  it("Should render cover letter editor", () => {
    render(
      <RecoilRoot>
        <CoverLetterEditor
          markdownData="cover letter"
          placeholder="cover letter"
        />
      </RecoilRoot>
    );

    const coverLetterEditor = screen.getByTestId("coverLetterEditor");
    expect(coverLetterEditor).toBeInTheDocument();
  });
});
