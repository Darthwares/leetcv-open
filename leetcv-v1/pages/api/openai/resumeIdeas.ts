import { NextApiRequest, NextApiResponse } from "next";
import { zodToJsonSchema } from "zod-to-json-schema";
import OpenAI from "openai";
import { resumeSchema } from "data/schemas/resume.schema";

export default async function ResumeReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const zodSchema = resumeSchema;
  const jsonSchema = zodToJsonSchema(zodSchema);

  if (req.method === "POST") {
    const { resume, jobDescription } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });

      const chatCompletion = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: ` Given a JSON schema represented as ${JSON.stringify(
              jsonSchema
            )}, 

            #PERSONA
            You are a professional resume reviewer bot based on the given resume you have to analyze and provide ideas for improvement. Suggest the best ideas to improve the resume in bullet points. 
            Extract the important keywords from the job description and analyze it in the given resume, if the keywords are not present in the resume then highlight in the form of summary. 

            - And STRICTLY Make sure to complete tje entire analysis in 199 words with bullet points.

            # CONTEXT
            resume: ${resume}
            job Description: ${jobDescription}

        
            `,
          },
        ],
        max_tokens: 2000,
        temperature: 1,
      });

      const optimizeHeadline = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `
            Based on the given job desciption you need to generate a best suited headline summary which would suit which is best suited the candidate, the headline must be of atleast 30 words.

            jobDescription: ${jobDescription}

            refine the OUTPUT every time.
            `,
          },
        ],
        max_tokens: 700,
        temperature: 1,
      });

      const optimizeSkills = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `
            Given the job description provided in the variable "jobDescription," extract and output the skills that are best suited for the candidate. Ensure that the output is strictly in the form of an array of strings. get a list of 20 skills

            jobDescription: ${jobDescription}
            
            Refine the OUTPUT each time to meet the following format:
            ['react', 'css']
            `,
          },
        ],
        max_tokens: 700,
        temperature: 1,
      });

      const jobTitleOptimize = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `
            Based on the given job description you need to extract the the job position which is best suited for the candidate.

            desired output must by a string. eg.Full Stack Developer

            jobDescription: ${jobDescription}
            `,
          },
        ],
        max_tokens: 700,
        temperature: 1,
      });
      const yearOfExperienceOptimize = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `
            Based on the given job description you need to extract the year of experience which is best suited the candidate, the year of experience must be an array of strings.

            desired output must consist of two indexs in the array. The first index would be the starting year of experience and the second index would be the ending year of experience.

            jobDescription: ${jobDescription}
            OUTPUT should not have any other things other than array in it.
            for example: ["4", "2"]

            where 4 is year and 2 is month.

            refine the OUTPUT every time.
            `,
          },
        ],
        max_tokens: 700,
        temperature: 1,
      });

      const improvementIdeas = chatCompletion.choices[0].message.content;
      const skillCompletion = optimizeSkills.choices[0].message.content;
      const headlineCompletion = optimizeHeadline.choices[0].message.content;
      const yoeCompletion = yearOfExperienceOptimize.choices[0].message.content;
      const jobTitle = jobTitleOptimize.choices[0].message.content;

      res.status(200).json({
        ideas: improvementIdeas,
        skillCompletion,
        headlineCompletion,
        yoeCompletion,
        jobTitle,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
