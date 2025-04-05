import { v4 as guid } from "uuid";
import { Award } from "data/models/Award";
import { Education } from "data/models/Education";
import { Project } from "data/models/Project";
import duotoneImage from "@/public/assets/screencasts/duotone.svg";
import gridsImage from "@/public/assets/screencasts/grids.svg";
import setupImage from "@/public/assets/screencasts/setup.svg";
import strokesImage from "@/public/assets/screencasts/strokes.svg";
import { SocialMedia } from "data/models/socialMedia";
import { Experience } from "data/models/Experience";
import { Course } from "data/models/Course";
import { Certificate } from "data/models/Certificate";
import { Publication } from "data/models/Publication";
import { Cause } from "data/models/Cause";
const stc = require("string-to-color");
import hexToRgba from "hex-to-rgba";
import { Language } from "data/models/Language";
import ConvertApi from "convertapi-js";
import { Uploader } from "uploader";
import { Resume } from "data/models/UserInfo";
import {
  fetchAndActivate,
  getRemoteConfig,
  getString,
} from "firebase/remote-config";
import encoder from "@nem035/gpt-3-encoder";
import { ReviewSchema } from "data/models/Review";
import {
  DocumentIcon,
  CheckCircleIcon,
  ChatIcon,
  ArrowCircleDownIcon,
  ServerIcon,
  SearchIcon,
  StarIcon,
  DatabaseIcon,
  UserGroupIcon,
  LightBulbIcon,
  ArrowUpIcon,
  StatusOnlineIcon,
  ArrowDownIcon,
  CogIcon,
  LockClosedIcon,
  DocumentTextIcon,
  PaperClipIcon,
  TicketIcon,
  GiftIcon,
  MailIcon,
  LogoutIcon,
  BriefcaseIcon,
  PaperAirplaneIcon,
  UsersIcon,
  DocumentSearchIcon,
  SparklesIcon,
  ChartBarIcon,
  PencilAltIcon,
  ChatAlt2Icon,
  LinkIcon,
  RefreshIcon,
  BookOpenIcon,
  InformationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";
import {
  TwitterShareButton,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  XIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import {
  AiSvg,
  CoverLetterSvg,
  SyncSvg,
  JobSvg,
  GithubSvg,
  FacebookCircleSvg,
  LinkedinCircleSvg,
  TwitterCircleSvg,
  InstagramCircleSvg,
  YoutubeCircleSvg,
  BlogLogoSvg,
  CreditCardIcon,
  PinterestSvg,
  ThreadsSvg,
  RocketSvg,
  InterviewIcon,
  FeedbackSvg,
  CoursesLeetLingoOutlineSvg,
} from "@components/svg";
import { Patent } from "data/models/Patent";
import { NextRouter } from "next/router";
import { ExtraCurricular } from "data/models/ExtraCurricular";
import { Message } from "@components/messages/cardList";
import { SectionType } from "types/courses";
import { UAParser } from "ua-parser-js";

const crypto = require("crypto");

export const profileImgDefault =
  "https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png";
export const backgroundImage =
  "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
export const INTERCOM_DEV_APP_ID = "m99y8ry3";
export const INTERCOM_PROD_APP_ID = "m99y8ry3";
export const PROD_DOMAIN = "https://www.leetcv.com";
export const baseUrl = "https://api.upload.io";
export const featuredFlag =
  "https://cdn.icon-icons.com/icons2/368/PNG/512/Flag1-orange_37134.png";
export const vapidKey =
  "BKICRExMRgk9fc8nGL39ren-J_hDf9QlTXFqgMpCY7CO_WtLMn-yWPzlPOx3101BdHKGcQ9lDkpv1K93-Xhp-Uc";
export const dashboard = "/dashboard";
export const search = "/search";
export const AVATAR_IMAGE = "https://www.gravatar.com/avatar/?d=identicon";
export const BUBBLE_THRESHOLD = 500;
export const CLICK_THRESHOLD = 150;
export const AI_RESUME = "AI Resume Wizard";
export const CONVERT_RESUME = "Convert Resume";
export const EDITOR = "Editor";
export const AI = "AI";
export const RESUME = "Resume";
export const CONNECTIONS = "Connections";
export const PREVIEW_RESUME = "Resume";
export const PREVIEW_PORTFOLIO = "Portfolio";
export const PREVIEW_LEET_LINK = "Leet Link";
export const DASHBOARD = "Dashboard";
export const REQUESTS = "Requests";
export const COVERT_LETTER = "Cover Letter";
export const ATTESTATION = "Attestation";
export const RESUME_PRIVACY = "Resume Privacy";
export const CLAIM_HANDLE = "Claim Handle";
export const AVAILABLE_TOKENS = "Available Tokens";
export const ADD_RECOVERY_EMAIL = "Add Recovery Email";
export const RECOVER_OLD_ACC = "Recover Old Account";
export const REFERRAL_CODE = "Referral Code";
export const PRIVATE_SHARE_LINK = "Private Sharable Link";
export const SYNC = "Sync your LeetCV";
export const LOGOUT = "Logout";
export const FEEDBACK = "Feedback";
export const UNSUBSCRIBE = "Subscription";
export const RESUME_IDEAS = "Resume Ideas";
export const ATTESTATIONS = "Attestations";
export const REVIEWS = "Reviews";
export const SETTINGS = "Settings";
export const MORE = "More";
export const INCOMING_REQUEST = "Incoming";
export const OUTGOING_REQUEST = "Outgoing";
export const GET_MESSAGEs = "Messages";
export const CONNECT_FOLLOWING = "Following";
export const CONNECT_FOLLOWERS = "Followers";
export const COLLEAGUES = "Colleagues";
export const CONNECTS = "Connects";
export const INCOMING_ATTESTATION = "Incoming";
export const OUTGOING_ATTESTATION = "Outgoing";
export const socialIcons = [
  { id: "github", path: "github.svg" },
  { id: "linkedin", path: "linkedin.svg" },
  { id: "twitter", path: "twitter.svg" },
];

export const uploader = Uploader({
  apiKey: process.env.NEXT_PUBLIC_UPLOAD_ID ?? "",
});
export function subText(text: string) {
  return ` ${text} `;
}

export const faqs = [
  {
    question: "Is my data safe in LeetCV?",
    answer:
      "Yes, LeetCV takes the protection of your data seriously and has implemented strict measures to ensure that it remains confidential. We do not disclose or share any data with third parties without your explicit consent.",
  },
  {
    question: "How to print my resume?",
    answer: `To obtain a printed copy of your resume, navigate to the "Resume" button located on the Navbar. Once there, select the "Print" button to print your resume to PDF.`,
  },
  {
    question: "How to view someone else's resume?",
    answer: `To view and request access to another individual's resume, proceed to the search page, search for the person of interest, and then click on the "Request Access" button to initiate the request.`,
  },
  {
    question: "Can I make my profile and resume private?",
    answer: `Yes, By default all resumes in LeetCV are private. To modify the privacy settings of your resume, navigate to the "Settings" section and select "Resume Privacy." From there, you can edit your resume's privacy settings to either make it private or public.`,
  },
  {
    question: "Do I need to pay for my resume to be private?",
    answer: `No, you do not need to pay for your resume to be private. However, if you want access to all the features of LeetCV, we recommend subscribing to our premium or pro plan.`,
  },
  {
    question: "Are you selling my information to recruiters?",
    answer: `No, We prioritize the privacy of our users and do not engage in the sale of user data or utilize any targeted advertisement methods, while also providing the option for users to mark their resumes as private and control access to their personal information.`,
  },
  {
    question: "Is my resume searchable from search engines?",
    answer: `Yes, Indeed, your resume is searchable on search engines, and completing your resume to 100% increases the chances of it appearing in search results. Sharing more information in your resume also improves its visibility in search engines.`,
  },
];
export function getDefaultBasicDetails() {
  return {
    description:
      "This is demo description Ex- Looking to utilize my technology and leadership skills in an esteemed organization. Well versed with research-oriented marketing abilities and product analysis. Tech-savvy and a fast learner with innate communication skills and natural curiosity for product marketing.",
    position: "Software Engineer",
    phoneNumber: "6745678XXX",
    currentCompany: "",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    address: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
    },
  };
}

export const getColor = (status: string) => {
  let bgColor = "";
  switch (status) {
    case "Approved":
      bgColor = "bg-green-100 text-green-800";
      break;
    case "Denied":
      bgColor = "bg-red-100 text-red-800";
      break;
    case "Pending":
      bgColor = "bg-yellow-100 text-yellow-800";
      break;
    default:
      break;
  }
  return bgColor;
};
export function colorFullSkills(item: string) {
  const color = stc(item.toUpperCase());
  const border = hexToRgba(color, 0.5);
  const rgb = hexToRgba(color, 0.1);
  return { border, rgb, color };
}

export function getDefaultExtraCurricular(seed: number): ExtraCurricular {
  return {
    id: guid(),
    activityName: "National Debate Championship " + seed,
    organization: "Debate Society",
    start: "2022-03",
    end: "2022-04",
    checked: false,
    description:
      "Competed in the national debate championship, reaching the semi-finals and winning Best Speaker award.",
  };
}
export function getDefaultExperience(
  seed: number,
  currentCompany?: string
): Experience {
  return {
    id: guid(),
    title: "Experience " + seed,
    company: currentCompany ?? "XYZ Company",
    start: "2021-04",
    end: "2022-09",
    skills: ["Python", "AI", "JavaScript"],
    description:
      "Each description of your work experience should be clear and concise, yet descriptive. After reading your description, a prospective employer should know exactly what your responsibilities were, what skills you have developed, where your strengths lie, and what you have achieved",
  };
}
export function getDefaultProject(seed: number): Project {
  return {
    id: guid(),
    name: "Project " + seed,
    title: "",
    company: "",
    start: "2021-03",
    end: "2022-06",
    skills: ["React", "HTML", "CSS"],
    impact: `- Mention measurable **impact or results** you helped deliver. **Focus on the outcome of tasks**. **Example:** Modified customer service support system to reduce complaints by 10%.`,
    work: `- Mention key **responsibilities** that match the project description. Include explanatory phrases which includes **why, how, where and how tasks** are performed. **Example:** Managed a team of 5 sales reps to deliver monthly business targets.`,
    url: "",
    uploadedImages: [],
  };
}

export function getDefaultEducation(seed: number): Education {
  return {
    id: guid(),
    degree: "Education " + seed,
    start: "2017-04",
    end: "2020-07",
    name: "Amity University",
    grade: "",
    major: "Computer Science",
  };
}

export function getDefaultPatent(seed: number): Patent {
  return {
    id: guid(),
    title: "Patent " + seed,
    patentIssueDate: "2022-01-23",
    patentDescription: "Write a few sentences about the patent",
    patentURL: "",
    patentNumber: "US 9229900",
    patentMembers: [],
    isPatentIssued: false,
  };
}

export function getDefaultPublication(seed: number): Publication {
  return {
    id: guid(),
    title: "Publication " + seed,
    publisher: "Harvard Business Review",
    publicationDate: "2022-01-23",
    description: "Write a few sentences about the publication",
    publicationURL: "",
  };
}
export function getDefaultAward(seed: number): Award {
  return {
    id: guid(),
    name: "Award " + seed,
    awardFor: "For Being Customer Focused.",
    date: "2018-07",
    description:
      "Two-time winner of the Small Business Influencer Awards, hosted by Small Business Trends to recognize local businesses that stand out as influential in the community.",
  };
}
export function getDefaultCourse(seed: number): Course {
  return {
    id: guid(),
    name: "Course " + seed,
    start: "2022-01",
    end: "2022-09",
    coursePlatform: "Udemy",
    courseId: "",
    certificateLink: "",
  };
}
export function getDefaultCertificate(seed: number): Certificate {
  return {
    id: guid(),
    name: "Certificate " + seed,
    issuingOrganization: "Microsoft",
    issueDate: "2022-01",
    expirationDate: "",
    credentialID: "",
    credentialURL: "",
  };
}
export function getDefaultSocialMedia(seed: number): SocialMedia {
  return {
    id: guid(),
    name: "Github " + seed,
    socialMediaUrl: "https://www.github.com/",
  };
}
export function getDefaultLanguage(seed: number): Language {
  return {
    id: guid(),
    name: "Language " + seed,
    read: false,
    write: false,
    speak: false,
  };
}

export function toMonthName(monthNumber: string) {
  const date = new Date();
  date.setMonth(Number(monthNumber) - 1);
  return date.toLocaleString([], {
    month: "short",
  });
}
export function gradeSystem(gradeValue: string) {
  let grade = gradeValue.replace(/%|CGPA|cgpa/g, "").trim();
  if (!isNaN(+grade) && grade !== "") {
    if (+grade <= 10) {
      grade += " CGPA";
    } else {
      grade += "%";
    }
  }
  return grade;
}

export const videos = [
  {
    title: `Create a resume with help from ${process.env.NEXT_PUBLIC_PRODUCT_NAME}`,
    description:
      "Polish your projects, awards, education and highlight the right things for recruiters",
    image: setupImage,
    runtime: { minutes: 1, seconds: 54 },
  },
  {
    title: "One resume multiple forms",
    description:
      "Dynamic resume filtering allows your resume to address any areas without having to create a new one",
    image: gridsImage,
    runtime: { minutes: 2, seconds: 12 },
  },
  {
    title: "Post your resume for open review",
    description:
      "Our team and the community will review your resume and give you feedback on how to improve it",
    image: strokesImage,
    runtime: { minutes: 1, seconds: 25 },
  },
  {
    title: "Request access to other resumes you find interesting",
    description:
      "Learn from others and build a resume worthy of any top MNC to pick you up",
    image: duotoneImage,
    runtime: { minutes: 2, seconds: 44 },
  },
];

export const List = [
  "Build your resume with feedback from the community",
  "Get attestations from your colleagues and team members to prove your work",
  "Create multiple shared link to control who has access",
  "Easy to update and always up to date",
  "Figma features and keyboard shortcuts to speed up your workflow",
];

export const tableOfContents = {
  "Getting started": {
    "Getting started": 1,
    "Intro to Figma": 15,
    "Setting up your first art board": 20,
  },
  Fundamentals: {
    "Strokes and fills": 21,
    "End points": 22,
    "Bezier curves": 26,
    "Designing on a grid": 31,
    "Vector shapes": 45,
  },
  "Boolean operations": {
    "Combining shapes": 50,
    "Subtracting shapes": 57,
    "Intersecting shapes": 66,
    Flattening: 78,
  },
  "Optimizing for production": {
    "Preparing for SVG": 82,
    "Configuring your export settings": 88,
    "Minifying and removing metadata": 95,
  },
};

type DocumentType =
  | "Projects-Review"
  | "Educations-Review"
  | "Awards-Review"
  | "Experience-Review"
  | "Publication-Review";

export const reviewsList: Array<{
  id: number;
  titleLocKey: string;
  document: DocumentType;
}> = [
  {
    id: 0,
    titleLocKey: "Projects",
    document: "Projects-Review",
  },
  {
    id: 1,
    titleLocKey: "Educations",
    document: "Educations-Review",
  },
  {
    id: 2,
    titleLocKey: "Awards",
    document: "Awards-Review",
  },
  {
    id: 3,
    titleLocKey: "Experiences",
    document: "Experience-Review",
  },
  {
    id: 4,
    titleLocKey: "Publications",
    document: "Publication-Review",
  },
];

export const tabs = [
  {
    name: "Unresolved",
    current: false,
    id: 0,
  },
  {
    name: "Resolved",
    current: false,
    id: 1,
  },
];
export const LOCAL_STORAGE_DASHBOARD = "dashboard-tour";
export const LOCAL_STORAGE_EDITOR = "editor-tour";
export const LOCAL_STORAGE_PROSPECTS = "propspects-tour";
export const LOCAL_STORAGE_REQUESTS = "requests-tour";
export const LOCAL_STORAGE_REVIEW = "review-tour";
export const LOCAL_STORAGE_USERS = "users-tour";
export const LOCAL_STORAGE_FORMFAB = "formFab-tour";
export const LOCAL_SUBSCRIPTION_ID = "subscriptionId";
export const sidbarTextColor = "white";
export const sidbarTextBgColor = "#4F46E5";
export const sidbarTextRightColor = "#6e67e6";
export const fabCancelButton = "#1a1c1a";
export const fabSubmitButton = "#4F46E5";
export const fabTextColor = "#ffffff";
export const applications = [
  {
    applicant: {
      name: "Ricardo Cooper Ricardo",
      email: "ricardo.comricardorichardo.cooper@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    status: "Completed",
    href: "#",
  },
  {
    applicant: {
      name: "Kristen Ramos",
      email: "kristen.ramos@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    status: "Pending",
    href: "#",
  },
  {
    applicant: {
      name: "Ted Fox",
      email: "ted.fox@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    date: "2020-01-07",
    dateFull: "January 7, 2020",
    status: "Completed",
    href: "#",
  },
];

export const causes: Cause[] = [
  { name: "Animal Welfare" },
  { name: "Art and Culture" },
  { name: "Children" },
  { name: "Civil Rights and Social Action" },
  { name: "Disaster and Humanitarian Relief" },
  { name: "Economic Empowerment" },
  { name: "Education" },
  { name: "Environment" },
  { name: "Health" },
  { name: "Human Rights" },
  { name: "Politics" },
  { name: "Poverty Alleviation" },
  { name: "Science and Technology" },
  { name: "Social Services" },
  { name: "Veteran Support" },
];

export const DP = "DP";
export const QR = "QR";

export const Educations = "Education";
export const Projects = "Projects";
export const Awards = "Awards";
export const EducationsReview = "Educations-Review";
export const ProjectsReview = "Projects-Review";
export const AwardsReview = "Awards-Review";
export const ExperienceReview = "Experience-Review";
export const PublicationReview = "Publication-Review";

export const reviewDocuments = [
  EducationsReview,
  ProjectsReview,
  AwardsReview,
  ExperienceReview,
  PublicationReview,
];

export interface RootTip {
  heading: string;
  tip: Tip[];
  howToWrite: HowToWrite[];
}

export interface Tip {
  title: string;
  id: number;
  desc: string;
}

export interface HowToWrite {
  desc: string;
  id: number;
}
export const tipsExtraCurricular: RootTip[] = [
  {
    heading: "What to write about extracurricular activities",
    tip: [
      {
        id: 0,
        title: "Activity Name",
        desc: "Mention the name of the activity. Example: Debate Club.",
      },
      {
        id: 1,
        title: "Organization Name",
        desc: "Mention the name of the organization or club. Example: University Debate Society.",
      },
      {
        id: 2,
        title: "Date",
        desc: "Select the start and end dates of your involvement.",
      },
      {
        id: 3,
        title: "Description",
        desc: "Mention any achievements or recognitions. Example: Won first place in national debate competition.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Use action verbs: Led, Organized, Participated etc.",
      },
      {
        id: 1,
        desc: "Include any measurable impact or achievements.",
      },
    ],
  },
];

export const tipsExperience: RootTip[] = [
  {
    heading: "What to write about experience",
    tip: [
      {
        id: 0,
        title: "Job Title",
        desc: "Mention job title. Example: Product Manager.",
      },
      {
        id: 1,
        title: "Company Name",
        desc: "Mention Company Name. Example: Microsoft",
      },
      {
        id: 2,
        title: "Date",
        desc: "Select Date of Project started and completed.",
      },
      {
        id: 3,
        title: "Description",
        desc: "Mention key responsibilities and impact or results you helped deliver. Example: Managed a team of 5 sales reps to deliver monthly business targets and Modified customer service support system to reduce complaints by 10%.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Use action verbs: Built, Conceptualized, Drove etc.",
      },
      {
        id: 1,
        desc: "Include numbers and percentages",
      },
    ],
  },
];
export const tipsProject: RootTip[] = [
  {
    heading: "What to write about project",
    tip: [
      {
        id: 0,
        title: "Name",
        desc: "Write Project Name, give a general idea of what the project is about. Example: Online Resume Builder.",
      },
      {
        id: 1,
        title: "Date",
        desc: "Select Date of Project started and completed.",
      },
      {
        id: 2,
        title: "Company Name",
        desc: "Mention Company Name. Example: If you have done project in college then you can give name as College Project or Personal Project or Company name.",
      },
      {
        id: 3,
        title: "Skills",
        desc: "Enter your skills or technology use in project. Enter skill name then enter `Comma(,)` or `Enter key(↵)` then enter second skill. Example: Java↵",
      },
      {
        id: 4,
        title: "Work/Responsibilities",
        desc: "Mention key responsibilities and skills that match the job description. Example: Managed a team of 5 sales reps to deliver monthly business targets.",
      },
      {
        id: 5,
        title: "Impact",
        desc: "Mention measurable impact or results you helped deliver. Example: Modified customer service support system to reduce complaints by 10%.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Keep it to 3 or 4 bullet points",
      },
      {
        id: 1,
        desc: "Include numbers, percentages and others ",
      },
    ],
  },
];
export const tipsEducation: RootTip[] = [
  {
    heading: "What to write about education",
    tip: [
      {
        id: 0,
        title: "Degree Name",
        desc: `Write Degree name Example: A bachelor's and/or master's degree in mass communication or High School or Intermediate School.`,
      },
      {
        id: 1,
        title: "College/University Name",
        desc: "Mention College/University/School Name. Example: Standford University or Amity University.",
      },
      {
        id: 2,
        title: "Major",
        desc: "Mention your fields/Streams or Area. Example: Like Computer Science or Electrical or Medical Field.",
      },
      {
        id: 3,
        title: "Date",
        desc: "Select date of education started and completed.",
      },
      {
        id: 4,
        title: "Grade/CGPA/Percentage",
        desc: "Write your overall Grade/CGPA/Percentage Score. Example: A+ or 9.7 or 85%.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Use the first letter of word as Capital letter",
      },
      {
        id: 1,
        desc: "Please fill all fields so your resume looks good.",
      },
    ],
  },
];

export const tipsAward: RootTip[] = [
  {
    heading: "What to write about award",
    tip: [
      {
        id: 0,
        title: "Title",
        desc: "Write Award/Prize Name. Example: Awarded Employee of the Year.",
      },
      {
        id: 1,
        title: "AwardedFor",
        desc: "Mention in which area you got awarded. Example: for being customer focused.",
      },
      {
        id: 2,
        title: "Date",
        desc: "Select Date, when did you got awarded?",
      },
      {
        id: 3,
        title: "Description",
        desc: "Mention any awards/recognition you won during this time.Example: Two-time winner of the Small Business Influencer Awards, hosted by Small Business Trends to recognize local businesses that stand out as influential in the community.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Incorporate action verbs such as 'Built,' 'Conceptualized,' etc.",
      },
    ],
  },
];
export const tipsCourse: RootTip[] = [
  {
    heading: "What information should be included when writing about a course?",
    tip: [
      {
        id: 0,
        title: "Course Name",
        desc: "Write Course Name. Example: C/C++, JAVA etc.",
      },
      {
        id: 1,
        title: "Date",
        desc: "Pick a date, when did you complete?",
      },
      {
        id: 2,
        title: "Course Platform",
        desc: "Mention Platform or Institution from you completed Example: Udemy, Google, Coursera",
      },
      {
        id: 3,
        title: "Course Id",
        desc: "Enter course Id/Serial-No and it is optional  Example: HIS101",
      },
      {
        id: 4,
        title: "Course Completion Certificate Link",
        desc: "Enter course completion certificate link",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Please complete all fields to enhance the appearance of your resume.",
      },
    ],
  },
];
export const tipsCertification: RootTip[] = [
  {
    heading: "What should one write about a certificate?",
    tip: [
      {
        id: 0,
        title: "Name",
        desc: "Write certificate name. Example: Azure Data Fundamentals",
      },
      {
        id: 1,
        title: "Issuing Organization",
        desc: "Write organization name. Example: Microsoft Certified",
      },
      {
        id: 2,
        title: "Issue Date",
        desc: "Select issue date and expiry date : If there is no expiry date then don't select expiry date",
      },
      {
        id: 3,
        title: "Certification Id",
        desc: "Enter certification Id/Serial-No and it is optional  Example: 995592488",
      },
      {
        id: 4,
        title: "Certificate Link",
        desc: "Enter certificate link",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Make sure to fill out all fields to improve the presentation of your resume.",
      },
    ],
  },
];
export const tipsPublication: RootTip[] = [
  {
    heading: "What to write about publications",
    tip: [
      {
        id: 0,
        title: "Title",
        desc: "Write publication title. Example: Giving and receiving feedback.",
      },
      {
        id: 1,
        title: "Publication/Publisher",
        desc: "Write publication/publisher name. Example: Harvard Business Review.",
      },
      {
        id: 2,
        title: "Date",
        desc: "Choose a date, when did you publish?",
      },
      {
        id: 3,
        title: "Publication Link",
        desc: "Enter published link",
      },
      {
        id: 4,
        title: "Description",
        desc: "Write some description about publications. Example: Exploring the Science of Climate Change: A Comprehensive Guide to Global Warming.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Ensure all fields are filled in to create a polished and professional resume.",
      },
    ],
  },
];

export const tipsPatent: RootTip[] = [
  {
    heading: "What to write about patents",
    tip: [
      {
        id: 0,
        title: "Title",
        desc: "Write the title of your patent. Example: Method and System for Analyzing Data.",
      },
      {
        id: 1,
        title: "Patent Number",
        desc: "Enter the patent number assigned to your invention.",
      },
      {
        id: 2,
        title: "Description",
        desc: "Provide a brief description of your invention. Example: A software algorithm for real-time data analysis.",
      },
      {
        id: 3,
        title: "Issue Date",
        desc: "If applicable, mention the date when the patent was issued.",
      },
      {
        id: 4,
        title: "Members (if applicable)",
        desc: "List the names of team members involved in the patent creation.",
      },
      {
        id: 5,
        title: "Patent Status",
        desc: "Specify whether the patent is pending or already issued.",
      },
      {
        id: 6,
        title: "Patent URL (if applicable)",
        desc: "Include a link to the patent document online, if available.",
      },
    ],
    howToWrite: [
      {
        id: 0,
        desc: "Make sure to provide accurate and complete information for each field to showcase your expertise and achievements in the patent field.",
      },
    ],
  },
];

export interface ContactField {
  title: string;
  fieldName: string;
  type: string;
}

export const contactList: ContactField[] = [
  {
    title: "First Name",
    fieldName: "first_name",
    type: "text",
  },
  {
    title: "Last Name",
    fieldName: "last_name",
    type: "text",
  },
  {
    title: "Email",
    fieldName: "email",
    type: "email",
  },
  {
    title: "Phone Number",
    fieldName: "phone_number",
    type: "number",
  },
];

export const definition = [
  {
    id: 0,
    title: "For the purposes of this Privacy Policy:",
    list: [
      {
        id: 1,
        strongText: "Account",
        listText: `means a unique account created for You to access our Service or parts of our Service.`,
      },
      {
        id: 2,
        strongText: "Cookies",
        listText:
          "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.",
      },
      {
        id: 3,
        strongText: "Country",
        listText: `refers to: Tamil Nadu, India`,
      },
      {
        id: 4,
        strongText: "Device",
        listText: `means any device that can access the Service such as a computer, a cellphone or a digital tablet.`,
      },
      {
        id: 5,
        strongText: "Personal Data",
        listText: `is any information that relates to an identified or identifiable individual.`,
      },
      {
        id: 6,
        strongText: "Service",
        listText: `refers to the Website.`,
      },
      {
        id: 7,
        strongText: "Service Provider",
        listText: `means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.`,
      },
      {
        id: 8,
        strongText: "Usage Data",
        listText: `refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).`,
      },
      {
        id: 9,
        strongText: "You",
        listText: `means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.`,
      },
    ],
  },
];
export const personalData = [
  {
    id: 0,
    title: "The Company may use Personal Data for the following purposes:",
    list: [
      {
        id: 0,
        strongText: "To provide and maintain our Service,",
        listText: `ncluding to monitor the usage of our Service.`,
      },
      {
        id: 1,
        strongText: "To manage Your Account:",
        listText:
          "to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.",
      },
      {
        id: 2,
        strongText: "For the performance of a contract:",
        listText: `the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.`,
      },
      {
        id: 3,
        strongText: "To contact You:",
        listText: `To contact You by email, telephone
            calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates,
            when necessary or reasonable for their implementation.`,
      },
      {
        id: 4,
        strongText: "To provide You",
        listText: `with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.`,
      },
      {
        id: 5,
        strongText: "To manage Your requests:",
        listText: `To attend and manage Your requests to Us.`,
      },
      {
        id: 6,
        strongText: "For business transfers:",
        listText: `We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.`,
      },
      {
        id: 7,
        strongText: "For other purposes",
        listText: `: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.`,
      },
    ],
  },
];
export const usesData = [
  {
    id: 0,
    desc: "Usage Data is collected automatically when using the Service.",
  },
  {
    id: 1,
    desc: `Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.`,
  },
  {
    id: 2,
    desc: "When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.",
  },
  {
    id: 3,
    desc: "We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.",
  },
];
export const retention = [
  {
    id: 0,
    desc: "The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.",
  },
  {
    id: 1,
    desc: "The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.",
  },
];
export const transfer = [
  {
    id: 0,
    desc: `Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to ó and maintained on ó computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.`,
  },
  {
    id: 1,
    desc: "Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.",
  },
  {
    id: 2,
    desc: "The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.",
  },
];
export const childrenPrivacy = [
  {
    id: 0,
    desc: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.",
  },
  {
    id: 1,
    desc: `If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.`,
  },
];
export const linkToOtherWebsite = [
  {
    id: 0,
    desc: `Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.`,
  },
  {
    id: 1,
    desc: "We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.",
  },
];
export const changesPrivacy = [
  {
    id: 0,
    desc: "We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.",
  },
  {
    id: 1,
    desc: "We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.",
  },
  {
    id: 2,
    desc: "You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
  },
];
export const contactUs = [
  {
    id: 0,
    title:
      "If you have any questions about this Privacy Policy, You can contact us:",
    list: [{ id: 0, desc: "By email: leetcv@darthwares.com" }],
  },
];

export function isProhibitedPage(PROHIBITED_PAGES: string[]): React.ReactNode {
  return !PROHIBITED_PAGES.includes(location.pathname);
}
export const shortNumber = require("short-number");

export const termsOfService = [
  {
    title: "Access and Use of Service",
    description:
      "By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service. We reserve the right to modify, suspend or terminate the Service, or any part thereof, at any time and without prior notice. Your continued use of the Service following any such changes constitutes your acceptance of the new Terms.",
  },
  {
    title: "Accounts",
    description:
      "You may be required to create an account to access certain features of the Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
  },
  {
    title: "User Content",
    description:
      "By submitting, posting, or displaying any content, information, or other materials ('User Content') on or through the Service, you grant us a non-exclusive, worldwide, royalty-free, fully paid-up, transferable, sublicensable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display your User Content in connection with the Service. You represent and warrant that you own or have the necessary rights, consents, and permissions to publish the User Content you submit and that such User Content does not violate any third-party rights, including without limitation, copyright, trademark, privacy, or other intellectual property rights.",
  },
  {
    title: "Prohibited Uses",
    description:
      "You agree not to use the Service for any illegal, harmful, or unauthorized purpose, or to interfere with the proper functioning of the Service. You agree not to use any automated means, such as bots or scripts, to access or interact with the Service.",
  },
  {
    title: "Intellectual Property",
    description:
      "All content provided on the Service, including but not limited to text, graphics, logos, and software, is the property of LeetCV or its content providers and is protected by applicable intellectual property laws. You may not copy, reproduce, modify, distribute, or create derivative works from the content without our express written permission.",
  },
  {
    title: "Third-Party Links",
    description:
      "The Service may contain links to third-party websites or services that are not owned or controlled by LeetCV. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that LeetCV shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such websites or services.",
  },
  {
    title: "Disclaimer of Warranties and Limitation of Liability",
    description:
      "The Service is provided on an 'as is' and 'as available' basis, without warranties of any kind, express or implied. To the fullest extent permitted by law, LeetCV disclaims all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. LeetCV does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. \n\n In no event shall LeetCV or its affiliates, employees, agents, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of, or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed its essential purpose.",
  },
  {
    title: "Indemnification",
    description:
      "You agree to defend, indemnify, and hold harmless LeetCV, its affiliates, employees, agents, and licensors from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of (i) your use and access of the Service; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your User Content caused damage to a third party.",
  },
  {
    title: "Governing Law",
    description:
      "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which LeetCV is located, without regard to its conflict of law provisions.\n\n Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.",
  },
  {
    title: "Changes",
    description:
      "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.",
  },
  {
    title: "Termination",
    description:
      "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.Entire Agreement These Terms constitute the entire agreement between you and LeetCV with respect to your access to and use of the Service, and supersede and replace any prior agreements, oral or written, between you and LeetCV regarding the Service.",
  },
  {
    title: "Waiver and Severability",
    description:
      "No waiver by LeetCV of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of LeetCV to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.\n\nIf any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.",
  },
  {
    title: "Assignment",
    description:
      "You may not assign or transfer your rights or obligations under these Terms without the prior written consent of LeetCV. LeetCV may assign or transfer its rights and obligations under these Terms without restriction.",
  },
  {
    title: "Notices",
    description:
      "Any notices or other communications provided by LeetCV under these Terms, including those regarding modifications to the Terms, will be given by posting to the Service, or by sending an email or other electronic message to the contact information you provide.",
  },
  {
    title: "Force Majeure",
    description:
      "LeetCV shall not be liable for any failure to perform its obligations under these Terms if such failure results from any cause beyond LeetCV's reasonable control, including, but not limited to, mechanical, electronic, or communications failure, natural disasters, or acts of war, terrorism, or civil unrest.Privacy Policy \n\nBy using the Service, you agree to the collection and use of information in accordance with our Privacy Policy, which is incorporated by reference into these Terms. The Privacy Policy provides information about how we collect, use, and disclose personal information when you access or use the Service.",
  },
  {
    title: "Dispute Resolution",
    description:
      "In the event of any dispute, claim, question, or disagreement arising from or relating to these Terms or the breach thereof, the parties hereto shall first use their best efforts to settle the dispute, claim, question, or disagreement. To this end, the parties shall consult and negotiate with each other in good faith and, recognizing their mutual interests, attempt to reach a just and equitable solution satisfactory to both parties.\n\nIf the parties do not reach a mutually satisfactory solution within a period of sixty (60) days from the date on which the dispute, claim, question, or disagreement arose, either party may seek appropriate legal remedies in accordance with the governing law and jurisdiction set forth in these Terms.",
  },
  {
    title: "Feedback and Suggestions",
    description:
      "LeetCV welcomes and encourages you to provide feedback, comments, and suggestions for improvements to the Service. You may submit feedback by emailing us at leetcv@darthwares.com By submitting your feedback, you grant LeetCV a non-exclusive, worldwide, royalty-free, irrevocable, sub-licensable, perpetual license to use and publish those ideas and materials for any purpose, without compensation to you.",
  },
  {
    title: "Age Restrictions",
    description:
      "By using the Service, you represent and warrant that you are at least 13 years of age. If you are under the age of 13, you may not use the Service. LeetCV reserves the right to terminate accounts or restrict access to the Service for users who do not meet the age requirements.",
  },
  {
    title: "Compliance with Laws",
    description:
      "You agree to comply with all applicable local, state, national, and international laws, regulations, and rules in connection with your access to and use of the Service.International Users \n\nThe Service is operated and controlled by LeetCV from its location in the jurisdiction where it is established. LeetCV makes no representation that the Service is appropriate or available for use in other locations. Those who access or use the Service from other jurisdictions do so at their own risk and are responsible for compliance with local law.",
  },
  {
    title: "Export Compliance",
    description:
      "You agree to comply with all applicable export and re-export control laws and regulations, including but not limited to the Export Administration Regulations (EAR) maintained by the U.S. Department of Commerce, trade and economic sanctions maintained by the U.S. Treasury Department's Office of Foreign Assets Control (OFAC), and the International Traffic in Arms Regulations (ITAR) maintained by the U.S. Department of State. You represent and warrant that you are not located in a country subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a 'terrorist-supporting' country, and that you are not listed on any U.S. Government list of prohibited or restricted parties.",
  },
  {
    title: "No Partnership or Agency",
    description:
      "Nothing in these Terms is intended to, or shall be deemed to, establish any partnership or joint venture between any of the parties, constitute any party the agent of another party, or authorize any party to make or enter into any commitments for or on behalf of any other party.",
  },
  {
    title: "Headings",
    description:
      "The headings in these Terms are for convenience only and shall not affect their interpretation.",
  },
  {
    title: "Interpretation",
    description:
      "In these Terms, unless the context otherwise requires, words in the singular shall include the plural and vice versa. A reference to one gender shall include a reference to the other genders.",
  },
  {
    title: "Survival",
    description:
      "Any provision of these Terms that is intended, by its nature, to survive termination of these Terms shall survive such termination, including but not limited to the provisions regarding intellectual property, indemnification, disclaimer of warranties, and limitation of liability.",
  },
  {
    title: "Effective Date",
    description:
      "These Terms are effective as of the 'Last Updated' date specified at the beginning of this document and will remain in effect except with respect to any provisions that are changed in accordance with the provisions herein.No Third-Party Beneficiaries \n\nExcept as expressly provided in these Terms, no provisions of these Terms are intended or shall be construed to confer upon or give to any person or entity other than the parties hereto any rights, remedies, or other benefits under or by reason of these Terms.",
  },
  {
    title: "DMCA Policy",
    description:
      "LeetCV respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond promptly to notices of alleged infringement that are reported to our designated copyright agent. If you believe that your copyrighted work has been used in a way that constitutes copyright infringement, please provide our designated copyright agent with a written notice containing the information specified by the DMCA.",
  },
  {
    title: "Severability",
    description:
      "If any provision or part-provision of these Terms is or becomes invalid, illegal, or unenforceable, it shall be deemed modified to the minimum extent necessary to make it valid, legal, and enforceable. If such modification is not possible, the relevant provision or part-provision shall be deemed deleted. Any modification to or deletion of a provision or part-provision under this clause shall not affect the validity and enforceability of the rest of these Terms.",
  },
  {
    title: "Relationship of the Parties",
    description:
      "Nothing in these Terms creates any partnership, joint venture, agency, franchise, sales representative, or employment relationship between you and LeetCV. You have no authority to make or accept any offers or representations on our behalf. You may not make any statement that would contradict anything in this section.",
  },
  {
    title: "Electronic Communications",
    description:
      "When you use the Service or send emails to LeetCV, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by email or by posting notices on the Service. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing.",
  },
  {
    title: "Language",
    description:
      "These Terms are prepared and written in English. To the extent that any translation of these Terms conflicts with the English version, the English version controls.",
  },
];
export const url = "https://www.leetcv.com/r/";
export const extractImageName = (url: string) => {
  const testUrl = url;
  const lastSlashIndex = testUrl.lastIndexOf("/");
  const imageNameWithExtension = testUrl.slice(lastSlashIndex + 1);
  const questionMarkIndex = imageNameWithExtension.indexOf("?");
  const imageName = imageNameWithExtension.slice(0, questionMarkIndex);
  return imageName;
};

export function pascalCase(text: string) {
  return text.replace(/(\w)(\w*)/g, function (_, firstChar, remainingChars) {
    return firstChar.toUpperCase() + remainingChars.toLowerCase();
  });
}

export type ResumesProps = {
  userId: string;
};

export async function fetchUsers(publicResumeId: ResumesProps[]) {
  const remoteConfig = getRemoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

  await fetchAndActivate(remoteConfig);

  const value = getString(remoteConfig, "homePageResumes");

  let publicList: string[] = [];
  publicResumeId?.map((res) => publicList.push(res.userId));

  const matchingValues = publicList.filter((item) => value.includes(item));

  let result: string[] = [];

  matchingValues.forEach((matchingId) => {
    const matchingResume = publicResumeId?.find(
      (res) => res.userId === matchingId
    );
    if (matchingResume) {
      result.push(matchingResume.userId);
    }
  });

  return result;
}

export function getHandle(handle: string) {
  return handle;
}

const formatSingleDateComponent = (
  date: Date,
  format: Intl.DateTimeFormatOptions
): string => {
  return date.toLocaleString("en-US", format);
};

export const formatDate = (dateString: string): string => {
  const parts = dateString.split("-");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${year}-${month}-${day}`;
};

export const formatResumeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = formatSingleDateComponent(date, { month: "long" }).substring(
    0,
    3
  );
  const year = formatSingleDateComponent(date, { year: "numeric" });

  return `${month} ${year}`;
};

export function clickableLink(setPrinted: any) {
  const onBeforePrint = () => setPrinted(true);
  const onAfterPrint = () => setPrinted(false);

  if (window.matchMedia) {
    const mediaQueryList = window.matchMedia("print");
    mediaQueryList.addEventListener("change", (mql) => {
      if (mql.matches) {
        onBeforePrint();
      } else {
        onAfterPrint();
      }
    });
  }
  return { onBeforePrint, onAfterPrint };
}
export const reviews = [
  {
    id: 0,
    title: "It really works.",
    body: "I downloaded LeetCV and I landed job within few days of making a resume on it.",
    author: "Farisa Ottaviano",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4869475/ad5efce7-6afd-415f-bb04-9bfea66f15ec?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 1,
    title: "You need this app.",
    body: "I didn't understand how to create resume before LeetCV.",
    author: "Rhymer Espinosa",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4869408/2f0f3388-a6e9-4c8e-a1a5-d2d68e9a3b1a?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 2,
    title: "LeetCV Works great.",
    body: "LeetCV makes good resumes, it is a must try app.",
    author: "MJ Maquiling",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4883586/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 3,
    title: "Strong community.",
    body: "Easy to use Resume Builder with good features and has the ability to build strong community. The user interface is simple and has good visuals. Overall a best platform to build resumes which is completely free.",
    author: "Benedict Vimal",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4921122/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 4,
    title: "I love it!",
    body: "This is a simple application which helps people to create their resumes. Main key features are it helps people to get their resume reviewed by LeetCv Community and also helps in getting jobs.",
    author: "Anna Leshchuk",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4377772/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 5,
    title: "Too good to be true.",
    body: "Great",
    author: "Raphael Chege",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/2373482/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 6,
    title: "Wish I could give 6 stars",
    body: "This is literally the most important app you will ever download in your life. Get on this before it's so popular that everyone else is getting these tips too.",
    author: "Shailendra Kumar",
    rating: 5,
    avatar: "https://www.darthwares.com/teams/shailendra.jpg",
  },
  {
    id: 7,
    title: "Building Your Online Resume Made Easy",
    body: "Nice platform to create an online resume. Good work on UI/UX and has the potential to form a great community.",
    author: "Sherryn Praveen",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4925398/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 8,
    title: "Pretty helps a lot!",
    body: "Pretty helps a lot for others looking for a job.thanks to this!Congrats",
    author: "Awee Gee",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4869930/d365c03b-636f-42d0-8fdd-c5b6e4d753e7?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 9,
    title: "Neat! Amazing concept.",
    body: "Very helpful! Congrats.",
    author: "Udhita Victor",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4921296/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
  {
    id: 10,
    title: "I love it.",
    body: "Very helpful!",
    author: "Ankit Verma",
    rating: 5,
    avatar: "https://www.darthwares.com/teams/ankit.png",
  },
  {
    id: 11,
    title: "It's like a superpower.",
    body: "Very neat and clean!",
    author: "Chibi Vikramathithan",
    rating: 5,
    avatar: "https://www.darthwares.com/teams/chibbi.jpg",
  },
  {
    id: 12,
    title: "Loved it great product!",
    body: "Quit my job and got new one after making a resume from LeetCV.",
    author: "Ravindra Pawar",
    rating: 5,
    avatar:
      "https://ph-avatars.imgix.net/4846105/original?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=2",
  },
];

export async function remoteConfigPaidUsers() {
  const remoteConfig = getRemoteConfig();
  remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

  await fetchAndActivate(remoteConfig);

  return getString(remoteConfig, "pricingAllowedUsers");
}

export const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const isIndianTimeZone = () => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return userTimeZone === "Asia/Calcutta" || userTimeZone === "Asia/Kolkata";
};

export const comparingTimeZone = isIndianTimeZone();

export const currencySymbol = comparingTimeZone ? "₹" : "$";

export const countTokens = (text: string) => encoder.encode(text).length;

export const defaultImage = (id: string) => {
  return `https://www.gravatar.com/avatar/${id}?d=identicon`;
};

export function compareStartYearsAndMonthsDesc(a: any, b: any) {
  const startYearA = new Date(a.start).getFullYear();
  const startYearB = new Date(b.start).getFullYear();

  const startMonthA = new Date(a.start).getMonth();
  const startMonthB = new Date(b.start).getMonth();

  if (startYearB !== startYearA) {
    return startYearB - startYearA;
  } else {
    return startMonthB - startMonthA;
  }
}

export const convertLanguages = (languages: Language[]) => {
  return languages.map((lang) => {
    if (typeof lang === "string") {
      return {
        name: lang,
        read: false,
        speak: false,
        write: false,
        id: guid(),
      };
    }
    return lang;
  });
};
export const predefinedLanguages = [
  "Afrikaans",
  "Albanian",
  "Arabic",
  "Armenian",
  "Basque",
  "Bengali",
  "Bhojpuri",
  "Bulgarian",
  "Catalan",
  "Chinese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Estonian",
  "Fiji",
  "Finnish",
  "French",
  "Georgian",
  "German",
  "Greek",
  "Gujarati",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Javanese",
  "Korean",
  "Latin",
  "Latvian",
  "Lithuanian",
  "Macedonian",
  "Magahi",
  "Maithili",
  "Malay",
  "Malayalam",
  "Maltese",
  "Maori",
  "Marathi",
  "Mongolian",
  "Nepali",
  "Norwegian",
  "Persian",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Quechua",
  "Romanian",
  "Russian",
  "Samoan",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swahili",
  "Swedish",
  "Tamil",
  "Tatar",
  "Telugu",
  "Thai",
  "Tibetan",
  "Tonga",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Uzbek",
  "Vietnamese",
  "Welsh",
  "Xhosa",
];

export const predefinedSocialMedia = [
  "LinkedIn",
  "Github",
  "Instagram",
  "Facebook",
  "Twitter",
  "Youtube",
  "X",
  "Threads",
  "Pinterest",
];
export const ImageList = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
export const isPhoneNumberValid = (phoneNumber: string) => {
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(phoneNumber);
};

export const isValidUrl = (url: string) => {
  try {
    const normalizedUrl = url.startsWith("www.") ? `http://${url}` : url;

    const newUrl = new URL(normalizedUrl);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
};

export type FieldErrors = {
  [key: string]: string;
};

export const handleError = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  activeField: any,
  setFieldErrors: React.Dispatch<React.SetStateAction<FieldErrors>>
) => {
  const { value, id } = e.target;

  if (value.trim() === "" && activeField) {
    setFieldErrors((prevErrors: any) => ({
      ...prevErrors,
      [id]: `${id}`,
    }));
  } else if (
    (id === "publicationURL" ||
      id === "credentialURL" ||
      id === "certificateLink" ||
      id === "url" ||
      id === "socialMediaUrl" ||
      id === "patentURL") &&
    value
  ) {
    let errorMessage = "";

    if (!isValidUrl(value) && value.length > 0) {
      errorMessage = "invalidURL";
    } else if (value.length > 255) {
      errorMessage = "urlTooLong";
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
  } else {
    setFieldErrors((prevErrors: any) => ({
      ...prevErrors,
      [id]: "",
    }));
  }
};

export function generateSkillList(skillSet: string) {
  const skillList = skillSet
    ?.replace(/(\r\n|\n|\r)|(years|year\n)|([\[\]']|[\[\]"])/gm, "")
    .trim()
    .split(",");
  return {
    skillList,
  };
}

export async function aiGeneratedResume(resume: Resume) {
  localStorage.setItem("generatedResume", JSON.stringify(resume));
}

export function uniqueAvatar(requests: ReviewSchema[] | undefined) {
  return requests?.reduce((acc: any[], request: any) => {
    if (!acc.find((item) => item.userId === request.userId)) {
      acc.push(request);
    }
    return acc;
  }, []);
}
export const predefinedHobbies = [
  "Singing",
  "Dancing",
  "Painting",
  "Reading",
  "Cooking",
  "Hiking",
  "Gaming",
  "Fishing",
  "Photography",
  "Swimming",
  "Yoga",
  "Writing",
  "Gardening",
  "Travelling",
  "Chess",
  "Knitting",
  "Biking",
  "Collecting Stamps",
  "Playing an Instrument",
  "Bird Watching",
  "Meditation",
  "Pottery",
  "Sculpting",
  "Archery",
  "Workout",
  "Camping",
  "Rock Climbing",
  "Scuba Diving",
  "Surfing",
  "Skiing",
  "Snowboarding",
  "Basketball",
  "Football",
  "Tennis",
  "Table Tennis",
  "Badminton",
  "Cycling",
  "Running",
  "Auto Racing",
  "Motorcycling",
  "Skydiving",
  "Paragliding",
  "Canoeing",
  "Kayaking",
  "Mountaineering",
  "Rappelling",
  "Spelunking",
  "Astronomy",
  "Stargazing",
  "Beekeeping",
  "Home Brewing",
  "Antiquing",
  "Whittling",
];

export function calculatePlanAndPriceId(order_id: string, price: any) {
  let plan = "";
  let priceId = "";
  switch (order_id) {
    case "1":
      if (price === "5" || price === "430") {
        plan = "5";
        priceId = process.env.STRIPE_PLAN_ID_5USD!;
      } else if (price === "3.6" || price === "1806") {
        plan = "3.6";
        priceId = process.env.STRIPE_PLAN_ID_22USD_6M_PREMIUM!;
      } else if (price === "3.3" || price === "3354") {
        plan = "3.3";
        priceId = process.env.STRIPE_PLAN_ID_40USD_1Y_PREMIUM!;
      }
      break;
    case "2":
      if (price === "15" || price === "126114") {
        plan = "15";
        priceId = process.env.STRIPE_PLAN_ID_15USD!;
      } else if (price === "10.5" || price === "5296") {
        plan = "10.5";
        priceId = process.env.STRIPE_PLAN_ID_63USD_6M_PRO!;
      } else if (price === "9.6" || price === "9836") {
        plan = "9.6";
        priceId = process.env.STRIPE_PLAN_ID_116USD_1Y_PRO!;
      }
      break;
    default:
      break;
  }
  return { plan, priceId };
}

export function countBasedOnPlan(plan: string, reviews: number) {
  let count = 0;
  switch (plan) {
    case "":
      count = 10;
      break;
    case "Premium":
      count = 20;
      break;
    default:
      count = reviews;
      break;
  }
  return count;
}

export interface Frequency {
  value: "monthly" | "semiAnnually" | "annually";
  label: string;
  priceSuffix: string;
}

export const frequencies: Frequency[] = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "semiAnnually", label: "Half yearly", priceSuffix: "/month" },
  { value: "annually", label: "Yearly", priceSuffix: "/month" },
];

export function shouldRenderAttestation(
  plan: string,
  count: number,
  requestsAttestation: number
): boolean {
  switch (plan) {
    case "":
    case "Premium":
      return requestsAttestation <= count;
    case "Pro":
      return true;
    default:
      return false;
  }
}

export function generateValidHref(link: string) {
  if (link?.startsWith("http://") || link?.startsWith("https://")) {
    return link;
  }
  return `https://${link}`;
}

export const coverLetterfeatures = [
  {
    name: "Tailored Cover Letters",
    description:
      "Craft personalized cover letters for each job application, showcasing your unique qualifications and enthusiasm for the position.",
    icon: DocumentIcon,
  },
  {
    name: "Professional Formatting",
    description:
      "Create cover letters with a polished and professional look using our range of formatting options and templates.",
    icon: CheckCircleIcon,
  },
  {
    name: "Effective Communication",
    description:
      "Clearly convey your qualifications, experience, and passion for the role to captivate potential employers.",
    icon: ChatIcon,
  },
];

export const features = [
  {
    name: "Enhanced Professional ",
    description:
      "Enhanced Professional Presentation: LeetCV's advanced tools offer visually appealing templates and formatting options, elevating the presentation of your resume and impressing potential employers..",
    icon: ArrowCircleDownIcon,
  },
  {
    name: "Improved Readability ",
    description:
      "Improved Readability and Accessibility: LeetCV optimizes layout, font, and spacing, ensuring your resume is easily scannable by recruiters, while offering compatibility across different devices and formats.",
    icon: LockClosedIcon,
  },
  {
    name: "Increased Job Prospects ",
    description:
      "Increased Job Prospects: LeetCV helps you highlight key skills and achievements, making your resume stand out, increasing your chances of securing interviews and job offers.",
    icon: ServerIcon,
  },
];

export const convertInfoSlider = {
  slides: [
    {
      text: "Identifying your basic details section...",
      id: 0,
    },
    {
      text: "Identifying your projects section...",
      id: 1,
    },
    {
      text: "Identifying your experiences section...",
      id: 2,
    },
    {
      text: "Identifying your education section...",
      id: 3,
    },
    {
      text: "Identifying your awards section...",
      id: 4,
    },
    {
      text: "Identifying your courses section...",
      id: 5,
    },
    {
      text: "Identifying your certifications section...",
      id: 6,
    },
    {
      text: "Identifying your publication section...",
      id: 7,
    },
    {
      text: "Identifying your Social Media section...",
      id: 8,
    },
  ],
};

export const MAX_SIZE_IN_BYTES = 2097152;

export const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export const convertApi = ConvertApi.auth(process.env.NEXT_PUBLIC_CONVERT_API!);

export const menuOptions = ["Home", "More"];

export const formatMarkdown = (content: string) => {
  return content
    ?.split(/\n(?=\d+\.)|(?<=\d\.) /)
    ?.filter((item) => item.trim() !== "")
    ?.map((item, index) => {
      if (/^\d+\./.test(item)) {
        return ` ${index + 1}. ${item.trim()}`;
      } else {
        return `${item.trim()}`;
      }
    })
    .join("\n");
};

export const tooltip = {
  options: ["inline", "list"],
  inline: {
    inDropdown: false,
    options: ["bold", "italic"],
    bold: { className: undefined },
    italic: { className: undefined },
  },
  list: {
    inDropdown: false,
    options: ["unordered"],
    unordered: { className: undefined },
  },
};

export const coverLetterInitialState = {
  id: "",
  image: "",
  jobPosition: "",
  coverLetter: "",
  createdAt: {
    _seconds: 0,
    _nanoseconds: 0,
  },
};

export const useAttestInstructions = (t: any) => {
  const instructions = [t("multipleEmail"), t("trackAttestation")];
  return instructions;
};

export const resumeOptimizationFeatures = [
  {
    name: "Thorough Resume Analysis",
    description:
      "Conduct in-depth analysis of job descriptions and your resume to identify areas for improvement and alignment.",
    icon: SearchIcon,
  },
  {
    name: "Skill Highlighting",
    description:
      "Strategically emphasize key skills sought by employers to enhance the relevance and impact of your resume.",
    icon: StarIcon,
  },
  {
    name: "Experience Tailoring",
    description:
      "Tailor your professional experiences to match the specific requirements outlined in diverse job descriptions.",
    icon: BriefcaseIcon,
  },
];

export const updateUserInfoLanguages = (
  userInfo: Resume,
  convertLanguages: (languages: Language[]) => Language[]
): Resume => {
  if (
    userInfo?.languages &&
    userInfo.languages.every((lang) => typeof lang === "string")
  ) {
    const updatedLanguages = convertLanguages(userInfo.languages);
    return {
      ...userInfo,
      languages: updatedLanguages,
    };
  }
  return userInfo;
};

export const hideEmail = (email: string) => {
  const sliceValue = email.slice(0, 4);
  return `${sliceValue}xxxxxx@gmail.com`;
};

export const hidePhoneNumber = (number: string) => {
  const firstThreeValue = number.slice(0, 3);
  const lastTwoValue = number.slice(-2);
  return `${firstThreeValue}XXXXXX${lastTwoValue}`;
};

export const NO_SKILLS_LISTED = "No skills listed";

export const generateRandomString = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < 10; i++) {
    const buf = crypto.randomBytes(1);
    const index = buf.readUInt8(0) % characters.length;
    result += characters.charAt(index);
  }

  return result;
};

export function referStats(hasRefferalPeers: number, t: any) {
  const earnedTokenCount = (hasRefferalPeers ?? 0) * 1000;

  return [
    {
      id: 1,
      name: `${earnedTokenCount} Tokens`,
      icon: DatabaseIcon,
      description: t("youHaveEarned"),
    },
    {
      id: 2,
      name: `${hasRefferalPeers ?? 0} Peers`,
      icon: UserGroupIcon,
      description: t("acceptedReferral"),
    },
  ];
}

export type ShareConfig = {
  ShareButton: React.ElementType;
  Icon: React.ElementType;
  buttonText?: string;
  handle?: string;
  via?: string;
  related?: string[];
  hashtag?: string;
  summary?: string;
  source?: string;
  subject?: string;
  body?: string;
  separator?: string;
  title: string;
  url: string;
  hashtags?: string[];
  name?: string;
};

export type SocialMediaShareProps = {
  socialMediaReferrals: ShareConfig[];
  shareUrl: string;
  shareText: string;
  hashtags: string[];
};

export function shareReferralLinks(
  shareText: string,
  shareUrl: string,
  hashtags: string[]
): ShareConfig[] {
  return [
    {
      ShareButton: TwitterShareButton,
      Icon: XIcon,
      via: "LeetCV",
      related: ["LeetCV", "JobSeekers"],
      title: shareText,
      url: shareUrl,
      hashtags,
      name: "X(Twitter)",
    },
    {
      ShareButton: FacebookShareButton,
      Icon: FacebookIcon,
      hashtag: "#LeetCV #ResumeBuilder #ReferAFriend",
      title: shareText,
      url: shareUrl,
      name: "Facebook",
    },
    {
      ShareButton: LinkedinShareButton,
      Icon: LinkedinIcon,
      summary:
        "Generate your resume on LeetCV and use my referral code for a special offer!",
      source: "LeetCV",
      title: shareText,
      url: shareUrl,
      name: "LinkedIn",
    },
    {
      ShareButton: WhatsappShareButton,
      Icon: WhatsappIcon,
      title: shareText,
      url: shareUrl,
      name: "Whatsapp",
    },
    {
      ShareButton: TelegramShareButton,
      Icon: TelegramIcon,
      title: shareText,
      url: shareUrl,
      name: "Telegram",
    },
  ];
}

export const useFilterOptions = (t: any) => {
  const filterOptions = [t("all"), t("approved"), t("denied"), t("pendings")];
  return filterOptions;
};

export const useFeatures = (t: any) => {
  const features = [
    {
      id: 1,
      contentVideoSrc: "https://www.youtube.com/embed/9KpjnKiyJS0",
      imageSrc: "/assets/lottie/aiResume.json",
      directedLink: "/s/aiResume",
      contentOrderStyle: "order-1",
      imageOrderStyle: "order-2",
      heading: t("createAiResume"),
      subHeading: t("enhanceJob"),
      description: t("createAiResumeDesc"),
    },
    {
      id: 2,
      contentVideoSrc:
        "https://www.youtube.com/embed/mDeXdSWqxsY?si=e4qj6tWYq3Iiu7-X",
      imageSrc: "/assets/lottie/convert.json",
      directedLink: "/s/convert",
      contentOrderStyle: "order-1 lg:order-2",
      imageOrderStyle: "lg:order-1",
      heading: t("convertResume"),
      subHeading: t("boostCareer"),
      description: t("convertResumeDesc"),
    },
    {
      id: 3,
      contentVideoSrc:
        "https://www.youtube.com/embed/VI31mrVRVy8?si=uujlorFJJwMgkExL",
      imageSrc: "/assets/lottie/cover.json",
      directedLink: "/s/coverLetter",
      contentOrderStyle: "order-1 lg:order-2",
      imageOrderStyle: "lg:order-2",
      heading: t("coverLetter"),
      subHeading: t("userFriendly"),
      description: t("coverLetterDesc"),
    },
    {
      id: 4,
      contentVideoSrc:
        "https://www.youtube.com/embed/veOYfdDoUMA?si=dsJKVUuEpnrfOGjt",
      imageSrc: "/assets/lottie/attestproject.json",
      directedLink: "/s/resumeEditor",
      contentOrderStyle: "order-1 lg:order-2",
      imageOrderStyle: "lg:order-1",
      heading: t("attestProject"),
      subHeading: t("outcomeVerification"),
      description: t("attestProjectDesc"),
    },
  ];
  return features;
};

export const DEFAULT_PROFILE = "/assets/avatars/placeholder-image.webp";

export const getCurrentPage = () => {
  const storedValue = localStorage.getItem("currentPage");
  return storedValue ? parseInt(storedValue) : 1;
};

export const setCurrentPageInLocalStorage = () => {
  return localStorage.setItem("currentPage", "1");
};

export const validPaths = [
  "/s/resume",
  "/s/resumeIdeas",
  "/s/convert",
  "/s/aiResume",
];

export const steps = [
  {
    key: "LongPress",
    title: "Long Press",
    description: "Long press the 'Open' button to prepare the link.",
  },
  {
    key: "OpenInNewTab",
    title: "Open in New Tab",
    description: "Select 'Open in New Tab' to view the profile separately.",
  },
  {
    key: "DesktopMode",
    title: "Desktop Mode",
    description:
      "In the new tab, switch to 'Desktop Mode' in your browser settings.",
  },
  {
    key: "DownloadProfile",
    title: "Download Profile",
    description: "Download the LinkedIn profile as a PDF document.",
  },
  {
    key: "ReturnToLeetCV",
    title: "Return to LeetCV",
    description: "Return to LeetCV and proceed with your resume conversion.",
  },
];
export interface MessageDetails {
  message: string;
  messagedAt: any;
  messagingId: string;
  currChatName: string;
  currChatImage: string;
}

export interface SelectedMessageProps {
  receiverHandle: string;
  receiverName: string;
  receiverId: string;
  senderName: string;
  receiverImage: string;
  senderImage: string;
  message: string;
  messagedAt: string;
  id: string;
  messagingId: string;
  timeStamp?: string;
  senderHandle?: string;
  messageList?: MessageDetails[];
  block?: string | null;
}

export default function getTimeStamp(time: string) {
  let date = new Date(time);

  // Array of month names
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month, day, hour, and minute
  let month = months[date.getMonth()];
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Convert 24-hour time to 12-hour format
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours || 12; // the hour '0' should be '12'

  // Format the date and time
  let formattedDateTime = `${month} ${day}, ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${ampm}`;

  return formattedDateTime;
}

export const getWidthAndHeight = (count: number) => {
  let widthAndHeight = "";
  if (count !== undefined) {
    switch (true) {
      case count.toString().length === 1:
        widthAndHeight = "w-5 h-5";
        break;
      case count.toString().length === 2:
        widthAndHeight = "w-6 h-6";
        break;
      default:
        widthAndHeight = "w-8 h-8";
        break;
    }
  }
  return widthAndHeight;
};

export function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export const openResumeId = "open-resume-id";

export const userInfoInitialState = {
  id: "",
  handle: "",
  image: "",
  displayName: "",
  position: "",
};
export const calculateStreaks = (selectedDates: Date[]) => {
  if (!selectedDates || selectedDates.length === 0) {
    return;
  }

  let currentStreak = 1;
  let lastDate = new Date(selectedDates[selectedDates.length - 1]).getTime();

  for (let i = selectedDates.length - 2; i >= 0; i--) {
    const dateDiff = lastDate - new Date(selectedDates[i]).getTime();

    if (dateDiff === 86400000) {
      currentStreak++;
      lastDate -= 86400000;
    } else {
      break;
    }
  }

  return currentStreak;
};

export const countLoginDaysThisMonth = (selectedDates: Date[]): number => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const loginDaysThisMonth = selectedDates.filter((date) => {
    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  return loginDaysThisMonth.length;
};

export const countLoginDaysThisYear = (selectedDates: Date[]): number => {
  const currentYear = new Date().getFullYear();

  const loginDaysThisYear = selectedDates.filter((date) => {
    return date.getFullYear() === currentYear;
  });

  return loginDaysThisYear.length;
};

export function extractHourAndMinutes(timestamp: string) {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const timeString = date.toLocaleTimeString(undefined, options);

  return timeString;
}

export const publicUsers = [
  {
    id: "105969912095862826777",
    displayName: "Dr.Raghu Yuvaraj",
    handle: "RAGHU-YUVARAJ-0507",
    position: "HOD/Basic Science",
  },
  {
    id: "100876073230671297139",
    displayName: "Thameenansari S",
    handle: "thameenansari_s",
    position: "Executive Engineer",
  },
  {
    id: "x3AVJvnAMb",
    displayName: "Deepak  Sundaram Pillai T",
    handle: "deepak_pillai_9350",
    position: "UX-UI Designer | Graphic Designer",
  },
];

export const options = [
  "Choose one",
  "Youtube",
  "LinkedIn",
  "Instagram",
  "Twitter",
  "Facebook",
  "Referral",
  "Others",
];

export function getUsersPerPage(windowWidth: number) {
  if (windowWidth < 768) {
    return 18;
  } else if (windowWidth >= 768 && windowWidth < 1280) {
    return 20;
  } else {
    return 18;
  }
}

export const isValidEmailDomain = (email: string): boolean => {
  const userEmailDomain = email.split("@")[1];
  const allowedDomains =
    process.env.NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN!?.split(",");

  if (userEmailDomain === "gmail.com") {
    return false;
  }

  const shouldUseSetting = allowedDomains?.some((domain) =>
    email.endsWith(domain)
  );
  return shouldUseSetting;
};

export const mailingLists = [
  {
    id: 1,
    title: "UPI/Debit/Credit card Payment",
    note: "( Only for indian users )",
  },
  {
    id: 2,
    title: "Stripe Payment",
    note: "( Only for outside of india users )",
  },
];

export function getFirstLetter(text: string) {
  return text?.charAt(0).toUpperCase();
}

export function getRandomBgColor(text: string) {
  const color = stc(text?.toUpperCase());
  const rgb = hexToRgba(color, 0.8);
  return rgb;
}

export type userInfoProps = {
  id: string;
  handle: string;
  image: string;
  displayName: string;
  position: string;
};

export type MessageSidebarProps = {
  userInfo: userInfoProps;
};

export function MainMenuItemsOne(percentage: number) {
  const mainMenuItems = [
    { path: "/s/dashboard", icon: ChartBarIcon, label: DASHBOARD },
    { path: "/s/resumeEditor", icon: PencilAltIcon, label: EDITOR },
    {
      path: "/s/resume",
      icon: DocumentTextIcon,
      label: PREVIEW_RESUME,
      progress: percentage,
    },
  ];

  return mainMenuItems;
}
export function MainMenuItemsTwo(percentage: number) {
  const mainMenuItems = [
    { path: "/s/interview", icon: InterviewIcon, label: "Mock Interview" },
  ];

  return mainMenuItems;
}
export function MainMenuItemsThree(percentage: number) {
  const mainMenuItems = [
    {
      path: "/s/convert",
      icon: SyncSvg,
      label: CONVERT_RESUME,
      class: "w-5 h-5",
    },
    {
      path: "/s/portfolio",
      icon: BriefcaseIcon,
      label: PREVIEW_PORTFOLIO,
    },
    {
      path: "/s/leetLink",
      icon: RocketSvg,
      label: PREVIEW_LEET_LINK,
    },
    { path: "/s/messages", icon: ChatAlt2Icon, label: GET_MESSAGEs },
    { path: "/s/jobagent", icon: JobSvg, label: "Job Agent" },
    { path: "/s/course", icon: CoursesLeetLingoOutlineSvg, label: "Leet Prep" },
  ];

  return mainMenuItems;
}

export function MenuItemsOne(count: any) {
  const menuItems = [
    {
      label: REQUESTS,
      items: [
        {
          path: "/s/requests",
          icon: ArrowDownIcon,
          text: INCOMING_REQUEST,
          class: "rotate-45 transform w-5 h-5",
          counter: count.requestsCount,
        },
        {
          path: "/s/prospects",
          icon: ArrowUpIcon,
          text: OUTGOING_REQUEST,
          class: "rotate-45 transform w-5 h-5",
          counter: count.prospectCount,
        },
      ],
      defaultOpen: ["/s/requests", "/s/prospects"],
      icon: PaperAirplaneIcon,
      rotate: "rotate-45 transform",
      hasPending: count.pendingRequests,
    },
    {
      label: AI,
      items: [
        {
          path: "/s/aiResume",
          icon: AiSvg,
          text: AI_RESUME,
          class: "w-5 h-5",
        },
        {
          path: "/s/coverLetter",
          icon: CoverLetterSvg,
          text: COVERT_LETTER,
          class: "w-5 h-5",
        },
        {
          path: "/s/resumeIdeas",
          icon: LightBulbIcon,
          text: RESUME_IDEAS,
          class: "w-5 h-5",
        },
      ],
      defaultOpen: ["/s/aiResume", "/s/coverLetter", "/s/resumeIdeas"],
      icon: SparklesIcon,
      rotate: "rotate-0 transform",
    },
  ];
  return menuItems;
}
export function MenuItemsTwo(count: any) {
  const menuItems = [
    {
      label: CONNECTIONS,
      items: [
        {
          path: "/s/reviews",
          icon: StatusOnlineIcon,
          text: REVIEWS,
          class: "w-5 h-5",
          hasPending: count.pendingReviews,
        },
        {
          path: "/s/followers",
          icon: UserGroupIcon,
          text: CONNECT_FOLLOWERS,
          class: "w-5 h-5",
          counter: count.followers,
        },
        {
          path: "/s/following",
          icon: UserGroupIcon,
          text: CONNECT_FOLLOWING,
          class: "w-5 h-5",
          counter: count.following,
        },
        {
          path: "/s/colleagues",
          icon: UsersIcon,
          text: COLLEAGUES,
          class: "w-5 h-5",
          counter: count.colleagueCount,
        },
      ],
      defaultOpen: [
        "/s/reviews",
        "/s/followers",
        "/s/following",
        "/s/colleagues",
      ],
      icon: LinkIcon,
      rotate: "rotate-0 transform",
      hasPending: count.pendingReviews,
    },
    {
      label: ATTESTATION,
      items: [
        {
          path: "/s/requestAttestation",
          icon: ArrowDownIcon,
          text: INCOMING_REQUEST,
          class: "rotate-45 transform w-5 h-5",
          counter: count.attestationRequestCount,
        },
        {
          path: "/s/prospectAttestation",
          icon: ArrowUpIcon,
          text: OUTGOING_REQUEST,
          class: "rotate-45 transform w-5 h-5",
          counter: count.attestationProspectCount,
        },
      ],
      defaultOpen: ["/s/requestAttestation", "/s/prospectAttestation"],
      icon: DocumentSearchIcon,
      rotate: "rotate-0 transform",
      hasPending: count.pendingAttestation,
    },
  ];
  return menuItems;
}
export function MenuItemsThree(count: any) {
  const menuItems = [
    {
      label: SETTINGS,
      items: [
        {
          path: "/s/settings/privacy",
          icon: LockClosedIcon,
          text: RESUME_PRIVACY,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/claimUserHandle",
          icon: DocumentTextIcon,
          text: CLAIM_HANDLE,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/feedback",
          icon: FeedbackSvg,
          text: FEEDBACK,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/tokens",
          icon: TicketIcon,
          text: AVAILABLE_TOKENS,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/add-recovery-email",
          icon: MailIcon,
          text: ADD_RECOVERY_EMAIL,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/recover-old-account",
          icon: DatabaseIcon,
          text: RECOVER_OLD_ACC,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/referral-code",
          icon: GiftIcon,
          text: REFERRAL_CODE,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/private-share",
          icon: PaperClipIcon,
          text: PRIVATE_SHARE_LINK,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/update",
          icon: SyncSvg,
          text: SYNC,
          class: "w-5 h-5",
        },
        {
          path: "/s/settings/unsubscribe",
          icon: CreditCardIcon,
          text: UNSUBSCRIBE,
          class: "w-5 h-5",
        },
        {
          path: "",
          icon: LogoutIcon,
          text: LOGOUT,
          class: "w-5 h-5",
        },
      ],
      defaultOpen: [
        "/s/settings/privacy",
        "/s/settings/claimUserHandle",
        "/s/settings/tokens",
        "/s/settings/recover-old-account",
        "/s/settings/referral-code",
        "/s/settings/private-share",
        "/s/settings/add-recovery-email",
        "/s/settings/update",
        "/s/settings/unsubscribe",
      ],
      icon: CogIcon,
      rotate: "rotate-0 transform",
    },
  ];
  return menuItems;
}

export function BgAndTextColorChange(progress: number) {
  let color = "";
  switch (true) {
    case progress! < 56:
      color = "text-red-500 bg-red-50";
      break;
    case progress! >= 56 && progress! <= 80:
      color = "text-orange-500 bg-orange-50";
      break;
    default:
      color = "text-green-500 bg-green-50";
      break;
  }
  return color;
}

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");

  const visibleLocalPartLength = Math.min(3, localPart.length);

  const visibleLocalPart = localPart.substring(0, visibleLocalPartLength);

  const totalMaskedLength = Math.max(
    0,
    localPart.length - visibleLocalPartLength
  );

  const maskedLocalPart = `${visibleLocalPart}${"*".repeat(totalMaskedLength)}`;

  return `${maskedLocalPart}@${domain}`;
};

export const maskPhoneNumber = (phoneNumber: string): string => {
  const visiblePart = phoneNumber.slice(-3);
  const maskedPart = "*".repeat(8);
  return `${maskedPart}${visiblePart}`;
};

export const sanitizeResume = (resume: Resume): void => {
  if (resume.email) {
    resume.email = maskEmail(resume.email);
  }
  if (resume.phoneNumber) {
    resume.phoneNumber = maskPhoneNumber(resume.phoneNumber);
  }
};

export const defaultResumeValues = {
  address: "",
  email: "",
  currentCompany: "",
  position: "",
  phoneNumber: "",
  portfolioLink: "",
  description: "",
  hobbies: [],
  skills: [],
  causes: [],
  preferences: [],
};

const ensureValidDate = (date?: string, fallback: string = "2018-05") => {
  const dateFormatRegex = /^\d{4}-\d{2}$/;
  return date && dateFormatRegex.test(date) ? date : fallback;
};

export const ensureProjectsWork = (projects: Project[]) => {
  return projects.map((project) => {
    let { start, end } = project;

    const fallbackDate = new Date();
    const formattedFallbackDate = `${fallbackDate.getFullYear()}-${String(
      fallbackDate.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!start && !end) {
      start = formattedFallbackDate;
      fallbackDate.setMonth(fallbackDate.getMonth() + 1);
      end = `${fallbackDate.getFullYear()}-${String(
        fallbackDate.getMonth() + 1
      ).padStart(2, "0")}`;
    } else if (start && !end) {
      const startDate = new Date(start);
      startDate.setMonth(startDate.getMonth() + 1);
      end = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}`;
    } else if (!start && end) {
      const endDate = new Date(end);
      endDate.setMonth(endDate.getMonth() - 1);
      start = `${endDate.getFullYear()}-${String(
        endDate.getMonth() + 1
      ).padStart(2, "0")}`;
    }

    if (new Date(start) > new Date(end)) {
      const temp = start;
      start = end;
      end = temp;
    }

    return {
      ...project,
      id: guid(),
      name: project.name ?? "",
      skills: project.skills ?? [],
      company: project.company ?? "",
      title: project.title ?? "",
      start,
      end,
      checked: project.checked ?? false,
      impact: project.impact ?? "",
      work: project.work ? project.work : "",
    };
  });
};

export const ensureExperiences = (experiences: Experience[]) => {
  return experiences.map((experience) => {
    let { start, end } = experience;

    const currentDate = new Date();
    const fallbackStart = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;

    start = start ?? fallbackStart;

    if (!end && end !== "present") {
      const startDate = new Date(start);
      startDate.setMonth(startDate.getMonth() + 1);
      end = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}`;
    }

    if (end !== "present" && new Date(start) > new Date(end)) {
      const temp = start;
      start = end;
      end = temp;
    }

    return {
      ...experience,
      id: guid(),
      title: experience.title ?? "",
      company: experience.company ?? "",
      city: experience.city ?? "",
      start,
      end,
      description: experience.description ?? "",
      checked: experience.end === "Present" ? true : false,
    };
  });
};

export const ensureAwards = (awards: Award[]) => {
  return awards.map((award) => ({
    ...award,
    id: guid(),
    name: award.name ?? "",
    awardFor: award.awardFor ?? "",
    date: ensureValidDate(award.date, "2022-01"),
    description: award.description ?? "",
  }));
};

export const ensureEducations = (educations: Education[]): Education[] => {
  return educations.map((education) => ({
    ...education,
    id: guid(),
    start: ensureValidDate(education.start, "2018-01"),
    end: ensureValidDate(education.end, "2024-01"),
    major: education.major ?? "",
    name: education.name ?? "",
    degree: education.degree ?? "",
    grade: education.grade ?? "",
  }));
};

export const ensureCertificates = (certificates: Certificate[]) => {
  return certificates.map((certificate) => ({
    ...certificate,
    id: guid(),
    name: certificate.name ?? "",
    issuingOrganization:
      certificate.issuingOrganization !== "Unknown"
        ? certificate.issuingOrganization
        : "",
    issueDate: ensureValidDate(certificate.issueDate, "2019-01"),
    expirationDate: certificate.expirationDate ?? "",
    credentialID: certificate.credentialID ?? "",
    credentialURL: certificate.credentialURL ?? "",
  }));
};

export const ensurePatents = (patents: Patent[]) => {
  return patents.map((patent) => ({
    ...patent,
    id: guid(),
    title: patent.title ?? "",
    patentDescription: patent.patentDescription ?? "",
    patentIssueDate: ensureValidDate(patent.patentIssueDate, "2023-01"),
    patentNumber: patent.patentNumber ?? "",
    patentMembers: patent.patentMembers ?? [],
    isPatentIssued: patent.isPatentIssued ?? false,
    patentURL: patent.patentURL ?? "",
  }));
};

export const ensureLanguages = (languages: Language[]) => {
  return languages.map((language) => ({
    ...language,
    id: guid(),
    name: language.name ?? "",
    read: language.read ?? false,
    write: language.write ?? false,
    speak: language.speak ?? false,
  }));
};

export const ensureSocialMedia = (socialMedia: SocialMedia[]) => {
  return socialMedia.map((profile) => ({
    ...profile,
    id: guid(),
    name: profile.name ?? "",
    socialMediaUrl: profile.socialMediaUrl ?? "",
  }));
};

export const ensureCourses = (courses: Course[]) => {
  return courses.map((course) => ({
    ...course,
    id: guid(),
    name: course.name ?? "",
    start: ensureValidDate(course.start, "2023-03"),
    end: ensureValidDate(course.end, "2023-04"),
    coursePlatform: course.coursePlatform ?? "",
    courseId: course.courseId ?? "",
    certificateLink: course.certificateLink ?? "",
  }));
};

export const ensureCauses = (causes: string[]) => causes ?? [];

export const ensureHobbies = (hobbies: string[]) => hobbies ?? [];

export const ensurePublications = (publications: Publication[]) => {
  return publications.map((publication) => ({
    ...publication,
    id: guid(),
    title: publication.title ?? "",
    publisher: publication.publisher ?? "",
    publicationDate:
      publication.publicationDate !== "Unknown"
        ? publication.publicationDate
        : "2022-01",
    publicationURL: publication.publicationURL ?? "",
    description: publication.description ?? "",
  }));
};
export interface GeneratedDescriptions {
  [key: string]: string;
}

export const reUsableRefiner = async (
  title: string,
  description: string,
  section: string
) => {
  const resp = await fetch("/api/openai/resumes/generatedDescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      section,
    }),
  });
  const response = await resp.json();
  return response;
};

export function convertTimestamp(timestamp: any) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(timestamp._seconds * 1000);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export const handleNavigation = (
  path: string,
  status: string,
  router: NextRouter
) => {
  const redirectToSignin = (queryParams: string) => {
    return router.push(
      `/auth/signin?${queryParams}&redirect=${path}?${queryParams}`
    );
  };

  if (status === "unauthenticated") {
    const {
      marketing_program,
      influencer,
      launch,
      showcase,
      leetLink_source,
      email,
      ai_resume,
      convert_resume,
      jobs,
      mock_interview,
      messages,
      leet_link,
      cover_letter,
      resume_ideas,
    } = router.query;

    switch (true) {
      case launch === "true":
        if (marketing_program) {
          return redirectToSignin(
            `marketing_program=${marketing_program}&launch=true`
          );
        }
        if (influencer) {
          return redirectToSignin(`influencer=${influencer}&launch=true`);
        }
        return redirectToSignin(`launch=true`);

      case showcase === "true":
        return redirectToSignin(`showcase=true`);

      case email === "true":
        return redirectToSignin(`email=true`);

      case ai_resume === "true":
        return redirectToSignin(`ai_resume=true`);

      case convert_resume === "true":
        return redirectToSignin(`convert_resume=true`);

      case jobs === "true":
        return redirectToSignin(`jobs=true`);

      case mock_interview === "true":
        return redirectToSignin(`mock_interview=true`);

      case messages === "true":
        return redirectToSignin(`messages=true`);

      case leet_link === "true":
        return redirectToSignin(`leet_link=true`);

      case cover_letter === "true":
        return redirectToSignin(`cover_letter=true`);

      case resume_ideas === "true":
        return redirectToSignin(`resume_ideas=true`);

      case Boolean(marketing_program):
        return redirectToSignin(`marketing_program=${marketing_program}`);

      case Boolean(influencer):
        return redirectToSignin(`influencer=${influencer}`);

      case Boolean(leetLink_source):
        return redirectToSignin(`leetLink_source=${leetLink_source}`);

      default:
        return redirectToSignin(``);
    }
  }

  router.push(path);
};

export const handleHref = (path: string, router: NextRouter) => {
  const {
    marketing_program,
    influencer,
    launch,
    showcase,
    leetLink_source,
    email,
    ai_resume,
    convert_resume,
    jobs,
    mock_interview,
    messages,
    leet_link,
    cover_letter,
    resume_ideas,
  } = router.query;

  switch (true) {
    case launch === "true":
      if (!marketing_program && !influencer) {
        return `${path}?launch=true`;
      } else if (marketing_program && !influencer) {
        return `${path}?marketing_program=${marketing_program}&launch=true`;
      } else if (influencer && !marketing_program) {
        return `${path}?influencer=${influencer}&launch=true`;
      }
      break;

    case showcase === "true":
      return `${path}?showcase=true`;

    case email === "true":
      return `${path}?email=true`;

    case ai_resume === "true":
      return `${path}?ai_resume=true`;

    case convert_resume === "true":
      return `${path}?convert_resume=true`;

    case jobs === "true":
      return `${path}?jobs=true`;

    case mock_interview === "true":
      return `${path}?mock_interview=true`;

    case messages === "true":
      return `${path}?messages=true`;

    case leet_link === "true":
      return `${path}?leet_link=true`;

    case cover_letter === "true":
      return `${path}?cover_letter=true`;

    case resume_ideas === "true":
      return `${path}?resume_ideas=true`;

    case !!leetLink_source:
      return `${path}?leetLink_source=${leetLink_source}`;

    default:
      return path;
  }
};

export const handleSource = (router: NextRouter) => {
  const {
    marketing_program,
    influencer,
    launch,
    showcase,
    email,
    ai_resume,
    convert_resume,
    jobs,
    mock_interview,
    messages,
    leet_link,
    cover_letter,
    resume_ideas,
  } = router.query;

  switch (true) {
    case launch === "true" &&
      (typeof influencer === "string" || typeof marketing_program === "string"):
      return (influencer ?? marketing_program) as string;

    case showcase === "true":
      return "portfolio-launch";

    case email === "true":
      return "email-launch";

    case ai_resume === "true":
      return "ai-resume-launch";

    case convert_resume === "true":
      return "convert-resume-launch";

    case jobs === "true":
      return "jobs-launch";

    case mock_interview === "true":
      return "mock-interview-launch";

    case messages === "true":
      return "messages-launch";

    case leet_link === "true":
      return "leet-link-launch";

    case cover_letter === "true":
      return "cover-letter-launch";

    case resume_ideas === "true":
      return "resume-ideas-launch";

    default:
      return "organic";
  }
};

export const fresher = [
  "displayName",
  "specialization",
  "industry",
  "areaOfInterest",
];

export const experience = [
  "displayName",
  "position",
  "industry",
  "expertize",
  "yoe",
];
export function determineHighlightOrFadeClass(
  count: number,
  hasOtherSortedProjectsMatch: boolean
) {
  if (count > 0) {
    return "project-highlight";
  } else if (hasOtherSortedProjectsMatch) {
    return "background-fade hover:opacity-100 print:hidden callout-bg";
  }
  return "";
}

interface ProjectWithMatchCount extends Project {
  matchCount: number;
}
export interface ExperienceWithMatchCount extends Experience {
  matchCount: number;
}
export function calculateAndSortProjects(
  projects: Project[],
  selectedSkills: string[]
): ProjectWithMatchCount[] {
  const projectsWithMatchCount = projects?.map(
    (project): ProjectWithMatchCount => {
      const matchCount =
        (project?.skills ?? []).reduce((count, skill) => {
          return selectedSkills?.includes(skill?.toLowerCase())
            ? count + 1
            : count;
        }, 0) ?? 0;
      return { ...project, matchCount };
    }
  );

  const sorted = projectsWithMatchCount.sort(
    (a, b) => b?.matchCount! - a?.matchCount!
  );

  return sorted;
}
export function calculateAndSortExperiences(
  experiences: Experience[],
  selectedSkills: string[]
): ExperienceWithMatchCount[] {
  const experienceWithMatchCount = experiences?.map(
    (experience): ExperienceWithMatchCount => {
      const matchCount =
        (experience?.skills ?? []).reduce((count, skill) => {
          return selectedSkills?.includes(skill?.toLowerCase())
            ? count + 1
            : count;
        }, 0) ?? 0;
      return { ...experience, matchCount };
    }
  );

  const sorted = experienceWithMatchCount?.sort(
    (a, b) => b?.matchCount! - a?.matchCount!
  );
  return sorted;
}

export const setSocialMediaIcon = (value: string) => {
  switch (value) {
    case "linkedin":
      return LinkedinCircleSvg;
    case "github":
      return GithubSvg;
    case "instagram":
      return InstagramCircleSvg;
    case "facebook":
      return FacebookCircleSvg;
    case "twitter":
      return TwitterCircleSvg;
    case "x":
      return TwitterCircleSvg;
    case "youtube":
      return YoutubeCircleSvg;
    case "pinterest":
      return PinterestSvg;
    case "threads":
      return ThreadsSvg;
    default:
      return BlogLogoSvg;
  }
};

export const scrollTo = (
  dir: "up" | "down",
  contentRef: React.RefObject<HTMLDivElement>
) => {
  const scrollValue = dir === "up" ? 0 : contentRef.current?.scrollHeight;
  contentRef.current?.scrollTo({
    top: scrollValue,
    behavior: "smooth",
  });
};

export const calculateTotalExperience = (exp: Experience[]) => {
  let totalExperience = 0;
  const currentDate = new Date();

  if (!exp) {
    return totalExperience;
  }

  exp?.forEach((experience: Experience) => {
    if (experience.start) {
      const startDate = new Date(experience.start);
      const endDate = experience.end ? new Date(experience.end) : currentDate;
      const experienceYears = endDate.getFullYear() - startDate.getFullYear();
      totalExperience += experienceYears;
    }
  });

  return totalExperience;
};

export const calculateTotalProjects = (projects: Project[]) => {
  if (!projects) {
    return 0;
  }
  return projects.length;
};

export const calculateTotalAwards = (awards: Award[]) => {
  if (!awards) {
    return 0;
  }
  return awards.length;
};

export const checkValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const portfolioTimelinetabs = [
  { id: 0, label: "Experience" },
  { id: 1, label: "Education" },
];

export const checkExperienceDetails = (experiences: Experience[]) => {
  if (experiences?.length) {
    return experiences.some((exp) => exp.title && exp.company);
  }
  return false;
};
export function validateEmail(email: string) {
  const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return regex.test(email);
}

export const contactMeDesc = [
  "Feel free to reach out for any inquiries or collaboration opportunities—let's create something amazing together!",
  "Have a question or project in mind? Contact me, and let's turn your ideas into reality!",
  "I'm always open to new challenges and collaborations. Drop me a message, and let's get started!",
  "Got a question or a brilliant idea? Get in touch with me today, and let's make it happen!",
  "Whether you have a project in mind or just want to say hello, I'm just a message away!",
  "Let's connect and explore how we can work together to achieve great things. Contact me now!",
  "I'm excited to hear from you! Reach out for any inquiries, feedback, or opportunities to collaborate.",
  "Ready to take the next step? Contact me, and let's discuss how we can work together!",
  "Your ideas and questions are important to me. Reach out, and let's start a conversation!",
  "Looking forward to collaborating or simply catching up. Drop me a line, and let's chat!",
];

export const awardInitialState = {
  id: "",
  description: "",
  name: "",
  date: "",
  awardFor: "",
};

export type MobileTierProps = {
  name: string;
  id: string;
  order_id: string;
  href: string;
  priceMonthly: string;
  price: {
    monthly: string;
    annually: string;
    semiAnnually: string;
  };
  description: string;
  features: string[];
  mostPopular: boolean;
  plan: string;
  percentageSaved?: {
    semiAnnually: string;
    annually: string;
  };
  tokens?: {
    monthly: string;
    semiAnnually: string;
    annually: string;
  };
};

export function showPricingInfo(t: any) {
  const tiers: MobileTierProps[] = [
    {
      name: t("free"),
      id: t("tierFree"),
      order_id: "0",
      href: "#",
      priceMonthly: t("freePriceMonthly"),
      price: { monthly: "", annually: "", semiAnnually: "" },
      description: t("freeDescription"),
      features: [
        t("portfolioForYourResume"),
        t("freeFreeFeaturePrivateResume"),
        t("freeFeatureShareYourResume"),
        t("freeFeatureGet10Resume"),
        t("freeFeatureLimitedResumeSearch"),
        t("freeFeatureLimitedActiveReviews"),
        t("freeFeatureAttestationRequests"),
        t("2500Tokens"),
        t("accessProFeature"),
        t("5courseHearts"),
      ],
      mostPopular: false,
      plan: t("monthlyPlan"),
    },
    {
      name: t("premiumPlanType"),
      id: t("premiumPlanType"),
      href: "#",
      order_id: "1",
      priceMonthly: t("monthlyPrice"),
      price: {
        monthly: `${comparingTimeZone ? "430" : "5"}`,
        semiAnnually: `${comparingTimeZone ? "301"! : "3.6"}`,
        annually: `${comparingTimeZone ? "279.5" : "3.3"}`,
      },
      description: t("premiumDescription"),
      percentageSaved: {
        semiAnnually: "30",
        annually: "35",
      },
      tokens: {
        monthly: "15000",
        semiAnnually: "30000",
        annually: "80000",
      },
      features: [
        t("accessToAllJobs"),
        t("portfolioForYourResume"),
        t("monthlyFeaturePrivateResume"),
        t("monthlyFeatureShareYourResume"),
        t("monthlyFeatureGet10Resume"),
        t("monthlyFeatureLimitedResumeSearch"),
        t("monthlyFeaturePremiumActiveReviews"),
        t("premiumFeatureAttestationRequests"),
        t("viewingOthersPortfolio"),
        t("100courseHearts"),
      ],
      mostPopular: true,
      plan: t("monthlyPlan"),
    },
    {
      name: t("proPlanType"),
      id: t("proPlanType"),
      href: "#",
      order_id: "2",
      priceMonthly: t("monthlyPrice"),
      price: {
        monthly: `${comparingTimeZone ? "1261.14" : "15"}`,
        semiAnnually: `${comparingTimeZone ? "882.66"! : "10.5"}`,
        annually: `${comparingTimeZone ? "819.65" : "9.6"}`,
      },
      description: t("proDescription"),
      percentageSaved: {
        semiAnnually: "30",
        annually: "35",
      },
      tokens: {
        monthly: "25000",
        semiAnnually: "40000",
        annually: "100000",
      },
      features: [
        t("mockInterviewPractice"),
        t("accessToAllJobs"),
        t("portfolioForYourResume"),
        t("monthlyFeaturePrivateResume"),
        t("leetLinkFeature"),
        t("monthlyFeatureShareYourResume"),
        t("monthlyFeatureGet10Resume"),
        t("monthlyFeatureLimitedResumeSearch"),
        t("monthlyFeatureProActiveReviews"),
        t("aiReview"),
        t("proFeatureAttestationRequests"),
        t("viewingOthersPortfolio"),
        t("unlimitedCourseHearts"),
      ],
      mostPopular: false,
      plan: t("monthlyPlan"),
    },
  ];

  return tiers;
}

type Feature = {
  name: string;
  included: boolean | string;
  tokens?: {
    monthly: string;
    annually: string;
    semiAnnually: string;
  };
};

export type DesktopTierProps = {
  id: string;
  title: string;
  price: {
    monthly: string;
    annually: string;
    semiAnnually: string;
  };
  order_id: string;
  features: Feature[];
  percentageSaved?: {
    semiAnnually: string;
    annually: string;
  };
  popular: boolean;
};

export const pricingOptionsLgDevices = (t: any) => {
  const pricingOptions: DesktopTierProps[] = [
    {
      id: t("tierFree"),
      title: t("free"),
      price: {
        monthly: "",
        annually: "",
        semiAnnually: "",
      },
      order_id: "0",
      features: [
        { name: t("mockInterviewPractice"), included: false },
        { name: t("accessToAllJobs"), included: false },
        { name: t("portfolioForYourResume"), included: true },
        { name: t("privateResume"), included: true },
        { name: t("leetLinkFeature"), included: false },
        { name: t("resumeShare"), included: true },
        { name: t("resumeRequests"), included: "Unlimited" },
        { name: t("resumeSearches"), included: "Unlimited" },
        { name: t("aiReviewForYourResume"), included: false },
        { name: t("activeResumeReviews"), included: "10" },
        { name: t("projectAttestationRequests"), included: "10" },
        { name: t("viewingOthersPortfolio"), included: false },
        { name: t("tokensToUseAiFeatures"), included: "2500" },
        { name: t("courseHearts"), included: "5" },
      ],
      popular: false,
    },
    {
      id: t("premiumPlanType"),
      title: t("starter"),
      order_id: "1",
      price: {
        monthly: `${comparingTimeZone ? "430" : "5"}`,
        semiAnnually: `${comparingTimeZone ? "301"! : "3.6"}`,
        annually: `${comparingTimeZone ? "279.5" : "3.3"}`,
      },
      percentageSaved: {
        semiAnnually: "30",
        annually: "35",
      },
      features: [
        { name: t("mockInterviewPractice"), included: false },
        { name: t("accessToAllJobs"), included: true },
        { name: t("portfolioForYourResume"), included: true },
        { name: t("privateResume"), included: true },
        { name: t("leetLinkFeature"), included: false },
        { name: t("resumeShare"), included: true },
        { name: t("resumeRequests"), included: "Unlimited" },
        { name: t("resumeSearches"), included: "Unlimited" },
        { name: t("aiReviewForYourResume"), included: true },
        { name: t("activeResumeReviews"), included: "20" },
        { name: t("projectAttestationRequests"), included: "20" },
        { name: t("viewingOthersPortfolio"), included: true },
        {
          name: t("tokensToUseAiFeatures"),
          included: "",
          tokens: {
            monthly: "15000",
            semiAnnually: "30000",
            annually: "80000",
          },
        },
        { name: t("courseHearts"), included: "100" },
      ],
      popular: true,
    },
    {
      id: t("proPlanType"),
      title: t("proPlanType"),
      order_id: "2",
      price: {
        monthly: `${comparingTimeZone ? "1261.14" : "15"}`,
        semiAnnually: `${comparingTimeZone ? "882.66"! : "10.5"}`,
        annually: `${comparingTimeZone ? "819.65" : "9.6"}`,
      },
      percentageSaved: {
        semiAnnually: "30",
        annually: "35",
      },
      features: [
        { name: t("mockInterviewPractice"), included: true },
        { name: t("accessToAllJobs"), included: true },
        { name: t("portfolioForYourResume"), included: true },
        { name: t("privateResume"), included: true },
        { name: t("leetLinkFeature"), included: true },
        { name: t("resumeShare"), included: true },
        { name: t("resumeRequests"), included: "Unlimited" },
        { name: t("resumeSearches"), included: "Unlimited" },
        { name: t("aiReviewForYourResume"), included: true },
        { name: t("activeResumeReviews"), included: "Unlimited" },
        { name: t("projectAttestationRequests"), included: "Unlimited" },
        { name: t("viewingOthersPortfolio"), included: true },
        {
          name: t("tokensToUseAiFeatures"),
          included: "",
          tokens: {
            monthly: "25000",
            semiAnnually: "40000",
            annually: "100000",
          },
        },
        { name: t("courseHearts"), included: "Unlimited" },
      ],
      popular: false,
    },
  ];

  return pricingOptions;
};

export const getAiResumeBlogContent = (t: any) => {
  const content = {
    title: t("aiResume"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("introduction"),
        text: t("introDescription"),
      },
      {
        title: t("understandingAiResume"),
        text: t("understandingAiResumeDesc"),
      },
      {
        title: t("howItWorks"),
        text: t("howItWorksDesc"),
      },
      {
        title: t("keyBenefits"),
        text: "",
        list: [
          { title: t("advanced"), text: t("advancedDesc") },
          { title: t("timeEfficiency"), text: t("timeEfficiencyDesc") },
          { title: t("strategic"), text: t("strategicDesc") },
          { title: t("dataDriven"), text: t("dataDrivenDesc") },
        ],
      },
      {
        title: t("futureOfResume"),
        text: t("futureOfResumeDesc"),
      },
    ],
    image:
      "https://writesea.com/wp-content/uploads/2023/05/Asset-2@3x-1024x692.png",
    buttonUrl: "/s/aiResume",
  };

  return content;
};

export const getResumeIdeasBlogContent = (t: any) => {
  const content = {
    title: t("resumeImprovementIdeas"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("customizedEnhancements"),
        text: t("customizedEnhancementsDesc"),
      },
      {
        title: t("howItWorks"),
        text: t("howItWorksDesc"),
      },
      {
        title: t("intelligentMatching"),
        text: t("intelligentMatchingDesc"),
      },
      {
        title: t("downloadableResults"),
        text: "",
        list: [
          { title: t("customization"), text: t("customizationDesc") },
          { title: t("compatibility"), text: t("compatibilityDesc") },
          { title: t("convenience"), text: t("convenienceDesc") },
        ],
      },
      {
        title: t("futureOfAI"),
        text: t("futureOfAIDesc"),
      },
    ],
    image:
      "https://images.unsplash.com/photo-1602407294553-6ac9170b3ed0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    buttonUrl: "/s/resumeIdeas",
  };

  return content;
};

export const getConvertResumeBlogContent = (t: any) => {
  const content = {
    title: t("convertResume"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("introduction"),
        text: t("introDescription"),
      },
      {
        title: t("whyConvert"),
        text: t("whyConvertDesc"),
      },
      {
        title: t("howItWorks"),
        text: t("howItWorksDesc"),
      },
      {
        title: t("keyBenefits"),
        text: "",
        list: [
          { title: t("professionalAppeal"), text: t("professionalAppealDesc") },
          {
            title: t("contentOptimization"),
            text: t("contentOptimizationDesc"),
          },
          { title: t("atsCompatibility"), text: t("atsCompatibilityDesc") },
          { title: t("quickTurnaround"), text: t("quickTurnaroundDesc") },
        ],
      },
      {
        title: t("futureOfResume"),
        text: t("futureOfResumeDesc"),
      },
    ],
    image:
      "https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0821be71-106b-4fcb-9464-2b96eb45d66c_854x360.jpeg",
    buttonUrl: "/s/convert",
  };

  return content;
};

export const getCoverLetterBlogContent = (t: any) => {
  const content = {
    title: t("coverLetter"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("whyCustomCoverLetter"),
        text: t("whyCustomCoverLetterDesc"),
      },
      {
        title: t("aiDrivenCoverLetter"),
        text: t("aiDrivenCoverLetterDesc"),
      },
      {
        title: t("howItWorks"),
        text: t("howItWorksDesc"),
      },
      {
        title: t("keyFeatures"),
        text: "",
        list: [
          { title: t("personalization"), text: t("personalizationDesc") },
          { title: t("atsFriendly"), text: t("atsFriendlyDesc") },
          { title: t("downloadable"), text: t("downloadableDesc") },
          { title: t("speed"), text: t("speedDesc") },
        ],
      },
      {
        title: t("futureEnhancements"),
        text: t("futureEnhancementsDesc"),
      },
    ],
    image:
      "https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80",
    buttonUrl: "/s/coverLetter",
  };

  return content;
};

export const getInterviewGuideBlogContent = (t: any) => {
  const content = {
    title: t("interviewGuide"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("introduction"),
        text: t("introDescription"),
      },
      {
        title: t("preparingForTheInterview"),
        text: t("preparingForTheInterviewDesc"),
      },
      {
        title: t("duringTheInterview"),
        text: t("duringTheInterviewDesc"),
      },
      {
        title: t("commonInterviewQuestions"),
        text: t("commonInterviewQuestionsDesc"),
      },
      {
        title: t("postInterviewFollowUp"),
        text: t("postInterviewFollowUpDesc"),
      },
      {
        title: t("tipsForSuccess"),
        text: "",
        list: [
          { title: t("researchCompany"), text: t("researchCompanyDesc") },
          { title: t("practiceAnswers"), text: t("practiceAnswersDesc") },
          {
            title: t("dressProfessionally"),
            text: t("dressProfessionallyDesc"),
          },
          { title: t("stayCalm"), text: t("stayCalmDesc") },
        ],
      },
      {
        title: t("futureOfInterviews"),
        text: t("futureOfInterviewsDesc"),
      },
    ],
    image:
      "https://blogimage.vantagecircle.com/content/images/2023/03/interview-questions-for-culture-fit.png",
  };

  return content;
};

export const getJobSearchTipsBlogContent = (t: any) => {
  const content = {
    title: t("jobSearchTips"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("introduction"),
        text: t("introDescription"),
      },
      {
        title: t("resumeAndCoverLetter"),
        text: t("resumeAndCoverLetterDesc"),
      },
      {
        title: t("networking"),
        text: t("networkingDesc"),
      },
      {
        title: t("onlineJobPortals"),
        text: t("onlineJobPortalsDesc"),
      },
      {
        title: t("interviewPreparation"),
        text: t("interviewPreparationDesc"),
      },
      {
        title: t("tipsForSuccess"),
        text: "",
        list: [
          { title: t("setGoals"), text: t("setGoalsDesc") },
          { title: t("stayOrganized"), text: t("stayOrganizedDesc") },
          { title: t("followUp"), text: t("followUpDesc") },
          { title: t("continuousLearning"), text: t("continuousLearningDesc") },
        ],
      },
      {
        title: t("futureOfJobSearch"),
        text: t("futureOfJobSearchDesc"),
      },
    ],
    image:
      "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2019/01/10133428/job-search-1024x512.png",
  };

  return content;
};

export const getChatGPTJobGuideContent = (t: any) => {
  const content = {
    title: t("chatGptJobGuide"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("introduction"),
        text: t("introDescription"),
      },
      {
        title: t("usingChatGptForResume"),
        text: t("usingChatGptForResumeDesc"),
      },
      {
        title: t("coverLetterWriting"),
        text: t("coverLetterWritingDesc"),
      },
      {
        title: t("jobSearchStrategies"),
        text: t("jobSearchStrategiesDesc"),
      },
      {
        title: t("interviewPreparation"),
        text: t("interviewPreparationDesc"),
      },
      {
        title: t("tipsForSuccess"),
        text: "",
        list: [
          { title: t("personalization"), text: t("personalizationDesc") },
          {
            title: t("practiceMakesPerfect"),
            text: t("practiceMakesPerfectDesc"),
          },
          { title: t("feedbackLoop"), text: t("feedbackLoopDesc") },
          { title: t("stayUpdated"), text: t("stayUpdatedDesc") },
        ],
      },
      {
        title: t("futureOfChatGpt"),
        text: t("futureOfChatGptDesc"),
      },
    ],
    image: "https://www.axiateam.com/wp-content/uploads/2023/12/Chat-Gpt.jpg",
  };

  return content;
};

export const getCaseStudiesBlogContent = (t: any) => {
  const content = {
    title: t("caseStudies"),
    description: {
      title: t("title"),
      text: t("description"),
      conclusion: t("conclusion"),
    },
    sections: [
      {
        title: t("introduction"),
        text: t("introDescription"),
      },
      {
        title: t("onlineResumeSuccess"),
        text: t("onlineResumeSuccessDesc"),
      },
      {
        title: t("jobSearchStrategies"),
        text: t("jobSearchStrategiesDesc"),
      },
      {
        title: t("interviewPreparation"),
        text: t("interviewPreparationDesc"),
      },
      {
        title: t("keyInsights"),
        text: "",
        list: [
          { title: t("personalization"), text: t("personalizationDesc") },
          { title: t("technologyAdoption"), text: t("technologyAdoptionDesc") },
          {
            title: t("networkingImportance"),
            text: t("networkingImportanceDesc"),
          },
          {
            title: t("continuousImprovement"),
            text: t("continuousImprovementDesc"),
          },
        ],
      },
      {
        title: t("futureTrends"),
        text: t("futureTrendsDesc"),
      },
    ],
    image:
      "https://trulyfinancial.com/wp-content/uploads/2022/02/TFblog-1-839x503@2x.jpg",
  };

  return content;
};

export const coverLetterResponsiveClasses = (
  isEditing: boolean,
  isSideBarClosed: boolean
) => {
  if (isEditing) {
    const classes = isSideBarClosed
      ? "lg:max-w-4xl xl:max-w-5xl"
      : "lg:max-w-2xl xl:max-w-4xl";
    return classes;
  } else if (!isEditing) {
    const classes = isSideBarClosed
      ? "lg:max-w-xl xl:max-w-[52rem] 2xl:max-w-4xl"
      : "lg:max-w-md xl:max-w-[40rem] 2xl:max-w-3xl";
    return classes;
  }
};
export interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export const formatFirestoreTimestamp = (timestamp?: Timestamp): string => {
  if (!timestamp) {
    return "";
  }

  const time =
    (timestamp._seconds + timestamp._nanoseconds * 0.00000001) * 1000;
  const newDate = new Date(time);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(newDate);

  const dateParts = formattedDate.split(" ");
  return `${dateParts[0]} ${dateParts[1]}, ${dateParts[2]}`;
};

export type PricePlanMap = {
  [key: string]: string;
};

export const priceToPlanMap: PricePlanMap = {
  "600": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_600!,
  "1500": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1500!,

  "166.36": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_16636!,
  "1829.91": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_182991!,
  "831.78.36": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_83178!,
  "9565.42": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_956542!,

  "430": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_430!,
  "294.27": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_29427!,
  "210.19": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_21019!,
  "840.76": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_84076!,
  "1261.14": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_126114!,
  "1135.03": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_681018!,

  "500": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_500!,
  "375": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_375!,

  "301": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_1806!,
  "279.5": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_3354!,

  "882.66": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_5296!,
  "819.65": process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_9836!,
};

export const formatPurchasedPlan = (plan: number, paidBy: string) => {
  if (!plan || !paidBy) {
    return null;
  }

  const conversionMap: { [key: number]: number } = {
    200: 166.36,
    2200: 1829.91,
    1000: 831.78,
    11500: 9565.42,

    500: 430,
    2100: 1765.62,
    1500: 1500,
    8100: 6809.64,
    12000: 10088.28,

    3000: 3000, // inr
    5400: 4500, // inr

    2138: 1806, // usd
    27950: 3354, // usd

    88266: 5296, // usd
    81965: 9836, // usd

    600: 600, // inr
  };

  if (comparingTimeZone) {
    return conversionMap[plan] || plan;
  } else {
    if (paidBy === "Stripe") {
      return plan / 100;
    }
    return plan;
  }
};

export const handleSubscriptionCheck = async (
  url: string,
  subscriptionId: string
) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subscription_id: subscriptionId }),
  });

  return await res.json();
};

type GroupedMessages = {
  [date: string]: Message[];
};

export const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((acc: GroupedMessages, message: Message) => {
    const date = new Date(message.messagedAt).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {});
};

export const validId = (id: string) => {
  const uppercaseId = id.toUpperCase();
  return uppercaseId !== "NIL" && uppercaseId !== "NA" && uppercaseId !== "N/A";
};

export const publicFeatures = (t: any) => {
  const features = [
    {
      name: "Mock Interview",
      href: "/interview",
      icon: InterviewIcon,
      description: "Ace your Interview practice.",
    },
    {
      name: t("aiResume"),
      href: "/aiResume",
      icon: SparklesIcon,
      description: "Create AI powered resume.",
    },
    {
      name: t("convertResume"),
      href: "/convertResume",
      icon: RefreshIcon,
      description: "Convert your resumes.",
    },
    {
      name: t("coverLetter"),
      href: "/coverLetter",
      icon: CoverLetterSvg,
      description: "Create cover letters.",
    },
    {
      name: t("resumeIdeas"),
      href: "/resumeIdeas",
      icon: LightBulbIcon,
      description: "Boost your resume ideas.",
    },
    {
      name: t("portfolio"),
      href: "/portfolio",
      icon: BriefcaseIcon,
      description: "Showcase your work.",
    },
    {
      name: t("messages"),
      href: "/messages",
      icon: MailIcon,
      description: "Check your messages.",
    },
    {
      name: "Requests",
      href: "/requests",
      icon: UserGroupIcon,
      description: "Manage your requests.",
    },
    {
      name: "Attestation",
      href: "/attestation",
      icon: ShieldCheckIcon,
      description: "Verify your credentials.",
    },
    {
      name: "Reviews",
      href: "/reviews",
      icon: StarIcon,
      description: "Manage user feedback.",
    },
  ];
  return features;
};

export const publicResources = (t: any) => {
  const resources = [
    {
      name: "Interview Guides",
      href: "/interviewGuides",
      icon: BookOpenIcon,
      description: "Ace your interviews.",
    },
    {
      name: "Job Search Tips",
      href: "/jobSearchTips",
      icon: SearchIcon,
      description: "Enhance your job search.",
    },
    {
      name: "Chat-GPT Guides",
      href: "/chatgptGuides",
      icon: ChatIcon,
      description: "Utilize Chat-GPT effectively.",
    },
    {
      name: "Case Studies",
      href: "/caseStudies",
      icon: DocumentSearchIcon,
      description: "Inspire your resume.",
    },
  ];
  return resources;
};

export const publicCompany = (t: any) => {
  const company = [
    {
      name: "About",
      href: "/about",
      icon: InformationCircleIcon,
      description: "Discover our mission and values.",
    },
    {
      name: "Blog",
      href: "/blog",
      icon: PencilAltIcon,
      description: "Read our latest articles and updates.",
    },
    {
      name: "Contact Us",
      href: "/contact",
      icon: MailIcon,
      description: "Reach out to us for support & inquiries.",
    },
  ];
  return company;
};

export function convertFirestoreTimestampToDate(timestamp: {
  _seconds: number;
  _nanoseconds: number;
}) {
  return new Date(
    timestamp?._seconds * 1000 + timestamp?._nanoseconds / 1000000
  );
}

export function getDifferenceInDays(date1: Date, date2: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / oneDay);
  return diffInDays;
}

export const handlePortfolioShowcase = (path: string, router: NextRouter) => {
  const { showcase } = router.query;
  if (showcase === "true") {
    return router.push(`${path}?showcase=true`);
  } else {
    return router.push(path);
  }
};

export const portfolioData = [
  {
    title: "Showcase Your Work with a Professional Portfolio",
    imageUrl: "/assets/lottie/ai-business-portfolio.json",
    description:
      "Having a professional portfolio allows you to showcase your work, skills, and accomplishments in a visually appealing and organized manner. Our AI-powered tools help you create a stunning portfolio that highlights your best projects and achievements. This not only makes it easier for recruiters and hiring managers to see your capabilities at a glance but also sets you apart from other candidates. By presenting your work effectively, you can leave a lasting impression and significantly increase your chances of landing your desired job.",
    linkUrl: "#",
    linkText: "",
  },
  {
    title: "Enhance Your Online Presence and Personal Brand",
    description:
      "A well-crafted portfolio enhances your online presence and strengthens your personal brand. Our AI tools help you organize your portfolio content, ensuring it reflects your professional journey and skills accurately. By maintaining a polished and up-to-date portfolio, you can attract more opportunities and network effectively within your industry. This continuous optimization and presentation of your portfolio demonstrate your commitment to your career and professional growth, making you a more attractive candidate to potential employers.",
    linkUrl: "#",
    linkText: "",
    imageUrl: "/assets/lottie/ai-online-correspondence.json",
    reverse: true,
    listItems: [
      "Strengthens your personal brand",
      "Attracts more opportunities",
      "Demonstrates commitment to career growth",
    ],
  },
];

export const aiData = [
  {
    title: "Effortless Resume Creation with Minimal Details",
    description:
      "Add minimal details like your name, industry, expertise, experience, and position, and our AI will craft a polished resume for you. Our AI ensures that your resume is tailored to your target job function, making it more relevant and impactful. Stand out from the competition and increase your chances of getting noticed by hiring managers.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/ai-cv-assessment.json",
    linkText: "",
  },
  {
    title: "Highlight Your Skills Effectively",
    description:
      "Select the most relevant skills for your resume, and our AI will ensure they are presented effectively. Highlight your unique strengths and experiences tailored to the job you're applying for, making your application more relevant. Our AI analyzes the job description and incorporates industry-specific keywords and phrases, ensuring your resume is optimized for each opportunity.",
    linkText: "",
    imageUrl: "/assets/lottie/ai-hiring-employee.json",
    reverse: true,
    linkUrl: "#",
    listItems: [
      "Showcases your unique value proposition",
      "Industry and role specific keywords and skills",
      "Makes you stand out from the crowd",
    ],
  },
];

export const attestationData = [
  {
    linkUrl: "#",
    description:
      "Send attestation requests to peers for your projects. Other users can review your projects and decide to approve or deny the attestation request. This feature helps ensure the quality and credibility of your work, enhancing your professional profile.",
    imageUrl: "/assets/lottie/attestproject.json",
    title: "Request Project Attestation",
    linkText: "",
  },
  {
    description:
      "Users receiving attestation requests have full authority to approve or deny them. If the project is not up to the mark, they can deny the request. This control ensures that only high-quality projects are attested, maintaining the standard of professional profiles on LeetCV.",
    linkUrl: "#",
    reverse: true,
    linkText: "Learn More",
    imageUrl: "/assets/lottie/ai-list-do-and-dont.json",
    title: "Approval or Denial Authority",
    listItems: [
      "Full control over approvals",
      "Maintain quality standards",
      "Enhance professional credibility",
    ],
  },
];

export const convertResumeData = [
  {
    description:
      "Easily upload your PDF resume to get started. Our AI-powered tools will convert your traditional resume into a standout document, highlighting your unique skills and experiences. Transform your resume effortlessly and maximize its impact.",
    title: "Upload Your PDF Resume Effortlessly",
    linkText: "",
    imageUrl: "/assets/lottie/ai-convert-a-text-document.json",
    linkUrl: "#",
  },
  {
    title: "Details Categorized and Sorted for You",
    imageUrl:
      "/assets/lottie/ai-female-converting-a-checklist-into-a-document-file.json",
    description:
      "Our AI meticulously categorizes and sorts your resume details, simplifying the process of creating an impactful resume. This automated process enhances the clarity and professionalism of your resume, giving you a competitive edge in the job market.",
    linkUrl: "#",
    linkText: "",
    listItems: [
      "Categorizes your details",
      "Highlights your expertise",
      "Ensures effective presentation",
    ],
    reverse: true,
  },
];

export const coverLetterData = [
  {
    description:
      "Our AI customizes your cover letter to match each job application. Highlight your unique strengths and experiences tailored to the job you're applying for, making your application more relevant. Our AI analyzes the job description and incorporates industry-specific keywords and phrases, ensuring your cover letter is optimized for each opportunity. Increase your chances of getting noticed by recruiters with a cover letter that speaks directly to their needs.",
    imageUrl: "/assets/lottie/ai-man-sending-message-via-app.json",
    title: "Tailored Cover Letter for Every Job Application",
    listItems: [
      "Showcases your unique value proposition",
      "Industry and role specific keywords and skills",
      "Makes you stand out from the crowd",
    ],
    reverse: true,
    linkText: "",
    linkUrl: "#",
  },
];

export const messagesData = [
  {
    title: "Connect with Peers",
    linkUrl: "#",
    imageUrl: "/assets/lottie/ai-woman-chatting-on-messaging-app.json",
    linkText: "",
    description:
      "Send messages to your peers on LeetCV. Build connections, enhance your professional network, and get to know other professionals in your field. Enjoy the advantages of our messaging service to improve your career growth by connecting with like-minded individuals.",
  },
  {
    imageUrl: "/assets/lottie/ai-find-people.json",
    description:
      "Use our search feature to find and connect with peers on LeetCV. Easily search for professionals in your industry, view their profiles, and initiate conversations. Expand your network and discover new opportunities by connecting with peers.",
    title: "Search and Connect",
    reverse: true,
    linkUrl: "#",
    linkText: "Learn More",
    listItems: [
      "Search for professionals",
      "View peer profiles",
      "Initiate conversations",
    ],
  },
];

export const requestData = [
  {
    title: "Send and Receive Requests",
    description:
      "Easily send requests to connect with other professionals on LeetCV. You can also receive connection requests from others. Build your network by reaching out to peers, and get notified when someone wants to connect with you.",
    linkText: "",
    linkUrl: "#",
    imageUrl: "/assets/lottie/send-mail.json",
  },
  {
    title: "Approve or Deny Requests",
    description:
      "Manage your connection requests effectively. You have the option to either accept or deny requests from other users. This control ensures that you only connect with professionals who add value to your network. Streamline your connections and build a meaningful professional circle.",
    reverse: true,
    imageUrl: "/assets/lottie/ai-list-do-and-dont.json",
    linkUrl: "#",
    linkText: "Learn More",
    listItems: [
      "Accept or deny requests",
      "Manage your network",
      "Build meaningful connections",
    ],
  },
  {
    description:
      "Once a request is approved, you can view the requested user's resume. If a request is declined, users can reapply to connect. This feature ensures privacy and consent in sharing professional information. Enhance your network by connecting with peers and accessing their professional profiles.",
    linkUrl: "#",
    title: "Access Resumes After Approval",
    linkText: "Explore Features",
    imageUrl: "/assets/lottie/ai-cv-assessment.json",
  },
];

export const resumeIdeaData = [
  {
    description:
      "Simply add the job descriptions of the roles you're interested in, and our AI will provide improved resume suggestions tailored to those positions. Our AI-powered tools analyze the job descriptions and offer insights to enhance your resume, ensuring it highlights the skills and experiences most relevant to the jobs you're targeting. This process helps you create a more focused and impactful resume, increasing your chances of catching the eye of recruiters and hiring managers.",
    linkUrl: "#",
    title: "Get Improved Resume Suggestions from Our AI",
    imageUrl: "/assets/lottie/ai-cv-assessment.json",
    linkText: "",
  },
  {
    description:
      "Our AI closely monitors both the job descriptions and your resume, performing a detailed analysis to identify skills that need updating and calculating the matching resume percentage. By understanding the requirements of your target roles and comparing them with your current resume, our AI provides actionable recommendations to enhance your resume's relevance and effectiveness. This continuous monitoring and optimization ensure your resume stays current and competitive in the job market.",
    imageUrl: "/assets/lottie/ai-hiring-employee.json",
    title: "Monitor and Optimize Your Resume for Job Matches",
    reverse: true,
    linkText: "",
    linkUrl: "#",
    listItems: [
      "Identifies skills to be updated",
      "Calculates matching resume percentage",
      "Provides actionable recommendations",
    ],
  },
];

export const reviewData = [
  {
    title: "Get and Give Reviews",
    imageUrl: "/assets/lottie/ai-feedback-form.json",
    linkUrl: "#",
    linkText: "",
    description:
      "Receive reviews on your resume, projects, education, experience, awards, and publications. Provide valuable feedback to others and enhance your professional profile with peer reviews. Benefit from diverse perspectives to improve your work.",
  },
  {
    title: "Resolve Reviews",
    description:
      "Work on the feedback received from reviews and resolve any issues to improve your resume. Our platform helps you track and manage review resolutions effectively. Ensuring continuous improvement and showcasing your commitment to growth.",
    reverse: true,
    linkUrl: "#",
    imageUrl: "/assets/lottie/ai-woman-sending-message-via-app.json",
    linkText: "Learn More",
    listItems: [
      "Track and manage reviews",
      "Resolve feedback issues",
      "Enhance your profile",
    ],
  },
  {
    linkText: "Explore Features",
    description:
      "See who gave you reviews and like or dislike them based on their feedback. Engage with your peers and build a supportive professional network. Foster positive interactions and build a reputation within your community.",
    imageUrl: "/assets/lottie/ai-list-do-and-dont.json",
    title: "Like and Dislike Reviews",
    linkUrl: "#",
  },
];

export const interview = [
  {
    title: "AI-Powered Mock Interview with Real-World Questions",
    description:
      "Simulate real interview scenarios with AI-generated questions tailored to your industry and job role. Practice answering tough questions and get instant feedback on your responses to help you refine your skills and increase your confidence. Prepare effectively and get ahead of the competition.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/interview-img-3.json",
    linkText: "",
  },
  {
    title: "Receive Detailed Feedback to Improve Your Interview Skills",
    description:
      "Our AI analyzes your responses and provides detailed feedback on areas for improvement, including communication, content, and presentation. Enhance your strengths, address your weaknesses, and increase your chances of success in your next interview with personalized feedback tailored to your job role.",
    linkText: "",
    imageUrl: "/assets/lottie/interview-img-4.json",
    reverse: true,
    linkUrl: "#",
    listItems: [
      "Real-time feedback on communication and content",
      "Industry-specific questions and role-based scenarios",
      "Boost confidence and prepare for success",
    ],
  },
  {
    title: "Ready to Ace Your Interview?",
    description:
      "Get expert feedback with our mock interview to polish your answers, reduce stress, and boost your confidence for your next interview. Elevate your performance and ace your interviews with personalized insights and practice.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/interview.json",
    linkText: "",
  },
  {
    title: "Upgrade to Access Pro Features",
    description:
      "Unlock premium features to enhance your interview preparation. Gain access to personalized feedback, industry-specific questions, and video interview practice for a comprehensive interview training experience.",
    linkText: "",
    imageUrl: "/assets/lottie/interview-img-2.json",
    reverse: true,
    linkUrl: "#",
    listItems: [
      "Personalized feedback",
      "Industry-specific questions",
      "Video interview practice",
    ],
  },
];

export const jobsAgent = [
  {
    title: "Discover Job Openings from Top Companies",
    description:
      "Browse job opportunities from a wide range of industries and top companies. Our Job Agent brings you the latest listings that match your skills and experience, helping you find the perfect role faster.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/job-img-1.json",
    linkText: "",
  },
  {
    title: "Unlock Access to Exclusive Job Listings",
    description:
      "Upgrade your plan to access exclusive job openings not available to free users. With full access, you'll be able to view every job listing, including those from top companies seeking candidates with your expertise.",
    linkText: "",
    imageUrl: "/assets/lottie/job-img-2.json",
    reverse: true,
    linkUrl: "#",
    listItems: [
      "Access exclusive job listings",
      "See all available job opportunities",
      "Find roles that align with your career goals",
    ],
  },
  {
    title: "Simplify Your Job Search",
    description:
      "LeetCV's Job Agent makes your job search easier by compiling relevant job listings from other companies in one place. Stay updated with the latest openings and streamline your job hunt to find your next opportunity.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/job-img-3.json",
    linkText: "",
  },
];

export const leetLinkFeatures = [
  {
    title: "Create a Professional LeetLink",
    description:
      "Easily create and customize your LeetLink to showcase your resume, portfolio, and social media profiles. Share all your professional details with a single, sharable link that's easy to distribute and keeps everything in one place.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/leet-link-img-1.json",
    linkText: "",
  },
  {
    title: "Share Your LeetLink Anywhere",
    description:
      "With your unique LeetLink, you can effortlessly share your professional profile across social media, job boards, and emails. Use it as a digital business card that connects employers directly to your resume and portfolio.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/leet-link-img-2.json",
    linkText: "",
    reverse: true,
    listItems: [
      "Share your professional profile easily",
      "Works across social media and job platforms",
      "Effortless sharing with a single link",
    ],
  },
  {
    title: "Track Engagement with LeetLink",
    description:
      "Track how many times your LeetLink is viewed by recruiters and employers. Understand how your profile is performing and get insights to improve your visibility. Boost your job search by knowing who's viewing your profile.",
    linkUrl: "#",
    imageUrl: "/assets/lottie/leet-link-img-3.json",
    linkText: "",
  },
];

export const hashtags = ["LeetCV", "ResumeBuilder", "ReferAFriend"];
export const refinementData = (t: any) => {
  const refinement = [
    { attribute: "position", label: t("position") },
    { attribute: "address", label: t("location") },
    { attribute: "skills", label: t("skills") },
    { attribute: "currentCompany", label: t("currentCompany") },
    { attribute: "remoteWork", label: t("workType") },
  ];
  return refinement;
};

export function convertToFloat(str: string) {
  const cleanedStr = str.replace(",", ".").trim();
  const floatValue = parseFloat(cleanedStr);
  if (isNaN(floatValue)) {
    return 0;
  }
  return floatValue;
}
export const filterHitsByExperience = (
  hit: Resume,
  t: any,
  experienceFiltering: string
) => {
  const yearOfExperience = convertToFloat(hit.yearOfExperience ?? "0");

  switch (experienceFiltering) {
    case t("0-1"):
      return yearOfExperience <= 1;
    case t("1-5"):
      return yearOfExperience >= 1 && yearOfExperience <= 5;
    case t("5-10"):
      return yearOfExperience >= 5 && yearOfExperience <= 10;
    case t("10+"):
      return yearOfExperience >= 10;
    default:
      return true;
  }
};
export const sortDataByExperience = (data: Resume[], expSorting: string) => {
  if (expSorting === "relevance") {
    return data;
  }
  return data.sort((a, b) => {
    const aExp = convertToFloat(a.yearOfExperience ?? "0,0");
    const bExp = convertToFloat(b.yearOfExperience ?? "0,0");

    return expSorting === "exp-asc" ? aExp - bExp : bExp - aExp;
  });
};

export const filterHitsByCondition = (defaultDesc: string) => (hit: Resume) => {
  return (
    hit.address &&
    hit.description !== defaultDesc &&
    hit.description !== "" &&
    hit.description
  );
};

export const applyFiltersAndSort = (
  hits: Resume[],
  defaultDesc: string,
  t: any,
  experienceFiltering: string,
  expSorting: string
) => {
  let filteredHits = hits?.filter(filterHitsByCondition(defaultDesc));
  filteredHits = filteredHits?.filter((hit) =>
    filterHitsByExperience(hit, t, experienceFiltering)
  );
  return sortDataByExperience(filteredHits, expSorting);
};
export const experienceLevelData = (t: any) => {
  const experienceLevel = [
    { id: 0, value: t("All") },
    { id: 1, value: t("0-1") },
    { id: 2, value: t("1-5") },
    { id: 3, value: t("5-10") },
    { id: 4, value: t("10+") },
  ];
  return experienceLevel;
};

export const setSocialMediaIcons = (value: string) => {
  switch (value) {
    case "linkedin":
      return "/assets/socialMediaIcons/color-icons/linkedin.png";
    case "github":
      return "/assets/socialMediaIcons/color-icons/github.png";
    case "instagram":
      return "/assets/socialMediaIcons/color-icons/instagram.png";
    case "facebook":
      return "/assets/socialMediaIcons/color-icons/facebook.png";
    case "twitter":
      return "/assets/socialMediaIcons/color-icons/twitter.png";
    case "youtube":
      return "/assets/socialMediaIcons/color-icons/youtube.png";
    case "pinterest":
      return "/assets/socialMediaIcons/color-icons/pinterest.png";
    case "x":
      return "/assets/socialMediaIcons/color-icons/x.png";
    case "threads":
      return "/assets/socialMediaIcons/color-icons/threads.png";
    default:
      return "/assets/socialMediaIcons/color-icons/web.png";
  }
};

export interface LeetLink {
  id: string;
  urlTitle: string;
  url: string;
  isValidUrl: boolean;
  show: boolean;
}

export const leetLinkInitialValue = {
  id: "",
  urlTitle: "",
  url: "",
  isOpen: false,
  isEditingTitle: false,
  isValidUrl: true,
  show: true,
};

export const isUrlValid = (url: string): boolean => {
  if (url === "") return true;
  const urlRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[a-zA-Z0-9#?&%=._\-\/]*)?$/;
  return urlRegex.test(url);
};

export function shareLeetLinks(
  shareText: string,
  hashtags: string[],
  handle: string,
  body: string,
  subject: string
): ShareConfig[] {
  return [
    {
      ShareButton: TwitterShareButton,
      Icon: XIcon,
      via: "LeetCV",
      related: ["LeetCV", "ProfessionalProfiles", "CareerGrowth"],
      title: shareText,
      url: `${window.origin}/l/${handle}?leetLink_source=x`,
      hashtags: hashtags,
      buttonText: "Share on X",
    },
    {
      ShareButton: FacebookShareButton,
      Icon: FacebookIcon,
      hashtag: "#LeetLink #ProfessionalProfile #CareerSuccess",
      title: shareText,
      url: `${window.origin}/l/${handle}?leetLink_source=facebook`,
      buttonText: "Share on Facebook",
    },
    {
      ShareButton: LinkedinShareButton,
      Icon: LinkedinIcon,
      summary:
        "Create and share your professional LeetLink to showcase your resume and portfolio on LeetCV.",
      source: "LeetCV",
      title: shareText,
      url: `${window.origin}/l/${handle}?leetLink_source=linkedIn`,
      buttonText: "Share on LinkedIn",
    },
    {
      ShareButton: WhatsappShareButton,
      Icon: WhatsappIcon,
      title: shareText,
      url: `${window.origin}/l/${handle}?leetLink_source=whatsapp`,
      buttonText: "Share via Whatsapp",
    },
    {
      ShareButton: TelegramShareButton,
      Icon: TelegramIcon,
      title: shareText,
      url: `${window.origin}/l/${handle}?leetLink_source=telegram`,
      buttonText: "Share via Telegram",
    },
    {
      ShareButton: EmailShareButton,
      Icon: EmailIcon,
      title: shareText,
      body: body,
      subject: subject,
      url: `${window.origin}/l/${handle}?leetLink_source=email`,
      buttonText: "Share via Email",
    },
  ];
}
type PremiumMember = {
  subscriptionPlan: string;
  stripeMembershipStatus: string;
  stripeUserSubscriptionStatus: string;
};

export const checkIfFreeUser = (isPremiumMember?: PremiumMember): boolean => {
  return (
    isPremiumMember?.subscriptionPlan === undefined ||
    (isPremiumMember.subscriptionPlan === "" &&
      isPremiumMember.stripeMembershipStatus === "Inactive" &&
      isPremiumMember.stripeUserSubscriptionStatus === "unsubscribed")
  );
};
export const checkIfProUser = (isPremiumMember?: PremiumMember): boolean => {
  return (
    isPremiumMember?.subscriptionPlan! === "Pro" &&
    isPremiumMember?.stripeMembershipStatus! === "Active" &&
    isPremiumMember?.stripeUserSubscriptionStatus! === "subscribed"
  );
};

export const getExperienceLabel = (yearsOfExperience?: number): string => {
  if (yearsOfExperience === undefined || yearsOfExperience < 1) {
    return "Fresher";
  } else if (yearsOfExperience === 1) {
    return `${yearsOfExperience} year`;
  } else {
    return `${yearsOfExperience} years`;
  }
};

export const checkIsValidUrl = (url: string) => {
  const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
};

const moment = require("moment");
export function timeAgo(timestamp: string): string {
  let timeAgo = moment(timestamp).fromNow(true);

  if (timeAgo.includes("second")) {
    timeAgo = timeAgo === "a few seconds" ? "1 second ago" : `${timeAgo} ago`;
  } else if (timeAgo.includes("minute")) {
    timeAgo = timeAgo === "a minute" ? "1 minute ago" : `${timeAgo} ago`;
  } else if (timeAgo.includes("hour")) {
    timeAgo = timeAgo === "an hour" ? "1 hour ago" : `${timeAgo} ago`;
  } else if (timeAgo.includes("day")) {
    timeAgo = timeAgo === "a day" ? "1 day ago" : `${timeAgo} ago`;
  } else if (timeAgo.includes("month")) {
    timeAgo = timeAgo === "a month" ? "1 month ago" : `${timeAgo} ago`;
  } else if (timeAgo.includes("year")) {
    timeAgo = timeAgo === "a year" ? "1 year ago" : `${timeAgo} ago`;
  } else {
    timeAgo = `${timeAgo} ago`;
  }

  return timeAgo;
}

export const dummyRequests = [
  { id: "1", url: "https://example.com/job-1", status: "active" },
  { id: "2", url: "https://example.com/job-2", status: "pending" },
];

export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

export const instructions = [
  {
    id: 0,
    text: "Start your interview by selecting a topic by typing or choosing from the recommended options.",
  },
  {
    id: 1,
    text: "Ensure your microphone and camera is turned on; the interview won't start without it.",
  },
  {
    id: 5,
    text: "The interview lasts 15 minutes, but you can end it anytime.",
  },

  {
    id: 6,
    text: "A 30-second warning popup will appear before time runs out.",
  },
  {
    id: 7,
    text: "After the interview ends,you'll receive a detailed AI-generated report. ",
  },
];

export const defaultHeadingColor = "slate";

export const defaultBannerColor =
  "bg-gradient-to-r from-indigo-400 to-pink-500 focus:ring-pink-500";

export const defaultFontStyle = {
  value: "open-sans",
  name: "Open Sans (Default)",
  className: "font-sans",
};

export const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const strMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hours}:${strMinutes} ${ampm}`;
};

export function formatTimeTaken(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  let result = "";
  if (minutes > 0) {
    result += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }
  if (remainingSeconds > 0) {
    if (result) result += " ";
    result += `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
  }
  return result || "0 seconds";
}

export const formatShortTime = (timeString: string): string => {
  const timeParts = timeString.split(" ");
  let totalSeconds = 0;

  timeParts.forEach((part, index) => {
    if (part.includes("minute")) {
      totalSeconds += parseInt(timeParts[index - 1]) * 60;
    } else if (part.includes("second")) {
      totalSeconds += parseInt(timeParts[index - 1]);
    }
  });

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const minuteLabel = minutes === 1 ? "min" : "mins";
  const secondLabel = seconds === 1 ? "sec" : "secs";

  return `${minutes} ${minuteLabel} ${seconds} ${secondLabel}`;
};

export const handlePath: { [key: string]: string } = {
  showcase: "/s/portfolio",
  ai_resume: "/s/aiResume",
  convert_resume: "/s/convert",
  jobs: "/s/jobagent",
  mock_interview: "/s/interview",
  messages: "/s/messages",
  leet_link: "/s/leetLink",
  cover_letter: "/s/coverLetter",
  resume_ideas: "/s/resumeIdeas",
};
export const publicPagePaths = [
  "/interview",
  "/jobagent",
  "/leetLink",
  "/aiResume",
  "/convertResume",
  "/coverLetter",
  "/resumeIdeas",
  "/portfolio",
  "/messages",
  "/requests",
  "/attestation",
  "/reviews",
  "/interviewGuides",
  "/jobSearchTips",
  "/chatgptGuides",
  "/caseStudies",
];
export const aiFeaturePaths = [
  "/s/coverLetter",
  "/s/resumeIdeas",
  "/s/aiResume",
];



export const getFormattedDateTime = () => {
  const currentDateTime = new Date();

  const year = currentDateTime.getFullYear().toString();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentDateTime.getDate()).padStart(2, "0");
  const currentDate = `${day}-${month}-${year}`;

  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentDateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZoneName: "short",
  });

  const monthName = currentDateTime
    .toLocaleDateString("en-US", {
      month: "long",
    })
    .toLowerCase();

  return {
    year,
    currentDate,
    formattedDate,
    formattedTime,
    monthName,
  };
};
export const generateRandomCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // Build the result using the random bytes
  for (let i = 0; i < characters.length / 2; i++) {
    const buf = crypto.randomBytes(1);
    const index = buf.readUInt8(0) % characters.length;
    result += characters.charAt(index);
  }

  return result;
};

export const getInvalidEmails = (emailArray: string[]): string[] => {
  return emailArray.filter((email) => !validateEmail(email));
};

export const getDuplicateEmails = (emailArray: string[]): string[] => {
  return Array.from(
    new Set(
      emailArray.filter((email, index) => emailArray.indexOf(email) !== index)
    )
  );
};



export const feedbackFeatures = (t: any) => {
  return [
    t("all"),
    t("mockInterview"),
    t("jobs"),
    t("leetLink"),
    t("aiResume"),
    t("convertResume"),
    t("coverLetter"),
    t("resumeIdeas"),
    t("portfolio"),
    t("messages"),
    t("requests"),
    t("attestation"),
    t("reviews"),
  ];
};

export const generateStudentStatData = (candidateDetails: any) => {
  const stats = [
    {
      title: "Resume Progress",
      value: candidateDetails?.resume?.progress ?? 0,
      backgroundColor: "#FFFFFF",
      accentColor: "#4527a0",
      textColor: "text-gray-700",
      isCollegeStat: false,
    },
    {
      title: "Total Projects",
      value: candidateDetails?.resume?.projects?.length ?? 0,
      backgroundColor: "#FFFFFF",
      accentColor: "#A0D683",
      textColor: "text-gray-700",
      isCollegeStat: false,
    },
    {
      title: "Total Experience",
      value: candidateDetails?.resume?.experiences?.length ?? 0,
      backgroundColor: "#FFFFFF",
      accentColor: "#fbc02d",
      textColor: "text-gray-700",
      isCollegeStat: false,
    },
    {
      title: "Total Project Attestation",
      value: 5,
      backgroundColor: "#FFFFFF",
      accentColor: "#FC4100",
      textColor: "text-gray-700",
      isCollegeStat: false,
    },

    {
      title: "Total Reviews",
      value: 10,
      backgroundColor: "#FFFFFF",
      // accentColor: "#57A6A1",
      accentColor: "#57A6A1",
      textColor: "text-gray-700",
      isCollegeStat: false,
    },
    {
      title: "Total Mock Interviews",
      value: candidateDetails?.mockInterviewCount ?? 0,
      backgroundColor: "#FFFFFF",
      // accentColor: "#57A6A1",
      accentColor: "#FF76CE",
      textColor: "text-gray-700",
      isCollegeStat: false,
    },
  ];
  return stats;
};

export const isEligibleForSpecificDomain = (email: string): boolean => {
  const allowedDomains: string[] = process.env.NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN
    ? process.env.NEXT_PUBLIC_COLLEGE_EMAIL_DOMAIN.split(",").map(
        (domain: string) => domain.trim().toLowerCase()
      )
    : [];
  const emailDomain: string = email.split("@")[1];

  return allowedDomains.some((domain) =>
    emailDomain.toLowerCase().endsWith(domain)
  );
};

export const getMaxLives = (plan: string) => {
  if (plan === "Pro") return;
  if (plan === "") {
    return 5;
  } else if (plan === "Premium") {
    return 50;
  }
};

export const REFILL_COST = 500;
export const GEM_COST_PER_LIFE = 100;

export const mapLevels = (title: string) => {
  switch (title) {
    case "basic":
      return "easyList";
    case "advance":
      return "advancedList";
    case "expert":
      return "expertList";
    case "practice":
      return "practiceList";
    default:
      return "easyList";
  }
};

export function getTextBeforeUnderscore(input: string): string {
  const underscoreIndex = input.indexOf("_");
  if (underscoreIndex === -1) {
    return input;
  }
  return input.substring(0, underscoreIndex);
}
export const getBasicButtonText = (
  allCompletedUnits: any,
  userCurrentCourses: any
) => {
  const easyListProgress = allCompletedUnits?.easyList?.progress;
  if (Object.keys(userCurrentCourses || {}).length === 0) return "START";

  if (easyListProgress === 100) return "REVIEW";
  return "CONTINUE";
};

export const getAdvanceButtonText = (
  allCompletedUnits: any,
  userCurrentCourses: any
) => {
  const advancedListProgress = allCompletedUnits?.advancedList?.progress;
  const advancedListTotalUnits = allCompletedUnits?.advancedList?.total ?? 0;

  const easyListProgress = allCompletedUnits?.easyList?.progress!;

  if (easyListProgress <= 100 && advancedListTotalUnits === 0) return "LOCKED";

  if (advancedListProgress === 100) return "REVIEW";
  return "CONTINUE";
};

export const getExpertButtonText = (
  allCompletedUnits: any,
  userCurrentCourses: any
) => {
  const expertListProgress = allCompletedUnits?.expertList?.progress;

  const advancedListProgress = allCompletedUnits?.advancedList?.progress!;
  const expertListTotalUnits = allCompletedUnits?.expertList?.total ?? 0;
  if (
    advancedListProgress < 100 ||
    (advancedListProgress === 100 && expertListTotalUnits === 0)
  )
    return "LOCKED";
  if (expertListProgress === 100) return "REVIEW";
  return "CONTINUE";
};

export const errorMessages = {
  "You are not authorized to access this section": {
    title: "Access Denied",
    lottiePath: "/assets/lottie/denied.json",
  },
  "You are not enrolled in this course.": {
    title: "Access Denied",
    lottiePath: "/assets/lottie/denied.json",
  },
  "The course you are looking for does not exist.": {
    title: "This course does not exist",
    lottiePath: "/assets/lottie/no-course-found.json",
  },
};

export const sectionsData = (
  allCompletedUnits: any,
  isCompleted: any,
  userCurrentCourses: any
): SectionType[] => [
  {
    title: "Basic",
    progress: allCompletedUnits?.easyList?.progress!,
    completed: allCompletedUnits?.easyList?.completed ?? 0,
    total: allCompletedUnits?.easyList?.total ?? 0,
    bgColor: "bg-gradient-to-r from-indigo-400 to-pink-600",
    buttonText: getBasicButtonText(allCompletedUnits, userCurrentCourses),
    image:
      "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/unlocked/c47b98fb017395c14569e051412a6389.svg",
    isStarted: true,
    isExist: true,
    isPrevSectionCompleted: true,
    description:
      "Basic Level courses cover essential concepts across various fields, perfect for beginners.",
  },
  {
    title: "Advance",
    bgColor: "bg-gray-100",
    buttonText: getAdvanceButtonText(allCompletedUnits, userCurrentCourses),
    progress: allCompletedUnits?.advancedList?.progress!,
    completed: allCompletedUnits?.advancedList?.completed ?? 0,
    total: allCompletedUnits?.advancedList?.total ?? 0,
    image:
      "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/locked/light/4d2cd982dc3a0f00dede4c2fa29ef685.svg",
    isStarted:
      (allCompletedUnits?.advancedList?.total ?? 0) > 0 && isCompleted?.easyList
        ? true
        : false,
    isExist: (allCompletedUnits?.advancedList?.total ?? 0) > 0,
    icon: LockClosedIcon,
    isPrevSectionCompleted:
      allCompletedUnits?.easyList?.progress === 100 ? true : false,
    description:
      "Advance Level courses cover more complex concepts and are suitable for learners who have completed the Basic Level.",
  },
  {
    title: "Expert",
    bgColor: "bg-gray-100",
    buttonText: getExpertButtonText(allCompletedUnits, userCurrentCourses),
    progress: allCompletedUnits?.expertList?.progress!,
    completed: allCompletedUnits?.expertList?.completed ?? 0,
    total: allCompletedUnits?.expertList?.total ?? 0,
    image:
      "https://d35aaqx5ub95lt.cloudfront.net/images/pathSections/locked/light/4d2cd982dc3a0f00dede4c2fa29ef685.svg",
    isStarted:
      (allCompletedUnits?.expertList?.total ?? 0) > 0 &&
      isCompleted?.easyList &&
      isCompleted?.advancedList
        ? true
        : false,
    icon: LockClosedIcon,
    isExist: (allCompletedUnits?.expertList?.total ?? 0) > 0,
    isPrevSectionCompleted:
      allCompletedUnits?.easyList?.progress === 100 ||
      allCompletedUnits?.advancedList?.progress === 100
        ? true
        : false,
    description:
      "Expert Level courses cover the most complex concepts and are suitable for learners who have completed the Basic and Advance Levels.",
  },
];

export const getBrowserDeviceAndOSInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  const browser = result.browser.name ?? "Unknown Browser";
  const device = result.device.type ? result.device.type : "Desktop";
  const os = result.os.name ?? "Unknown OS";
  return { browser, device, os };
};
