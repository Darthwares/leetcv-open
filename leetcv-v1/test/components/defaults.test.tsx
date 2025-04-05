import {
  AVATAR_IMAGE,
  Awards,
  AwardsReview,
  DP,
  Educations,
  EducationsReview,
  ExperienceReview,
  ImageList,
  LOCAL_STORAGE_DASHBOARD,
  LOCAL_STORAGE_EDITOR,
  LOCAL_STORAGE_PROSPECTS,
  LOCAL_STORAGE_REQUESTS,
  LOCAL_STORAGE_REVIEW,
  LOCAL_STORAGE_USERS,
  List,
  PROD_DOMAIN,
  Projects,
  ProjectsReview,
  PublicationReview,
  QR,
  applications,
  backgroundImage,
  causes,
  changesPrivacy,
  childrenPrivacy,
  clickableLink,
  colorFullSkills,
  contactList,
  contactUs,
  convertLanguages,
  defaultImage,
  definition,
  fabCancelButton,
  fabSubmitButton,
  fabTextColor,
  faqs,
  featuredFlag,
  formatDate,
  formatResumeDate,
  getDefaultAward,
  getDefaultBasicDetails,
  getDefaultCertificate,
  getDefaultCourse,
  getDefaultEducation,
  getDefaultExperience,
  getDefaultLanguage,
  getDefaultProject,
  getDefaultPublication,
  getDefaultSocialMedia,
  getHandle,
  gradeSystem,
  isProhibitedPage,
  linkToOtherWebsite,
  pascalCase,
  personalData,
  profileImgDefault,
  retention,
  reviewDocuments,
  reviewsList,
  sidbarTextBgColor,
  sidbarTextColor,
  sidbarTextRightColor,
  socialIcons,
  subText,
  tableOfContents,
  tabs,
  tipsAward,
  tipsCertification,
  tipsCourse,
  tipsEducation,
  tipsExperience,
  tipsProject,
  tipsPublication,
  toMonthName,
  transfer,
  url,
  usesData,
  vapidKey,
  videos,
} from "@constants/defaults";
import { PROHIBITED_PAGES } from "@constants/pages";

describe("describe: testing default file constants", () => {
  it("Should render pass all the constants ", () => {
    expect(profileImgDefault).toBeTruthy();
    expect(backgroundImage).toBeTruthy();
    expect(PROD_DOMAIN).toBeTruthy();
    expect(AVATAR_IMAGE).toBeTruthy();
    expect(socialIcons).toBeTruthy();
    const text = subText("text");
    expect(text).toBeTruthy();
    expect(faqs).toBeTruthy();
    const testBasicDetails = getDefaultBasicDetails();
    expect(testBasicDetails).toBeTruthy();
    const colorFullSkill = colorFullSkills("react");
    expect(colorFullSkill).toBeTruthy();
    const testBasicExperience = getDefaultExperience(1);
    expect(testBasicExperience).toBeTruthy();
    const testBasicProject = getDefaultProject(1);
    expect(testBasicProject).toBeTruthy();
    const testBasicEducation = getDefaultEducation(1);
    expect(testBasicEducation).toBeTruthy();
    const testBasicPublication = getDefaultPublication(1);
    expect(testBasicPublication).toBeTruthy();
    const testBasicAwards = getDefaultAward(1);
    expect(testBasicAwards).toBeTruthy();
    expect(url).toBeTruthy();
    expect(url).toBeTruthy();

    const prohibitedPage = isProhibitedPage(PROHIBITED_PAGES);
    expect(prohibitedPage).not.toBeTruthy();
    expect(contactUs).toBeTruthy();
    expect(changesPrivacy).toBeTruthy();
    expect(linkToOtherWebsite).toBeTruthy();
    expect(transfer).toBeTruthy();
    expect(childrenPrivacy).toBeTruthy();
    expect(retention).toBeTruthy();
    expect(usesData).toBeTruthy();
    expect(personalData).toBeTruthy();
    expect(definition).toBeTruthy();
    expect(contactList).toBeTruthy();
    expect(tipsPublication).toBeTruthy();
    expect(tipsCertification).toBeTruthy();
    expect(tipsCourse).toBeTruthy();
    expect(tipsAward).toBeTruthy();
    expect(tipsEducation).toBeTruthy();
    expect(tipsProject).toBeTruthy();
    expect(tipsExperience).toBeTruthy();
    expect(reviewDocuments).toBeTruthy();
    expect(PublicationReview).toBeTruthy();
    expect(ExperienceReview).toBeTruthy();
    expect(AwardsReview).toBeTruthy();
    expect(ProjectsReview).toBeTruthy();
    expect(EducationsReview).toBeTruthy();
    expect(Awards).toBeTruthy();
    expect(Projects).toBeTruthy();
    expect(Educations).toBeTruthy();
    expect(causes).toBeTruthy();
    expect(applications).toBeTruthy();
    expect(LOCAL_STORAGE_DASHBOARD).toBeTruthy();
    expect(LOCAL_STORAGE_EDITOR).toBeTruthy();
    expect(LOCAL_STORAGE_PROSPECTS).toBeTruthy();
    expect(LOCAL_STORAGE_REQUESTS).toBeTruthy();
    expect(LOCAL_STORAGE_REVIEW).toBeTruthy();
    expect(LOCAL_STORAGE_USERS).toBeTruthy();
    expect(tabs).toBeTruthy();
    expect(reviewsList).toBeTruthy();
    expect(tableOfContents).toBeTruthy();
    expect(List).toBeTruthy();
    expect(videos).toBeTruthy();
    expect(sidbarTextColor).toBeTruthy();
    expect(sidbarTextBgColor).toBeTruthy();
    expect(sidbarTextRightColor).toBeTruthy();
    expect(fabCancelButton).toBeTruthy();
    expect(fabSubmitButton).toBeTruthy();
    expect(fabTextColor).toBeTruthy();
    expect(fabCancelButton).toBeTruthy();
    expect(DP).toBeTruthy();
    expect(QR).toBeTruthy();
    expect(featuredFlag).toBeTruthy();
    expect(vapidKey).toBeTruthy();

    const monthName = toMonthName("January");
    expect(monthName).toBeTruthy();
    const grade = gradeSystem("FCD");
    expect(grade).toBeTruthy();
    const defaultLanguage = getDefaultLanguage(1);
    expect(defaultLanguage).toBeTruthy();
    const defaultSocialMedia = getDefaultSocialMedia(1);
    expect(defaultSocialMedia).toBeTruthy();
    const defaultCertificate = getDefaultCertificate(1);
    expect(defaultCertificate).toBeTruthy();
    const defaultCourse = getDefaultCourse(1);
    expect(defaultCourse).toBeTruthy();
    const pascalCaseChar = pascalCase("test");
    expect(pascalCaseChar).toBeTruthy();
    const handle = getHandle("test");
    expect(handle).toBeTruthy();
    const date = formatDate("test");
    expect(date).toBeTruthy();
    const formatResume = formatResumeDate("test");
    expect(formatResume).toBeTruthy();
    const clickableFunc = clickableLink("test");
    expect(clickableFunc).toBeTruthy();
    const image = defaultImage("$test");
    expect(image).toBeTruthy();

    const languages = [
      {
        name: "lang",
        read: false,
        speak: false,
        write: false,
        id: "mockGuid",
      },
    ];

    const result = convertLanguages(languages);

    result.forEach((lang) => {
      expect(lang).toBeTruthy();
    });
    expect(ImageList).toBeTruthy();
  });
});
