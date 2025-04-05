import Container from "@components/container";
import { ResumeView } from "@components/resumeView";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { profileResumeState } from "@state/state";
import { trpc } from "utils/trpc";
import { NextSeo } from "next-seo";
import { UserIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Footer from "@components/home/footer";
import ResumeSkeletonContainer from "@components/resumeSkeletons/resumeSkeletonContainer";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@lib/firebase/initializeFirebase";
import { Resume } from "data/models/UserInfo";
import { openResumeId } from "@constants/defaults";

const ViewResume: NextPage = () => {
  const [profileResume, setProfileResume] = useRecoilState(profileResumeState);
  const t = useTranslations("OpenAIResume");
  const router = useRouter();
  const { status } = useSession();
  const id = router?.query?.resumeID!;
  const mutation = trpc.useMutation(["fs.resume.update"]);
  const { isLoading } = mutation;

  useEffect(() => {
    onSnapshot(doc(db, "openai-resume", `${id}`), (doc) => {
      const data = doc.data();
      if (data) {
        const newResume: Resume = data as Resume;
        setProfileResume(newResume);
        localStorage.setItem(openResumeId, JSON.stringify(id));
      }
    });
  }, [id]);

  return (
    <>
      <NextSeo
        title={"My Resume | LeetCV"}
        description="My resume homepage, showcasing my qualifications and summary of my skills and experience"
        key={"LeetCV, Resume"}
        canonical={`https://www.leetcv.com/openai/resume`}
      />
      <div>
        <Container loading={isLoading}>
          {!profileResume.displayName && <ResumeSkeletonContainer />}
          {profileResume.displayName && (
            <>
              <div className="pt-3 pb-1.5 lg:py-5">
                <div className="mx-auto max-w-7xl">
                  <div className="rounded-lg bg-gradient-to-r from-pink-200 to-indigo-100 p-2 shadow-lg sm:p-3">
                    <div className="flex flex-wrap w-full items-center justify-between">
                      <div className="flex flex-1 items-center">
                        <span className="flex rounded-lg bg-indigo-600 p-2">
                          <UserIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                        <p className="ml-3 font-medium">
                          <span className="">
                            {status === "authenticated"
                              ? t("updateResumeDesc")
                              : t("loginDesc")}
                          </span>
                        </p>
                      </div>
                      <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
                        <button
                          onClick={async () => {
                            if (status === "unauthenticated") {
                              router.push(
                                "/auth/signin?redirect=" + "/s/resume"
                              );
                              return;
                            }
                            router.push("/s/resume");
                          }}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium shadow-sm hover:bg-indigo-700 text-white"
                        >
                          {status === "authenticated"
                            ? t("updateResume")
                            : t("login")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-0 lg:ml-1 pb-24 space-y-2">
                <ResumeView />
              </div>
            </>
          )}
        </Container>
        <Footer />
      </div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      messages: require(`../../../messages/${context.locale}.json`),
    },
  };
}
export default ViewResume;
