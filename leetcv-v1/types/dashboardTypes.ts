import { GeneratedDescriptions } from "@constants/defaults";
import { SetterOrUpdater } from "recoil";

export interface ResumeItem {
  title: string;
  recordId: string;
  fieldName: string;
  type?: string;
  autoComplete?: string;
  collection: string;
  readonly?: boolean;
  isObject?: boolean;
}

export interface ActionBtnStatus {
  denied: string;
  i: string;
  passcode: number;
}

export interface ProfileReviewProps {
  author: string;
  content: string;
  date: string;
}

export interface RequestApproval {
  company: string;
  emailId: string;
  name: string;
  status: string;
  passcode: number;
  handle: string;
  approvedId: string;
  requesterStatus: string;
  approvedUserName:string;
  requesterPasscode: number
  approvedEmail:string
  approvedHandle:string
}

export interface RequesterProps {
  company: string;
  i: string;
  name: string;
  recruiterEmail: string;
  requestUserId: string;
  requesterName: string;
  title: string;
}

export interface DashboardProps {
  messages: object;
  now: number;
}

export interface BaseContentProps {
  isPrinting: boolean;
  basePath: string;
  generatedDescriptions: GeneratedDescriptions;
  setShowModal: SetterOrUpdater<boolean>;
  setActiveReview: SetterOrUpdater<{
    title: string;
    document:
      | "Projects-Review"
      | "Educations-Review"
      | "Awards-Review"
      | "Experience-Review"
      | "Publication-Review";
    headingTitle: string;
  }>;
  loadingExperienceId: string | null;
  currentId: string | null;
  refreshExperience: (
    id: string,
    title: string,
    description: string
  ) => Promise<void>;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
  keepChanges: (id: string) => Promise<void>;
  discardChanges: (id: string) => void;
}

export interface Job {
  companyName: string;
  description: string;
  endDate: null;
  jobUrl: string;
  jobTitle: string;
  jobId: string;
  location: string;
  startDate: null;
  status: "active" | "delisted";
  yearsOfExperience: number;
  skills: string[];
  updatedAt: string;
}

export interface JobListing {
  jobId: string;
  jobTitle: string;
  description: string;
  jobUrl: string;
  companyName: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  skills: string[];
  yearsOfExperience: number;
  status: string;
  updatedAt: string;
}

export interface JobListingsResponse {
  jobListings: JobListing[];
}

export interface ReportItem {
  question: string;
  answer: string;
  idealAnswer: string;
  areasForImprovement: string;
  score: number;
  gptResponseContent: string;
}

export type Interview = {
  id: string;
  topic: string;
  attemptedAtDate: string; // Updated from `date` to match Firestore data field
  timeTaken: string;
  totalQuestions: number;
  answeredQuestions: number;
  unansweredQuestions: number;
  questionAnswer: Array<{ question: string; answer: string }>; // Added missing property
  report: ReportItem[];
  attemptedAtTime: string; // Added missing property
  createdAt: { _seconds: number; _nanoseconds: number }; // Added missing property
};
