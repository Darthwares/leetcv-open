import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import SettingAndLogout from "@components/appbar/mobileSideBarMenu/settingAndLogout";

describe("SettingAndLogout", () => {
  test("renders the component and checks each button", () => {
    render(
      <RecoilRoot>
        <SettingAndLogout />
      </RecoilRoot>
    );

    const options = [
      {
        name: "Settings",
        icon: "icon-0",
        onClick: () => {},
      },
      {
        name: "Sign Out",
        icon: "icon-1",
        onClick: () => {},
      },
    ];

    options.forEach((_, i) => {
      const button = screen.getByTestId(`button-${i}`);
      const icon = screen.getByTestId(`icon-${i}`);
      const name = screen.getByTestId(`name-${i}`);

      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });

    const settingAndLogoutContainer = screen.getByTestId(
      "setting-logout-container"
    );
    expect(settingAndLogoutContainer).toBeInTheDocument();
  });
});
