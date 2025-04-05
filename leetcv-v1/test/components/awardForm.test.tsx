import AwardForm from "@components/editor/award/awardForm";
import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: Award Form", () => {
  const award = {
    id: "0",
    name: "Winning gold medals",
    awardFor: "Coming first on an event",
    date: "10-10-2022",
    description: "Coming first on an event made me win gold prize",
  };

  const allAwards = [
    {
      id: "0",
      name: "Winning gold medals",
      awardFor: "Coming first on an event",
      date: "10-10-2022",
      description: "Coming first on an event made me win gold prize",
    },
  ];

  it("Should render Chip components test results correctly", () => {
    render(
      <RecoilRoot>
        <AwardForm award={award} />
      </RecoilRoot>
    );
    const AwardOverview = screen.getByTestId(`awards`);
    expect(AwardOverview).toBeInTheDocument();

    allAwards.forEach((_award, idx) => {
      expect(screen.getByTestId(`input-${idx}`)).toBeInTheDocument();
    });
  });
});
