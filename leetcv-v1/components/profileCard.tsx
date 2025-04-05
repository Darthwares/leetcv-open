import {
  BriefcaseIcon,
  LocationMarkerIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ResumeView } from "./resumeView";
import { useSetRecoilState } from "recoil";
import { profileResumeState } from "@state/state";
import UpSell from "./upSell";
import ImageFallBack from "./imageFallBack";

export default function ProfileCard() {
  const router = useRouter();
  const { handle, passcode } = router.query;
  const t = useTranslations("ProfileHeader");
  const { status } = useSession();
  const { data: publicResumeData } = trpc.useQuery([
    "fs.public.getProfile",
    { handle: handle as string },
  ]);
  const { data: publicResume } = trpc.useQuery([
    "fs.public.getPublicResume",
    { handle: handle as string, passcode: Number(passcode) },
  ]);
  const setProfileResume = useSetRecoilState(profileResumeState);

  useEffect(() => {
    if (publicResume) {
      setProfileResume(publicResume);
    }
  }, [publicResume]);

  return (
    <div
      className={`w-full flex flex-col justify-center px-0 md:px-8 ${
        !publicResume ? "max-w-md" : "max-w-7xl"
      }`}
    >
      <div className="flex justify-center items-center rounded-md">
        <div className="container px-0 flex justify-center">
          <div className="flex flex-col">
            {publicResume && <UpSell />}
            {publicResume && <ResumeView />}
          </div>
          {!publicResume && (
            <div className="max-w-sm">
              <div className="shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
                <div className="flex justify-center relative print:hidden">
                  <img
                    className="h-40 w-full object-cover rounded-lg rounded-b-none"
                    src="/assets/background-cover.png"
                    alt={publicResumeData?.displayName!}
                    referrerPolicy="no-referrer"
                  />
                  <ImageFallBack
                    imgSrc={publicResumeData?.image!}
                    fallBackText={publicResumeData?.displayName!}
                    avatarClass="object-cover h-32 w-32 rounded-full absolute top-4"
                    avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                    avatarFallbackClass="object-cover h-32 w-32 rounded-full text-white text-6xl"
                  />
                  {status === "authenticated" && (
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-1 text-sm font-medium text-gray-800 absolute right-2 bottom-2 z-10">
                      <span className="inline-flex gap-1.5">
                        <LockClosedIcon className="w-5" />
                        <span>{t("private")}</span>
                      </span>
                    </span>
                  )}
                </div>
                <div className="pb-6 pt-3 px-3 rounded-lg bg-white">
                  <div className="flex-1 space-y-1.5">
                    {publicResumeData?.displayName && (
                      <p className="font-semibold text-xl md:text-2xl text-gray-900 w-72 truncate py-1">
                        {publicResumeData?.displayName}
                      </p>
                    )}
                    {publicResumeData?.handle && (
                      <p className="text-sm font-semibold relative bottom-2 text-gray-500">
                        @{publicResumeData?.handle}
                      </p>
                    )}
                    {publicResumeData?.position && (
                      <p className="text-sm text-gray-500 inline-flex gap-x-2">
                        <span>
                          <BriefcaseIcon className="w-5 text-slate-500" />
                        </span>
                        {publicResumeData?.position}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 flex gap-3">
                      {publicResumeData?.address && (
                        <p className="text-sm text-gray-500 inline-flex gap-x-2">
                          <span>
                            <LocationMarkerIcon className="w-5 text-slate-500" />
                          </span>
                          {publicResumeData?.address}
                        </p>
                      )}
                    </div>
                    <div className="flex max-w-md flex-wrap gap-2 justify-start items-center">
                      {publicResumeData?.skills?.slice(0, 3)?.map((skill) => {
                        return (
                          <div
                            className="text-gray-900 flex text-md border-2 px-3 py-1 font-light text-sm align-center capitalize rounded-md"
                            key={skill}
                          >
                            {skill}
                          </div>
                        );
                      })}
                      {publicResumeData?.skills?.length! > 3 && (
                        <p className="text-gray-900 text-md border-2 px-3 py-1 font-light text-sm align-center capitalize rounded-md">
                          +{publicResumeData?.skills?.length! - 3} {t("more")}
                        </p>
                      )}
                    </div>
                    {publicResumeData?.description && (
                      <p className="mt-2 text-sm font-medium text-gray-900 mx-auto flex justify-center items-center pb-2">
                        <span>
                          {publicResumeData?.description
                            ?.split(" ")
                            .slice(0, 20)
                            .join(" ")}
                          ...
                        </span>
                      </p>
                    )}
                    {status === "unauthenticated" && (
                      <div className="flex justify-center">
                        <button
                          className="text-gray-800 font-bold rounded-lg transition duration-300 cursor-pointer"
                          onClick={() => {
                            router.push(
                              "/auth/signin?redirect=" + router.asPath
                            );
                          }}
                        >
                          <span className="primary-btn px-3 py-2 text-sm w-full">
                            {t("loginToViewResume")}
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
