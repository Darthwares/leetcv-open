import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Unsubscribe from "@components/settings/unsubscribe";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@utils/trpc");

const mockUseQuery = jest.fn();

(trpc.useQuery as jest.Mock) = mockUseQuery;

export const setup = (trpcData = null, session = null) => {
  const pushMock = jest.fn();

  (trpc.useQuery as jest.Mock).mockImplementation(() => ({}));
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <Unsubscribe />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};
describe("Page: Unsubscribe", () => {
  test("renders the component and test Unsubscribe", () => {
    setup();

    const unsubscribe = screen.getByTestId("unsubscribe");
    expect(unsubscribe).toBeInTheDocument();

    const unSubscribeTitle = screen.getByTestId("unSubscribeTitle");
    expect(unSubscribeTitle).toBeInTheDocument();

    const unSubscribeCurrentPlan = screen.getByTestId("unSubscribeCurrentPlan");
    expect(unSubscribeCurrentPlan).toBeInTheDocument();

  });
});
