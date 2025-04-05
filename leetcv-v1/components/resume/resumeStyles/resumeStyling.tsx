import { CheckIcon } from "@heroicons/react/solid";
import { Card, CardContent } from "../../../shadcn/components/ui/card";
import { Label } from "../../../shadcn/components/ui/label";
import FontStyleDropdown from "./fontStyleDropdown";
import { useRecoilState } from "recoil";
import {
  resumeBannerColorState,
  resumeColorState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";

const tailwindColors = [
  "slate",
  "gray",
  "pink",
  "rose",
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
];

const colorClasses = {
  slate: "bg-slate-400 focus:ring-slate-500",
  gray: "bg-gray-400 focus:ring-gray-500",
  pink: "bg-pink-400 focus:ring-pink-500",
  rose: "bg-rose-400 focus:ring-rose-500",
  red: "bg-red-400 focus:ring-red-500",
  orange: "bg-orange-400 focus:ring-orange-500",
  yellow: "bg-yellow-400 focus:ring-yellow-500",
  lime: "bg-lime-400 focus:ring-lime-500",
  green: "bg-green-400 focus:ring-green-500",
  emerald: "bg-emerald-400 focus:ring-emerald-500",
  teal: "bg-teal-400 focus:ring-teal-500",
  cyan: "bg-cyan-400 focus:ring-cyan-500",
  sky: "bg-sky-400 focus:ring-sky-500",
  blue: "bg-blue-400 focus:ring-blue-500",
  indigo: "bg-indigo-400 focus:ring-indigo-500",
  violet: "bg-violet-400 focus:ring-violet-500",
  purple: "bg-purple-400 focus:ring-purple-500",
  fuchsia: "bg-fuchsia-400 focus:ring-fuchsia-500",
};

const bannerColors = [
  "bg-gradient-to-r from-indigo-400 to-pink-500 focus:ring-pink-500",
  "bg-gradient-to-r from-green-300 to-blue-400 focus:ring-green-500",
  "bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 focus:ring-purple-500",
  "bg-gradient-to-r from-lime-200 to-green-400 focus:ring-lime-500",
  "bg-gradient-to-r from-teal-300 to-cyan-400 focus:ring-teal-500",
  "bg-gradient-to-r from-cyan-500 to-blue-500 focus:ring-cyan-500",
];

export default function ResumeStyling() {
  const [selectedColor, setSelectedColor] = useRecoilState(resumeColorState);
  const [selectedBannerColor, setSelectedBannerColor] = useRecoilState(
    resumeBannerColorState
  );
  const setColor = trpc.useMutation(["fs.resumeStyles.updateColor"]);
  const setBannerColor = trpc.useMutation([
    "fs.resumeStyles.updateBannerColor",
  ]);
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("ResumeStyles");

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    setColor.mutate({
      id: userId,
      color: color,
    });
  };

  const handleSelectBannerColor = (bannerColor: string) => {
    setSelectedBannerColor(bannerColor);
    setBannerColor.mutate({
      id: userId,
      bannerColor: bannerColor,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardContent className="space-y-4">
        <div className="space-y-2 mt-4 lg:hidden">
          <Label>{t("profileBannerColors")}</Label>
          <div className="flex flex-wrap gap-2">
            {bannerColors.map((color) => (
              <button
                key={color}
                className={`w-9 h-9 rounded-full ${color} hover:scale-105 transition-all duration-200 border-2 border-gray-200 relative focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={() => handleSelectBannerColor(color)}
              >
                {selectedBannerColor === color && (
                  <CheckIcon
                    className={`absolute inset-0 m-auto text-white w-5 h-5`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label>{t("headingBackgroundColors")}</Label>
          <div className="flex flex-wrap gap-2">
            {tailwindColors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ${
                  colorClasses[color as keyof typeof colorClasses]
                } hover:scale-105 transition-all duration-200 border-2 border-gray-200 relative focus:outline-none focus:ring-2 focus:ring-offset-2`}
                onClick={() => handleSelectColor(color)}
              >
                {selectedColor === color && (
                  <CheckIcon className="absolute inset-0 m-auto text-white w-5 h-5" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="headingFont">{t("fontStyle")}</Label>
          <FontStyleDropdown />
        </div>
      </CardContent>
    </Card>
  );
}
