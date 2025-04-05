import React from "react";
import { render, screen } from "@testing-library/react";
import FeaturesOptions from "@components/appbar/mobileSideBarMenu/featuresOptions";
import { RecoilRoot } from "recoil";

describe("FeaturesOptions", () => {
  test("renders the component and checks each button", () => {
    render(
      <RecoilRoot>
        <FeaturesOptions />
      </RecoilRoot>
    );

    const featuresOptions = [
      {
        name: "Dashboard",
        icon: "icon-0",
        onclick: () => {},
      },
    ];

    featuresOptions.forEach((_, i) => {
      const button = screen.getByTestId(`button-${i}`);
      const icon = screen.getByTestId(`icon-${i}`);
      const name = screen.getByTestId(`name-${i}`);

      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });

    const featuresOptionsComponent = screen.getByTestId("featuresOptions");
    expect(featuresOptionsComponent).toBeInTheDocument();
  });
});
