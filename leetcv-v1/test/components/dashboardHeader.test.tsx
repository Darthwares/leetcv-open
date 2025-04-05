import DashboardHeader from "@components/dashboard/dashboardHeader";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("Dashboard Header", () => {
  xit("Should render Dashboard Header components test results correctly", () => {
    render(
      <RecoilRoot>
        <DashboardHeader />
      </RecoilRoot>
    );
    const dashboardHeader = screen.getByTestId(`dashboardHeader`);
    expect(dashboardHeader).toBeInTheDocument();
    const profileOverview = screen.getByTestId(`profileOverview`);
    expect(profileOverview).toBeInTheDocument();
    const avatar = screen.getByTestId(`avatar`);
    expect(avatar).toBeInTheDocument();
    const displayName = screen.getByTestId(`displayName`);
    expect(displayName).toBeInTheDocument();
  });
});
