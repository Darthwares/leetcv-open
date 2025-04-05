import { handleHref } from "@constants/defaults";
import {
  fetchingTextState,
  hasFileState,
  resumeConversionState,
} from "@state/state";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSetRecoilState } from "recoil";

const ProductLogo = () => {
  const router = useRouter();
  const setIsConverted = useSetRecoilState(resumeConversionState);
  const setHasFile = useSetRecoilState(hasFileState);
  const setFetchingText = useSetRecoilState(fetchingTextState);
  const href = handleHref("/", router);
  return (
    <Link
      href={href!}
      className={`${
        location.pathname !== "/"
          ? "cursor-pointer"
          : "cursor-default pointer-events-none"
      } brand-grad text-2xl flex items-baseline`}
      data-testid="homePage"
      onClick={() => {
        setIsConverted(false);
        setHasFile(false);
        setFetchingText(false);
      }}
    >
      <img src="/logo.png" className="w-16 mt-2 cursor-pointer" alt="leetCV-logo" />
    </Link>
  );
};

export default ProductLogo;
