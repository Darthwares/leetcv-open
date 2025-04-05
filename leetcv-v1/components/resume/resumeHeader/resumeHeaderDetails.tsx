import {
  BriefcaseIcon,
  CalendarIcon,
  GlobeAltIcon,
  LocationMarkerIcon,
  MailIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  StarIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import {
  blurState,
  profileResumeState,
  resumeFontState,
  resumeState,
  showMyReview,
  viewCounterState,
} from "@state/state";
import MyReviews from "../review/myReviews";
import { useRouter } from "next/router";
import QrCode from "./qrCode";
import { generateValidHref, validPaths } from "@constants/defaults";

export const ResumeHeaderDetails = () => {
  const t = useTranslations("PersonalSection");
  const [resume] = useRecoilState(profileResumeState);
  const [userInfo] = useRecoilState(resumeState);
  const [showModal] = useRecoilState(showMyReview);
  const [blurred] = useRecoilState(blurState);
  const router = useRouter();
  const shortNumber = require("short-number");
  const [viewCounter] = useRecoilState(viewCounterState);
  const path = location.pathname;
  const isCorrectPath = validPaths.includes(path);
  const [font] = useRecoilState(resumeFontState);

  const [localPart, domain] = resume.email.split("@");
  const firstThreeChars = localPart.substring(0, 3);
  const restOfLocalPart = localPart.substring(3);

  return (
    <div data-testid="resumeHeader" className="flex flex-col">
      <div
        className={`${
          (userInfo.hiddenImage && userInfo.hiddenQrCode) ||
          (resume.hiddenImage && resume.hiddenQrCode)
            ? "mt-16 md:mt-0"
            : "mt-4"
        } px-4 flex flex-col md:flex-row items-start justify-between lg:mt-0`}
      >
        <div className="min-w-0 print:max-w-xs flex-1 block pr-2 space-y-0.5">
          {resume.displayName && (
            <h2
              className={`text-xl md:text-4xl print:text-2xl line-clamp-2 whitespace-normal ${font.className} font-extrabold my-2 md:my-0`}
            >
              {resume.displayName}
            </h2>
          )}
          {resume.position && (
            <div className="flex gap-2 items-start md:pt-0 md:mt-3">
              <p className="pt-0.5">
                <BriefcaseIcon className="w-5 text-gray-500" />
              </p>
              <p className={`${font.className} line-clamp-2 whitespace-normal`}>
                {resume.position}{" "}
                {resume.currentCompany && (
                  <>
                    {t("at")} {resume.currentCompany}
                  </>
                )}
              </p>
            </div>
          )}
          <div>
            {resume.address && (
              <div className="flex gap-2">
                <p className="pt-0.5">
                  <LocationMarkerIcon className="w-5 text-gray-500" />
                </p>
                <p
                  className={`break-words line-clamp-2 max-w-sm ${font.className}`}
                >
                  {resume.address}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-row items-center gap-3">
            {resume.remoteWork !== "None" && (
              <div className="flex gap-2">
                <OfficeBuildingIcon className="w-5 text-gray-500" />
                <span className={`${font.className}`}>
                  {resume.remoteWork === "Both" ? "Hybrid" : resume.remoteWork}
                </span>
              </div>
            )}
            {resume.dob && (
              <div
                className={`flex gap-2 items-center pt-0.5 md:pt-0 ${font.className}`}
              >
                <CalendarIcon className="w-5 text-gray-500" />
                {resume.dob}
              </div>
            )}
          </div>

          <div
            className="flex w-full md:space-x-6 space-y-3 lg:flex-row lg:justify-between"
            data-testid="checkDetails"
          >
            <div className="flex flex-col gap-2 md:px-0 md:gap-5 lg:flex-row">
              <div
                className={`flex flex-col md:flex-row lg:flex-col lg:gap-0 xl:flex-row xl:gap-3 md:gap-3`}
              >
                {resume?.phoneNumber && (
                  <button
                    onClick={() =>
                      isCorrectPath && window.open(`tel:${resume?.phoneNumber}`)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        window.open(`tel:${resume?.phoneNumber}`);
                      }
                    }}
                    className={`${
                      !isCorrectPath && "pointer-events-none"
                    } flex items-center gap-2`}
                    tabIndex={0}
                  >
                    <span>
                      <PhoneIcon className="w-5 text-gray-500" />
                    </span>
                    {!isCorrectPath && (blurred || router.pathname === "/") ? (
                      <div className={`flex ${font.className}`}>
                        <span className="blur-sm">
                          {resume.phoneNumber.slice(0, -3)}
                        </span>
                        <span>{resume.phoneNumber.slice(-3)}</span>
                      </div>
                    ) : (
                      <p className={`${font.className}`}>
                        {resume.phoneNumber}
                      </p>
                    )}
                  </button>
                )}
                {resume?.email && (
                  <a
                    href={isCorrectPath ? `mailto:${resume?.email}` : undefined}
                    className="flex items-center gap-2 print:mt-1"
                  >
                    <MailIcon className="w-5 text-gray-500" />
                    {!isCorrectPath && (blurred || router.pathname === "/") ? (
                      <p
                        className={`${font.className} print:relative print:-top-0.5`}
                      >
                        <span>{firstThreeChars}</span>
                        <span className="blur-sm">
                          {restOfLocalPart}@{domain}
                        </span>
                      </p>
                    ) : (
                      <p
                        className={`${font.className} break-words print:relative line-clamp-2 print:-top-0.5`}
                      >
                        {resume.email}
                      </p>
                    )}
                  </a>
                )}
              </div>
            </div>
          </div>

          <div>
            {resume?.portfolioLink && (
              <a
                href={resume && generateValidHref(resume.portfolioLink)}
                className="flex items-center gap-2"
              >
                <GlobeAltIcon className="w-5 text-gray-500" />
                <p
                  className={`${font.className} w-60 md:w-96 truncate underline`}
                >
                  {resume.portfolioLink}
                </p>
              </a>
            )}
          </div>
          <>
            {router.pathname !== "/" &&
              router.pathname !== "/s/resume" &&
              router.pathname !== "/s/resumeIdeas" && (
                <div className="flex flex-col md:flex-row md:gap-3 print:hidden">
                  {resume?.followers! > 0 && (
                    <div className="inline-flex items-center gap-2">
                      <UserGroupIcon className="w-5 text-gray-500" />
                      <p>{shortNumber(resume.followers)}</p>
                      <p className={`${font.className}`}>{t("followers")}</p>
                    </div>
                  )}
                  {resume.rating! > 0 && (
                    <div className="inline-flex items-center gap-2">
                      <StarIcon className="w-5 text-gray-500" />
                      <p>{shortNumber(resume.rating)}</p>
                      <p className={`${font.className}`}>{t("stars")}</p>
                    </div>
                  )}
                  {viewCounter! > 0 && (
                    <div className="inline-flex items-center gap-2 print:hidden">
                      <div className="w-5">
                        <lottie-player
                          src="/assets/lottie/views.json"
                          background=""
                          speed="1"
                          loop
                          autoplay
                          className="text-sm text-gray-500"
                        ></lottie-player>
                      </div>
                      <p>{shortNumber(viewCounter)}</p>
                      <p className={`${font.className}`}>{t("views")}</p>
                    </div>
                  )}
                </div>
              )}
          </>
        </div>
        {!resume.hiddenQrCode && <QrCode />}
      </div>
      {showModal && <MyReviews />}
    </div>
  );
};
