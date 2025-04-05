import {
  hideResume,
  profileResumeState,
  publicPreviewState,
  resumeState,
  tokenCountState,
} from "@state/state";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import Wizard from "@components/wizard/wizard";
import { ResumeView } from "@components/resumeView";

export default function WaitListAccess() {
  const [resume] = useRecoilState(resumeState);
  const [userInfo, setUserInfo] = useRecoilState(profileResumeState);
  const [generatedResume] = useRecoilState(publicPreviewState);
  const [tokens] = useRecoilState(tokenCountState);
  const [showResume] = useRecoilState(hideResume);

  useEffect(() => {
    if (userInfo) {
      setUserInfo(generatedResume);
    }
  }, [resume, userInfo, generatedResume, tokens]);

  return (
    <div data-testid="waitListAccess">
      {<Wizard />}
      {generatedResume.projects.length > 0 && showResume && (
        <div className="flex justify-center lg:px-2 xl:px-0 mt-3 card relative mb-8">
          <div className=" inset-0 bg-gradient-to-r from-indigo-50 to-pink-50 w-full md:max-w-fit rounded-xl">
            <div className="w-full lg:max-w-6xl lg:mx-auto rounded-xl hover:shadow-2xl hover:shadow-pink-300 hover:border-indigo-200 transition-all delay-200 px-2 lg:px-10 py-7  bg-white border-2 shadow-indigo-400 shadow-lg">
              <div>
                <ResumeView />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
