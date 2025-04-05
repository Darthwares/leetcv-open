import { z } from "zod";
import { createFirestoreRouter } from "../custom/createFirestoreRouter";
import { SelectedMessageProps } from "@constants/defaults";
import { TRPCError } from "@trpc/server";

export const messageRouter = createFirestoreRouter()
  .query("getMessages", {
    input: z.object({
      senderId: z.string(),
      receiverId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const messageRef = ctx.firestore
        .collection("users")
        .doc(input.receiverId)
        .collection("chat")
        .get();
      const messageRecord = await messageRef;
      const messages = messageRecord.docs
        .filter((doc) => doc.id === input.senderId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      return messages[0] as SelectedMessageProps;
    },
  })
  .query("getMessageList", {
    input: z.object({
      receiverId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const chatDocRef = ctx.firestore
        .collection("users")
        .doc(input.receiverId)
        .collection("chat")
        .get();

      const snapshot = await chatDocRef;
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return documents as SelectedMessageProps[];
    },
  })
  .mutation("create", {
    input: z.object({
      id: z.string(),
      receiverHandle: z.string().optional(),
      senderName: z.string(),
      senderHandle: z.string(),
      receiverId: z.string(),
      receiverName: z.string(),
      content: z.string(),
      senderImage: z.string(),
      timeStamp: z.string(),
      receiverImage: z.string(),
      senderId: z.string().optional(),
      messagingId: z.string().optional(),
      currChatName: z.string().optional(),
      currChatImage: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const docRef = ctx.firestore
        .collection("users")
        .doc(input.receiverId)
        .collection("chat")
        .doc(input.id);

      const docChatRef = ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("chat")
        .doc(input.receiverId);

      const doc = await docRef.get();

      let currentMessages = [];
      if (doc.exists) {
        currentMessages = doc.data()?.messageList || [];
      }

      const docChat = await docChatRef.get();
      let currentChatMessages = [];
      if (docChat.exists) {
        currentChatMessages = docChat.data()?.messageList || [];
      }
      const newMessage = {
        message: input.content,
        messagedAt: input.timeStamp,
        messagingId: input.messagingId,
        currChatName: input.currChatName,
        currChatImage: input.currChatImage,
        receiverName: input.receiverName,
        receiverImage: input.receiverImage,
      };
      currentMessages.push(newMessage);
      currentChatMessages.push(newMessage);

      const messageSet = {
        messageList: [
          {
            message: input.content,
            messagedAt: input.timeStamp,
          },
        ],
      };

      let chatDates = doc.data()?.chatDates || [];
      const currentDateStr = new Date().toISOString().slice(0, 10);

      const currentDateIndex = chatDates.findIndex(
        (dateObj: any) => dateObj.date === currentDateStr
      );

      if (currentDateIndex === -1) {
        chatDates.push({
          date: currentDateStr,
          messageCount: Number(process.env.NEXT_PUBLIC_CHAT_MESSAGE_COUNT),
        });
      } else {
        chatDates[currentDateIndex].messageCount -= 1;

        if (chatDates[currentDateIndex].messageCount <= 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "Message limit reached for the day, please try again tomorrow.",
          });
        }
      }

      const updatedMessageSet = {
        ...messageSet,
        messageList: currentMessages,
        senderName: input.senderName,
        senderHandle: input.senderHandle,
        receiverHandle: input.receiverHandle,
        receiverId: input.receiverId,
        receiverName: input.receiverName,
        id: input.id,
        senderImage: input.senderImage,
        receiverImage: input.receiverImage,
        chatDates,
      };

      ctx.firestore
        .collection("users")
        .doc(input.receiverId)
        .collection("chat")
        .doc(input.id)
        .set(updatedMessageSet, { merge: true });

      ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("chat")
        .doc(input.receiverId)
        .set(updatedMessageSet, { merge: true });
    },
  })
  .mutation("blockUser", {
    input: z.object({
      id: z.string(),
      receiverId: z.string(),
      block: z.boolean().optional(),
    }),
    async resolve({ ctx, input }) {
      const blockUserData = {
        block: input.block ? input.id : null,
      };

      await ctx.firestore.runTransaction(async (transaction) => {
        const userDocRef = ctx.firestore
          .collection("users")
          .doc(input.receiverId)
          .collection("chat")
          .doc(input.id);
        const receiverDocRef = ctx.firestore
          .collection("users")
          .doc(input.id)
          .collection("chat")
          .doc(input.receiverId);

        transaction.set(userDocRef, blockUserData, { merge: true });
        transaction.set(receiverDocRef, blockUserData, { merge: true });
      });
    },
  })
  .query("isUserBlocked", {
    input: z.object({
      id: z.string(),
      receiverId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const blockRef = await ctx.firestore
        .collection("users")
        .doc(input.id)
        .collection("chat")
        .doc(input.receiverId)
        .get();

      const blockId = blockRef.exists ? blockRef.data()?.block : null;

      const isBlocked = blockId === input.id;

      return { blockId, isBlocked };
    },
  });
