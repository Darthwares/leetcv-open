import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Tips from "@components/editor/tips";
import { RootTip } from "@constants/defaults";
import { tipsData } from "../testStates/basicState";
describe("describe: Tips Component", () => {
   
  it("Should render Tips components test results correctly", () => {
    render(
      <RecoilRoot>
        <Tips tipData={tipsData} />
      </RecoilRoot>
    );
    const tips = screen.getByTestId(`tipsData`);
      expect(tips).toBeInTheDocument();
      tipsData.forEach((_tip:RootTip, idx) => {
      expect(screen.getByTestId(`tip-list-${idx}`)).toBeInTheDocument();
    });
      
  });
});
