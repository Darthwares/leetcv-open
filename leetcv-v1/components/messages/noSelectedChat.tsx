import { sideBarOpenState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";

const NoSelectedChat = ({ getMessageList }: any) => {
  const t = useTranslations("Messages");
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  return (
    <div className="flex flex-col gap-6 items-center bg-gray-100 lg:bg-slate-50 md:py-2 lg:py-14 w-full h-full text-gray-700 my-auto">
      <div
        className={`w-full ${
          isSideBarClosed ? "lg:w-[28rem]" : "lg:w-[18rem]"
        } sm:w-[28rem] xl:w-[28rem] h-[22rem] mx-auto relative overflow-hidden`}
        style={{
          transition: "width 300ms ease-in-out",
        }}
      >
        <lottie-player
          src="/assets/lottie/Messages.json"
          speed="1"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">
          {t("messageCenter")}
        </h3>
        <p
          className={`${
            isSideBarClosed ? "lg:max-w-md" : "lg:max-w-sm"
          } xl:max-w-md mx-auto px-6 md:px-0`}
        >
          {getMessageList?.length < 1
            ? t("noConversationsYet")
            : t("selectAMessage")}
        </p>
      </div>
    </div>
  );
};

export default NoSelectedChat;
