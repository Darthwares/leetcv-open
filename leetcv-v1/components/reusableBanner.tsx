import { useTranslations } from "next-intl";
import { SvgClose, SvgInfo } from "./svgGrid";
import { useRecoilState } from "recoil";
import { showBannerState } from "@state/state";

interface ReusableBannerProps {
  children: React.ReactNode;
}

const ReusableBanner = ({ children }: ReusableBannerProps) => {
  const [isVisible, setIsVisible] = useRecoilState(showBannerState);
  const t = useTranslations("Banner");

  return (
    <div className="grid gap-2 relative top-3 md:top-4 w-full">
      {isVisible && (
        <div
          className="flex p-4 text-indigo-800 rounded-lg bg-indigo-50"
          role="alert"
          data-testid="alert"
        >
          <SvgInfo />
          <span className="sr-only">{t("info")}</span>
          {children}
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-indigo-50 text-indigo-500 rounded-lg focus:ring-2 focus:ring-indigo-400 p-1.5 hover:bg-indigo-200 inline-flex h-8 w-8"
            data-testid="closeButton"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">{t("close")}</span>
            <SvgClose />
          </button>
        </div>
      )}
    </div>
  );
};
export default ReusableBanner;
