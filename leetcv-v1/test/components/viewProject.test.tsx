import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ViewProject from "@components/attestation/viewProject";

describe("ViewProject", () => {
  test("renders the component and checks its elements", () => {
    render(
      <RecoilRoot>
        <ViewProject />
      </RecoilRoot>
    );

    expect(screen.getByTestId("view-project-container")).toBeInTheDocument();
    expect(screen.getByTestId("project-name")).toBeInTheDocument();
    expect(screen.getByTestId("project-date-range")).toBeInTheDocument();
    expect(screen.getByTestId("project-work")).toBeInTheDocument();
  });
});
