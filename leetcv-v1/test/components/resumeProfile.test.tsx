import { ResumeHeaderDetails } from "../../components/resume/resumeHeader/resumeHeaderDetails";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("describe: Resume Header Details", () => {
  xit("should show Resume Header Details", () => {
    render(
      <RecoilRoot>
        <ResumeHeaderDetails />
      </RecoilRoot>
    );
    const resumeHeader = screen.getByTestId(`resumeHeader`);
    expect(resumeHeader).toBeInTheDocument();
    const checkDetails = screen.getByTestId(`checkDetails`);
    expect(checkDetails).toBeInTheDocument();
    fireEvent.click(checkDetails);
  });
});
