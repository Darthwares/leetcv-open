import {
  awardsProgressBar,
  certificatesProgressBar,
  coursesProgressBar,
  educationProgressBar,
  experienceProgressBar,
  languageProgressBar,
  personalProgressBar,
  professionalProgressBar,
  projectsProgressBar,
  publicationsProgressBar,
  socialProgressBar,
} from "@lib/helper/progressBar";
import { resumeState } from "@state/state";
import { useRecoilState } from "recoil";

export function useProgressPercent() {
  const [userInfo] = useRecoilState(resumeState);

  let personalProgress = personalProgressBar(userInfo);
  let professionalProgress = professionalProgressBar(userInfo);
  let projectsProgress = projectsProgressBar(userInfo);
  let educationProgress = educationProgressBar(userInfo);
  let socialProgress = socialProgressBar(userInfo);
  let awardsProgress = awardsProgressBar(userInfo);
  let publicationsProgress = publicationsProgressBar(userInfo);
  let certificatesProgress = certificatesProgressBar(userInfo);
  let coursesProgress = coursesProgressBar(userInfo);
  let languageProgress = languageProgressBar(userInfo);
  let experienceProgress = experienceProgressBar(userInfo);

  let result =
    personalProgress +
    professionalProgress +
    projectsProgress +
    educationProgress +
    socialProgress +
    awardsProgress +
    experienceProgress +
    publicationsProgress +
    certificatesProgress +
    coursesProgress +
    languageProgress;

  return { result };
}
