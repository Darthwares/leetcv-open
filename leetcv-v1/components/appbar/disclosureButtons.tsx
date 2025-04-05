import { Disclosure } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShareIcon,
  XIcon,
} from "@heroicons/react/outline";
import { disclosureButton, resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const DisclosureButtons = () => {
  const { status } = useSession();
  const setDisclosureButton = useSetRecoilState(disclosureButton);
  const [disclosureOpen] = useRecoilState(disclosureButton);
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("Appbar");
  const [userInfo] = useRecoilState(resumeState);
  const [disabledShareFirefox, setDisabledShareFirefox] = useState(true);
  const [disabledShareMac, setDisabledShareMac] = useState(true);

  const { data: passcode, refetch } = trpc.useQuery(
    ["fs.resume.getPasscode", { id: userId }],
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (navigator.userAgent.indexOf("Firefox") != -1) {
      setDisabledShareFirefox(false);
    }
    if (navigator.userAgent.indexOf("Mac") != -1) {
      setDisabledShareMac(false);
    }
  }, []);

  const shareProfile = async () => {
    refetch();
    const privateLink = passcode
      ? `${location.origin}/r/${userInfo.handle}?passcode=${passcode}`
      : `${location.origin}/r/${userInfo.handle}`;

    if (navigator.share) {
      navigator.share({
        title: t("title"),
        text: t("quote"),
        url: privateLink,
      });
    }
  };

  return (
    <div>
      <div className="-mr-2 flex items-center sm:hidden gap-3">
        <Link href="/search" passHref>
          <div className="app-bar-btn flex md:gap-3 text-sm">
            <span className="hidden md:block">{t("search")}</span>
            <SearchIcon className="w-5 h-5" />
          </div>
        </Link>
        {status === "authenticated" &&
          disabledShareFirefox &&
          disabledShareMac && (
            <ShareIcon className="w-5 h-5" onClick={shareProfile} />
          )}
        <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          <span className="sr-only">Open main menu</span>
          {disclosureOpen ? (
            <XIcon
              className="block h-6 w-6"
              aria-hidden="true"
              onClick={() => setDisclosureButton(false)}
            />
          ) : (
            <MenuIcon
              className="block h-6 w-6 text-black"
              aria-hidden="true"
              onClick={() => setDisclosureButton(true)}
            />
          )}
        </Disclosure.Button>
      </div>
    </div>
  );
};

export default DisclosureButtons;
