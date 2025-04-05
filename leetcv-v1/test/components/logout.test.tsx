import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Logout from "@components/logout";
describe("Logout", () => {
  it("Should render Logout components", async () => {
    render(
      <RecoilRoot>
        <Logout />
      </RecoilRoot>
    );

    const signOut = screen.getByTestId(`signOutButton`);
    expect(signOut).toBeInTheDocument();
  });
});
