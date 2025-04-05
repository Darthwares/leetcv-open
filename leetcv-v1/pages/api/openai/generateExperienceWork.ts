import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function generateExperienceWork(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { description } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });
      const experienceResponse = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
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
            Highlight the work the candidate did in markdown bold and the impact of the work in markdown italics
            Generate up to five bullet points.

            # CONTEXT

            [PRODUCT_DESCRIPTION]
            ${description}
            [END PRODUCT_DESCRIPTION]

            # TONE
            Keep the Tone professional and concise.
            Keep project description captivating and concise.

            # OUTPUT FORMAT
            OUTPUT should have only bullet points
            - [Bullet Point 1 of project description work and impact]
            - [Bullet Point 2 of project description work and impact]

            OUTPUT should not have any [] tags in it.

            Don't add any nested bullet points
            `,
          },
        ],
        max_tokens: 700,
        temperature: 1,
      });

      res.status(200).json({
        work: experienceResponse.choices[0].message.content,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
