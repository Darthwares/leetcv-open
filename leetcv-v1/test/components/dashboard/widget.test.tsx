import Widget from "@components/dashboard/widget";
import { render, screen } from "@testing-library/react";
import React from "react";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("Widget", () => {
  const widgetElement = [
    {
      name: "Requests Received",
      count: 10,
      description:
        "A refined resume garners views, boosts search visibility, and conveys accomplishment.",
      style: "test-style",
      disabled: "test-disabled",
      icon: jest.fn(),
      rotate: "test-rotate",
      actionButton: "Incoming Requests",
      actionButtonPath: "/s/requests",
    },
  ];

  it("renders widget elements correctly", () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValue({ pushMock });

    render(<Widget widgetElement={widgetElement} />);
    widgetElement.forEach((_widget, id) => {
      expect(screen.getByTestId(`actions-${id}`)).toBeInTheDocument();

      expect(screen.getByTestId(`cardName`)).toBeInTheDocument();

      expect(screen.getByTestId(`cardCount`)).toBeInTheDocument();

      expect(screen.getByTestId(`cardDescription`)).toBeInTheDocument();

      expect(screen.getByTestId(`cardLink`)).toBeInTheDocument();
    });
  });
});
