import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ChipForm from "@components/editor/chip/chipForm";

describe("ChipForm", () => {
  const itemList = ["Item 1", "Item 2", "Item 3"];
  const property = "testProperty";
  const placeholder = "Enter a value";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component with existing items", () => {
    render(
      <RecoilRoot>
        <ChipForm
          itemList={itemList}
          property={property}
          placeholder={placeholder}
        />
      </RecoilRoot>
    );

    expect(screen.getByTestId("addSubmit")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
});
