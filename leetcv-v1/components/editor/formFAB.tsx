import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import {
  DocumentTextIcon,
  EyeIcon,
  PencilAltIcon,
  ShareIcon,
  GiftIcon,
  DotsVerticalIcon,
} from "@heroicons/react/outline";
import { Fab, Action } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";
import Spinner from "@components/spinner";
import dynamic from "next/dynamic";
import {
  savingState,
  openReferralModelState,
  showFabSelector,
  shareProfileModalState,
} from "@state/state";
import { defaultFormFabTour, getTourConfig } from "@lib/helper/tourConfig";
import { useAutoSave } from "@lib/helper/useAutoSave";

const Stepper = dynamic(() => import("../onboarding"), {
  ssr: false,
});

export default function FormFAB() {
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(savingState);
  const [save, setSave] = useState(false);
  const [showReferralModal, setShowReferralModal] = useRecoilState(
    openReferralModelState
  );
  const t = useTranslations("FormFAB");
  const showFab = useRecoilValue(showFabSelector);
  const { handleAutoSave } = useAutoSave();
  const title =
    window.location.pathname === "/s/resume" ? t("editResume") : t("preview");
  const tour = getTourConfig();
  const setShareProfileModal = useSetRecoilState(shareProfileModalState);

  const steps = [
    {
      target: ".preview",
      content: t("previewButton"),
    },
  ];

  useEffect(() => {
    defaultFormFabTour();
  }, []);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSave(true);
    }, 1000);
  };

  const shareProfile = () => {
    setShareProfileModal(true);
  };

  return (
    <>
      {tour.formFab === "false" && <Stepper tourConfig={steps} />}

      {showFab && (
        <div
          data-testid="formFAB"
          className="sticky bottom-1 left-[100%] z-20 max-w-fit pr-2 print:hidden"
        >
          {typeof window !== undefined && (
            <span
              data-testid="Fab"
              className="sticky bottom-10 left-[100%] flex flex-col justify-end items-end max-w-fit"
            >
              {router.pathname === "/s/resume" && (
                <div className="hidden md:block" data-testid="fabTinyBtn">
                  <Fab
                    icon={<DotsVerticalIcon className="w-5 h-5" />}
                    alwaysShowTitle={false}
                  >
                    <Action
                      text={t("refer")}
                      onClick={() => setShowReferralModal(!showReferralModal)}
                    >
                      <GiftIcon className="w-5 h-5" />
                    </Action>
                    <Action text={t("share")} onClick={shareProfile}>
                      <ShareIcon className="w-5 h-5 " />
                    </Action>
                  </Fab>
                </div>
              )}

              <button
                className="rounded-full md:rounded-md py-1 px-2 mb-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                data-testid="action-buttons"
                title={title}
                onClick={() => {
                  router.pathname === "/s/resume"
                    ? router.push("/s/resumeEditor")
                    : router.push("/s/resume");
                }}
              >
                <div data-testid="fabButton">
                  {window.location.pathname === "/s/resumeEditor" ? (
                    <div
                      onClick={() => {
                        try {
                          handleAutoSave();
                        } catch (error: any) {
                          console.error("Auto-save failed: ", error.message);
                        }
                      }}
                      className="flex gap-1 items-center text-sm md:text-base w-full p-0 justify-center preview"
                    >
                      <EyeIcon
                        className="h-5 md:h-6"
                        data-testid="documentText"
                      />
                      <span className="">{t("preview")}</span>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center w-full text-sm md:text-base p-0 justify-center">
                      <PencilAltIcon className="h-5 md:h-6" />
                      <span className="">{t("editResume")}</span>
                    </div>
                  )}
                </div>
              </button>

              {router.pathname === "/s/resumeEditor" && (
                <button
                  data-testid="saveFabBtn"
                  onClick={handleClick}
                  title={save ? t("saved") : t("save")}
                  className="relative rounded-full md:rounded-md py-1 px-2 mb-5 cursor-pointer bg-indigo-600 hover:bg-indigo-600 text-white "
                >
                  <div>
                    <>
                      {loading && <Spinner />}
                      {!loading && (
                        <div className="flex justify-center w-full">
                          <div className="flex items-center justify-center text-sm md:text-base w-full gap-1">
                            <DocumentTextIcon className="h-5 md:h-6" />
                            <span>{save ? t("saved") : t("save")}</span>
                          </div>
                        </div>
                      )}
                    </>
                  </div>
                  {loading && (
                    <span className="absolute -right-1 -top-1 inline-flex rounded-full h-3 w-3 bg-blue-600 animate-ping" />
                  )}
                </button>
              )}
            </span>
          )}
        </div>
      )}
    </>
  );
}
