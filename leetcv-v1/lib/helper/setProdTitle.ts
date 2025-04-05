import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { pageTitleState } from "@state/state";

export const ProdTitle = (name: string | undefined) => {
  const setProdTitle = useSetRecoilState(pageTitleState);
  useEffect(() => {
    setProdTitle(name!);
  }, []);
};
