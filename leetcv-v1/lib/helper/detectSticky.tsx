import * as React from "react";
import { stickyHandler } from "./stickyHandler";

export function useDetectSticky(
  headerRef: React.RefObject<HTMLDivElement>,
  setIsAwardHeaderSticky: React.Dispatch<React.SetStateAction<boolean>>
) {
  React.useEffect(() => {
    const handleScroll = stickyHandler(headerRef, setIsAwardHeaderSticky);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
