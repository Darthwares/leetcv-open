import { Resources } from "../../components/home/resources";
import { render, screen } from "@testing-library/react";

describe("Resource Details", () => {
  it("should render Resource Details components", () => {
    render(<Resources />);
    const resourcesTitle = screen.getByTestId("resourcesTitle");
    expect(resourcesTitle).toBeInTheDocument();
  });
});
