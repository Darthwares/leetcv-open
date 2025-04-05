import { SelectedMessageProps } from "@constants/defaults";
import { useEffect, useState } from "react";

const useSortedMessages = (
  getMessageList: SelectedMessageProps[] | undefined
) => {
  const [sortedMessages, setSortedMessages] = useState<SelectedMessageProps[]>(
    []
  );

  useEffect(() => {
    if (getMessageList) {
      const sortedList = [...getMessageList].sort((msg1, msg2) => {
        const mostRecentMsg1 = msg1.messageList?.reduce((latest, current) => {
          return new Date(latest.messagedAt) > new Date(current.messagedAt)
            ? latest
            : current;
        }, msg1.messageList[0]);
        const mostRecentMsg2 = msg2.messageList?.reduce((latest, current) => {
          return new Date(latest.messagedAt) > new Date(current.messagedAt)
            ? latest
            : current;
        }, msg2.messageList[0]);
        const dateA = new Date(mostRecentMsg1?.messagedAt).getTime();
        const dateB = new Date(mostRecentMsg2?.messagedAt).getTime();
        return dateB - dateA;
      });
      setSortedMessages(sortedList);
    }
  }, [getMessageList]);

  return { sortedMessages };
};

export default useSortedMessages;
