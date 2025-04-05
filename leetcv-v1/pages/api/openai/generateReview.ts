import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { descriptionText } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });
      const chatCompletion = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_4}`,
        messages: [
          {
            role: "system",
            content: `Refine and reframe the given  ${descriptionText} in a clear context.
             If the input is too short or unclear, respond with: "Please provide a more detailed review to get a refined review. For example, describe what specifically you liked or what could be improved.
            `,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });
      const responseText = chatCompletion.choices[0].message.content;
      res.status(200).json({ description: responseText });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
