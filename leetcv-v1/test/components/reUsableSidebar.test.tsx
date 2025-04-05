import ReusableSidebar from "@components/reusableSideBar";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("ReusableSidebar", () => {
  it("should show Reusable sidebar", () => {
    render(
      <RecoilRoot>
        <ReusableSidebar
          title="Title"
          description="Description"
          open={true}
          setOpen={(open) => {}}
        >
          <div>Some content goes here</div>
        </ReusableSidebar>{" "}
      </RecoilRoot>
    );
    const reUsableSidebar = screen.getByTestId(`reUsableSidebar`);
    expect(reUsableSidebar).toBeInTheDocument();
  });
});
