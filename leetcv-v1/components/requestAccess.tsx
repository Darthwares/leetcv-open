import PasscodeVerify from "@components/passcodeVerify";
import { resumeState, sideBarOpenState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import ProfileCard from "./profileCard";
import ReUsableTransitionModal from "./reUsableTransitionModal";
import ReUsableWatchVideoBanner from "./reUsableWatchVideoBanner";
import RequestCardSkeleton from "./requestCardSkeleton";

export default function RequestAccess() {
  const t = useTranslations("ProfileHeader");
  const router = useRouter();
  const { status } = useSession();
  const request = trpc.useMutation("fs.request.create");
  const { handle } = router.query;
  const [userId] = useRecoilState(userIdState);
  const [userInfo] = useRecoilState(resumeState);
  const [skeletonView, setSkeletonView] = useState(true);
  const requestNotification = trpc.useMutation([
    "fs.notification.sendRequestNotification",
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const { data: publicResumeData } = trpc.useQuery([
    "fs.public.getProfile",
    { handle: handle as string },
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (publicResumeData !== undefined) {
        setSkeletonView(false);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [publicResumeData]);

  const handleRequest = () => {
    if (status !== "authenticated") {
      router.push("/auth/signin?redirect=" + router.asPath);
    }
    request.mutate({
      requesterId: userId,
      targetHandle: handle as string,
      requesterHandle: userInfo.handle,
    });
    requestNotification.mutate({
      handle: handle! as string,
      userId,
    });
    toast.success(t("requestAccess"));
    setTimeout(() => {
      router.push("/s/prospects");
    }, 1500);
  };

  return (
    <div className="mx-auto">
      <div
        className={`${
          isSideBarClosed ? "lg:flex-row" : "lg:flex-col"
        } xl:flex-row flex w-full max-w-7xl flex-col items-center justify-center gap-10 xl:gap-24 py-5 md:pt-10`}
      >
        {skeletonView ? <RequestCardSkeleton /> : <ProfileCard />}
        <div className="flex flex-col items-center gap-y-6">
          <div className="flex flex-col gap-y-3 md:px-5">
            <p className="font-semibold text-left text-xl py-2">
              {t("needPasscode")}
            </p>
            <div>
              <PasscodeVerify />
            </div>
            <p className="py-5 text-center">{t("or")}</p>
            <button
              className="flex text-center items-center justify-center mx-auto w-56 space-x-4 cursor-pointer z-10 approveOrDeny"
              onClick={handleRequest}
            >
              <span className="primary-btn px-4 py-2 text-sm">
                {t("requestAccess")}
              </span>
            </button>
          </div>
          <ReUsableWatchVideoBanner
            title={t("reqFeature")}
            setIsOpen={setIsOpen}
            isHandlePage={true}
          />
          <ReUsableTransitionModal
            src="https://www.youtube.com/embed/MgrxDGxe2YI?si=vxMjPJuD_31FwLIU?autoplay=1&mute=1"
            title={t("modalTitle")}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </div>
  );
}
