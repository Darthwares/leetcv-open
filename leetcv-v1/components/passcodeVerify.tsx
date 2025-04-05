import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import OtpInput from "react-otp-input";
import { profileResumeState } from "@state/state";
import { useSetRecoilState } from "recoil";

function PasscodeVerify() {
  const t = useTranslations("PasscodeVerify");
  const setProfileResume = useSetRecoilState(profileResumeState);
  const [otp, setOtp] = useState<string>("");
  const [errorIndicator, setErrorIndicator] = useState<boolean>(false);
  const router = useRouter();
  const { handle } = router.query;
  const passcode = Number(otp);
  const { data: resume } = trpc.useQuery([
    "fs.profile.getResume",
    passcode
      ? {
          handle: handle as string,
          passCode: passcode,
        }
      : { handle: handle as string },
  ]);
 
  useEffect(() => {
    if (otp.length === 6 && resume) {
      return setProfileResume(resume);
    }
    setTimeout(() => {
      if (otp.length > 5 && !resume) {
        return setErrorIndicator(true);
      }
    }, 1000);
  }, [otp, resume]);

  return (
    <div data-testid="passcodeVerify">
      <span className="text-sm text-gray-500 w-full pb-3">
        {t("enter6digit")}
      </span>
      <div className="pt-2">
        <OtpInput
          value={otp}
          shouldAutoFocus={true}
          inputType="number"
          onChange={setOtp}
          renderInput={(props) => <input {...props} />}
          renderSeparator={<span style={{ width: "8px" }}></span>}
          numInputs={6}
          inputStyle={{
            width: "2.8rem",
            border: errorIndicator ? "1px solid red" : "1px solid gray",
            borderRadius: "5px",
          }}
        />
      </div>
      {errorIndicator && (
        <p className="text-red-500 pt-1.5 text-sm">{t("verifyPasscode")}</p>
      )}
    </div>
  );
}
export default PasscodeVerify;
