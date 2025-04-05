import { isPrintingState } from "@state/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

function useIsPrinting() {
  const [isPrinting, setIsPrinting] = useRecoilState(isPrintingState);

  useEffect(() => {
    const handleBeforePrint = () => setIsPrinting(true);
    const handleAfterPrint = () => setIsPrinting(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [setIsPrinting]);

  useEffect(() => {
    if (!isPrinting) {
      setIsPrinting(false);
    }
  }, [isPrinting, setIsPrinting]);
}

export default useIsPrinting;
