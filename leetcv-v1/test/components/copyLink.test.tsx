import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import CopyLink from "@components/copyLink";

describe("CopyLink", () => {
  it("Should render copyLink component", () => {
    render(
      <RecoilRoot>
        <CopyLink copyText="Copy" copied="copied" url="Url" />
      </RecoilRoot>
    );

    const copyLink = screen.getByTestId("copyLink");
    expect(copyLink).toBeInTheDocument();
  });
});
