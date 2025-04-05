import { SyncSvg } from "@components/svg";
import { convertLanguages } from "@constants/defaults";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { useAutoSave } from "@lib/helper/useAutoSave";
import { resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState } from "recoil";

const SyncApp = () => {
  const { handleAutoSave } = useAutoSave();
  const t = useTranslations("SyncApp");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);

  useEffect(() => {
    handleAutoSave();
  }, [userInfo]);

  return (
    <div className="space-y-3 px-3 mt-6 lg:mt-0 lg:py-8 min-h-[60vh]">
      <h2 className="text-xl text-gray-700 font-bold">{t("sync")}</h2>
      <p className="max-w-5xl">{t("syncDescription")}</p>
      <div className="w-full relative top-4 md:-mt-4 lg:-mt-6 max-w-5xl">
        <div className="w-full rounded-2xl">
          <div className="md:py-[20px] gap-5 flex flex-col">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    {t("sync")}
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <ul className="list-disc leading-6">
                      <li>{t("selectSync")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-start gap-2 md:justify-end lg:justify-start">
            <button
              className="edit relative inline-flex gap-1.5 items-center px-4 mt-4 md:mt-0 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                if (
                  userInfo?.languages &&
                  userInfo.languages.every((lang) => typeof lang === "string")
                ) {
                  const updatedLanguages = convertLanguages(userInfo.languages);
                  setUserInfo({
                    ...userInfo,
                    languages: updatedLanguages,
                  });
                }
                toast(t("updated"));
              }}
            >
              <SyncSvg />
              {t("syncNow")}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SyncApp;
