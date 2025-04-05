import SocialMediaHeader from "@components/editor/social/socialMediaHeader";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
describe("describe: SocialMedia Header", () => {
  it("Should render socialmedia header components test results correctly", () => {
    render(
      <RecoilRoot>
        <SocialMediaHeader />
      </RecoilRoot>
    );
    const socialDetailsHeader = screen.getByTestId(`socialDetailsHeader`);
    expect(socialDetailsHeader).toBeInTheDocument();
    const socialMediaAddButton = screen.getByTestId(`add-button`);
    fireEvent.click(socialMediaAddButton);
  });
});
