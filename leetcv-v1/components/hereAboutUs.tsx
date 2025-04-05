import React, { useEffect, useState } from "react";
import ReUsableFeedbackModal from "./reUsableFeedbackModal";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { tokenCountState, userIdState } from "@state/state";
import HearAboutUsOptions from "./hearAboutUsOptions";
import { options } from "@constants/defaults";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const HereAboutUs = () => {
  const { status } = useSession();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [othersInput, setOthersInput] = useState("");
  const t = useTranslations("ResumeEditor");
  const [userId] = useRecoilState(userIdState);
  const [tokens] = useRecoilState(tokenCountState);
  const router = useRouter();
  const { pathname } = router;

  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);
  const setReferralSource = trpc.useMutation(["fs.referralSource.create"]);

  const shouldFetch =
    status === "authenticated" && !!userId && pathname !== "/";

  const { data: handle } = trpc.useQuery(
    ["fs.waitList.getHandle", { id: userId }],
    {
      enabled: shouldFetch,
    }
  );

  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userId, handle }],
    {
      enabled: shouldFetch && !!handle,
    }
  );

  const { data: referralSource } = trpc.useQuery(
    ["fs.referralSource.getReferralSource", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (referralSource) {
      setOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [referralSource]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedOption === "Choose one") {
      toast.error(t("chooseOne"));
      return;
    }

    if (selectedOption === "Others") {
      if (!othersInput) {
        toast.error(t("provideValidInfo"));
        return;
      }
      setReferralSource.mutate({
        id: userId,
        source: othersInput,
      });
    } else {
      setReferralSource.mutate({
        id: userId,
        source: selectedOption,
      });
    }

    toast.success(t("submitted"));
    setOpen(false);

    let newTokenCount = tokens + 200;
    return setTokens.mutate(
      {
        count: newTokenCount,
        handle: handle,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <ReUsableFeedbackModal open={open} handleClose={() => setOpen(false)}>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900 flex flex-col items-center justify-center mt-4"
      >
        <div className="w-80 md:w-96 bg-[#4b008205] mb-6">
          <lottie-player
            src={`/assets/lottie/social-media.json`}
            speed="1"
            loop
            autoplay
            data-testid="lottie"
          />
        </div>
        <p className="mt-2 text-lg text-center mb-1">{t("howDidYou")} </p>
        <p className="text-gray-600 text-sm mb-2">{t("getTokens")}</p>
      </Dialog.Title>
      <form onSubmit={handleSubmit}>
        <HearAboutUsOptions
          selected={selectedOption}
          setSelected={setSelectedOption}
        />
        {selectedOption === "Others" && (
          <div className="relative mt-4">
            <label
              htmlFor="others"
              className="font-medium text-sm text-gray-600"
            >
              {t("others")}
            </label>
            <input
              id="others"
              type="text"
              className="peer block w-full border-0 bg-gray-50 py-1.5 -mt-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
              value={othersInput}
              onChange={(e) => setOthersInput(e.target.value)}
              placeholder="e.g. naukri"
            />
            <div
              className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
              aria-hidden="true"
            />
          </div>
        )}
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full mt-5"
        >
          {t("submit")}
        </button>
      </form>
    </ReUsableFeedbackModal>
  );
};

export default HereAboutUs;
