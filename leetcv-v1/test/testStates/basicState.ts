import { profileResumeState, resumeState } from "../../state/state";

export const resumeForm = [
  {
    displayName: "karan",
    firstName: "karan",
    lastName: "kumar",
    description: "karan ljfsolv slvnlfv",
    handle: "karan",
    middleName: "cccg",
    email: "test@gmail.com",
    phoneNumber: "997755533",
  },
];
export const baseProjects = [
  {
    skills: [],
    start: "",
    impact: "",
    title: "",
    end: "",
    name: "Project 1",
    work: "",
    id: "1",
    company: "",
  },
];
export const baseEducations = [
  {
    end: "",
    id: "1",
    name: "",
    grade: "",
    start: "",
    major: "",
    degree: "Education 1",
  },
];

export const baseExperience = [
  {
    id: "0",
    title: "Camping",
    company: "Tesla",
    start: "20-10-2011",
    end: "20-10-2022",
    description: "This is description",
  },
];

export const baseAwards = [
  {
    id: "1",
    awardFor: "",
    description: "This is description",
    year: "",
    name: "Award 1",
    month: "",
  },
];
export const baseCourses = [
  {
    id: "1",
    name: "Data Structure",
    start: "2022-01",
    end: "2022-10",
    coursePlatform: "Udemy",
    courseId: "3456790-67",
    certificateLink: "",
  },
];
export const baseCertifications = [
  {
    id: "1",
    name: "Certificate ",
    issuingOrganization: "Microsoft",
    issueDate: "2022-01",
    expirationDate: "",
    credentialID: "4345672",
    credentialURL: "",
  },
];
export const basePublications = [
  {
    id: "1",
    title: "Publication",
    publisher: "Harvard Bussiness Review",
    publicationDate: "2022-01-23",
    description: "Write a few sentences about the publication",
    publicationURL: "",
  },
];
export const tipsData = [
  {
    heading: "What to write about",
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
        desc: "Use action verbs: Built, Conceptualized, Led, Drove, etc.",
      },
    ],
  },
];

export const baseReviewState = false;

const basicUserInfo = JSON.parse(`
{
    "id": "user_2AEpFRy1MOT3rQNPdoFpERhXkGq",
    "lastName": "Singh",
    "email": "shailendra@gmail.com",
    "yoe": "1",
    "state": "Karnataka ",
    "city": "Bengaluru ",
    "handle": "shailendra_kumar",
    "country": "India ",
    "skills": [
      "jest",
      "react"
    ],
    "description": "This is a temp account",
    "twitter": "https://twitter.com/",
    "firstName": "Shailendra",
    "phoneNumber": "9876543210",
    "middleName": "Kumar",
    "profession": "Developer react",
    "facebook": "https://facebook.com"
  }
`);

export const baseLanguages = [
  {
    id: "1",
    name: "English",
    read: true,
    write: false,
    speak: true,
  },
];

export const baseSocialMedias = [
  {
    id: "1",
    name: "Github",
    socialMediaUrl: "https://www.github.com/",
  },
];

export const basicState = ({ set }: any) => {
  basicUserInfo.resumeForm = resumeForm;
  basicUserInfo.reviewState = baseReviewState;
  basicUserInfo.projects = baseProjects;
  basicUserInfo.educations = baseEducations;
  basicUserInfo.awards = baseAwards;
  basicUserInfo.courses = baseCourses;
  basicUserInfo.certificates = baseCertifications;
  basicUserInfo.publications = basePublications;
  basicUserInfo.publications = basePublications;
  basicUserInfo.languages = baseLanguages;
  basicUserInfo.socialMedia = baseSocialMedias;
  return set(resumeState, basicUserInfo);
};
