import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import FollowersFollowing from "@components/appbar/mobileSideBarMenu/followersFollowing";

describe("FollowersFollowing", () => {
  test("renders the component and checks each button", () => {
    render(
      <RecoilRoot>
        <FollowersFollowing
          followersFollowingList={[
            {
              name: "User 1",
              icon: <div data-testid="icon-0" />,
              onClick: jest.fn(),
              count: 5,
            },
            {
              name: "User 2",
              icon: <div data-testid="icon-1" />,
              onClick: jest.fn(),
              count: 10,
            },
          ]}
        />
      </RecoilRoot>
    );

    const followersFollowingList = [
      {
        name: "name",
        icon: <div />,
        onClick: () => {},
        count: 1,
      },
    ];

    followersFollowingList.forEach((_, i) => {
      const name = screen.getByTestId(`name-${i}`);
      const count = screen.getByTestId(`count-${i}`);
      const button = screen.getByTestId(`button-${i}`);

      expect(name).toBeInTheDocument();
      expect(count).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    const followersFollowingComponent = screen.getByTestId(
      "followers-Following"
    );
    expect(followersFollowingComponent).toBeInTheDocument();
  });

  test("clicking a button invokes the onClick handler and closes the menu", () => {
    const onClickMock = jest.fn();
    render(
      <RecoilRoot>
        <FollowersFollowing
          followersFollowingList={[
            {
              name: "User 1",
              icon: <div data-testid="icon-0" />,
              onClick: onClickMock,
              count: 5,
            },
          ]}
        />
      </RecoilRoot>
    );

    fireEvent.click(screen.getByTestId("button-0"));

    expect(onClickMock).toHaveBeenCalled();
  });
});
