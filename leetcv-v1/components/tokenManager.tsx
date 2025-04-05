import React, { useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";

interface TokenManagerProps {
  userId: string;
  resumeDisplayName: string;
  targetToken: string;
}

const TokenManager: React.FC<TokenManagerProps> = ({
  userId,
  resumeDisplayName,
  targetToken,
}) => {
  const createToken = trpc.useMutation(["fs.notification.createToken"]);
  const { status } = useSession();

  useEffect(() => {
    if (targetToken && status === "authenticated") {
      createToken.mutate({
        id: userId,
        name: resumeDisplayName,
        token: targetToken,
      });
    }
  }, [resumeDisplayName, targetToken]);

  return null;
};

export default TokenManager;
