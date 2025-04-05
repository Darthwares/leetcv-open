import { atom, selector } from "recoil";
import { ActionBtnStatus, Interview, Job } from "types/dashboardTypes";
import { Project } from "../data/models/Project";
import { Resume } from "../data/models/UserInfo";
import { Skill } from "../data/models/Skill";
import { UserReview } from "data/models/UserReview";
import { RequestList } from "data/models/RequestList";
import { ActiveReview, CategoryReview } from "data/models/Catefory";
import { LeetLink, SelectedMessageProps } from "@constants/defaults";
import { ConversationProps, Message } from "@components/messages/cardList";
import { SocialMediaState } from "data/models/LeetLink";
import { FontStyleProps } from "data/models/ResumeStyle";
import { Question, Unit } from "types/courses";

export const DEFAULT_RESUME_STATE: Resume = {
  id: "",
  handle: "",
  industry: "",
  expertize: "",
  name: "",
  position: "",
  avatar: "",
  email: "",
  displayName: "",
  image: "",
  workType: "",
  isFresher: true,
  private: true,
  remoteWork: "Office",
  skills: [],
  socialMedia: [],
  preferences: [],
  languages: [],
  projects: [],
  awards: [],
  courses: [],
  certificates: [],
  educations: [],
  experiences: [],
  patents: [],
  publications: [],
  causes: [],
  causesList: [],
  version: "1.0",
  followers: 0,
  dob: "",
  hiddenQrCode: false,
  hiddenImage: false,
  portfolioLink: "",
  address: "",
  extraCurricularActivities: [],
};

const resumeState = atom<Resume>({
  key: "resumeState",
  default: DEFAULT_RESUME_STATE,
});
const cleanState = atom<Resume>({
  key: "cleanUserInfo",
  default: DEFAULT_RESUME_STATE,
});
const userIdState = atom<string>({
  key: "userId",
  default: "",
});
const visitedUserState = atom<Resume | undefined>({
  key: "visitedUser",
  default: undefined,
});
const profileResumeState = atom<Resume>({
  key: "profileResume",
  default: DEFAULT_RESUME_STATE,
});
const skillsToggleState = atom<Skill[]>({
  key: "skillsToggle",
  default: [],
});
const incomingRequestState = atom({
  key: "incomingRequest",
  default: [],
});
const checkStatusState = atom<ActionBtnStatus[]>({
  key: "checkStatus",
  default: [],
});
const disclosureButton = atom<boolean>({
  key: "disclosureButton",
  default: false,
});

const projectsState = atom<Project[]>({
  key: "projects",
  default: [],
});
const reviewReadonlyState = atom<boolean>({
  key: "reviewReadonly",
  default: true,
});
const userReviewState = atom<UserReview>({
  key: "userReview",
  default: undefined,
});
const verifiedPasscodeState = atom<boolean>({
  key: "verifiedPasscode",
  default: false,
});
const selectedHandleState = atom<string>({
  key: "selectedHandle",
  default: "",
});
const selectedStatusState = atom<string>({
  key: "selectedStatus",
  default: "",
});
const showButtonToggleState = atom<boolean>({
  key: "showButtonToggleState",
  default: false,
});
const showReviewModal = atom<boolean>({
  key: "showReviewModalState",
  default: false,
});
const showReviewSidebarModal = atom<boolean>({
  key: "showReviewSidebarModal",
  default: false,
});
const showMyReview = atom<boolean>({
  key: "showMyReview",
  default: false,
});
const reviewTitleState = atom<string>({
  key: "reviewTitle",
  default: "Projects",
});
const reviewDocumentState = atom<CategoryReview>({
  key: "reviewDocument",
  default: "Projects-Review",
});
const reviewHeadingTitle = atom<string>({
  key: "reviewHeadingTitle",
  default: "",
});
const activeReviewState = atom<ActiveReview>({
  key: "activeReviewState",
  default: {
    title: "Projects",
    document: "Projects-Review",
    headingTitle: "",
  },
});
const claimHandleState = atom<boolean>({
  key: "claimHandleState",
  default: true,
});
const emailState = atom<string>({
  key: "emailState",
  default: undefined,
});
const pageTitleState = atom<string>({
  key: "pageTitle",
  default: undefined,
});
const passcodeState = atom<string>({
  key: "passcodeState",
  default: undefined,
});
const profileImageState = atom<string>({
  key: "profileImageState",
  default: undefined,
});
const projectsList = atom<RequestList[] | undefined>({
  key: "categoryList",
  default: [],
});
const awardsList = atom<RequestList[] | undefined>({
  key: "awardsList",
  default: [],
});
const educationsList = atom<RequestList[] | undefined>({
  key: "educationsList",
  default: [],
});
const reviewState = atom<boolean>({
  key: "reviewState",
  default: false,
});
const activeDialogOpenState = atom<boolean>({
  key: "activeDialogOpen",
  default: false,
});
const showFabSelector = selector<boolean>({
  key: "showFab",
  get: ({ get }) => {
    const dialogOpen = get(activeDialogOpenState);
    return !dialogOpen;
  },
});
const reviewCategoryState = selector({
  key: "reviewCategoryState",
  get: ({ get }) => {
    const awards = get(awardsList);
    const projects = get(projectsList);
    const educations = get(educationsList);
    let projectsPendingList: RequestList[] = [];
    let projectsApprovedList: RequestList[] = [];
    projects?.map((project) => {
      project.status === "Pending" && projectsPendingList.push(project);
      project.status !== "Pending" && projectsApprovedList.push(project);
    });
    let educationsPendingList: RequestList[] = [];
    let educationsApprovedList: RequestList[] = [];
    educations?.map((education) => {
      education.status === "Pending" && educationsPendingList.push(education);
      education.status !== "Pending" && educationsApprovedList.push(education);
    });
    let awardsPendingList: RequestList[] = [];
    let awardsApprovedList: RequestList[] = [];
    awards?.map((education) => {
      education.status === "Pending" && awardsPendingList.push(education);
      education.status !== "Pending" && awardsApprovedList.push(education);
    });
    return {
      projects: {
        projectsApprovedList,
        projectsPendingList,
      },
      educations: {
        educationsPendingList,
        educationsApprovedList,
      },
      awards: {
        awardsPendingList,
        awardsApprovedList,
      },
    };
  },
});
const projectState = atom<Project>({
  key: "projectState",
  default: {
    id: "",
    name: "",
    skills: [""],
    company: "",
    title: "",
    start: "",
    end: "",
    impact: "",
    work: "",
  },
});
const noReviewState = atom<boolean>({
  key: "noReviewState",
  default: false,
});
const openLastExtraCurricularState = atom<boolean>({
  key: "openLastExtraCurricularState",
  default: false,
});
const openLastExpState = atom<boolean>({
  key: "openLastExpState",
  default: false,
});
const openLastProjectState = atom<boolean>({
  key: "openLastProjectState",
  default: false,
});
const openLastEduState = atom<boolean>({
  key: "openLastEduState",
  default: false,
});
const openLastAwardState = atom<boolean>({
  key: "openLastAwardState",
  default: false,
});
const openLastCourseState = atom<boolean>({
  key: "openLastCourseState",
  default: false,
});
const openLastPatentState = atom<boolean>({
  key: "openLastPatentState",
  default: false,
});
const openLastPublicationState = atom<boolean>({
  key: "openLastPublicationState",
  default: false,
});
const openLastSocialState = atom<boolean>({
  key: "openLastSocialState",
  default: false,
});
const openLastLanguageState = atom<boolean>({
  key: "openLastLanguageState",
  default: false,
});
const openLastCertificateState = atom<boolean>({
  key: "openLastCertificateState",
  default: false,
});
const showPublicResume = atom<boolean>({
  key: "showPublicResume",
  default: true,
});
const savingState = atom<boolean>({
  key: "savingState",
  default: false,
});
const openDrawerState = atom<boolean>({
  key: "openDrawerState",
  default: false,
});
const stickyTipState = atom<boolean>({
  key: "stickyTipState",
  default: false,
});
const viewCounterState = atom<number>({
  key: "viewCounterState",
  default: 0,
});

const projectImageCountState = atom<number>({
  key: "projectImageCountState",
  default: 30,
});

const publicPreviewState = atom<Resume>({
  key: "publicPreviewState",
  default: DEFAULT_RESUME_STATE,
});
const skillSetState = atom<string>({
  key: "skillSetState",
  default: "",
});
const selectedSkillState = atom<string[]>({
  key: "selectedSkillState",
  default: [],
});

const newSelectedSkillState = atom<string[]>({
  key: "newSelectedSkillState",
  default: [""],
});

const publicExperienceState = atom({
  key: "publicExperienceState",
  default: [{ id: 1, value: "" }],
});

const projectSkillState = atom<Project[]>({
  key: "projectSkillState",
  default: [
    {
      id: "",
      name: "",
      skills: [""],
      company: "",
      title: "",
      start: "",
      end: "",
      impact: "",
      work: "",
      url: "",
    },
  ],
});

const confirmSubmissionState = atom<boolean>({
  key: "confirmSubmissionState",
  default: false,
});

const hideResume = atom<boolean>({
  key: "hideResume",
  default: true,
});
const hideMarqueeState = atom<boolean>({
  key: "hideMarqueeState",
  default: true,
});

const showAIResumeState = atom<boolean>({
  key: "showAIResumeState",
  default: false,
});
const useVideoState = atom<boolean>({
  key: "useVideoState",
  default: false,
});
const showAttestedList = atom<boolean>({
  key: "showAttestedListState",
  default: false,
});
const showProjectState = atom<boolean>({
  key: "showProjectState",
  default: false,
});
const emailListState = atom<string>({
  key: "emailListState",
  default: "",
});

const openAiReviewSidebarState = atom<boolean>({
  key: "openAiReviewSidebarState",
  default: false,
});

const openProjectIdeasSidebarState = atom<boolean>({
  key: "openProjectIdeasSidebarState",
  default: false,
});

const attestedRequestState = atom({
  key: "attestedRequestState",
  default: [],
});

const printState = atom<boolean>({
  key: "printState",
  default: false,
});

const showSelectedSkillState = atom<boolean>({
  key: "showSelectedSkillState",
  default: false,
});

const subscriptionPlanState = atom<string>({
  key: "subscriptionPlanState",
  default: "",
});

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const currentResumeState = atom({
  key: "generatedResume",
  default: DEFAULT_RESUME_STATE,
  effects: [localStorageEffect("generatedResume")],
});

const tokenCountState = atom<number>({
  key: "tokenCountState",
  default: 0,
});

const showBannerState = atom<boolean>({
  key: "showBannerState",
  default: true,
});
const aiReviewText = atom<string>({
  key: "aiReviewTextState",
  default: "",
});

const showLoadingState = atom<boolean>({
  key: "showLoadingState",
  default: false,
});

const prospectApprovalState = atom<boolean>({
  key: "prospectApprovalState",
  default: false,
});

const coverLetterState = atom<string>({
  key: "coverLetterState",
  default: "",
});

const coverLetterLoaderState = atom<boolean>({
  key: "coverLetterLoaderState",
  default: false,
});
const coverLetterFormState = atom({
  key: "coverLetterFormState",
  default: {
    jobPosition: "",
    jobDescription: "",
    jobExperience: "",
    jobHiringManager: "",
    jobCompany: "",
    image: "",
  },
});

const selectedCoverLetterState = atom({
  key: "selectedCoverLetterState",
  default: {
    id: "",
    jobPosition: "",
    jobDescription: "",
    image: "",
  },
});

const hasFileState = atom<boolean>({
  key: "hasFileState",
  default: false,
});

const fetchingTextState = atom<boolean>({
  key: "fetchingTextState",
  default: false,
});

const resumeConversionState = atom<boolean>({
  key: "resumeConversionState",
  default: false,
});

const openProjectAttestSidebarState = atom<Record<string, boolean>>({
  key: "openProjectAttestModelState",
  default: {},
});

const noTokenErrorState = atom<boolean>({
  key: "noTokenErrorState",
  default: false,
});

const coverLetterFormVisible = atom<boolean>({
  key: "coverLetterFormVisible",
  default: false,
});

const coverLetterVisible = atom<boolean>({
  key: "coverLetterVisible",
  default: false,
});

const coverLetterDraftsVisible = atom<boolean>({
  key: "coverLetterDraftsVisible",
  default: false,
});

const selectedLetterVisible = atom<boolean>({
  key: "selectedLetterVisible",
  default: true,
});

const resumePreviewState = atom<boolean>({
  key: "resumePreviewState",
  default: false,
});

const resumeJobDescription = atom<string>({
  key: "resumeJobDescription",
  default: "",
});

const resumeIdeas = atom<string>({
  key: "resumeIdeas",
  default: "",
});

const resumeSkills = atom<string[]>({
  key: "resumeSkills",
  default: [],
});

const resumeExpectedSkills = atom<string[]>({
  key: "resumeExpectedSkills",
  default: [],
});

const resumeLoader = atom<boolean>({
  key: "resumeLoader",
  default: false,
});

const resumeHeadlineCompletion = atom<string>({
  key: "resumeHeadlineCompletion",
  default: "",
});

const resumeExpectedYoE = atom<string>({
  key: "resumeExpectedYoE",
  default: "",
});

const resumeJobPosition = atom<string>({
  key: "resumeJobPosition",
  default: "",
});

const resumeMessage = atom<string>({
  key: "resumeMessage",
  default: "",
});

const resumeIconColor = atom<string>({
  key: "resumeIconColor",
  default: "",
});

const resumeIdeaSkillsNotFit = atom<string>({
  key: "resumeIdeaSkillsNotFitMsg",
  default: "",
});

const referralCode = atom<string>({
  key: "referralCodeState",
  default: "",
});

const specialCharNotAllowed = atom<boolean>({
  key: "specialCharNotAllowed",
  default: false,
});

const resumeMessageState = atom<boolean>({
  key: "resumeMessageState",
  default: false,
});

const selectedMessageList = atom<SelectedMessageProps[]>({
  key: "selectedMessageList",
  default: [],
});

const showMessageState = atom<boolean>({
  key: "showMessageState",
  default: true,
});

const userImageState = atom<string>({
  key: "userImageState",
  default: "",
});

const userNameState = atom<string>({
  key: "userNameState",
  default: "",
});

const receiverHandleState = atom<string>({
  key: "receiverHandleState",
  default: "",
});

const currentSelectedMessageState = atom<string>({
  key: "currentSelectedMessageState",
  default: "",
});

const showRecoveredResumeState = atom<boolean>({
  key: "showRecoveredResumeState",
  default: false,
});

const mobileMenuSidebar = atom<boolean>({
  key: "mobileMenuSidebar",
  default: false,
});

const signOutModelOpen = atom<boolean>({
  key: "signOutModelOpen",
  default: false,
});

const openReferralModelState = atom<boolean>({
  key: "openReferralModelState",
  default: false,
});

const selectedChatMessageMessages = atom<Message[]>({
  key: "selectedChatMessageMessagesState",
  default: [],
});

const selectedConversationState = atom<ConversationProps>({
  key: "selectedConversationState",
  default: {} as ConversationProps,
});

const streakAnalyticsState = atom<boolean>({
  key: "streakAnalyticsState",
  default: false,
});

const sideBarOpenState = atom<boolean>({
  key: "sideBarOpenState",
  default: false,
});

const highlightingState = atom<boolean>({
  key: "highlightingState",
  default: false,
});

const toggleResumeState = atom<boolean>({
  key: "toggleResumeState",
  default: false,
});

const razorPayPaymentState = atom<{
  payment_id: string;
  subscription_id: string;
  signature: string;
}>({
  key: "razorPayPaymentState",
  default: {
    payment_id: "",
    subscription_id: "",
    signature: "",
  },
});

const blurState = atom<boolean>({
  key: "blurState",
  default: false,
});

const showUsersState = atom<boolean>({
  key: "showUsersState",
  default: false,
});

const showUsersMessageState = atom<boolean>({
  key: "showUsersMessageState",
  default: false,
});

const inputErrorState = atom<{ [key: string]: boolean }>({
  key: "inputErrorState",
  default: {},
});

const isPrintingState = atom<boolean>({
  key: "isPrintingState",
  default: false,
});

const featuredSkillsLengthState = atom<number>({
  key: "featuredSkillsLengthState",
  default: 0,
});

const coverLetterEditingState = atom<boolean>({
  key: "coverLetterEditingState",
  default: false,
});

const have90daysAccessState = atom<boolean>({
  key: "have90daysAccessState",
  default: false,
});
const experienceFilterState = atom<string>({
  key: "experienceFilterState",
  default: "All",
});

const experienceSortingState = atom<string>({
  key: "experienceSortingState",
  default: "relevance",
});

export const shareProfileModalState = atom<boolean>({
  key: "shareProfileModalState",
  default: false,
});

const leetFormVisibleState = atom<boolean>({
  key: "leetFormVisibleState",
  default: false,
});

const leetLinkBioState = atom<string>({
  key: "leetLinkBioState",
  default: "Delighted to be connecting with you!",
});

const leetLinkHeaderState = atom<string>({
  key: "leetLinkHeaderState",
  default: "Check out my socials!",
});

const leetLinksListState = atom<LeetLink[]>({
  key: "leetLinksListState",
  default: [],
});

const leetLinkSocialMediaState = atom<SocialMediaState[]>({
  key: "leetLinkSocialMediaState",
  default: [],
});

const trackedJobs = atom<Job[]>({
  key: "trackedJobs",
  default: [],
});

export const hitsAvailableState = atom<boolean>({
  key: "hitsAvailableState",
  default: false,
});
export const hitsDataState = atom<Resume[]>({
  key: "hitsDataState",
  default: [],
});

export const mockInterviewTopicState = atom<string>({
  key: "mockInterviewTopicState",
  default: "",
});

export const isReadInstructionsState = atom<boolean>({
  key: "isReadInstructionsState",
  default: false,
});
export const fontStyleDropdownState = atom<boolean>({
  key: "fontStyleDropdownState",
  default: false,
});

export const resumeColorState = atom<string>({
  key: "resumeColorState",
  default: "slate",
});

export const resumeFontState = atom<FontStyleProps>({
  key: "resumeFontState",
  default: {
    value: "open-sans",
    name: "Open Sans (Default)",
    className: "font-sans",
  },
});

export const resumeBannerColorState = atom<string>({
  key: "resumeBannerColorState",
  default: "bg-gradient-to-r from-indigo-400 to-pink-500 focus:ring-pink-500",
});

const interviewState = atom<Interview[]>({
  key: "interviewState",
  default: [],
});

const activeTabState = atom({
  key: "activeTabState",
  default: "start-interview",
});

const accessCameraState = atom<boolean>({
  key: "accessCameraState",
  default: true,
});

const acceptedDescriptionsState = atom<boolean>({
  key: "acceptedDescriptionsState",
  default: false,
});

const userBlockedState = atom<boolean>({
  key: "userBlockedState",
  default: false,
});

export const adminQueryState = atom<{
  activeFilters: string[];
  sortBy: string;
  searchQuery: string;
}>({
  key: "adminQueryState", // unique ID (with respect to other atoms/selectors)
  default: {
    activeFilters: [],
    sortBy: "",
    searchQuery: "",
  },
});
export const professorQueryState = atom<{
  activeFilters: string[];
  sortBy: string;
  searchQuery: string;
}>({
  key: "professorQueryState", // unique ID (with respect to other atoms/selectors)
  default: {
    activeFilters: [],
    sortBy: "",
    searchQuery: "",
  },
});
export const studentQueryState = atom<{
  activeFilters: string[];
  sortBy: string;
  searchQuery: string;
}>({
  key: "studentQueryState", // unique ID (with respect to other atoms/selectors)
  default: {
    activeFilters: [],
    sortBy: "",
    searchQuery: "",
  },
});

export const isQuizVisibleState = atom<boolean>({
  key: "isQuizVisibleState",
  default: false,
});

export const questionsState = atom<Question[]>({
  key: "questionsState",
  default: [],
});

export const unitIndexState = atom<number>({
  key: "unitIndexState",
  default: 0,
});

export const lessonIndexState = atom<number>({
  key: "lessonIndexState",
  default: 0,
});

export const livesState = atom<number>({
  key: "livesState",
  default: 0,
});

const disableSidebarState = atom<boolean>({
  key: "disableSidebarState",
  default: false,
});

export const gemsState = atom<number>({
  key: "gemsState",
  default: 100,
});

export const practiceQuizState = atom<boolean>({
  key: "practiceQuizState",
  default: false,
});

export const userCourseState = atom<{
  level: string;
  unit: number;
  lesson: number;
}>({
  key: "userCourseState",
  default: { level: "", unit: 0, lesson: 0 },
});

//all units
export const currentUnitState = atom<Unit[]>({
  key: "currentUnitState",
  default: [],
});

export const practiceQuestionsState = atom<boolean>({
  key: "practiceQuestionsState",
  default: false,
});

export const pendingNotificationsState = atom<{
  review: boolean;
  attestation: boolean;
  request: boolean;
}>({
  key: "pendingNotificationsState",
  default: { review: false, attestation: false, request: false },
});
export {
  cleanState,
  resumeState,
  userIdState,
  skillsToggleState,
  openAiReviewSidebarState,
  incomingRequestState,
  checkStatusState,
  visitedUserState,
  profileResumeState,
  reviewReadonlyState,
  userReviewState,
  verifiedPasscodeState,
  selectedHandleState,
  selectedStatusState,
  projectsState,
  showReviewModal,
  reviewTitleState,
  showMyReview,
  reviewHeadingTitle,
  reviewDocumentState,
  claimHandleState,
  emailState,
  showButtonToggleState,
  projectState,
  disclosureButton,
  pageTitleState,
  passcodeState,
  profileImageState,
  reviewCategoryState,
  projectsList,
  awardsList,
  educationsList,
  activeReviewState,
  reviewState,
  noReviewState,
  openLastExpState,
  openLastProjectState,
  openLastEduState,
  openLastAwardState,
  openLastCourseState,
  openLastPublicationState,
  openLastCertificateState,
  openLastSocialState,
  showPublicResume,
  openLastLanguageState,
  savingState,
  openDrawerState,
  activeDialogOpenState,
  showFabSelector,
  stickyTipState,
  viewCounterState,
  projectImageCountState,
  publicPreviewState,
  skillSetState,
  selectedSkillState,
  publicExperienceState,
  newSelectedSkillState,
  projectSkillState,
  currentResumeState,
  confirmSubmissionState,
  hideResume,
  hideMarqueeState,
  showAIResumeState,
  useVideoState,
  showSelectedSkillState,
  showAttestedList,
  showProjectState,
  emailListState,
  attestedRequestState,
  printState,
  subscriptionPlanState,
  tokenCountState,
  showBannerState,
  aiReviewText,
  showLoadingState,
  showReviewSidebarModal,
  prospectApprovalState,
  coverLetterState,
  coverLetterFormState,
  coverLetterLoaderState,
  selectedCoverLetterState,
  hasFileState,
  fetchingTextState,
  resumeConversionState,
  openProjectAttestSidebarState,
  noTokenErrorState,
  coverLetterFormVisible,
  coverLetterVisible,
  coverLetterDraftsVisible,
  selectedLetterVisible,
  resumePreviewState,
  resumeJobDescription,
  resumeLoader,
  resumeHeadlineCompletion,
  resumeExpectedYoE,
  resumeJobPosition,
  resumeMessage,
  resumeIconColor,
  resumeExpectedSkills,
  resumeSkills,
  resumeIdeas,
  resumeIdeaSkillsNotFit,
  referralCode,
  specialCharNotAllowed,
  resumeMessageState,
  selectedMessageList,
  showMessageState,
  userImageState,
  userNameState,
  currentSelectedMessageState,
  showRecoveredResumeState,
  mobileMenuSidebar,
  signOutModelOpen,
  openReferralModelState,
  selectedChatMessageMessages,
  selectedConversationState,
  streakAnalyticsState,
  receiverHandleState,
  sideBarOpenState,
  razorPayPaymentState,
  openLastPatentState,
  highlightingState,
  toggleResumeState,
  blurState,
  showUsersState,
  showUsersMessageState,
  inputErrorState,
  isPrintingState,
  featuredSkillsLengthState,
  openLastExtraCurricularState,
  coverLetterEditingState,
  have90daysAccessState,
  experienceFilterState,
  experienceSortingState,
  leetFormVisibleState,
  leetLinkBioState,
  leetLinkHeaderState,
  leetLinksListState,
  leetLinkSocialMediaState,
  trackedJobs,
  interviewState,
  activeTabState,
  accessCameraState,
  openProjectIdeasSidebarState,
  acceptedDescriptionsState,
  userBlockedState,
  disableSidebarState,
};
