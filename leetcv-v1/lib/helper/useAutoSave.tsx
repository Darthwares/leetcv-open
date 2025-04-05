import * as React from "react";

import { Resume } from "data/models/UserInfo";
import { resumeState, savingState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useSession } from "next-auth/react";

export interface FirebaseState {
  handleAutoSave: () => void;
}

export function useAutoSave(): FirebaseState {
  const { status } = useSession();
  const [resumeInfo, setResumeInfo] = React.useState<Resume>();
  const [resume] = useRecoilState(resumeState);
  const setLoading = useSetRecoilState(savingState);
  const mutation = trpc.useMutation(["fs.resume.update"]);

  const handleAutoSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setResumeInfo(resume);
  };

  React.useEffect(() => {
    if (resumeInfo && status === "authenticated") {
      mutation.mutate(resumeInfo);
    }
  }, [resumeInfo]);

  return {
    handleAutoSave,
  };
}
