import WizardButton from "@components/wizard/wizardButton";
import { fireEvent, render, screen } from "@testing-library/react";

describe("WizardButton", () => {
  it("renders the button with the provided label", () => {
    const label = "Next";
    render(<WizardButton label={label} />);
    const wizardButton = screen.getByTestId("wizard-button");
    expect(wizardButton).toBeInTheDocument();
      expect(wizardButton).toHaveTextContent(label);
      fireEvent.click(wizardButton);
  });
});
