import Notification from "../../components/notification";
import { render, screen } from "@testing-library/react";

describe("Notification", () => {
  it("should show all the Notifications", () => {
    render(<Notification />);
    
    expect(screen.getByTestId(`notification`)).toBeInTheDocument();

  });
});
