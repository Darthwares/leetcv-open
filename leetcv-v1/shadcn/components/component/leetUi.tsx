import { generateValidHref, getHandle } from "@constants/defaults";
import {
  leetFormVisibleState,
  leetLinkBioState,
  leetLinkHeaderState,
  leetLinksListState,
  leetLinkSocialMediaState,
  profileResumeState,
  resumeState,
  sideBarOpenState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Button } from "shadcn/components/ui/button";
import { Badge } from "../ui/badge";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { QRCode } from "react-qrcode-logo";
import { useRouter } from "next/router";
import ImageFallBack from "@components/imageFallBack";
import { PencilIcon, ShareIcon } from "@heroicons/react/outline";
import Link from "next/link";
import LeetLinkShareModal from "@components/leetLink/leetLinkShareModal";
import useCopyToClipboard from "@lib/helper/useCoptToClipboard";
import LeetUiSkeleton from "@components/leetLink/leetUiSkeleton";
import { useTranslations } from "next-intl";
import LeetLinkTheme, { themes } from "@components/leetLink/leetLinkTheme";
import { PaintBrushSvg } from "@components/svg";
import LeetUiSocialMedia from "@components/leetLink/leetUiSocialMedia";
import { trpc } from "@utils/trpc";
import { SocialMediaState } from "data/models/LeetLink";
import { useSession } from "next-auth/react";

export function LeetUi() {
  const [userInfo] = useRecoilState(resumeState);
  const [resume] = useRecoilState(profileResumeState);
  const [showQR, setShowQR] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isThemesVisible, setIsThemesVisible] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [isCopied, handleCopy] = useCopyToClipboard();
  const [bio, setBio] = useRecoilState(leetLinkBioState);
  const [header, setHeader] = useRecoilState(leetLinkHeaderState);
  const setSocialMediaWithToggle = useSetRecoilState<SocialMediaState[]>(
    leetLinkSocialMediaState
  );
  const [leetCustomLinks, setCustomLinks] = useRecoilState(leetLinksListState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const setLeetFormVisible = useSetRecoilState(leetFormVisibleState);
  const router = useRouter();
  const { status } = useSession();
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("LeetLink");

  const qrValue = useMemo(
    () => getHandle(`${window?.origin}/r/${resume?.handle}`),
    [resume?.handle]
  );
  const url = useMemo(
    () => `${window.origin}/l/${resume?.handle}`,
    [resume?.handle]
  );

  const isDynamicPath = useMemo(
    () => location.pathname.includes("/l/"),
    [location.pathname]
  );

  const { data: leetLink } = trpc.useQuery(
    ["fs.leetLink.getLeetLink", { id: resume.id }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  useEffect(() => {
    if (leetLink) {
      setBio(leetLink.bio ?? "");
      setHeader(leetLink.header ?? "");
      setCustomLinks(leetLink.customLinks ?? []);
      setSocialMediaWithToggle(leetLink.socialLinks ?? []);
      setSelectedTheme(leetLink.theme ?? themes[0]);
    }
  }, [leetLink]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const themeRef = useRef<HTMLDivElement | null>(null);

  const { data: viewCounter } = trpc.useQuery(
    [
      "fs.public.getLeetLinkCount",
      { id: resume.id, handle: resume.handle, file: "leetLinkCounter" },
    ],
    {
      enabled: !!resume.id,
    }
  );
  const setViewCounter = trpc.useMutation(["fs.public.setLeetLinkCount"]);

  async function pageViewer() {
    let counter = viewCounter + 1;
    if (
      userInfo.handle !== resume.handle &&
      location.pathname.includes("/l/")
    ) {
      setViewCounter.mutate({
        handle: resume.handle,
        count: counter,
        file: "leetLinkCounter",
      });
    }
  }
  useEffect(() => {
    window.addEventListener("beforeunload", pageViewer);
    return () => {
      window.removeEventListener("beforeunload", pageViewer);
    };
  }, [viewCounter]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      !containerRef.current?.contains(event.target as Node) &&
      !buttonRef.current?.contains(event.target as Node) &&
      !themeRef.current?.contains(event.target as Node)
    ) {
      setIsThemesVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderHeaderActions = () => (
    <>
      <div className="w-full px-4 items-center gap-2 transition-all duration-200 flex justify-between rounded-full py-2.5 text-gray-500 bg-white font-medium border border-gray-200 shadow-sm text-base">
        <div>leetcv/l/{resume?.handle}</div>
        <Badge
          variant="destructive"
          className="bg-gray-800 cursor-pointer text-white py-1"
          onClick={() => handleCopy(url)}
        >
          {isCopied ? t("copied") : t("copy")}
        </Badge>
      </div>
      <Button
        variant="outline"
        className="rounded-full px-3 py-3 border-gray-200 shadow-sm"
        onClick={() => setIsShareModalOpen(true)}
      >
        <ShareIcon className="w-5 h-5" />
      </Button>
    </>
  );

  const renderEditAndThemeButtons = () => (
    <div className="flex w-full justify-end items-center gap-2.5 lg:hidden">
      <button
        className="bg-white px-3 py-2 text-sm flex gap-2 border-gray-500 shadow-sm items-center justify-center text-gray-800 rounded-full font-medium"
        onClick={() => setLeetFormVisible(true)}
      >
        <PencilIcon className="w-4 h-4" /> {t("edit")}
      </button>
      <button
        className={`${selectedTheme?.buttonBgAndTextColor} w-10 h-10 rounded-full flex shadow-sm items-center justify-center`}
        onClick={() => setIsThemesVisible(!isThemesVisible)}
      >
        <PaintBrushSvg className="w-5 h-5" />
      </button>
    </div>
  );

  const renderMainContent = () => (
    <div
      ref={containerRef}
      className={`flex flex-col items-center px-4 md:px-6 py-6 md:py-8 gap-4 ${
        selectedTheme.cardBgColor ??
        "bg-gradient-to-r from-indigo-200 to-pink-300"
      }  shadow-md mx-auto relative max-w-2xl mt-4 rounded-3xl`}
    >
      {!isDynamicPath && (
        <>
          <button
            ref={buttonRef}
            className={`${selectedTheme?.buttonBgAndTextColor} w-9 h-9 lg:w-10 lg:h-10 rounded-full hidden lg:flex items-center justify-center absolute top-4 right-4`}
            onClick={() => setIsThemesVisible(!isThemesVisible)}
          >
            <PaintBrushSvg className={`w-5 h-5`} />
          </button>
          {renderEditAndThemeButtons()}
        </>
      )}
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col items-center p-4 space-y-4 rounded-lg">
          {!showQR ? (
            <ImageFallBack
              imgSrc={resume.image ?? ""}
              fallBackText={resume.displayName}
              avatarClass="w-28 h-28 rounded-lg"
              avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
              avatarFallbackClass="w-28 h-28 text-white rounded-lg text-6xl"
            />
          ) : (
            <QRCode qrStyle="dots" value={qrValue} size={90} />
          )}
          <Button variant="outline" onClick={() => setShowQR(!showQR)}>
            {!showQR ? t("showQr") : t("showAvatar")}
          </Button>
        </div>
        <div className="flex flex-col items-center space-y-1.5">
          <h2
            className={`text-lg font-semibold ${
              selectedTheme?.handleTextColor ?? "text-gray-900"
            }`}
          >
            @{resume.handle}
          </h2>
          <Badge
            variant="destructive"
            className={`${
              selectedTheme?.positionBgAndTextColor ?? "bg-gray-800 text-white"
            }`}
          >
            {resume.position}
          </Badge>
          <p
            className={`text-sm ${
              selectedTheme?.bioTextColor ?? "text-gray-800"
            } font-semibold pt-3`}
          >
            {bio}
          </p>
          <strong
            className={`${selectedTheme?.headerTextColor ?? "text-black"} pt-4`}
          >
            {header}
          </strong>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-md space-y-4">
        <Button
          variant="outline"
          className={`w-full h-12 flex items-center gap-2.5 hover:scale-[105] transition-all duration-100 ${
            selectedTheme?.buttonBgAndTextColor ??
            "bg-indigo-600 text-white max-w-md mx-auto"
          } py-3 border-none`}
          onClick={() => router.push("/r/" + resume.handle)}
        >
          {t("resume")}
        </Button>
        <Button
          variant="outline"
          className={`w-full h-12 flex items-center gap-2.5 ${
            selectedTheme?.buttonBgAndTextColor ?? "bg-indigo-600 text-white"
          } py-3 border-none max-w-md mx-auto`}
          onClick={() => router.push("/p/" + resume.handle)}
        >
          {t("portfolio")}
        </Button>
        {leetCustomLinks
          ?.filter((link) => link.url && link.isValidUrl && link.show)
          ?.map((link) => (
            <Link key={link.id} href={generateValidHref(link.url)}>
              <Button
                variant="outline"
                className={`w-full flex h-12 justify-center items-center ${
                  selectedTheme?.buttonBgAndTextColor ??
                  "bg-indigo-600 text-white"
                } py-3 border-none max-w-md mx-auto`}
              >
                {link.urlTitle}
              </Button>
            </Link>
          ))}
        <LeetUiSocialMedia theme={selectedTheme} />
      </div>
    </div>
  );

  return (
    <>
      {!resume.id ? (
        <LeetUiSkeleton />
      ) : (
        <div
          className={` w-full xl:w-[40%] min-h-screen ${
            isSideBarClosed ? "lg:w-[45%]" : "lg:w-[70%] mx-auto"
          } ${
            location.pathname.includes("/l/")
              ? "w-full lg:w-full xl:w-full"
              : ""
          } xl:w-[40%]`}
        >
          <div className="flex items-center gap-2 mt-8 mx-auto max-w-2xl">
            {renderHeaderActions()}
          </div>

          {isThemesVisible && (
            <div ref={themeRef}>
              <LeetLinkTheme
                selectedTheme={selectedTheme}
                setSelectedTheme={setSelectedTheme}
              />
            </div>
          )}
          {renderMainContent()}
        </div>
      )}
      <LeetLinkShareModal
        open={isShareModalOpen}
        setOpen={setIsShareModalOpen}
      />
    </>
  );
}
