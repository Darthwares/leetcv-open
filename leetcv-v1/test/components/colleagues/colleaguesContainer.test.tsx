jest.mock("@utils/trpc", () => ({
  trpc: {
    useQuery: jest.fn().mockReturnValue({
      data: {
        messages: [
          { id: "1", content: "Hello" },
          { id: "2", content: "World" },
        ],
      },
      isLoading: false,
      isError: false,
      error: undefined,
    }),
    useMutation: jest.fn().mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
      error: undefined,
      data: undefined,
    }),
  },
}));

import { RecoilRoot } from "recoil";
import { render, screen } from "@testing-library/react";

import ColleaguesListContainer from "@components/colleagues/colleaguesContainer";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({ push: jest.fn() })),
}));

export const setup = (
  trpcData = { data: [], isLoading: false },
  session = null
) => {
  const pushMock = jest.fn();

  (trpc.useQuery as jest.Mock).mockImplementation(() => trpcData);

  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <ColleaguesListContainer />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};

describe("Component: Testing Colleagues List Container", () => {
  beforeEach(() => {
    jest.mock("@utils/trpc", () => ({
      trpc: {
        useQuery: jest.fn().mockReturnValue({
          data: { messages: [{ id: "1", content: "Test message" }] },
          isLoading: false,
        }),
      },
    }));
  });

  test("renders colleagues list correctly", () => {
    setup();
    expect(screen.getByTestId("colleaguesContainer")).toBeInTheDocument();
  });
});
