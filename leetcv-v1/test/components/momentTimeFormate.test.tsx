import React from "react";
import { render, screen } from "@testing-library/react";
import MomentTimeFormate from "@components/momentTimeFormate";

it("should render the Moment component", () => {
  render(<MomentTimeFormate />);
  const moment = screen.getByTestId("moment");
  expect(moment).toBeTruthy();
});
