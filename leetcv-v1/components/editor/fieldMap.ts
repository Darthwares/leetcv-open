import { Award } from "data/models/Award";
import { Education } from "data/models/Education";
import { Experience } from "data/models/Experience";
import { Project } from "data/models/Project";
import { Resume } from "data/models/UserInfo";
import { SocialMedia } from "data/models/socialMedia";
import { Course } from "data/models/Course";
import { Certificate } from "data/models/Certificate";
import { Publication } from "data/models/Publication";
import { Language } from "data/models/Language";
import { formatDate } from "@constants/defaults";
import { Patent } from "data/models/Patent";
import { ExtraCurricular } from "data/models/ExtraCurricular";
export interface Field {
  defaultValue?: string | string[];
  title?: string;
  value?: string;
  fieldName: string;
  type?: string;
  autoComplete?: string;
  readonly?: boolean;
  placeholder?: string;
  multiple?: boolean;
  mandatory?: boolean;
  maxLength?: number;
  defaultBooleanValue?: boolean;
}

export function personalFields(resume: Resume): Field[] {
  return [
    {
      title: "Upload Profile Photo",
      defaultValue: resume.image,
      fieldName: "uploadProfilePic",
      type: "file",
      mandatory: false,
    },
    {
      title: "Display Name",
      defaultValue: resume.displayName,
      fieldName: "displayName",
      type: "text",
      autoComplete: "given-name",
      mandatory: true,
    },
    {
      title: "Headline",
      defaultValue: resume.description,
      fieldName: "description",
      type: "textarea",
      placeholder: "Add Headline",
      mandatory: true,
    },
    {
      title: "Email",
      defaultValue: resume.email,
      fieldName: "email",
      type: "email",
      autoComplete: "email",
      mandatory: true,
    },
    {
      title: "Phone Number",
      defaultValue: resume.phoneNumber,
      fieldName: "phoneNumber",
      type: "tel",
      autoComplete: "tel",
      placeholder: "+91 555-555-5555",
      mandatory: false,
    },
    {
      title: "Date of Birth",
      defaultValue: resume.dob,
      fieldName: "dob",
      type: "date",
    },
    {
      title: "Hobbies",
      fieldName: "hobbies",
      mandatory: false,
    },
    {
      title: "Portfolio URL",
      defaultValue: resume?.handle && `${window?.origin}/p/${resume?.handle}`,
      fieldName: "portfolioLink",
      placeholder: "https://www.portfolio.com",
      type: "text",
      mandatory: false,
    },
    {
      title: "Causes",
      fieldName: "causesList",
      mandatory: false,
    },
    {
      title: "Address",
      defaultValue: resume.address,
      fieldName: "address",
      mandatory: true,
    },
  ];
}
export function locationFields(resume: Resume): Field[] {
  return [
    {
      title: "City",
      defaultValue: resume.city,
      fieldName: "city",
      type: "text",
      autoComplete: "address-level2",
      mandatory: true,
    },
    {
      title: "State",
      defaultValue: resume.state,
      fieldName: "state",
      autoComplete: "address-level1",
      mandatory: true,
    },
    {
      title: "Country",
      defaultValue: resume.country,
      fieldName: "country",
      autoComplete: "country-name",
      mandatory: true,
    },
  ];
}

export function professionFields(resume: Resume): Field[] {
  return [
    {
      title: "Position",
      defaultValue: resume.position,
      fieldName: "position",
    },
    {
      title: "Current Company",
      defaultValue: resume.currentCompany,
      fieldName: "currentCompany",
    },
    {
      title: "Area of Interest",
      defaultValue: resume.preferences,
      fieldName: "preferences",
    },
    {
      title: "Current Status of work",
      fieldName: "remoteWork",
      type: "checkbox",
    },
    {
      title: "Skills",
      defaultValue: resume.skills,
      fieldName: "skills",
      mandatory: true,
    },
    {
      title: "Year(s) Of Experience",
      defaultValue: resume.yoe,
      fieldName: "yoe",
    },
  ];
}

export function extraCurricularFields(activity: ExtraCurricular): Field[] {
  return [
    {
      title: "Activity Name",
      defaultValue: activity.activityName,
      fieldName: "activityName",
      mandatory: true,
    },
    {
      title: "Organization",
      defaultValue: activity.organization,
      fieldName: "organization",
      mandatory: true,
    },
    {
      title: "Start",
      defaultValue: activity.start,
      fieldName: "start",
      type: "month",
      mandatory: true,
    },
    {
      title: "End",
      defaultValue: activity.checked ? "true" : activity.end,
      fieldName: "end",
      type: "month",
      mandatory: true,
    },
    {
      title: "Description",
      defaultValue: activity.description,
      value: activity.description,
      fieldName: "description",
      type: "textarea",
      mandatory: true,
    },
  ];
}

export function experienceFields(experience: Experience): Field[] {
  return [
    {
      title: "Job Title",
      defaultValue: experience.title,
      fieldName: "title",
      mandatory: true,
    },
    {
      title: "Company",
      defaultValue: experience.company,
      fieldName: "company",
      mandatory: true,
    },
    {
      title: "City",
      defaultValue: experience.city,
      fieldName: "city",
    },
    {
      title: "Start",
      defaultValue: experience.start,
      fieldName: "start",
      type: "month",
      mandatory: true,
    },
    {
      title: "End",
      defaultValue: experience.checked ? "true" : experience.end,
      fieldName: "end",
      type: "month",
      mandatory: true,
    },
    {
      title: "Skills",
      defaultValue: experience.skills,
      fieldName: "skills",
      mandatory: true,
    },
    {
      title: "Description",
      defaultValue: experience.description,
      value: experience.description,
      fieldName: "description",
      type: "textarea",
      mandatory: true,
    },
  ];
}

export function projectFields(project: Project): Field[] {
  return [
    {
      title: "Name",
      defaultValue: project.name,
      fieldName: "name",
      mandatory: true,
    },
    {
      title: "Start",
      defaultValue: project.start,
      fieldName: "start",
      type: "month",
      mandatory: true,
    },
    {
      title: "End",
      defaultValue: project.checked ? "true" : project.end,
      fieldName: "end",
      type: "month",
      mandatory: true,
    },
    {
      title: "Company",
      defaultValue: project.company,
      fieldName: "company",
    },
    {
      title: "Skills",
      defaultValue: project.skills,
      fieldName: "skills",
      mandatory: true,
    },
    {
      title: "Work",
      defaultValue: project.work,
      fieldName: "work",
      type: "textarea",
      mandatory: true,
    },
    {
      title: "Project Url",
      defaultValue: project.url,
      fieldName: "url",
      mandatory: false,
    },
    {
      title: "Project Screenshots",
      fieldName: "Project Screenshots",
      type: "file",
      multiple: true,
    },
    {
      title: "Attestation",
      defaultValue: "",
      fieldName: "attestations",
    },
  ];
}

export function educationFields(education: Education): Field[] {
  return [
    {
      title: "Degree",
      defaultValue: education.degree,
      fieldName: "degree",
      mandatory: true,
    },
    {
      title: "College / University",
      defaultValue: education.name,
      fieldName: "name",
      mandatory: true,
    },
    {
      title: "Major",
      defaultValue: education.major,
      fieldName: "major",
      mandatory: true,
    },
    {
      title: "Start",
      defaultValue: education.start,
      fieldName: "start",
      type: "month",
      mandatory: true,
    },
    {
      title: "End",
      defaultValue: education.end,
      fieldName: "end",
      type: "month",
      mandatory: true,
    },
    {
      title: "Grade / CGPA",
      defaultValue: education.grade,
      fieldName: "grade",
      mandatory: true,
    },
  ];
}

export function publicationFields(publication: Publication): Field[] {
  return [
    {
      title: "Title",
      defaultValue: publication.title,
      fieldName: "title",
      placeholder: "Ex: Microsoft certified network associate security",
      mandatory: true,
    },
    {
      title: "Publication/Publisher",
      defaultValue: publication.publisher,
      fieldName: "publisher",
      placeholder: "Ex: Harvard Business Review",
      mandatory: true,
    },
    {
      title: "Publication Date",
      defaultValue: publication.publicationDate,
      fieldName: "publicationDate",
      type: "date",
      mandatory: true,
    },
    {
      title: "Publication URL",
      defaultValue: publication.publicationURL,
      fieldName: "publicationURL",
      mandatory: true,
    },
    {
      title: "Description",
      defaultValue: publication.description,
      value: publication.description,
      fieldName: "description",
      type: "textarea",
      mandatory: true,
    },
  ];
}

export function patentFields(patent: Patent): Field[] {
  const fields: Field[] = [
    {
      title: "Title",
      defaultValue: patent.title,
      fieldName: "title",
      placeholder: "Ex: Method and System for Analyzing Data",
      mandatory: true,
    },
    {
      title: "Patent Number",
      defaultValue: patent.patentNumber,
      fieldName: "patentNumber",
      placeholder: "Ex: US12345678A",
      mandatory: true,
    },
    {
      title: "Patent Status",
      defaultBooleanValue: patent.isPatentIssued ?? false,
      fieldName: "patentStatus",
      mandatory: false,
    },
    {
      title: "Members",
      defaultValue: "",
      fieldName: "patentMembers",
      placeholder: "Ex: John Doe, Jane Smith",
      mandatory: false,
    },
    {
      title: "Patent URL",
      defaultValue: patent.patentURL ?? "",
      fieldName: "patentURL",
      placeholder: "Ex: https://patent.com/US12345678A",
      mandatory: false,
    },
    {
      title: "Description",
      defaultValue: patent.patentDescription ?? "",
      fieldName: "patentDescription",
      type: "textarea",
      placeholder: "Write a few sentences about the patent",
      mandatory: false,
    },
  ];

  if (patent.isPatentIssued) {
    fields.splice(3, 0, {
      title: "Issue Date",
      defaultValue: patent.patentIssueDate ?? "",
      fieldName: "patentIssueDate",
      type: "date",
      placeholder: "Select issue date",
      mandatory: true,
    });
  }

  return fields;
}

export function awardFields(award: Award): Field[] {
  return [
    {
      title: "Title",
      defaultValue: award.name,
      fieldName: "name",
      mandatory: true,
    },
    {
      title: "Award For",
      defaultValue: award.awardFor,
      fieldName: "awardFor",
      mandatory: true,
    },
    {
      title: "Date",
      defaultValue: award.date,
      fieldName: "date",
      type: "month",
      mandatory: true,
    },
    {
      title: "Description",
      defaultValue: award.description,
      value: award.description,
      fieldName: "description",
      type: "textarea",
      mandatory: true,
    },
  ];
}
export function courseFields(course: Course): Field[] {
  return [
    {
      title: "Course Name",
      defaultValue: course.name,
      fieldName: "name",
      placeholder: "Ex: World History",
      mandatory: true,
    },
    {
      title: "Start",
      defaultValue: course.start,
      fieldName: "start",
      type: "month",
      mandatory: true,
    },
    {
      title: "End",
      defaultValue: course.end,
      fieldName: "end",
      type: "month",
      mandatory: true,
    },
    {
      title: "Course Platform",
      defaultValue: course.coursePlatform,
      fieldName: "coursePlatform",
      placeholder: "Ex: Udemy",
      mandatory: true,
    },
    {
      title: "Course Id",
      defaultValue: course.courseId,
      fieldName: "courseId",
      placeholder: "Ex: HIS101",
      mandatory: false,
    },
    {
      title: "Certificate Link",
      defaultValue: course.certificateLink,
      fieldName: "certificateLink",
      mandatory: false,
    },
  ];
}
export function certificateFields(certificate: Certificate): Field[] {
  return [
    {
      title: "Name",
      defaultValue: certificate.name,
      fieldName: "name",
      placeholder: "Ex: Microsoft certified network associate security",
      mandatory: true,
    },
    {
      title: "Issuing Organization",
      defaultValue: certificate.issuingOrganization,
      fieldName: "issuingOrganization",
      placeholder: "Ex: Microsoft",
      mandatory: true,
    },
    {
      title: "Issue Date",
      defaultValue: certificate.issueDate,
      fieldName: "issueDate",
      type: "month",
      mandatory: true,
    },
    {
      title: "Expiration Date",
      defaultValue: certificate.expirationDate,
      fieldName: "expirationDate",
      type: "month",
    },
    {
      title: "Certificate Id",
      defaultValue: certificate.credentialID,
      fieldName: "credentialID",
      placeholder: "Ex: 14574400-94",
    },
    {
      title: "Certificate Link",
      defaultValue: certificate.credentialURL,
      fieldName: "credentialURL",
      mandatory: false,
    },
  ];
}
export function socialMediaFields(socialMediaLink: SocialMedia): Field[] {
  return [
    {
      title: "Name",
      defaultValue: socialMediaLink.name,
      fieldName: "name",
      mandatory: true,
    },
    {
      title: "URL",
      defaultValue: socialMediaLink.socialMediaUrl,
      fieldName: "socialMediaUrl",
      mandatory: true,
    },
  ];
}

export function languageFields(language: Language): Field[] {
  return [
    {
      title: "Language Name",
      defaultValue: language.name,
      fieldName: "name",
      mandatory: true,
    },
    {
      title: "Ability",
      defaultValue: "",
      fieldName: "ability",
      type: "checkbox",
      mandatory: true,
    },
  ];
}

export function experiencedField(resume: Resume): Field[] {
  return [
    {
      title: "Enter your name",
      defaultValue: resume.displayName,
      fieldName: "displayName",
      placeholder: "e.g. John Doe",
    },
    {
      title: "Enter your position",
      defaultValue: resume.position,
      fieldName: "position",
      placeholder: "e.g. Network Engineer, Data Analyst, Accountant",
    },
    {
      title: "Enter your industry or field",
      defaultValue: resume.industry,
      fieldName: "industry",
      placeholder: "e.g. Healthcare, IT, Banking",
    },
    {
      title: "Enter your expertize",
      defaultValue: resume.expertize,
      fieldName: "expertize",
      placeholder: "e.g. Cybersecurity Expert, Medical Equipment Engineer",
    },
    {
      title: "Enter your year of experience",
      defaultValue: resume.yoe,
      fieldName: "yoe",
      placeholder: "e.g. 4 years",
    },
  ];
}

export function fresherField(resume: Resume): Field[] {
  return [
    {
      title: "Enter your name",
      defaultValue: resume.displayName,
      fieldName: "displayName",
      placeholder: "e.g. John Doe",
    },
    {
      title: "Enter your specialization",
      defaultValue: resume.specialization,
      fieldName: "specialization",
      placeholder: "e.g. Data Science, Telemedicine",
    },
    {
      title: "Enter your industry or field",
      defaultValue: resume.industry,
      fieldName: "industry",
      placeholder: "e.g. Healthcare, IT, Banking",
    },
    {
      title: "Enter your area of interest",
      defaultValue: resume.areaOfInterest,
      fieldName: "areaOfInterest",
      placeholder: "e.g. Cryptocurrencies, Medical Research",
    },
  ];
}
