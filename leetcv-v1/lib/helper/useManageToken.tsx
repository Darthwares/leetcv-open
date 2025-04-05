import { resumeState, tokenCountState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

const useManageToken = () => {
  const { status } = useSession();
  const [tokens, setTokensCount] = useRecoilState(tokenCountState);
  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);
  const [userInfo] = useRecoilState(resumeState);
  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userInfo.id, handle: userInfo.handle }],
    { enabled: status === "authenticated" }
  );

  const deductToken = (tokenToDeduct: number) => {
    try {
      let updatedTokenCount = tokens - tokenToDeduct;
      setTokens.mutate(
        {
          count: updatedTokenCount,
          handle: userInfo.handle,
        },
        {
          onSuccess: () => {
            refetch();
            setTokensCount(updatedTokenCount);
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return { deductToken };
};

export default useManageToken;
