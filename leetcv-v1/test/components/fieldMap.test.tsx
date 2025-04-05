import { publicResume } from "@constants/publicResume";
import {
  certificateFields,
  courseFields,
  educationFields,
  experienceFields,
  languageFields,
  locationFields,
  personalFields,
  professionFields,
  projectFields,
  publicationFields,
  socialMediaFields,
  awardFields,
} from "@components/editor/fieldMap";

describe("describe: field map", () => {
  it("Should pass all the functions in field map", () => {
    let project = publicResume.projects[0];
    let education = publicResume.educations![0];
    let publications = publicResume.publications![0];
    let awards = publicResume.awards![0];
    let courses = publicResume?.courses![0];
    let certificate = publicResume.certificates![0];
    let socialMedia = publicResume.socialMedia![0];
    let languages = publicResume.languages![0];

    const locationField = locationFields(publicResume);
    expect(locationField).toBeTruthy();

    const professionField = professionFields(publicResume);
    expect(professionField).toBeTruthy();

    const experienceField = experienceFields(publicResume);
    expect(experienceField).toBeTruthy();

    const projectField = projectFields(project);
    expect(projectField).toBeTruthy();

    const educationField = educationFields(education);
    expect(educationField).toBeTruthy();

    const publicationField = publicationFields(publications);
    expect(publicationField).toBeTruthy();

    const award = awardFields(awards);
    expect(award).toBeTruthy();

    const course = courseFields(courses);
    expect(course).toBeTruthy();

    const certificates = certificateFields(certificate);
    expect(certificates).toBeTruthy();

    const socialMedias = socialMediaFields(socialMedia);
    expect(socialMedias).toBeTruthy();

    const language = languageFields(languages);
    expect(language).toBeTruthy();
  });
});
