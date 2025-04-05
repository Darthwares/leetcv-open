import AwardDetails from "@components/editor/award/awardDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";

describe("AwardDetails", () => {
  xit("should render awardDetailsHeader and awardList", () => {
    render(
      <RecoilRoot>
        <AwardDetails />
      </RecoilRoot>
    );
    const awardDetails = screen.getByTestId("awardDetails");
    expect(awardDetails).toBeInTheDocument();
  });
});
