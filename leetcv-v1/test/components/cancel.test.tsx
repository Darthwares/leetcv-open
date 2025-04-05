import { SessionProvider } from "next-auth/react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import CancelSubscription from "@/pages/cancel";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@utils/trpc");

const mockUseQuery = jest.fn();

(trpc.useQuery as jest.Mock) = mockUseQuery;

export const setup = (trpcData = null, session = null) => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));
  (trpc.useQuery as jest.Mock).mockImplementation(() => ({}));

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <CancelSubscription />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};
xdescribe("Page: CancelSubscription", () => {
  test("renders the page CancelSubscription", () => {
    setup();

    const cancel = screen.getByTestId("cancel");
    expect(cancel).toBeInTheDocument();

    const cancelValidate = screen.getByTestId("cancelValidate");
    expect(cancelValidate).toBeInTheDocument();
  });
});
