import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";

interface Resume {
  handle: string;
  displayName: string;
  email: string;
}

interface UseLeetCVLaunchParams {
  resume: Resume;
  userId: string;
  source: string;
}

const useLeetCVLaunch = ({ resume, userId, source }: UseLeetCVLaunchParams) => {
  const router = useRouter();
  const { status } = useSession();

  const setLaunchUsersList = trpc.useMutation([
    "fs.viewCount.recordLeetCVLaunchUsersList",
  ]);

  useEffect(() => {
    if (status === "authenticated" && source) {
      setLaunchUsersList.mutate({
        handle: resume.handle,
        userName: resume.displayName,
        email: resume.email,
        userId,
        source,
      });
    }
  }, [resume.handle, status, router.query]);
};

export default useLeetCVLaunch;
