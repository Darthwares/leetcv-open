import { Resume } from "data/models/UserInfo";
import { SetterOrUpdater } from "recoil";

export interface ReturnedUserProps {
  data: Resume;
  message: string;
  status: string;
  statusCode: number;
}

export function visitedUser(
  enteredPasscode: string[],
  returnedUser: ReturnedUserProps,
  setVisitedUser: SetterOrUpdater<Resume | undefined>,
  passcodeFailed: () => void,
  passcodeLessThanSix: () => void,
  passcodeNotEntered: () => void,
  setverifiedPasscode: SetterOrUpdater<boolean>
) {
  if (enteredPasscode.join("").length === 0) {
    passcodeNotEntered();
  } else if (enteredPasscode.join("").length < 6) {
    passcodeLessThanSix();
  } else if (returnedUser.status === "failed") {
    passcodeFailed();
  }
  if (returnedUser.status === "success") {
    setVisitedUser(returnedUser.data);
    setverifiedPasscode(true);
  }
}
