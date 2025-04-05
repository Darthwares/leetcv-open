import MomentTimeFormate from "@components/momentTimeFormate";
import { resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import React from "react";
import { useRecoilState } from "recoil";

type SelectedMessageProps = {
  currentSelectedMessage: string;
};

const SelectedMessage = ({ currentSelectedMessage }: SelectedMessageProps) => {
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);

  const { data: getMessageList } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  return (
    <div className="w-full flex flex-col relative">
      <div className="">
        {getMessageList?.map((m) => {
          return (
            <div key={m.id} className="w-full">
              {m.id === currentSelectedMessage && (
                <>
                  {m.messageList?.map((profile) => {
                    const currentUser = profile.messagingId === userId;
                    const isCurrentUserName = currentUser
                      ? resume.displayName
                      : m.senderName;

                    const isCurrentUserImage = currentUser
                      ? m.receiverImage
                      : m.senderImage;
                    return (
                      <div
                        key={profile.messagedAt}
                        className="p-2 rounded-md flex items-start space-x-4 mt-4"
                      >
                        <img
                          src={isCurrentUserImage}
                          alt={isCurrentUserName}
                          className="w-10 h-10 rounded-full mt-2"
                        />
                        <div
                          className={`flex-1 p-3 rounded-md ${
                            currentUser ? "bg-indigo-100" : "bg-gray-100"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold">
                              {isCurrentUserName}
                            </span>
                            <span className="text-sm">
                              <MomentTimeFormate
                                timeStamp={profile.messagedAt}
                              />
                            </span>
                          </div>
                          <p>{profile.message}</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedMessage;
