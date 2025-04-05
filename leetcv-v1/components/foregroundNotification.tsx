import useMessengerToken from "@lib/firebase/setMessenger";
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ForegroundNotifi() {
  const { targetToken } = useMessengerToken();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging();
      const unsubscribe = onMessage(messaging, (payload) => {
        toast.success(payload?.data?.title);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [targetToken]);

  return null;
}
