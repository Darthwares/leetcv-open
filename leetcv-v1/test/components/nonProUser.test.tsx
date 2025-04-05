import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import NonProUser from "@components/appbar/mobileSideBarMenu/nonProUser";

describe("NonProUser", () => {
  test("renders the component and checks its elements", () => {
    render(
      <RecoilRoot>
        <NonProUser />
      </RecoilRoot>
    );

    expect(screen.getByTestId("non-pro-container")).toBeInTheDocument();
    expect(screen.getByTestId("user-image")).toBeInTheDocument();
    expect(screen.getByTestId("user-name")).toBeInTheDocument();
    expect(screen.getByTestId("user-handle")).toBeInTheDocument();
    expect(screen.getByTestId("pro-btn")).toBeInTheDocument();
    expect(screen.getByTestId("pro-btn-text")).toBeInTheDocument();
  });
});
