import { render, screen, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

jest.mock("firebase/remote-config", () => ({
  getRemoteConfig: jest.fn(() => ({
    settings: { minimumFetchIntervalMillis: 3600000 },
    defaultConfig: {},
  })),
  fetchAndActivate: jest.fn(() => Promise.resolve(true)),
  getString: jest.fn(() => "some default string value"),
}));

import Colleagues from "@/pages/s/colleagues";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@utils/trpc");

export const setup = (
  trpcData = { data: [], isLoading: false },
  session = null
) => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));

  (trpc.useQuery as jest.Mock).mockImplementation(() => trpcData);

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <Colleagues />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};

xdescribe("Page: Colleagues Page", () => {
  test("renders colleagues list once loaded", async () => {
    setup();

    await waitFor(() => {
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
    });

    expect(screen.getByTestId("colleagues")).toBeInTheDocument();
  });
});
