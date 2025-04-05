import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { position, expertize, industry, yoe } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });
      const chatCompletion = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_35}`,
        messages: [
          {
            role: "system",
            content: `generate a list of skills in one or two words based in the form of array of strings based for a experienced based on their position, expertize,industry, and year of experience.
                    : ${position}, ${expertize}, ${industry}, ${yoe}
                    The response should be in plain text (not within a code block) and formatted as a JavaScript array.`,
          },
        ],
        max_tokens: 100,
        temperature: 1,
      });
      const responseSkills = chatCompletion.choices[0].message.content;
      responseSkills && res.status(200).json({ skills: responseSkills });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
