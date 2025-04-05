import {
  leetLinkBioState,
  leetLinkHeaderState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { CardTitle } from "shadcn/components/ui/card";
import { Input } from "shadcn/components/ui/input";

const BioAndHeader = () => {
  const t = useTranslations("LeetLink");
  const [userId] = useRecoilState(userIdState);
  const [header, setHeader] = useRecoilState(leetLinkHeaderState);
  const [bio, setBio] = useRecoilState(leetLinkBioState);
  const { status } = useSession();

  const setBioAndHeader = trpc.useMutation(["fs.leetLink.updateBioAndHeader"]);

  const { data: leetLinks } = trpc.useQuery(
    ["fs.leetLink.getLeetLink", { id: userId }],
    {
      enabled: status === "authenticated" && !!userId,
    }
  );

  useEffect(() => {
    if (leetLinks?.header) {
      setHeader(leetLinks.header);
    } else {
      setHeader("Check out my socials!");
    }
    if (leetLinks?.bio) {
      setBio(leetLinks.bio);
    } else {
      setBio("Delighted to be connecting with you!");
    }
  }, [leetLinks]);

  useEffect(() => {
    if (bio && header) {
      const timeoutId = setTimeout(() => {
        setBioAndHeader.mutate({
          id: userId,
          header,
          bio,
        });
      }, 2500);

      return () => clearTimeout(timeoutId);
    }
  }, [bio, header]);

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        <CardTitle>{t("bio")}</CardTitle>
        <div>
          <textarea
            value={bio ?? ""}
            cols={4}
            onChange={(e) => setBio(e.target.value)}
            maxLength={80}
            spellCheck={true}
            className="block text-sm w-full border-gray-300 rounded-md"
            placeholder={t("bioExample")}
          />
          <div className="flex justify-end pt-1 pr-1">
            <small>{bio?.length || 0}/80</small>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <CardTitle>{t("header")}</CardTitle>
        <div>
          <Input
            type="text"
            value={header ?? ""}
            onChange={(e) => setHeader(e.target.value)}
            maxLength={35}
            className="border-gray-300 py-2"
            placeholder={t("headerExample")}
          />
          <div className="flex justify-end pt-1 pr-1">
            <small>{header?.length || 0}/35</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default BioAndHeader;
