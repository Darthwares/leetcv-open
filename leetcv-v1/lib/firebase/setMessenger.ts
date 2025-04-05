import { getMessaging, getToken } from "firebase/messaging";
import { useState, useEffect } from "react";

interface MessengerToken {
  targetToken: string | null;
}

const isSupported = () =>
  "Notification" in window &&
  "serviceWorker" in navigator &&
  "PushManager" in window;

export default function useMessengerToken(): MessengerToken {
  const [targetToken, setTargetToken] = useState<string | null>(null);
  const messaging = getMessaging();

  const requestNotificationPermission = async (): Promise<boolean> => {
    if (isSupported()) {
      try {
        const permission = await Notification.requestPermission();
        return permission === "granted";
      } catch (error) {
        console.error(
          "Error occurred while requesting notification permission:",
          error
        );
        return false;
      }
    }
    return false;
  };

  useEffect(() => {
    const getTokenAndSubscribe = async () => {
      try {
        const permissionGranted = await requestNotificationPermission();
        if (permissionGranted) {
          const currentToken = await getToken(messaging, {
            vapidKey: process.env.VAPID_API!,
          });
          if (currentToken) {
            setTargetToken(currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        } else {
          console.log("Unable to get permission to notify.");
        }
      } catch (error) {
        console.error("Error occurred while retrieving token:", error);
      }
    };

    if (isSupported()) {
      getTokenAndSubscribe();
    }
  }, [messaging]);

  return {
    targetToken,
  };
}
