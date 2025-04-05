import UpSell from "@components/upSell";
import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
describe("UpSell", () => {
  it("Should show UpSell", () => {
    const push = jest.fn();

    useRouter.mockImplementation(() => ({
      push,
      asPath: "/currentPath",
    }));

    render(
      <RecoilRoot>
        <UpSell />
      </RecoilRoot>
    );
    const tooltip = screen.getByTestId(`upSell`);
    expect(tooltip).toBeInTheDocument();
    const icon = screen.getByTestId(`icon`);
    expect(icon).toBeTruthy();
    const button = screen.getByTestId(`button`);
    expect(button).toBeTruthy();
    fireEvent.click(button);
    expect(push).toHaveBeenCalledWith("/auth/signin?redirect=/currentPath");
  });
});
