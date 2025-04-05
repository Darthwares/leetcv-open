import PasscodeVerify from "../components/passcodeVerify";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";

describe("describe : PasscodeVerify", () => {
  beforeEach(() => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
  });
  xit("Should render PasscodeVerify component test results correctly", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }));
    render(
      <RecoilRoot>
          <PasscodeVerify />
      </RecoilRoot>
    );
    const buttonTest = screen.getByTestId("passcodeVerify");
    expect(buttonTest).toBeInTheDocument();
    fireEvent.click(buttonTest);

    Array(6)
      .fill("")
      .forEach((element) => {
        const input = screen.queryByTestId(
          `inputId-${element}`
        ) as HTMLInputElement;
        expect(input).toBeNull();
      });
  });
});
