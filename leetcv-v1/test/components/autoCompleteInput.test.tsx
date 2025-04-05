import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import AutoCompleteInput from "@components/autoCompleteInput";

describe("AutoCompleteInput", () => {
  const inputId = "testProperty";
  const inputValue = "hobbie";
  const items = ["Item 1", "Item 2", "Item 3"];
  const placeholder = "Enter a value";
  const search = () => {};
  const handleInputChange = () => {};

  test("should renders the component with existing items", () => {
    render(
      <RecoilRoot>
        <AutoCompleteInput
          inputId={inputId}
          inputValue={inputValue}
          placeholder={placeholder}
          items={items}
          search={search}
          handleInputChange={handleInputChange}
          className="w-full"
          inputClassName="w-full"
        />
      </RecoilRoot>
    );

    const autoCompleteInputContainer = screen.getByTestId("autoCompleteInput");
    expect(autoCompleteInputContainer).toBeInTheDocument();
  });
});
