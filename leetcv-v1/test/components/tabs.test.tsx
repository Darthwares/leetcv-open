import Tabs from "../../components/tabs";
import { fireEvent, render, screen } from "@testing-library/react";

const tabContent = [
  "tab-content-1",
  "tab-content-2",
  "tab-content-3",
  "tab-content-4",
]

const tabPages = [
  {id: 'tab1', title: 'tab-title-1', content:<>{tabContent[0]}</>},
  {id: 'tab2', title: 'tab-title-2', counter:0, content:<>{tabContent[1]}</>},
  {id: 'tab3', title: 'tab-title-3', counter:2, content:<>{tabContent[2]}</>},
  {id: 'tab4', title: 'tab-title-4', counter:11, content:<>{tabContent[3]}</>},
]

describe("Tabs", () => {
  it("should render all tabs passed", () => {
    render(<Tabs tabs={tabPages} />)
    tabPages.forEach(tabPage => {      
      expect(screen.getByTestId(tabPage.id)).toHaveTextContent(tabPage.title)
    });
  });

  it("should show only one tab content at a time", () => {
    render(<Tabs tabs={tabPages} />)
    expect(screen.getByTestId(`tab-content-${tabPages[0].id}`)).toHaveTextContent(tabContent[0])

    for(let i = 1; i < tabPages.length; i++) {
      expect(screen.queryByTestId(`tab-content-${tabPages[i].id}`)).toBeFalsy();
    }
  });

  it("should show counters when greater than zero", () => {
    render(<Tabs tabs={tabPages} />);
    expect(screen.queryByTestId(`tab-counter-${tabPages[0].id}`)).toBeFalsy();
    expect(screen.queryByTestId(`tab-counter-${tabPages[1].id}`)).toBeFalsy();
    expect(screen.queryByTestId(`tab-counter-${tabPages[2].id}`)).toHaveTextContent(tabPages[2].counter + '');
    expect(screen.queryByTestId(`tab-counter-${tabPages[3].id}`)).toHaveTextContent('9+');
  });

  it("should should change content on click", () => {
    render(<Tabs tabs={tabPages} />)
    expect(screen.getByTestId(`tab-content-${tabPages[0].id}`)).toHaveTextContent(tabContent[0])

    fireEvent.click(screen.getByTestId(tabPages[1].id));
    expect(screen.queryByTestId(`tab-content-${tabPages[0].id}`)).toBeFalsy();
    expect(screen.getByTestId(`tab-content-${tabPages[1].id}`)).toHaveTextContent(tabContent[1])
  });
});