import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function generateRefinedExperience(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, description, section } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });

      const modifiedPrompt = `I need you to assume yourself as description generator expert whose main job is to refine the given description to be more engaging and detailed. Ensure it closely matches the title: ${title}. Title might imply various aspects, try to cover new angles or introduce unique points not mentioned before. \n\n Description to refine: ${description} \n\n

      You are a professional resume writer and you are to return a string with a "description" property. The description value should be formatted in markdown, with the work done by the candidate in bold and the impact of their work in italics. Ensure the description is concise and impactful, using only one sentence in bold and one in italics. Title might imply various aspects, try to cover new angles or introduce unique points not mentioned before.

      # TASK
      Refine [PRODUCT_DESCRIPTION] to bullet points that are more concise and impactful.
      Combine work and impact together in an elegant sentence per bullet point.
      Highlight always the work the candidate did in markdown bold and the impact of the work in markdown italics
      Generate no more than 5 bullet points.
      # TONE
      Keep the Tone professional and concise.
      Keep project description captivating and concise.
      # OUTPUT FORMAT
      OUTPUT should have only bullet points
      - [Bullet Point 1 of project or experience description work and impact]
      - [Bullet Point 2 of project or experience description work and impact]
      OUTPUT should not have any [] tags in it.
      refine the OUTPUT every time.

      "description": "string"

      Where "string" is your markdown-formatted ${section} description. Use "**" for bold and "_" for italics.
      `;

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: modifiedPrompt,
          },
          {
            role: "user",
            content: `
            Here is the ${section} description:

            #${section}DescriptionSection - START
            **${description}**
            #${section}DescriptionSection - END
            `,
          },
        ],
        temperature: 1,
      });

      const convertedDescription = chatCompletion.choices[0].message.content;
      console.log("🚀 ~ convertedDescription:", convertedDescription);

      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json({
          description: convertedDescription,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
