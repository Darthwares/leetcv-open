import DashboardHeader from "@components/dashboard/dashboardHeader";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";


describe("Dashboard Header", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  it("should render dashboard header components", () => {
    render(
      <RecoilRoot>
        <DashboardHeader />
      </RecoilRoot>
    );
    
    expect(screen.getByTestId("dashboardHeader")).toBeInTheDocument();

    expect(screen.getByTestId("dashboardHeaderLeft")).toBeInTheDocument();

    expect(screen.getByTestId("displayName")).toBeInTheDocument();

    expect(screen.getByTestId("youHaveCompleted")).toBeInTheDocument();

    expect(screen.getByTestId("gotYouCovered")).toBeInTheDocument();

    expect(screen.getByTestId("resumePrivacy")).toBeInTheDocument();

    expect(screen.getByTestId("tooltip")).toBeInTheDocument();

    expect(screen.getByTestId("resumePrivacy")).toBeInTheDocument();

    const privacyButton = screen.getByTestId("privacyButton");
    expect(privacyButton).toBeInTheDocument();
    
    expect(screen.getByTestId("lottie")).toBeInTheDocument();
  });
});
