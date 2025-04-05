import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
export default async function getAIReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userInfo } = req.body;
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });
      const chatCompletion = await openai.chat.completions.create({
        model: `${process.env.NEXT_PUBLIC_GPT_4}`,
        messages: [
          {
            role: "system",
            content: `${JSON.stringify(userInfo)} 
            You are a professional resume reviewer bot, who has idea of all resumes from every field in the world. Your main objective is to STRICTLY analyze the given resume and write down a feedback summary STRICTLY after analyzing the resume,in mark down format. Give 5 ideas to improve then rate them a rating for ATS readability, current market fit and clarity. Create the list and your thought process in markdown highlighting all the important sections with bold.
            
            Create the list and your thought process in markdown highlighting all the important sections with bold. DO NOT Write the Markdown RESUME. DO NOT talk about profile picture. SHOULD always give a 2-to-3-line improvement edit after each improvement on the final list of 5. Use Emphasis Markdown block to highlight the improvement edits. SHOULD always keep improvements clear and concise. Also #STRICTLY Show the ATS score at the end after doing the complete analysis 

           And STRICTLY Make sure to complete tje entire analysis in 199 words with bullet points where ever it is required.
            `,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });
      const responseText = chatCompletion.choices[0].message.content;
      res.status(200).json({ aiReview: responseText });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
