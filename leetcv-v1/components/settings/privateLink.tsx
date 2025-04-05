import React from "react";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeState, shareProfileModalState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { ShareIcon } from "@heroicons/react/outline";
import Head from "next/head";
import { ProfileShareModal } from "@components/share/resumePortfolioShare";

const PrivateLink = () => {
  const t = useTranslations("PrivateLink");
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
  const [userInfo] = useRecoilState(resumeState);
  const [resume] = useRecoilState(profileResumeState);
  const [shareProfileModal, setShareProfileModal] = useRecoilState(
    shareProfileModalState
  );
  const { data: passcode } = trpc.useQuery(
    ["fs.resume.getPasscode", { id: userId }],
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: prospects } = trpc.useQuery([
    "fs.prospects.getAll",
    { id: userId },
  ]);

  const privateLink =
    passcode && `${location.origin}/r/${userInfo.handle}?passcode=${passcode}`;

  const handleExists = prospects?.handle?.find(
    (item) => item.handle === router.query.handle
  );

  const description =
    (handleExists && resume.private && resume.description) ||
    userInfo.description;

  const username =
    handleExists && resume.private
      ? resume.displayName
      : resume.displayName || userInfo.displayName;

  const shareProfile = () => {
    setShareProfileModal(true);
  };

  return (
    <>
      <Head>
        <meta name="og:description" content={`${description}`} />
        <meta property="og:title" content={`${username}`} />
        <meta property="og:url" content={`${privateLink}`} />
        <meta property="og:image" content={resume.image || userInfo.image} />
        <meta
          property="og:skills"
          content={resume.skills?.join(", ") ?? "No skills listed"}
        />
      </Head>
      <div className="w-full space-y-3 px-3 mt-6 lg:mt-0 lg:py-8 min-h-[60vh]">
        <h2 className="text-xl text-gray-700 font-bold">{t("privateLink")}</h2>
        <p className="max-w-5xl">{t("privateLinkDescription")}</p>
        <div className="w-full rounded-2xl relative top-4 max-w-5xl bg-indigo-50 p-5 md:px-1 md:py-2">
          <div className="lg:py-5 md:py-4 md:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center w-full justify-start sm:justify-between gap-2">
              <p className="text-base font-medium">{t("sharePrivateLink")}</p>
              {passcode && (
                <button
                  className="edit relative inline-flex gap-1.5 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-2 sm:mt-0"
                  onClick={shareProfile}
                >
                  <ShareIcon className="w-[18px] h-[18px]" />
                  {t("shareLink")}
                </button>
              )}
            </div>
          </div>
        </div>
        <ProfileShareModal
            open={shareProfileModal}
            setOpen={setShareProfileModal}
          />
      </div>
    </>
  );
};

export default PrivateLink;
