import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import CardChatIconBtn from "@components/cardChatIconBtn";

describe("CardChatIconBtn", () => {
  it("renders CardChatIconBtn component with all elements", () => {
    const setUserDetailsMock = jest.fn();

    render(
      <RecoilRoot>
        <CardChatIconBtn
          setUserDetails={setUserDetailsMock}
          bgColor="bg-red-500"
        />
      </RecoilRoot>
    );

    const chatIconBtnElement = screen.getByTestId("chat-icon-btn");
    const chatIconElement = screen.getByTestId("chat-icon");

    expect(chatIconBtnElement).toBeInTheDocument();
    expect(chatIconElement).toBeInTheDocument();
  });
});
