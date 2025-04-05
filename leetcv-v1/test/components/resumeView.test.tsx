import { ResumeView } from "../../components/resumeView";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { basicState } from "../testStates/basicState";
describe("ResumeView", () => {
  xit("should show ResumeView", () => {
    render(
      <RecoilRoot initializeState={basicState}>
        <ResumeView />
      </RecoilRoot>
    );
    const resumeView = screen.getByTestId(`resumeView`);
    expect(resumeView).toBeInTheDocument();
  });
});
