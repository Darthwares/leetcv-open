import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import FormFAB from "../../components/editor/formFAB";

xdescribe("FormFAB", () => {
  it("Should render all form fab", () => {
    render(
      <RecoilRoot>
        <FormFAB />
      </RecoilRoot>
    );

    const formFAB = screen.getByTestId("formFAB");
    expect(formFAB).toBeInTheDocument();
    const actionButtons = screen.getByTestId("action-buttons");
    expect(actionButtons).toBeInTheDocument();
    const fabBtn = screen.getByTestId("fabTinyBtn");
    expect(fabBtn).toBeInTheDocument();
    const saveFabBtn = screen.getByTestId("saveFabBtn");
    expect(saveFabBtn).toBeInTheDocument();
  });
});
