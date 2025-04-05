import ReusableHeader from "@components/reusableHeader";
import {
  cleanState,
  fetchingTextState,
  hasFileState,
  profileResumeState,
  resumeConversionState,
  resumeState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function ConfirmResume() {
  const router = useRouter();
  const [userInfo] = useRecoilState(profileResumeState);
  const setResume = useSetRecoilState(resumeState);
  const [cleanResume] = useRecoilState(cleanState);
  const setIsConverted = useSetRecoilState(resumeConversionState);
  const setHasFile = useSetRecoilState(hasFileState);
  const setFetchingText = useSetRecoilState(fetchingTextState);
  const t = useTranslations("Convert");
  const mutation = trpc.useMutation(["fs.resume.update"]);
  const { data: handle } = trpc.useQuery([
    "fs.waitList.getHandle",
    { id: userInfo.id },
  ]);
  return (
    <div className="lg:mt-4 lg:px-2.5">
      <ReusableHeader>
        <div className="flex flex-col justify-between gap-x-8 gap-y-4">
          <div className="max-w-6xl text-sm leading-6 text-gray-900">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {t("areYouSure")}
            </h2>
            <p className="mt-3 text-base md:text-lg">{t("wipedOut")}</p>
          </div>
          <div className="flex flex-none items-center gap-x-5">
            <button
              type="button"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm "
              onClick={() => {
                if (userInfo) {
                  const updatedResume = {
                    ...userInfo,
                    handle,
                  };
                  mutation.mutate(updatedResume);
                  toast.success(t("success"));
                  router.push("/s/resume");
                  setResume(cleanResume);
                  setIsConverted(false);
                  setHasFile(false);
                  setFetchingText(false);
                }
              }}
            >
              {t("confirm")}
            </button>
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-indigo-900"
              onClick={() => {
                setIsConverted(false);
                setHasFile(false);
                setFetchingText(false);
              }}
            >
              {t("dismiss")}
            </button>
          </div>
        </div>
      </ReusableHeader>
      <ToastContainer />
    </div>
  );
}
