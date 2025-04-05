import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function generateWizardSkills(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, expertize, yoe, industry, position } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });

      const skillPromise = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `You are a professional project skill generator bot. your main job is to analyze the given project title:${title}.

            based on the detail analysis you need to generate a valid comma separated list of skills:
            STRICTLY generate a list of skills in one or two words based in the form of array of strings.
            The response should be in plain text (not within a code block) and formatted as a JavaScript array.
            `,
          },
        ],
        max_tokens: 100,
        temperature: 1,
      });

      const titlePromise = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_4}`,
        messages: [
          {
            role: "system",
            content: `Refine and generate a meaningful suitable alternative title for the given text:  ${title}`,
          },
        ],
        max_tokens: 10,
        temperature: 1,
      });

      const descriptionResponse = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_4}`,
        messages: [
          {
            role: "system",
            content: `based on the given details, generate a resume description in 50 words for ${
              yoe || "Fresher"
            } years of experience : ${expertize} ${yoe} ${industry} ${position}`,
          },
        ],
        max_tokens: 50,
        temperature: 1,
      });

      const responseWork = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_4}`,
        messages: [
          {
            role: "system",
            content: `
            #PERSONA
            You are an expert resume writer. 
            You have been hired by a company to write a resume for a candidate. 
            The candidate give you [PRODUCT_DESCRIPTION] and you refine to a better state.

            # TASK
            Refine [PRODUCT_DESCRIPTION] to bullet points that are more concise and impactful.
            Combine work and impact together in an elegant sentence per bullet point.
            Highlight always the work the candidate did in markdown bold and the impact of the work in markdown italics
            Generate no more than 5 bullet points.

            # CONTEXT

            [PRODUCT_DESCRIPTION]
            ${title}
            [END PRODUCT_DESCRIPTION]

            # TONE
            Keep the Tone professional and concise.
            Keep project description captivating and concise.

            # OUTPUT FORMAT
            OUTPUT should have only bullet points
            - [Bullet Point 1 of project description work and impact]
            - [Bullet Point 2 of project description work and impact]

            OUTPUT should not have any [] tags in it.
            `,
          },
        ],
        max_tokens: 700,
        temperature: 0.7,
      });

      const responseImpact = await openai.chat.completions.create({
         model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `separate this in impact, always show impact list as markdown and bold keywords in the output return as a single markdown list with no headers: ${title}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      });

      if (
        skillPromise.choices[0].message.content ||
        descriptionResponse.choices[0].message.content ||
        titlePromise.choices[0].message.content ||
        responseImpact.choices[0].message.content ||
        responseWork.choices[0].message.content
      ) {
        return res.status(200).json({
          skill: skillPromise.choices[0].message.content,
          description: descriptionResponse.choices[0].message.content,
          title: titlePromise.choices[0].message.content,
          work: responseWork.choices[0].message.content,
          impact: responseImpact.choices[0].message.content,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
