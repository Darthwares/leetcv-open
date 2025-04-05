import Onboarding from "../components/onboarding";
import { render, screen, fireEvent } from "@testing-library/react";

describe("describe : Onboarding", () => {
const tourConfig = [
    {
        selector: '[data-tut="personalDetails"]',
        content: "Fill your personal details here."
    }
];
  it("Should render Onboarding component test results correctly", () => {
    render(<Onboarding tourConfig={tourConfig}/>)
        const reactour = screen.getByTestId("reactour")
        fireEvent.click(reactour)
        expect(reactour).toBeInTheDocument()
    });
});