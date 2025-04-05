/* eslint-disable react/no-children-prop */
import Container from "../../components/container";
import { render, screen } from "@testing-library/react";
import React from "react";
xdescribe("Container", () => {
  it("renders container without loader when loading is false", () => {
    render(<Container children={[]} loading={false} />);
    const container = screen.getByTestId(`container`);
    expect(container).toBeInTheDocument();

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });

  it("when loading is true then container should not render", () => {
    render(<Container children={[]} loading={true} />);
    const container = screen.queryByTestId(`container`);
    expect(container).not.toBeInTheDocument();
  });
});
