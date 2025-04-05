import { Resume } from "data/models/UserInfo";

export const personalProgressBar = (userInfo: any) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 3;

  const requiredFields = [
    "displayName",
    "description",
    "email",
    "phoneNumber",
    "address",
  ];

  const filledFieldsCount = requiredFields.reduce(
    (count, field) =>
      userInfo[field] !== "" && userInfo[field]?.length > 0 ? count + 1 : count,
    0
  );

  return filledFieldsCount === 0 ? NO_WEIGHT : filledFieldsCount * WEIGHT;
};

//15

export const professionalProgressBar = (userInfo: any) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 2;

  const requiredFields = [
    "position",
    "currentCompany",
    "skills",
    "yearOfExperience",
    "preferences",
  ];
  const filledFieldsCount = requiredFields.reduce(
    (count, field) =>
      userInfo[field] !== "" && userInfo[field]?.length > 0 ? count + 1 : count,
    0
  );

  return filledFieldsCount === 0 ? NO_WEIGHT : filledFieldsCount * WEIGHT;
};

export const experienceProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 10;

  return userInfo?.experiences?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const projectsProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 10;

  return userInfo?.projects?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const educationProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 10;

  return userInfo?.educations?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const socialProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 10;

  return userInfo?.socialMedia?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const awardsProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 10;

  return userInfo?.awards?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const languageProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 10;

  return userInfo?.languages?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const coursesProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 5;

  return userInfo?.courses?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const certificatesProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 5;

  return userInfo?.certificates?.length === 0 ? NO_WEIGHT : WEIGHT;
};

export const publicationsProgressBar = (userInfo: Resume) => {
  const NO_WEIGHT = 0;
  const WEIGHT = 5;

  return userInfo?.publications?.length === 0 ? NO_WEIGHT : WEIGHT;
};
