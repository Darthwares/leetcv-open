import AddressAutoComplete from "@components/addressAutoComplete";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
describe("AddressAutoComplete", () => {
  jest.mock("recoil", () => ({
    useRecoilState: (state:any) => [state, jest.fn()],
  }));
  xit("should render addressAutoComplete component", () => {
    render(
      <RecoilRoot>
        <AddressAutoComplete 
        />
      </RecoilRoot>
    );
    const addressAuto = screen.getByTestId("addressAuto");
    expect(addressAuto).toBeInTheDocument();
  });
});


