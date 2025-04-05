import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  claimHandleState,
  resumeState,
  selectedHandleState,
  selectedStatusState,
  showButtonToggleState,
  specialCharNotAllowed,
  userIdState,
} from "@state/state";
import { trpc } from "../../utils/trpc";

export interface ExclamationCircleProps {
  color: string;
  response: string;
}

const ExclamationCircle = ({ color, response }: ExclamationCircleProps) => {
  return (
    <>
      <ExclamationCircleIcon
        className={`${color} transform h-5 w-5 text-white-500 hover:text-white-800 mr-2`}
      />
      <span className={`${color}`}>{response}</span>
    </>
  );
};

const SelectedHandle = () => {
  const notifyUsernameClaimSuccess = () => toast.success("Claimed Username");
  const [userId] = useRecoilState(userIdState);
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const t = useTranslations("UserName");
  const [handleName, setHandleClaim] = useRecoilState(selectedHandleState);
  const [status] = useRecoilState(selectedStatusState);
  const toggleButton = useSetRecoilState(showButtonToggleState);
  const [isDisabled] = useRecoilState(claimHandleState);
  const [notAllowed] = useRecoilState(specialCharNotAllowed);

  const create = trpc.useMutation("fs.handle.create");

  function updatedUsername() {
    if (handleName === "") {
      toast.error(t("emptyHandle"));
    } else if (!isDisabled && !notAllowed) {
      toggleButton(false);
      create.mutate({
        handle: handleName,
        id: userId,
        currentHandle: userInfo.handle,
      });
      setUserInfo({
        ...userInfo,
        handle: handleName,
      });
      notifyUsernameClaimSuccess();
    }
  }

  return (
    <div className=" items-center space-y-5 justify-between">
      <div className="flex items-center">
        <label
          htmlFor="remember-me"
          className="ml-2 text-sm text-gray-900 flex items-center"
        >
          {handleName ? (
            <>
              {isDisabled && (
                <ExclamationCircle
                  color="text-red-600"
                  response={t("spacesNotAllowed")}
                />
              )}

              {notAllowed && (
                <ExclamationCircle
                  color="text-red-600"
                  response={t("specialCharacterNotAllowed")}
                />
              )}

              {status === "exists" && !notAllowed && (
                <ExclamationCircle
                  color="text-red-600"
                  response={t("exists")}
                />
              )}

              {status === "available" && !notAllowed && !isDisabled && (
                <ExclamationCircle
                  color="text-green-600"
                  response={t("available")}
                />
              )}
            </>
          ) : (
            <span className="text-sm text-left pt-1">{t("userNameHint")}</span>
          )}
        </label>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
            status === "available" &&
            !notAllowed &&
            !isDisabled &&
            handleName !== ""
              ? "text-white bg-indigo-600 hover:bg-indigo-700"
              : "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed pointer-events-none"
          }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={(e) => {
            e.preventDefault();
            if (status !== "available") {
              return;
            }
            updatedUsername();
            setHandleClaim("");
          }}
        >
          {t("claimButton")}
        </button>
      </div>
    </div>
  );
};

export default SelectedHandle;
