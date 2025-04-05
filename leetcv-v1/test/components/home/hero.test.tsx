import Hero from "@components/home/hero";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

describe("Hero component", () => {
  xit("should render the hero component correctly", () => {
    render(
      <SessionProvider
        session={{
          user: {
            id: "1120042219088",
            name: "Test User",
            email: "test@example.com",
            image: "",
          },
          expires: "",
        }}
      >
        <RecoilRoot>
          <Hero />
        </RecoilRoot>
      </SessionProvider>
    );

    jest.mock("@lib/firebase/useFirebase", () => {
      const analytics = {
        logEvent: jest.fn(),
      };

      return {
        __esModule: true,
        default: jest.fn().mockReturnValue({
          analytics,
        }),
      };
    });

    const write = screen.getByTestId("write");
    expect(write).toBeInTheDocument();

    const refine = screen.getByTestId("refine");
    expect(refine).toBeInTheDocument();

    const publish = screen.getByTestId("publish");
    expect(publish).toBeInTheDocument();

    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();

    const buttonLink = screen.getByTestId("btnLink");
    expect(buttonLink).toBeInTheDocument();

    const primaryBtn = screen.getByTestId("primaryBtn");
    expect(primaryBtn).toBeInTheDocument();
  });
});
