import ImageFallBack from "@components/imageFallBack";
import { BlockSvg } from "@components/svg";
import { ArrowLeftIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import {
  selectedConversationState,
  showMessageState,
  userBlockedState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

interface HeaderFieldProps {
  userName: string;
  userImage: string;
  userHandle: string;
}
const HeaderField = ({ userImage, userName, userHandle }: HeaderFieldProps) => {
  const [showMessage, setShowMessage] = useRecoilState(showMessageState);
  const [conversation] = useRecoilState(selectedConversationState);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("Messages");
  const [isBlocked, setIsBlocked] = useRecoilState(userBlockedState);
  const [userId] = useRecoilState(userIdState);

  const blockUserMutation = trpc.useMutation(["fs.message.blockUser"]);

  function getReceiverId() {
    if (userId === conversation.receiverId) {
      return conversation.id;
    } else if (userId === conversation.id) {
      return conversation.receiverId;
    }
  }

  const { data: isUserBlocked, refetch } = trpc.useQuery([
    "fs.message.isUserBlocked",
    {
      id: userId,
      receiverId: getReceiverId()!,
    },
  ]);

  useEffect(() => {
    if (isUserBlocked) {
      const isIdMatched = isUserBlocked?.blockId === userId;
      setIsBlocked(isIdMatched);
    }
  }, [isUserBlocked]);

  const handleBlock = () => {
    blockUserMutation
      .mutateAsync({
        id: userId,
        receiverId: getReceiverId()!,
        block: !isUserBlocked?.isBlocked,
      })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error("Failed to update block status:", error);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsOptionOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-slate-50 md:px-4 pt-2 sticky top-0 z-10">
      <div className="bg-white items-center py-4 px-6 rounded-2xl border">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 lg:gap-0 items-center">
            <ArrowLeftIcon
              onClick={() => {
                setShowMessage(!showMessage);
              }}
              className="w-5 h-5 cursor-pointer text-gray-600 lg:hidden block"
            />
            <div className="flex items-center">
              <div className="flex items-center justify-center overflow-hidden h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                <ImageFallBack
                  imgSrc={userImage}
                  fallBackText={userName}
                  avatarClass="w-10 h-10 rounded-full"
                  avatarImgClass="w-full h-full rounded-lg overflow-hidden bg-indigo-100"
                  avatarFallbackClass="w-10 h-10 text-white full text-2xl"
                />
              </div>
              <div className="flex flex-col ml-3">
                <div className="font-semibold text-sm">{userName}</div>
                <small className="text-gray-500">@{userHandle}</small>
              </div>
            </div>
          </div>
          <div ref={divRef} className="relative">
            {(isBlocked ||
              isUserBlocked?.blockId === null ||
              isUserBlocked?.blockId === undefined) && (
              <button
                onClick={() => setIsOptionOpen(!isOptionOpen)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
              >
                <DotsVerticalIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            )}
            {isOptionOpen && (
              <button
                className={`absolute right-4 bg-white w-28 mt-0.5 mx-auto px-3 py-2 rounded-md shadow-md origin-top-right flex border items-center gap-1.5 justify-center transition-all duration-300 font-medium text-xs`}
                onClick={handleBlock}
              >
                <BlockSvg />
                {isBlocked ? t("unblock") : t("block")}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderField;
