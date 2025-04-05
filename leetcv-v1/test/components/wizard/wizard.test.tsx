import WizardStep from "@components/wizard/wizard";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
xdescribe("Wizard", () => {
  it("renders the Wizard component", () => {
    render(
      <RecoilRoot>
        <WizardStep />
      </RecoilRoot>
    );
    expect(screen.getByTestId("wizard")).toBeInTheDocument();
    expect(screen.getByTestId("wizard-list")).toBeInTheDocument();
  });
});
``;
