import { CheckCircleIcon } from "@heroicons/react/solid";
import { userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { ThemeState } from "data/models/LeetLink";
import React from "react";
import { useRecoilState } from "recoil";

export const themes = [
  {
    id: 1,
    cardBgColor: "bg-gradient-to-r from-indigo-200 to-pink-300",
    showQrBtnBgAndTextColor: "bg-white text-gray-900",
    handleTextColor: "text-gray-900",
    positionBgAndTextColor: "bg-gray-900 text-white",
    bioTextColor: "text-gray-800",
    headerTextColor: "text-black",
    buttonBgAndTextColor: "bg-indigo-600 text-white",
    socialIconColor:
      "text-indigo-600 border-indigo-500 hover:text-white hover:bg-indigo-600 delay-500",
  },
  {
    id: 2,
    cardBgColor: "bg-gradient-to-r from-green-200 to-blue-300",
    showQrBtnBgAndTextColor: "bg-white text-gray-800",
    handleTextColor: "text-gray-800",
    positionBgAndTextColor: "bg-blue-600 text-white",
    bioTextColor: "text-gray-700",
    headerTextColor: "text-blue-900",
    buttonBgAndTextColor: "bg-blue-600 text-white",
    socialIconColor:
      "text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600",
  },
  {
    id: 3,
    cardBgColor: "bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400",
    showQrBtnBgAndTextColor: "bg-white text-gray-900",
    handleTextColor: "text-white",
    positionBgAndTextColor: "bg-blue-600 text-white",
    bioTextColor: "text-gray-100",
    headerTextColor: "text-gray-100",
    buttonBgAndTextColor: "bg-blue-600 text-white",
    socialIconColor:
      "text-blue-600 border-blue-600 hover:text-white hover:bg-blue-600",
  },
  {
    id: 4,
    cardBgColor: "bg-gradient-to-r from-lime-100 to-green-300",
    showQrBtnBgAndTextColor: "bg-white text-gray-800",
    handleTextColor: "text-gray-800",
    positionBgAndTextColor: "bg-green-500 text-white",
    bioTextColor: "text-gray-700",
    headerTextColor: "text-green-800",
    buttonBgAndTextColor: "bg-green-500 text-white",
    socialIconColor:
      "text-green-500 border-green-500 hover:text-white hover:bg-green-500",
  },
  {
    id: 5,
    cardBgColor: "bg-gradient-to-r from-teal-200 to-cyan-300",
    showQrBtnBgAndTextColor: "bg-white text-gray-900",
    handleTextColor: "text-gray-900",
    positionBgAndTextColor: "bg-cyan-600 text-white",
    bioTextColor: "text-gray-800",
    headerTextColor: "text-cyan-900",
    buttonBgAndTextColor: "bg-cyan-600 text-white",
    socialIconColor:
      "text-cyan-600 border-cyan-600 hover:text-white hover:bg-cyan-600",
  },
  {
    id: 6,
    cardBgColor: "bg-gradient-to-r from-pink-200 to-red-300",
    showQrBtnBgAndTextColor: "bg-white text-gray-900",
    handleTextColor: "text-gray-900",
    positionBgAndTextColor: "bg-pink-600 text-white",
    bioTextColor: "text-gray-800",
    headerTextColor: "text-pink-900",
    buttonBgAndTextColor: "bg-pink-600 text-white",
    socialIconColor:
      "text-pink-600 border-pink-600 hover:text-white hover:bg-pink-600",
  },
];

type LeetLinkThemeProps = {
  selectedTheme: ThemeState;
  setSelectedTheme: React.Dispatch<React.SetStateAction<ThemeState>>;
};

const LeetLinkTheme = ({
  selectedTheme,
  setSelectedTheme,
}: LeetLinkThemeProps) => {
  const setLeetTheme = trpc.useMutation(["fs.leetLink.updateTheme"]);
  const [userId] = useRecoilState(userIdState);

  const applyTheme = (theme: ThemeState) => {
    setSelectedTheme(theme);
    setLeetTheme.mutate({
      id: userId,
      theme: theme,
    });
  };

  return (
    <div className="flex justify-center gap-2.5 sm:gap-4 mt-5">
      {themes.map((theme) => (
        <div
          key={theme.id}
          className={`relative w-12 h-12 rounded-full cursor-pointer ${theme.cardBgColor}`}
          onClick={() => applyTheme(theme)}
        >
          {selectedTheme.id === theme.id ? (
            <CheckCircleIcon className="absolute bottom-0.5 -right-1 w-6 h-6 text-green-500 bg-white rounded-full p-0" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default LeetLinkTheme;
