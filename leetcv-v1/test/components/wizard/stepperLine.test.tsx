import Stepper from "@components/wizard/stepperLine";
import { render, screen } from "@testing-library/react";
import { Wizard } from "react-use-wizard";
import { RecoilRoot } from "recoil";
describe("Stepper", () => {
    it("renders the Stepper component", () => {
      
        const steps = [
          {
            id: 1,
            number: 1,
            label: "personal",
            color: "indigo"
          },
        ];
    render(
      <RecoilRoot>
        <Wizard>
          <Stepper />
        </Wizard>
      </RecoilRoot>
    );
    expect(screen.getByTestId("stepperLine")).toBeInTheDocument();
        expect(screen.getByTestId("steps")).toBeInTheDocument();
        
        steps.map((step) => {
            expect(screen.getByTestId(`step-${step.id}`)).toBeInTheDocument();
        })
  });
});
