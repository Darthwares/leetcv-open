import BecomePro from "@components/becomePro";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("BecomePro", () => {
  it("Should render BecomePro component with all elements", () => {
    render(
      <RecoilRoot>
        <BecomePro width="100px" />
      </RecoilRoot>
    );

    const becomeProContainer = screen.getByTestId("become-pro-container");
    const proText = screen.getByTestId("pro-text");
    const btnContainer = screen.getByTestId("become-btn-div");

    expect(becomeProContainer).toBeInTheDocument();
    expect(proText).toBeInTheDocument();
    expect(btnContainer).toBeInTheDocument();
  });
});
