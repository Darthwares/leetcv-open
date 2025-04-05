import { Resume } from "data/models/UserInfo";
import { useTranslations } from "next-intl";
import { toast, ToastContainer } from "react-toastify";
import PasscodeVerify from "./passcodeVerify";
import { AVATAR_IMAGE } from "@constants/defaults";
export interface ProfileHeaderProps {
  email: string;
  workType: string;
  lastName: string;
  firstName: string;
  image: string | undefined;
  requestAccess: string;
  profileAccess: string;
  viewResume: string;
  approvedUser: Resume;
  passcodeAvailable: string;
}
export interface ButtonProps {
  onClick: () => void;
  status: string;
}

function ProfileHeader(props: ProfileHeaderProps) {
  const t = useTranslations("ProfileHeader");
  const request = () => toast.success(t("requestSent"));
  const appovedAccess = () => toast.success(t("appovedAccess"));
  const deniedAccess = () => toast.error(t("deniedAccess"));
  const pendingAccess = () => toast.warn(t("pendingAccess"));
  const handleRequest = async () => {
    request();
  };

  const Button = ({ onClick, status }: ButtonProps) => (
    <div>
      <button
        className={`flex items-center px-2 py-1 mt-8 text-sm transition-shadow ${
          !props.passcodeAvailable
            ? "bg-indigo-500 text-white"
            : "bg-white text-black"
        } border-transparent rounded-md ${
          props.passcodeAvailable === "Pending"
            ? "cursor-wait"
            : "cursor-pointer"
        } md:px-3 hover:shadow-lg hover:shadow-indigo-300 hover:ring-1 border-[2px] border-indigo-200 hover:ring-indigo-400 md:text-lg shadow-indigo-300`}
        onClick={onClick}
      >
        {props.passcodeAvailable === t("pending") ? t("pending") : status}
      </button>
    </div>
  );

  return (
    <div
      data-testid="profileHeaderId"
      className="bg-white rounded-lg shadow md:px-4 px-2 mx-auto max-w-5xl sm:px-4 lg:px-8 w-full"
    >
      <div className="bg-white md:p-6">
        <div className="flex flex-col justify-center items-center">
          <div className="sm:flex flex-col lg:flex-row sm:space-x-5 items-center border-b-2 border-gray-300 pb-12">
            <div className=" flex flex-shrink-0 mx-auto justify-center items-center">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src={props.image ?? AVATAR_IMAGE}
                referrerPolicy="no-referrer"
                alt={`${props.firstName} ${props.lastName}`}
              />
            </div>

            <div className="w-full mx-auto mt-4 text-center sm:mt-0 sm:pt-1 lg:text-left">
              <p className="text-xl font-bold text-gray-900 sm:text-2xl whitespace-nowrap">
                {props.firstName} {props.lastName}
              </p>
              <p className="mt-0 text-sm font-semibold text-red-400 whitespace-nowrap ">
                {props.profileAccess}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center justify-center mt-5 sm:mt-5 whitespace-nowrap relative bottom-[0.5rem]">
            <div>
              {props.passcodeAvailable === t("approved") && (
                <Button onClick={appovedAccess} status={t("approved")} />
              )}
              {props.passcodeAvailable === t("denied") && (
                <Button onClick={deniedAccess} status={t("denied")} />
              )}
              {props.passcodeAvailable === t("pending") && (
                <Button onClick={pendingAccess} status={t("loading")} />
              )}

              {!props.passcodeAvailable && (
                <div>
                  <button
                    className={`flex items-center px-2 py-1 text-sm transition-shadow ${
                      !props.passcodeAvailable
                        ? "bg-indigo-500 text-white"
                        : "bg-white text-black"
                    } border-transparent rounded-md ${
                      props.passcodeAvailable === "Pending"
                        ? "cursor-wait"
                        : "cursor-pointer"
                    } md:px-3 hover:shadow-lg hover:shadow-indigo-300 hover:ring-1 border-[2px] border-indigo-200 hover:ring-indigo-400 md:text-lg shadow-indigo-300`}
                    onClick={handleRequest}
                  >
                    {t("requestAccess")}
                    {props.passcodeAvailable === t("pending") && t("pending")}
                  </button>
                </div>
              )}
            </div>

            <div className="border-r-[1px] h-full border-black" />
            <PasscodeVerify />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileHeader;
