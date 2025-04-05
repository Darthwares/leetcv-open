import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ProUser from "@components/appbar/mobileSideBarMenu/proUser";

describe("ProUser", () => {
  test("renders the component and checks its elements", () => {
    render(
      <RecoilRoot>
        <ProUser />
      </RecoilRoot>
    );

    expect(screen.getByTestId("pro-user-container")).toBeInTheDocument();
    expect(screen.getByTestId("user-name")).toBeInTheDocument();
    expect(screen.getByTestId("user-handle")).toBeInTheDocument();
    expect(screen.getByTestId("user-plan")).toBeInTheDocument();
  });
});
