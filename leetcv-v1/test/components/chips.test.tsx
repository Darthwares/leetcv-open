import Chip from "@components/chips";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("Chip", () => {

  jest.mock("primereact/chips", () => {
    return {
      __esModule: true,
      Chips: ({ value, onChange, placeholder }:any) => (
        <input
          data-testid="chips-input"
          value={value}
          onChange={(e) => onChange({ target: { value: e.target.value } })}
          placeholder={placeholder}
        />
      ),
    };
  });

  it("renders the component", () => {
    render(
      <RecoilRoot>
        <Chip placeholder="Enter preference" />
      </RecoilRoot>
    );

    expect(screen.getByTestId("chips")).toBeInTheDocument();
  });

  it("renders the input", () => {
    render(
      <RecoilRoot>
        <Chip placeholder="Enter preference" />
      </RecoilRoot>
    );

    const input = screen.getByTestId("chips-input");
    expect(input).toBeInTheDocument();
  });
});
