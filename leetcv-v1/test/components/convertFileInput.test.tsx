import ConvertFileInput from "@components/convertToText/convertFileInput";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("FileInput", () => {
  it("Should render FileInput component", () => {
    render(
      <RecoilRoot>
        <ConvertFileInput
          error={false}
          hasFile={false}
          handleFile={() => {}}
          fetchingText={false}
        />
      </RecoilRoot>
    );

    const fileInputContainer = screen.getByTestId("file-input-container");
    const description = screen.getByTestId("description");
    const fileInput = screen.getByTestId("file-input");

    expect(fileInputContainer).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
  });
});
