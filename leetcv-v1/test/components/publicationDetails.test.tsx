import PublicationDetails from "@components/editor/publication/publicationDetails";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("PublicationDetails", () => {
  xit("should render PublicationDetails components", () => {
    render(
      <RecoilRoot>
        <PublicationDetails />
      </RecoilRoot>
    );
    const publicationDetails = screen.getByTestId("publicationDetails");
    expect(publicationDetails).toBeInTheDocument();
  });
});
