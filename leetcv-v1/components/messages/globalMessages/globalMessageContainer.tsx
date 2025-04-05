import { Disclosure } from "@headlessui/react";
import { resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import React from "react";
import { useRecoilState } from "recoil";
import { ChevronUpIcon } from "@heroicons/react/solid";
import GlobalMessagesList from "./globalMessagesList";
import { useTranslations } from "next-intl";
import useSortedMessages from "../useSortedMessages";

const GlobalMessageContainer = () => {
  const [resume] = useRecoilState(resumeState);
  const t = useTranslations("Messages");

  const { data: getMessageList } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  const { sortedMessages } = useSortedMessages(getMessageList);
  const nonBlockedUsers = sortedMessages?.filter(
    (user) => user.block === null || user.block === undefined
  );

  return (
    <>
      {nonBlockedUsers?.length > 0 && (
        <div className="fixed right-8 bottom-5 z-40 lg:flex justify-end items-end hidden">
          <div className="relative">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="absolute bottom-full w-80 rounded-2xl bg-white text-sm text-gray-500 h-96 max-h-96 mb-1 overflow-y-auto shadow-xl">
                    <GlobalMessagesList nonBlockedUsers={nonBlockedUsers} />
                  </Disclosure.Panel>
                  <Disclosure.Button
                    style={{
                      transition: "width 300ms ease-in-out",
                    }}
                    className={`rounded-2xl bg-indigo-600 px-4 py-2 text-left text-sm font-medium text-white focus:outline-none flex items-center justify-between ${
                      open ? "w-80" : "w-32"
                    }`}
                  >
                    <span>{t("chats")}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "" : "transform rotate-180"
                      } h-5 w-5 transition-all duration-300`}
                    />
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalMessageContainer;
