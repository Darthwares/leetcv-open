import HeadSeo from "@components/headSeo";
import DesktopResumeHeader from "./desktopResumeHeader";
import MobileResumeHeader from "./mobileResumeHeader";

export default function ResumeHeader() {
  return (
    <div className="w-full md:mt-5" data-testid="resumeHeader">
      <div>
        <HeadSeo title={process.env.NEXT_PUBLIC_PRODUCT_NAME as string} />
        <MobileResumeHeader />
        <DesktopResumeHeader />
      </div>
    </div>
  );
}
