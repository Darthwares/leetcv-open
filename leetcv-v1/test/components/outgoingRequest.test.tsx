import DashboardWidget from "../../components/outgoingRequest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@utils/trpc");

export const setupTest = (trpcData = null, session = null) => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));
  (trpc.useQuery as jest.Mock).mockImplementation(() => ({}));

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <DashboardWidget />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};

describe("Dashboard Header", () => {
  it("Should render Dashboard Header components test results correctly", () => {
    setupTest();

    const outgoingRequest = screen.getByTestId(`outgoingRequest`);
    expect(outgoingRequest).toBeInTheDocument();

    const hasProspects = screen.getByTestId(`hasProspects`);
    expect(hasProspects).toBeInTheDocument();
  });
});
