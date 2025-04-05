import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { trpc } from "@utils/trpc";
import { ChartBarIcon } from "@heroicons/react/outline";
import Widget from "@components/dashboard/widget";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@utils/trpc");

const mockUseQuery = jest.fn();

(trpc.useQuery as jest.Mock) = mockUseQuery;

export const setupConfig = (widgetElement = [], session = null) => {
  const pushMock = jest.fn();
  (useRouter as jest.Mock).mockImplementation(() => ({
    push: pushMock,
  }));

  render(
    <SessionProvider session={session}>
      <RecoilRoot>
        <Widget widgetElement={widgetElement} />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};

describe("Dashboard Widget", () => {
  it("Should render Dashboard Widget components test results correctly", () => {
    const resumeProgress = [
      {
        icon: ChartBarIcon,
        name: "Resume Progress",
        rotate: "0deg",
        count: `100%`,
        iconForeground: "text-teal-700",
        actionButton: "Editor",
        actionButtonPath: "/s/resumeEditor",
        iconBackground: "bg-teal-50",
        description: "Description",
      },
    ];

    setupConfig(resumeProgress as any);

    resumeProgress.forEach((element, id) => {
      const action = screen.queryByTestId(`actions-${id}`);
      expect(action).toBeInTheDocument();
    });
  });
});
