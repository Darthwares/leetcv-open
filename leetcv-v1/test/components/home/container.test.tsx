import { Container } from "../../../components/home/container";
import { render, screen } from "@testing-library/react";
describe("describe : Home Container Component", () => {
  it("Should render container component", () => {
    render(<Container />);
    const container = screen.getByTestId("container");
    expect(container).toBeInTheDocument();
  });
    it("Should not be empty container component", () => {
      render(<Container />);
      const container = screen.getByTestId("container");
      expect(container).not.toBeFalsy();
    });
});
