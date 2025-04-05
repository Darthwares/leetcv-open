import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { type, descriptionText } = req.body;
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
            You are professional resume description generator bot. You main job is to STRICTLY analyze the given description and ${type} it based on analyzing, provide a meaningful description in 30 words: ${descriptionText}`,
          },
        ],
        max_tokens: 100,
        temperature: 1,
      });
      const responseText = chatCompletion.choices[0].message.content;
      res.status(200).json({ description: responseText });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
