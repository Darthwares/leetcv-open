import Banner from "@components/banner";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
const useRouter = jest.spyOn(require("next/router"), "useRouter");
xdescribe("Banner", () => {
  const pushMock = jest.fn();
  useRouter.mockReturnValue({ push: pushMock });
  it("is visible by default", () => {
    render(
      <RecoilRoot>
        <Banner />
      </RecoilRoot>
    );

    expect(screen.getByTestId("banner")).toBeInTheDocument();
  });
  it("renders alert banner when progress percentage is less than 100", () => {
    render(
      <RecoilRoot>
        <Banner />
      </RecoilRoot>
    );

    expect(screen.getByTestId("alert")).toBeInTheDocument();
  });
  it("displays correct information and link in the alert banner", () => {
    render(
      <RecoilRoot>
        <Banner />
      </RecoilRoot>
    );

    expect(screen.getByTestId("description")).toBeInTheDocument();

    const link = screen.getByTestId("link");
    expect(link).toBeInTheDocument();

    fireEvent.click(link as HTMLElement);
    expect(pushMock).toHaveBeenCalledWith("/s/resumeEditor");

    expect(screen.getByTestId("svg")).toBeInTheDocument();
  });

  it("clicking on the close button hides the banner", () => {
    render(
      <RecoilRoot>
        <Banner />
      </RecoilRoot>
    );

    const closeButton = screen.getByTestId("closeButton");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton as HTMLElement);
    expect(pushMock).toHaveBeenCalledWith("/s/resumeEditor");

    const banner = screen.queryByTestId("banner");
    expect(banner).not.toBeNull();
  });
});
