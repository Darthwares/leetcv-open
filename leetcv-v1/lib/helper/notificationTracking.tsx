import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";

interface NotificationTrackerProps {
  userId: string;
  type: string;
}

const NotificationTracker = ({ userId, type }: NotificationTrackerProps) => {
  const router = useRouter();
  const { status } = useSession();
  const [resume] = useRecoilState(resumeState);
  const setNotificationTrack = trpc.useMutation([
    "fs.notification.notificationTracking",
  ]);

  useEffect(() => {
    const { notification } = router.query;
    if (
      status === "authenticated" &&
      notification === "true" &&
      resume.handle
    ) {
      setNotificationTrack.mutate({
        id: userId,
        name: resume.displayName,
        handle: resume.handle,
        type,
      });
    }
  }, [userId, status, router.query, resume]);
};

export default NotificationTracker;
