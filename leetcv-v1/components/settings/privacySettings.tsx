import { LightBulbIcon } from "@heroicons/react/outline";
import { resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import React from "react";
import Switch from "react-switch";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { useProgressPercent } from "@utils/progressPercent";

const PrivacySettings = () => {
  const t = useTranslations("UserName");
  const [userId] = useRecoilState(userIdState);
  const [userInfo] = useRecoilState(resumeState);
  const { result } = useProgressPercent();
  const mutation = trpc.useMutation(["fs.privacy.update"]);
  const setResume = trpc.useMutation(["fs.publicResume.setResume"]);
  const removePublicUserId = trpc.useMutation([
    "fs.publicResume.removePublicUserId",
  ]);
  const {
    data: requests,
    refetch,
    isLoading,
  } = trpc.useQuery(["fs.privacy.get", { id: userId }]);
  const [resume] = useRecoilState(resumeState);

  const handleChange = (e: boolean) => {
    mutation.mutate(
      {
        id: userId,
        private: e ? true : false,
      },
      {
        onSuccess: () => {
          return refetch();
        },
      }
    );
    e ? toast.success(t("profilePrivate")) : toast.success(t("profilePublic"));
    e &&
      removePublicUserId.mutate({
        handle: resume.handle,
      });
  };

  return (
    <div className="flex flex-col min-h-[60vh] space-y-2 px-3 mt-6 lg:mt-0 lg:py-8 gap-2">
      <h2 className="text-xl text-gray-700 font-bold">
        {t("privacySettings")}
      </h2>
      <p className="max-w-xl xl:max-w-5xl">{t("resumePrivacyDescription")}</p>
      <div className="w-full xl:max-w-5xl relative top-4">
        <div className="rounded-2xl bg-indigo-50 p-5 md:px-1 md:py-5">
          <div className="md:px-[30px]">
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex items-center w-full">
                <div className="flex items-center gap-1.5 sm:gap-3 max-w-fit">
                  <Switch
                    onChange={(e: boolean) => handleChange(e)}
                    height={20}
                    width={40}
                    disabled={isLoading}
                    checked={requests?.private ?? false}
                  />
                  <span className="font-semibold">
                    {requests?.private ? t("private") : t("public")}
                  </span>
                </div>

                {result === 100 && (
                  <div className="flex items-center gap-2 justify-end w-full">
                    <button
                      className={` ${
                        requests?.private
                          ? "bg-indigo-300 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700  "
                      } px-2 sm:px-4 py-2 text-sm max-w-fit capitalize font-medium rounded-md border border-transparent text-white`}
                      onClick={() => {
                        !requests?.private &&
                          setResume.mutate({
                            handle: userInfo.handle,
                            id: userId,
                          });
                        !requests?.private &&
                          toast.success("Resume under review");
                      }}
                    >
                      {t("showcaseResume")}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-start gap-2 mt-4">
              <p>
                <LightBulbIcon className="w-5 text-purple-500" />
              </p>
              <p className="text-gray-600 text-[15px] ">
                {requests?.private ? t("privacy") : t("publicDescription")}
              </p>
            </div>
            {result === 100 && (
              <div>
                <div className="flex items-start gap-2 mt-3">
                  <p>
                    <LightBulbIcon className="w-5 text-purple-500" />
                  </p>
                  <p className="text-[15px]">{t("completedResumes")}</p>
                </div>
                <div className="flex items-start gap-2  mt-3">
                  <p>
                    <LightBulbIcon className="w-5 text-purple-500" />
                  </p>
                  <p className="text-[15px]">{t("successfulCompletion")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;
