import {
  HIDE_APP_BAR_PAGES,
  POST_SIGNIN_LANDING,
  PROHIBITED_PAGES,
  PUBLIC_PAGES,
  RESTRICTED_PAGES,
} from "@constants/pages";

describe("Checking pages", () => {
  it("Should render all pages to be truthy", () => {
    expect(RESTRICTED_PAGES).toBeTruthy();
    expect(HIDE_APP_BAR_PAGES).toBeTruthy();
    expect(POST_SIGNIN_LANDING).toBeTruthy();
    expect(PROHIBITED_PAGES).toBeTruthy();
    expect(PUBLIC_PAGES).toBeTruthy();
  });
});
