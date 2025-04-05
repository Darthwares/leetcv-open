import AppBar from "../../components/appbar/appBar";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";

const isSignedIn = true;
const user = "karan";
const username = "karandp";

xdescribe("appBar Test", () => {
  beforeEach(() => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
  });
  xit("should render all element", () => {
    render(<AppBar />);
    const res = screen.getAllByTestId("mytest");
    expect(res).toBeTruthy();
  });
  xit("should go on home page after click", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    render(<AppBar />);
    const home = screen.getByTestId("homePage");
    expect(home).toBeTruthy();
    fireEvent.click(screen.getByTestId("homePage"));
    expect(push).toHaveBeenCalledWith("/");
  });

  xit("should go on search page after click", () => {
    render(<AppBar />);
    const search = screen.getByTestId("searchButton");
    expect(search).toBeTruthy();
    fireEvent.click(search);
  });

  xit("should go on bloge page after click", () => {
    render(<AppBar />);
    const blog = screen.getByTestId("blogButton");
    expect(blog).toBeTruthy();
    fireEvent.click(blog);
  });

  xit("should render flags", () => {
    render(<AppBar />);
    const flag = screen.getByTestId("flags");
    expect(flag).toBeTruthy();
    expect(flag).toBeInTheDocument();
  });
  xit("should render user button", () => {
    render(<AppBar />);
    const button = screen.getByTestId("userButton");
    expect(button).toBeTruthy();
    expect(button).toBeInTheDocument();
  });
});
