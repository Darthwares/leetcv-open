import {
  colorFullSkills,
  hashtags,
  shareReferralLinks,
} from "@constants/defaults";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { DocumentDuplicateIcon, XIcon } from "@heroicons/react/outline";
import { v4 as uuidv4 } from "uuid";
import copy from "copy-to-clipboard";
import { CheckIcon } from "@components/svg";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeState, userIdState } from "@state/state";
import { useRouter } from "next/router";
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

interface ProfileShareModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileShareModal = ({
  open,
  setOpen,
}: ProfileShareModalProps) => {
  const cancelButtonRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [userId] = useRecoilState(userIdState);
  const router = useRouter();
  const [userInfo] = useRecoilState(resumeState);
  const [resume] = useRecoilState(profileResumeState);
  const { status } = useSession();

  const t = useTranslations("Appbar");
  const shareReferralLinksWithName = [
    { ShareButton: TwitterShareButton, name: t("twitter") },
    { ShareButton: FacebookShareButton, name: t("facebook") },
    { ShareButton: LinkedinShareButton, name: t("linkedin") },
    { ShareButton: WhatsappShareButton, name: t("whatsapp") },
    { ShareButton: TelegramShareButton, name: t("telegram") },
  ];

  const { data: prospects } = trpc.useQuery(
    ["fs.prospects.getAll", { id: userId }],
    { enabled: status === "authenticated" }
  );
  const { data: passcode } = trpc.useQuery(
    ["fs.resume.getPasscode", { id: userId }],
    { enabled: !!userId, refetchOnWindowFocus: false }
  );

  const handle =
    resume?.handle && resume.handle.trim() !== ""
      ? resume.handle
      : userInfo?.handle;

  const privateLink = passcode
    ? `${location.origin}/r/${handle}?passcode=${passcode}`
    : `${location.origin}/r/${handle}`;

  const handleExists = prospects?.handle?.find(
    (item) => item.handle === router.query.handle
  );

  const resumeShareUrl = handleExists
    ? resume.private
      ? `${location.origin}/r/${handleExists.handle}?passcode=${handleExists.passCode}`
      : `${location.origin}/r/${resume.handle}`
    : `${location.origin}/r/${resume.handle}`;

  const username =
    (handleExists && resume.private
      ? resume.displayName
      : resume.displayName) || userInfo.displayName;
  const description =
    (handleExists && resume.private && resume.description) ||
    userInfo.description;
  const slicedDescription = description?.split(" ").slice(0, 20).join(" ");

  const shareText = `${username}\n${slicedDescription}...\n`;
  const portfolioShareURL = `${location.origin}/p/${resume.handle}`;

  const shareUrl =
    location.pathname.includes("/p/") || location.pathname === "/s/portfolio"
      ? portfolioShareURL
      : privateLink;

  const socialMediaReferrals = shareReferralLinks(
    shareText,
    shareUrl,
    hashtags
  );

  const handleCopy = () => {
    setIsCopied(true);
    copy(shareUrl, { debug: true });
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        className="relative z-50"
        as="div"
        onClose={setOpen}
        initialFocus={cancelButtonRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm bg-black/40 transition-all duration-200" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto mx-auto">
          <div className="flex min-h-full items-center justify-center px-2 py-8 md:px-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative group shadow-2xl border border-gray-300 transform overflow-hidden rounded-md bg-indigo-50 dark:bg-gray-800 text-left transition-all sm:my-8 sm:w-full md:max-w-md">
                <div className="z-40 mt-3 sm:mt-0 text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-xl z-40 text-left p-4 md:px-6 md:py-5 flex justify-between w-full items-start font-bold sm:items-center dark:text-white first-letter-uppercase"
                  >
                    {t("share")}
                    <button
                      className="float-right shadow-lg rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700/30 dark:hover:text-gray-300 border border-gray-50 hover:bg-indigo-500 hover:text-white"
                      onClick={() => setOpen(false)}
                    >
                      <XIcon className="w-5 h-5" />
                    </button>
                  </Dialog.Title>
                  <div className="px-5 z-40 pb-5 pt-2.5 md:px-6 md:pb-6 flex flex-col items-start gap-4">
                    <div className="post-share">
                      <p className="text-xs">{t("shareProfile")}</p>
                      <div className="flex gap-3 mt-4 flex-wrap">
                        {socialMediaReferrals.map((share) => {
                          const { rgb } = colorFullSkills(share.name!);
                          return (
                            <share.ShareButton
                              key={uuidv4()}
                              url={shareUrl}
                              title={shareText}
                              hashtags={hashtags}
                              className="flex flex-col justify-center gap-2 items-center"
                            >
                              <share.Icon
                                size={44}
                                round={true}
                                className="p-2 rounded-md border border-gray-200 cursor-pointer app-bar-btn"
                                style={{ background: rgb }}
                              />
                              <p className="text-xs text-gray-800 mt-1">
                                {shareReferralLinksWithName.find(
                                  (item) =>
                                    item.ShareButton === share.ShareButton
                                )?.name || ""}
                              </p>
                            </share.ShareButton>
                          );
                        })}
                      </div>
                    </div>
                    <div className="copy-url w-full">
                      <p className="text-xs font-semibold mt-2 mb-4">
                        {t("copyLink")}
                      </p>
                      <div className="flex gap-4">
                        <div className="bg-gray-50 rounded-xl text-xs px-.5 py-1.5 text-gray-600 max-w-20 overflow-auto">
                          <p className="mx-2 whitespace-nowrap overflow-auto">
                            {shareUrl}
                          </p>
                        </div>
                        {isCopied ? (
                          <p className="font-medium text-green-500 flex items-center gap-1">
                            <CheckIcon className="w-5 h-5" />
                          </p>
                        ) : (
                          <button
                            className="underline cursor-pointer dark:text-white text-gray-700 hover:text-indigo-600 font-medium"
                            onClick={handleCopy}
                          >
                            <DocumentDuplicateIcon className="w-[18px] h-[18px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
