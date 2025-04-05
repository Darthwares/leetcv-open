import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
export default async function coverLetter(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      jobDescription,
      jobPosition,
      name,
      jobExperience,
      company,
      resume,
      jobHiringManager,
    } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });
      const chatCompletion = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_4}`,
        messages: [
          {
            role: "system",
            content: `

            Generate a concise cover letter in 125 words or less for the position of **${jobPosition}** based on the following job description:

            - **Job Position:** ${jobPosition}
            - **Job Description:** ${jobDescription}
            - **Name:** ${name}
            - **Job Experience:** ${jobExperience}
            - **Company:** ${company}
            - **Resume:** ${resume}
            
            - Use **bold text** for **Technical skills**, **soft skills**, **tech stacks**, **tools**, and **important keywords**.
            
            Begin with "Dear **${jobHiringManager}**, with **bold text**"
            
            If the ${jobHiringManager}'s name is not provided, use "Hiring Manager" instead.
            
            Address the company name: ${company} instead of "your company."
            
            The cover letter should highlight ${name}'s **${jobExperience} years of experience** in the field, as well as their relevant skills, experience, and qualifications. Express genuine interest in the role and ensure it is well-structured and engaging. Tailor the cover letter to this specific job. Analyze the given details and generate the cover letter accordingly.
            
            [Please ensure appropriate spacing after every concluding sentence] Sign off as ${name}
            
            The name must always be below the keywords.
                        
           `,
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      });
      const responseText = chatCompletion.choices[0].message.content;
      res.status(200).json({ description: responseText });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

// Compose a professional cover letter for the position of ${jobPosition} at ${company}.

// In the body, emphasize the applicant's qualifications and enthusiasm for the role. Highlight their ${jobExperience} years of experience in ${jobDescription} and their skills. Showcase their passion for the field, emphasizing their ability to excel in a team.

// The cover letter should concisely highlight ${name}'s relevant skills and qualifications, with ${jobExperience} years of experience in the field. It should also express genuine interest in the role and the company. Please ensure it is well-structured and engaging. Provide a cover letter tailored to this specific job. The cover letter must be generated STRICTLY within 130 words.

// [Please ensure appropriate spacing after every concluding sentence] Sign off as ${name}
