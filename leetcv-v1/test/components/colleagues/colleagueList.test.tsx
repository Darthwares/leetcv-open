import { RecoilRoot } from "recoil";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import ColleagueList from "@components/colleagues/colleagueList";

const mockFindColleagues = [
  {
    id: "1",
    handle: "johnDoe",
    displayName: "John Doe",
    position: "Software Engineer",
    image: "path/to/image",
    private: false,
  },
];

jest.mock("@utils/trpc");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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
        <ColleagueList findColleagues={mockFindColleagues} />
      </RecoilRoot>
    </SessionProvider>
  );

  return { pushMock };
};

describe("Page: Colleague List", () => {
  test("renders the page Colleague List", () => {
    setup();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("viewResume")).toBeInTheDocument();
  });
});
