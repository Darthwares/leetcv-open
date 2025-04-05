import { ResumeHeaderDetails } from "@components/resume/resumeHeader/resumeHeaderDetails";
import ResumeHeader from "@components/resume/resumeHeader/resumeHeader";
import { fireEvent, screen } from "@testing-library/react";
import { render } from "@utils/test/customRender";

describe("Resume Header", () => {
  xit("should check all Resume Header Components", async () => {
    render(<ResumeHeaderDetails />);
    const resumeHeader = screen.getByTestId(`resumeHeader`);
    expect(resumeHeader).toBeTruthy();
    const phoneNumber = screen.getByTestId(`phoneNumber`);
    fireEvent.click(phoneNumber);
  });
  xit("should check if the qr code is selected", async () => {
    render(<ResumeHeader />);
    const qrCheck = screen.getByTestId(`qrCheck`);
    const displayPicture = screen.getByTestId(`displayPicture`);
    const displayPictureHidden = screen.getByTestId(`displayPictureHidden`);
    expect(qrCheck).toBeTruthy();
    expect(displayPicture).toBeTruthy();
    expect(displayPictureHidden).toBeTruthy();

    fireEvent.click(displayPictureHidden);
  });
});
