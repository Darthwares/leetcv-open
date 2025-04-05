import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ToggleQrCode from "@components/toggleQrcode";

describe("toggleQrCodeBtn", () => {
  it("Should render toggle qrCode button", () => {
    render(
      <RecoilRoot>
        <ToggleQrCode showQR={false} setShowQR={() => {}} />
      </RecoilRoot>
    );

    const toggleQrCodeBtn = screen.getByTestId("toggle-qr-code-btn");
    expect(toggleQrCodeBtn).toBeInTheDocument();
  });
});
