import IncomingRequest from "@components/incomingRequest";
import { screen, fireEvent, render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { trpc } from "@utils/trpc";
import "@testing-library/jest-dom";

jest.mock("@utils/trpc");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn((message) => console.log(message)),
    error: jest.fn(),
  },
  ToastContainer: jest.fn(() => null),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => jest.fn().mockReturnValue((id: string) => id),
}));

const mockRequests = [
  {
    id: 1,
    name: "Test User",
    status: "Pending",
    requestAt: new Date().toISOString(),
    image: "test.jpg",
    requesterHandle: "testuser"
  }
];

describe("Should check Incoming Request component", () => {
  beforeEach(() => {
    // Mock all required TRPC calls
    (trpc.useQuery as jest.Mock).mockImplementation((queryKey) => {
      if (queryKey[0] === "fs.request.getAll") {
        return {
          data: { handle: mockRequests, totalPages: 1 },
          refetch: jest.fn(),
        };
      }
      if (queryKey[0] === "fs.request.getCount") {
        return {
          data: 1,
        };
      }
      return {
        data: null,
      };
    });

    (trpc.useMutation as jest.Mock).mockImplementation((mutationKey) => {
      if (Array.isArray(mutationKey)) {
        mutationKey = mutationKey[0];
      }
      
      return {
        mutate: jest.fn(),
        mutateAsync: jest.fn().mockResolvedValue({}),
      };
    });
  });

  it("renders the component", () => {
    render(
      <RecoilRoot>
        <IncomingRequest />
      </RecoilRoot>
    );

    const requestsElements = screen.getAllByTestId("requests");
    expect(requestsElements.length).toBeGreaterThan(0);
  });

  it("displays request cards when data is available", () => {
    render(
      <RecoilRoot>
        <IncomingRequest />
      </RecoilRoot>
    );

    const requestCard = screen.getByTestId(`request-${mockRequests[0].id}`);
    expect(requestCard).toBeInTheDocument();
    expect(screen.getByText(mockRequests[0].name)).toBeInTheDocument();
  });
});
