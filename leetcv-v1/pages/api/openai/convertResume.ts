import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function convertResume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { resume } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `
            
            You are a Resume JSON generator, you generate perfect JSON output and you return only the JSON output as the result.

            You take in a #ZodSchema of the JSON you need to create and you also take in #RawExtractedResumeText as input to get all the sections of the Resume JSON you need to return.

          - use guids and make sure all id's unique
          - For ongoing experiences or projects, where an end date is not mentioned, label them as "Present".
          - For missing grades in the education section, default to "A".
          - Extract and include essential information such as current work position, portfolio, email, skills, project skills.
          - STRICTLY make sure the Experiences, Projects, Educations, Courses includes the start dates and end dates in its relative field as "2024-05" format
          - Certifications, Awards includes the date in its relative field as "2024-05" format, if not found then use current month and year.
          - STRICTLY convert all the values in zodSchema, if you dont find any details for the relevant schema then add default value for that schema.
          - When you analyzing the projects, strictly add project work and  the skills thats are used.

            #TONE
            On extracting information and building out properties be elaborate on your description of projects and use all the information from the #RawExtractedResumeText  to ensure every small information from it is captured.
            
            Keep the Tone professional for a resume.
            
            #OUPUT
            Output only a valid JSON that fits the #ZodSchema accurately and should be parsable by JSON.parse()
            
            #Extraction Rules
            YOU SHOULD always fill the root level description property with enough information about the candidate based and make it clean and capture all details that makes them special

            #ZodSchema - START
            z.object({
              id: z.string(),
              email: z.string(),z
              displayName: z.string(),
              description: z.string().min(400).optional(),
              address: z.string().optional(),
              currentCompany: z.string().optional(),
              title: z.string().optional(),
              position: z.string().optional(),
              remoteWork: z.enum(["Office", "Remote", "Both", "None"]),
              portfolioLink: z.string().optional(),
              projects: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  skills: z.array(z.string()),
                  company: z.string(),
                  title: z.string(),
                  start: z.string(),
                  end: z.string(),
                  work: z.string(),
                  url: z.string().optional(),
                })
              ),
              experiences: z
                .array(
                  z.object({
                    id: z.string(),
                    title: z.string().optional(),
                    company: z.string().optional(),
                    city: z.string().optional(),
                    start: z.string().optional(),
                    end: z.string().optional(),
                    description: z.string().optional(),
                  })
                )
                .optional(),
              awards: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    awardFor: z.string(),
                    date: z.string(),
                    description: z.string(),
                  })
                )
                .optional(),
              courses: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    start: z.string(),
                    end: z.string(),
                    coursePlatform: z.string(),
                    courseId: z.string(),
                    certificateLink: z.string(),
                  })
                )
                .optional(),
              educations: z
                .array(
                  z.object({
                    id: z.string(),
                    start: z.string(),
                    end: z.string(),
                    major: z.string(),
                    name: z.string(),
                    degree: z.string(),
                    grade: z.string(),
                  })
                )
                .optional(),
              certificates: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    issuingOrganization: z.string().optional(),
                    issueDate: z.string(),
                    expirationDate: z.string().optional(),
                    credentialID: z.string().optional(),
                    credentialURL: z.string().optional(),
                  })
                )
                .optional(),
              patents: z
                .array(
                  z.object({
                    id: z.string(),
                    title: z.string(),
                    patentNumber: z.string(),
                    patentDescription: z.string().optional(),
                    patentIssueDate: z.string().optional(),
                    patentMembers: z
                      .array(
                        z.object({
                          id: z.string(),
                          name: z.string(),
                          url: z.string().optional(),
                        })
                      )
                      .optional(),
                    isPatentIssued: z.boolean().optional(),
                    patentURL: z.string().optional(),
                  })
                )
                .optional(),
                languages: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string(),
                    read: z.boolean().optional(),
                    write: z.boolean().optional(),
                    speak: z.boolean().optional(),
                  })
                )
                .optional(),
              publications: z.array(z.object({
                id: z.string(),
                title: z.string(),
                publisher: z.string(),
                publicationDate: z.string(),
                publicationURL: z.string(),
                description: z.string(),
              })).optional(),
              socialMedia: z
                .array(
                  z.object({
                    id: z.string(),
                    name: z.string().optional(),
                    socialMediaUrl: z.string().optional(),
                  })
                )
                .optional(),
              causes: z
                .array(
                  z.object({
                    name: z.string(),
                  })
                )
                .optional(),
              preferences: z.array(z.string()).optional(),
              hobbies: z.array(z.string()).optional(),
              causesList: z.array(z.string()).optional(),
              version: z.string(),
              private: z.boolean(),
            });
            #ZodSchema - END
            
            Remember, the quality of your output directly impacts the candidate's opportunity to showcase their best to potential employers. Ensure all information is captured and presented in the most structured and professional manner possible.

            Your output must include unique IDs where required, considering the complex nature of resumes and the need for precision in representing an individual's professional background.

            If you get any value as null, please always return as empty string.
            `,
          },
          {
            role: "user",
            content: `
            #RawExtractedResumeText - START
            ${resume}
            #RawExtractedResumeText - END
            `,
          },
        ],
        temperature: 1,
      });

      const convertedResume = chatCompletion.choices[0].message.content;
      console.log("🚀 ~ convertedResume:", convertedResume);

      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json({
          resume: convertedResume,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
