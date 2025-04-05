import React, { useEffect } from "react";
import { openAiReviewSidebarState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Card, CardContent } from "shadcn/components/ui/card";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ImageFallBack from "./imageFallBack";

// Type Definitions
export type Visitor = {
  visitorName: string;
  visitorJobTitle: string;
  visitorImage: string;
  handle: string;
  visitorId: string;
  visitedAt: Date;
};

type VisitorCardProps = {
  visitor: Visitor;
};

// Helper Function: Custom Relative Time String
const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d`;
  } else if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}mo`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years}y`;
  }
};

// VisitorCard Component
const VisitorCard: React.FC<VisitorCardProps> = ({ visitor }) => {
  const relativeTime = getRelativeTimeString(visitor.visitedAt);
  const router = useRouter();
  const setOpenAiSidebar = useSetRecoilState(openAiReviewSidebarState);

  return (
    <Card className="bg-white mb-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="py-4">
        <div
          onClick={() => {
            router.push(`/r/${visitor.handle}`);
            setOpenAiSidebar(false);
          }}
          className="flex items-center cursor-pointer"
        >
          <ImageFallBack
            imgSrc={visitor.visitorImage}
            fallBackText={visitor.visitorName}
            avatarClass="w-14 h-14 rounded-full"
            avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
            avatarFallbackClass="w-14 h-14 text-white rounded-full text-3xl"
          />
          <div className="flex-grow ml-3">
            <h3 className="font-semibold text-lg text-gray-800">
              {visitor.visitorName}
            </h3>
            <p className="text-sm text-gray-600">{visitor.visitorJobTitle}</p>
          </div>
          <p className="text-xs text-gray-400 self-start mt-1">
            {relativeTime}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const UpgradeMessage: React.FC<{ plan: string; totalVisitors: number }> = ({
  plan,
  totalVisitors,
}) => {
  const messages = {
    Free: {
      title: "Unlock More Profile Visitors",
      description: `You can currently see 1 out of ${totalVisitors} profile visitors. Upgrade to Premium or Pro for unlimited access.`,
      buttonText: "Upgrade Now",
    },
  };

  const { title, description, buttonText } =
    messages[plan as keyof typeof messages];

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
      <div className="h-72 mb-5">
        <lottie-player
          src="/assets/lottie/coming-soon.json"
          background="transparent"
          speed="1"
          loop
          autoplay
          data-testid="lottie"
        ></lottie-player>
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{description}</p>
        <Link href="/pricing">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

const ProfileVisitorsList: React.FC = () => {
  const { status } = useSession();
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("DashboardWidget");

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const {
    data: visitorsData,
    isLoading,
    error,
  } = trpc.useQuery(["fs.handle.getVisitorsList", { id: userId }], {
    enabled: status === "authenticated" && !!userId,
  });

  if (status !== "authenticated") {
    return (
      <div className="text-gray-500 p-6 bg-white rounded-lg shadow-sm">
        {t("pleaseSignin")}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-gray-500 p-6 bg-white rounded-lg shadow-sm">
        {t("loadingVisitors")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-6 bg-white rounded-lg shadow-sm">
        {t("errorLoading")}
        {error.message}
      </div>
    );
  }

  if (!visitorsData) {
    return null;
  }

  const {
    firstVisitor,
    additionalVisitors,
    remainingCount,
    totalVisitors,
    userPlan,
  } = visitorsData;

  return (
    <div className="p-5 rounded-lg shadow-sm">
      {totalVisitors === 0 ? (
        <div className="text-gray-500 bg-white p-4 rounded-lg">
          {t("noVisitorsFound")}
        </div>
      ) : (
        <>
          {firstVisitor && <VisitorCard visitor={firstVisitor} />}
          {userPlan !== "Free" ? (
            additionalVisitors?.map((visitor) => (
              <VisitorCard key={visitor.visitorId} visitor={visitor} />
            ))
          ) : (
            <div className="flex -space-x-4 mt-4">
              {additionalVisitors.map((visitor, index) => (
                <div
                  key={visitor.visitorId}
                  className={`w-14 h-14 rounded-full overflow-hidden border-2 border-white ${
                    index === 7 && remainingCount > 0 ? "relative" : ""
                  }`}
                  style={{ zIndex: additionalVisitors.length - index }}
                >
                  <ImageFallBack
                    imgSrc={visitor.visitorImage}
                    fallBackText={visitor.visitorName}
                    avatarClass="w-14 h-14 rounded-full"
                    avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                    avatarFallbackClass="w-14 h-14 text-white rounded-full text-3xl"
                  />
                  {index === 7 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm font-bold">
                      +{remainingCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {userPlan === "Free" && (
            <UpgradeMessage plan={userPlan} totalVisitors={totalVisitors} />
          )}
        </>
      )}
    </div>
  );
};

export default ProfileVisitorsList;
