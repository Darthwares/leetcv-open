import React, { useState } from "react";
import { ShareIcon, GiftIcon } from "@heroicons/react/outline";
import { referralCode, userIdState } from "@state/state";
import { useRecoilState } from "recoil";
import { ToastContainer, toast } from "react-toastify";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import ReferStats from "./referStats";
import ShowSharableLinks from "./showSharableLinks";

type ReferralCodeProps = {
  showReferralModal?: boolean;
};

const ReferralCode = ({ showReferralModal }: ReferralCodeProps) => {
  const [showInputBox, setShowInputBox] = useState(true);
  const [showSharableLink, setShowSharableLink] = useState(false);
  const [isReferralCode] = useRecoilState(referralCode);
  const [userId] = useRecoilState(userIdState);
  const [enteredReferralURL, setEnteredReferralURL] = useState("");
  const t = useTranslations("Referral");
  const [errorMsg, setErrorMsg] = useState("");

  const setReferralCode = trpc.useMutation(["fs.refer.setReferralCode"], {
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(t("referralCodeSetSuccessfully"));
    },
  });

  const handleRedeem = () => {
    try {
      if (!enteredReferralURL) {
        return setErrorMsg(t("provideLink"));
      }

      const url = new URL(enteredReferralURL);
      const referValue = url.searchParams.get("refer");
      const userHandle = url.searchParams.get("handle");

      if (enteredReferralURL && userId && referValue && userHandle) {
        setReferralCode.mutate({
          id: userId,
          referralCode: referValue,
          handle: userHandle,
        });
        setErrorMsg("");
        setEnteredReferralURL("");
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(t("invalidLink"));
    }
  };

  return (
    <div
      className={`${
        showReferralModal ? "pb-0" : "space-y-4 px-3 mt-6 lg:mt-0 lg:py-8"
      }`}
    >
      {!showReferralModal && (
        <>
          <h2 className="text-xl text-gray-700 font-bold">
            {t("referralCode")}
          </h2>
          <p className="max-w-5xl">{t("referralCodeDescription")}</p>
        </>
      )}
      <div
        className={`bg-indigo-600 dark:bg-gray-900 bg-opacity-70 text-white p-3 ${
          showReferralModal ? "lg:p-4" : "lg:p-6"
        } rounded-lg shadow-lg w-full max-w-5xl referral`}
      >
        <div className="flex justify-between px-2 pt-2 sm:pt-0 sm:border-b-2 border-white items-center">
          <div
            className={`${
              showReferralModal && "mt-8 md:mt-4 lg:mt-0"
            } space-y-1`}
          >
            <p className="text-gray-100">{t("youAndYourColleague")}</p>
            <h3 className="font-bold text-xl">{t("referralTokens")}</h3>
          </div>
          <div className="hidden sm:block">
            <img
              src="/assets/gift.gif"
              className="w-[10rem] h-[8rem] rounded-md"
              alt="LeetCV Referrals"
            />
          </div>
        </div>
        <div className="my-4 sm:my-5 px-2">
          {!showReferralModal && (
            <h2 className="my-2 font-bold text-lg tracking-wide">
              {t("referralCode")}
            </h2>
          )}
          {!showReferralModal && (
            <div className="flex sm:flex-row flex-col w-full items-center gap-2">
              <div className="dash-line max-w-sm justify-between w-full h-10 md:h-12 rounded-md font-semibold text-lg flex px-3 items-center">
                <span className="tracking-wide sm:tracking-[0.5rem]">
                  {isReferralCode}
                </span>
                {showInputBox && (
                  <div className="relative group">
                    <ShareIcon
                      className="h-6 w-6 cursor-pointer"
                      onClick={() => {
                        setShowSharableLink(true);
                        setShowInputBox(false);
                      }}
                    />
                    <span className="absolute bottom-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
                      {t("share")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-4">
            {showInputBox && !showReferralModal && (
              <div className="relative overflow-hidden rounded-lg bg-white text-gray-600 px-4 py-5 shadow sm:px-6">
                <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <p className="text-gray-500 font-medium">
                      {t("enterRedeemableLink")}
                    </p>
                    <div className="flex gap-2 w-full lg:flex-row lg:items-start flex-col">
                      <div>
                        <input
                          type="text"
                          id="redeemCodeInput"
                          className="border p-2 w-full sm:w-96 rounded-md"
                          placeholder={t("placeHolder")}
                          value={enteredReferralURL}
                          onChange={(e) =>
                            setEnteredReferralURL(e.target.value.trim())
                          }
                        />
                        {errorMsg && (
                          <p className="text-red-500 text-xs font-semibold ml-1 mt-1">
                            {errorMsg}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleRedeem}
                          className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-300 max-w-fit text-sm font-medium text-white md:px-3 md:py-2.5 p-2 rounded-md flex items-center gap-1.5"
                        >
                          {t("redeem")}
                          <GiftIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {showReferralModal && <ShowSharableLinks />}
            {showSharableLink && <ShowSharableLinks />}
          </div>
          {showSharableLink && (
            <div className="flex gap-0.5 lg:gap-2 mt-3 lg:flex-row flex-col">
              <p className="text-gray-50">{t("haveAnyReferralCode")}</p>
              <button
                className="mb-3 max-w-fit cursor-pointer hover:text-yellow-300 transition ease-in-out delay-150 text-white duration-300 underline font-semibold"
                onClick={() => {
                  setShowInputBox(true);
                  setShowSharableLink(false);
                  setErrorMsg("");
                }}
              >
                {t("redeemReferral")}
              </button>
            </div>
          )}
          <div className="mt-5 lg:mt-4 grid grid-cols-1 gap-4 lg:gap-5 lg:grid-cols-2">
            <ReferStats />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ReferralCode;
