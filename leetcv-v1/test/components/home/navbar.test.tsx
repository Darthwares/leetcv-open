import NavBar from "../../../components/home/navbar";
import { render, screen } from "@testing-library/react";

const sections = [
  { id: "design", title: "Design" },
  { id: "build", title: "Build" },
  { id: "share", title: "Share" },
  { id: "pricing", title: "Pricing" },
];
describe("describe : Navbar Component", () => {
  xit("Should render navbar component", () => {
    render(<NavBar />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("popover")).toBeInTheDocument();
    expect(screen.getByTestId("mobileNavbarNumber")).toBeInTheDocument();
    expect(screen.getByTestId("mobileNavbarText")).toBeInTheDocument();
    sections.forEach((list) => {
        expect(screen.getByTestId(`list-${list.id}`)).toBeInTheDocument();
    });
      sections.forEach((section) => {
        expect(screen.getByTestId(`section-${section.id}`)).toBeInTheDocument();
      });
  });
  it("Should not be empty nabvar component", () => {
    render(<NavBar />);
    expect(screen.getByTestId("navbar")).not.toBeFalsy();
  });
});
