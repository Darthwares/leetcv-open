import { render, screen } from "@testing-library/react";
import { Introduction } from "../../../components/home/introduction";

const dataList = [
  "Build your resume with feedback from the community",
  "Get attestations from your colleagues and team members to prove your work",
  "Create multiple shared link to control who has access",
  "Easy to update and always up to date",
  "Figma features and keyboard shortcuts to speed up your workflow",
];
describe("describe : Introduction Component", () => {
  it("Should render introduction component", () => {
    render(<Introduction />);
    expect(screen.getByTestId("introduction")).toBeInTheDocument();
    expect(screen.getByTestId("introHeading")).toBeInTheDocument();
    expect(screen.getByTestId("descriptionFour")).toBeInTheDocument();
    expect(screen.getByTestId("createResumeToday")).toBeInTheDocument();
    dataList.forEach((_list, id) => {
      expect(screen.getByTestId(`feature-${id}`)).toBeInTheDocument();
    });
  });
  it("Should not be empty introduction component", () => {
    render(<Introduction />);
    expect(screen.getByTestId("introduction")).not.toBeFalsy();
  });
});
