import { useState } from "react";
import copy from "copy-to-clipboard";

const useCopyToClipboard = (): [boolean, (url: string) => void] => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (url: string) => {
    setIsCopied(true);
    copy(url, {
      debug: true,
    });
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return [isCopied, handleCopy];
};

export default useCopyToClipboard;
