import { ArrowRightIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

type GetStartedButtonProps = {
  url: string;
};

const GetStartedButton = ({ url }: GetStartedButtonProps) => {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "unauthenticated") {
      router.push(`/auth/signin?redirect=${url}`);
      return;
    }
    router.push(url);
  };

  return (
    <button
      className="app-bar-btn gap-2.5 text-sm mb-4 -ml-[2px] px-3 py-2 text-white bg-indigo-600 tex-white hover:text-indigo-600 hover:bg-white transition-all duration-300"
      onClick={handleClick}
    >
      Get Started
      <ArrowRightIcon className="w-5 h-5" />
    </button>
  );
};

export default GetStartedButton;
