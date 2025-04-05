import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ReUsableOptions from "@components/appbar/mobileSideBarMenu/reUsableOptions";

const options = [
  {
    name: "Option 1",
    icon: "icon-0",
    onClick: () => {},
    count: 0,
  },
  {
    name: "Option 2",
    icon: "icon-1",
    onClick: () => {},
    count: 5,
  },
];

describe("ReUsableOptions", () => {
  test("renders the component and checks each button", () => {
    render(
      <RecoilRoot>
        <ReUsableOptions title="Sample Title" options={options} />
      </RecoilRoot>
    );

    options.forEach((_, i) => {
      const button = screen.getByTestId(`button-${i}`);
      const icon = screen.getByTestId(`icon-${i}`);
      const name = screen.getByTestId(`name-${i}`);

      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });

    const reUsableOptionsContainer = screen.getByTestId(
      "re-usable-options-container"
    );
    expect(reUsableOptionsContainer).toBeInTheDocument();
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });
});
