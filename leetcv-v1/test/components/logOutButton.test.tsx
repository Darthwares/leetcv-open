import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import LogOutButton from "../../components/logOutButton";

describe("LogOutButton", () => {
  it("Should render logOut button", () => {
    render(
      <RecoilRoot>
        <LogOutButton />
      </RecoilRoot>
    );
    const signOutButton = screen.getByTestId("signOutButton");
    expect(signOutButton).toBeInTheDocument();
  });
});
