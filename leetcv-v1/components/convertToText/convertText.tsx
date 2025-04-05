import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  fetchingTextState,
  hasFileState,
  profileResumeState,
  resumeConversionState,
  resumeState,
  sideBarOpenState,
  tokenCountState,
  userIdState,
} from "@state/state";
import { toast } from "react-toastify";
import Stepper from "./stepper";
import { useTranslations } from "next-intl";
import {
  MAX_SIZE_IN_BYTES,
  allowedTypes,
  convertApi,
  defaultImage,
  defaultResumeValues,
  ensureAwards,
  ensureCertificates,
  ensureCourses,
  ensureEducations,
  ensureExperiences,
  ensureLanguages,
  ensurePatents,
  ensureProjectsWork,
  ensurePublications,
  ensureSocialMedia,
} from "@constants/defaults";
import { trpc } from "@utils/trpc";
import { fetchPostJSON } from "@lib/stripe/helper";
import ReusableHeroBanner from "@components/reusableHeroBanner";
import { Resume } from "data/models/UserInfo";
import FetchingText from "./fetchingText";
import ConvertError from "./convertError";
import ConvertGuideList from "./convertGuideList";
import ConvertInfoSlider from "./convertInfoSlider";
import OpenLinkedinButton from "./openLinkedinButton";
import ReusableVideoCard from "@components/reusableVideoCard";
import ConvertFileInput from "./convertFileInput";
import TokensLeft from "@components/waitList/tokensLeft";
import useManageToken from "@lib/helper/useManageToken";

const ConvertText = () => {
  const [file, setFile] = useState<File | string>();
  const [fileType, setFileType] = useState("");
  const [resume, setResume] = useRecoilState(profileResumeState);
  const [userInfo] = useRecoilState(resumeState);
  const [hasFile, setHasFile] = useRecoilState(hasFileState);
  const [userId] = useRecoilState(userIdState);
  const [fetchingText, setFetchingText] = useRecoilState(fetchingTextState);
  const setResumeConvert = useSetRecoilState(resumeConversionState);
  const [error, setError] = useState(false);
  const t = useTranslations("Convert");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tokens] = useRecoilState(tokenCountState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const { deductToken } = useManageToken();

  const { data: handle } = trpc.useQuery([
    "fs.waitList.getHandle",
    { id: userId },
  ]);

  const setConversion = trpc.useMutation(["fs.feedback.setConversion"]);

  async function convertResume() {
    try {
      if (tokens < 1000) {
        return;
      }
      if (!file || !fileType) {
        return;
      }
      const params = convertApi.createParams();
      params.add("file", file);
      params.add("outputformat", fileType);
      let result = await convertApi.convert(fileType, "txt", params);
      let url = result.files[0].Url;
      const response = await fetch(url);
      const extractedResume = await response.text();

      const resp = await fetchPostJSON("/api/openai/convertResume", {
        resume: extractedResume,
      });

      const resumeObject = await JSON.parse(resp.resume!);

      if (resumeObject) {
        const newResume: Resume = {
          ...resumeObject,
          id: userInfo.id,
          handle,
          private: userInfo.private,
          image: defaultImage(userInfo.id),
          version: "1.0",
          remoteWork: "Office",
          rating: 0,
          followers: 0,

          address: resumeObject.address ?? defaultResumeValues.address,
          currentCompany:
            resumeObject.currentCompany ?? defaultResumeValues.currentCompany,
          position: resumeObject.position ?? defaultResumeValues.position,
          phoneNumber:
            resumeObject.phoneNumber ?? defaultResumeValues.phoneNumber,
          description:
            resumeObject.description ?? defaultResumeValues.description,
          email: resumeObject.email! ?? resume?.email,
          displayName: resumeObject.displayName ?? resume?.displayName,

          causes: resumeObject.causes ?? defaultResumeValues.causes,
          hobbies: resumeObject.hobbies ?? defaultResumeValues.hobbies,
          skills: resumeObject.skills ?? defaultResumeValues.skills,
          portfolioLink:
            resumeObject.portfolioLink ?? defaultResumeValues.portfolioLink,
          preferences:
            resumeObject.preferences ?? defaultResumeValues.preferences,
          projects: ensureProjectsWork(resumeObject.projects ?? []),
          socialMedia: ensureSocialMedia(resumeObject.socialMedia ?? []),
          patents: ensurePatents(resumeObject.patents ?? []),
          languages: ensureLanguages(resumeObject.languages ?? []),
          awards: ensureAwards(resumeObject.awards ?? []),
          courses: ensureCourses(resumeObject.courses ?? []),
          certificates: ensureCertificates(resumeObject.certificates ?? []),
          educations: ensureEducations(resumeObject.educations ?? []),
          experiences: ensureExperiences(resumeObject.experiences ?? []),
          publications: ensurePublications(resumeObject.publications ?? []),
        };
        setResumeConvert(true);
        setHasFile(false);
        setResume(newResume);

        const updatedDescription = await fetchPostJSON(
          "/api/openai/highlightDescription",
          {
            projects: newResume.projects.map((project) => project.work),
            experiences: newResume.experiences?.map(
              (experience) => experience.description
            ),
          }
        );

        const {
          projects: highlightedProjects,
          experiences: highlightedExperiences,
        } = JSON.parse(updatedDescription.highlightedDescription);

        const updatedProjects = newResume.projects.map((project, index) => ({
          ...project,
          work: highlightedProjects[index] || project.work,
        }));

        const updatedExperiences = newResume.experiences?.map(
          (experience, index) => ({
            ...experience,
            description:
              highlightedExperiences[index] || experience.description,
          })
        );

        const finalResume = {
          ...newResume,
          projects: updatedProjects,
          experiences: updatedExperiences,
        };

        setResume(finalResume);
      }

      setConversion.mutate({
        id: userId,
        status: true,
      });

      deductToken(1000);
    } catch (error) {
      setError(true);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const handleFile = async (file: File) => {
    try {
      if (tokens < 1000) {
        toast.error(t("insufficientTokens"));
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error(t("selectFile"));
        return;
      }

      if (file.size > MAX_SIZE_IN_BYTES) {
        toast.error(t("fileSize"));
        return;
      }

      setFetchingText(true);
      setFile(file);
      setHasFile(!!file);
      setFileType(file.name.split(".").pop() ?? "");
    } catch (error) {
      console.error("Error processing file:", error);
      toast.error("An error occurred while processing the file.");
    }
  };

  useEffect(() => {
    convertResume();
  }, [file, fileType, tokens, handle]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="overflow-hidden py-2 lg:px-1 lg:py-0">
      <div className="relative mx-auto md:px-0 lg:max-w-7xl">
        <ReusableHeroBanner
          title={t("convertYourResume")}
          description={t("transformYourCV")}
          className="px-6 pt-6 pb-2 lg:gap-8 md:pt-10 md:pb-8 lg:pb-10 lg:pt-14 sm:py-8 sm:px-10 md:px-14"
          tokensLeft={<TokensLeft />}
          lottieImage={
            <div className="hidden lg:block lg:w-1/4 h-52 -mt-5">
              <lottie-player
                src="/assets/lottie/file-transfer.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              />
            </div>
          }
        />
        <div className="relative mt-6">
          <div
            className={`lg:flex ${
              isSideBarClosed
                ? "lg:flex-row-reverse"
                : "lg:flex-col-reverse xl:flex-row-reverse"
            } lg:gap-6 xl:gap-8`}
          >
            <div className="xl:flex-1 space-y-3">
              {!hasFile && (
                <>
                  <div className="mb-8 lg:hidden">
                    <ReusableVideoCard
                      src="https://www.youtube.com/embed/H8xKj5n3QnU?si=Tzn9yJxEYpTFCg7n?autoplay=1&mute=1"
                      title={t("howToConvert")}
                    />
                  </div>
                  <div className="block lg:hidden">
                    <ConvertGuideList />
                  </div>
                  <OpenLinkedinButton />
                </>
              )}
              <Stepper file={file!} />
              <div className="mt-10 flex flex-col w-full items-center ">
                {!hasFile && (
                  <ConvertFileInput
                    error={error}
                    hasFile={hasFile}
                    fetchingText={fetchingText}
                    handleFile={handleFile}
                  />
                )}
                {hasFile && (
                  <>
                    {!error && <FetchingText />}
                    {error && <ConvertError />}
                  </>
                )}
              </div>
            </div>
            <div
              className={`${
                hasFile && "bg-indigo-600"
              } xl:flex-1 relative mt-10 w-full h-full rounded-lg flex justify-center lg:col-start-1 lg:mt-3.5`}
            >
              <div className="w-full">
                <section className="outer-container rounded-lg">
                  <div className="carousel-wrapper">
                    <div className={`${hasFile && "bg-indigo-500 text-white"}`}>
                      <div className="slides">
                        <div
                          className={`${
                            hasFile && "carousel-inner"
                          } flex justify-center items-start lg:items-center`}
                        >
                          {hasFile && <ConvertInfoSlider />}
                          {!hasFile && (
                            <div className="hidden w-full lg:block">
                              <ReusableVideoCard
                                src="https://www.youtube.com/embed/H8xKj5n3QnU?si=Tzn9yJxEYpTFCg7n?autoplay=1&mute=1"
                                title={t("howToConvert")}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConvertText;
