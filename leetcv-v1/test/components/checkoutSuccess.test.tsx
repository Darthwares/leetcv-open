import { render, screen, waitFor } from "@testing-library/react";
import CheckoutSuccess, { getStaticProps } from "@/pages/checkoutSuccess";
import { RecoilRoot } from "recoil";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@utils/trpc", () => ({
  trpc: {
    useQuery: jest.fn(),
  },
}));

const setup = (
  sessionStatus = "authenticated",
  trpcData = null,
  session = null
) => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));
  (trpc.useQuery as jest.Mock).mockImplementation(() => ({
    data: trpcData,
  }));

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <CheckoutSuccess />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};

describe("Page: CheckoutSuccess", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders success state after validation", async () => {
    setup();

    await waitFor(() => {
      const checkout = screen.getByTestId("checkout");
      expect(checkout).toBeInTheDocument();
    });

    await waitFor(() => {
      const validate = screen.getByTestId("validate");
      expect(validate).toBeInTheDocument();
    });

    await waitFor(() => {
      const hasValidate = screen.getByTestId("hasValidate");
      expect(hasValidate).toBeInTheDocument();
    });
  });
});
