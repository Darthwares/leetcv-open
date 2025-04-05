import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

export default async function endInterview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId, qaHistory, name } = req.body;

  if (req.method === "POST") {
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API, // Ensure this is a server-side environment variable
      });
      console.log("OpenAI client initialized for analysis");

      // Array to hold the individual question-answer analyses in object format
      const qaAnalyses = [];

      // Function to extract JSON from possible code blocks
      const extractJSON = (text: string): string | null => {
        const codeBlockRegex = /```json([\s\S]*?)```/i;
        const match = text.match(codeBlockRegex);
        if (match && match[1]) {
          return match[1].trim();
        }
        return text;
      };

      // Loop through each question-answer pair in the qaHistory
      for (const [index, qa] of qaHistory.entries()) {
        let qaAnalysis = {
          question: qa.question,
          answer: qa.answer,
          idealAnswer: "",
          areasForImprovement: "",
          score: 0,
          gptResponseContent: "", // To include the Markdown-formatted GPT response
        };

        // Create the prompt for GPT based on the question and answer
        const prompt = `
          You are an expert interviewer and a teacher. Please analyze the following question and answer from a mock interview:

          Question: ${qa.question}
          Student's Answer: ${qa.answer || "No answer provided"}

          Based on the student's response, provide the following in JSON format only (no markdown or code blocks):
          {
            "idealAnswer": "Your ideal answer here...",
            "areasForImprovement": "Your detailed feedback here...",
            "score": 0
          }

          Ensure the JSON is properly formatted and includes all three fields. The score should be an integer between 0 and 100, representing the quality of the student's answer based on accuracy, completeness, and communication.
        `.trim();

        const analysisResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini", // Updated model name
          messages: [{ role: "system", content: prompt }],
          max_tokens: 700, // Increased tokens to accommodate detailed JSON
          temperature: 0.3, // Lower temperature for more deterministic responses
        });

        let content = analysisResponse.choices[0].message.content?.trim() ?? "";

        // Log the raw GPT response for debugging
        console.log("GPT response content:", content);

        // Assign the raw GPT response to the analysis object initially
        qaAnalysis.gptResponseContent = content;

        // Extract JSON if it's within code blocks
        const jsonString = extractJSON(content) || content;

        // Attempt to parse the GPT response as JSON
        try {
          const parsedResponse = JSON.parse(jsonString);

          // Validate the parsed response
          if (
            typeof parsedResponse.idealAnswer === "string" &&
            typeof parsedResponse.areasForImprovement === "string" &&
            typeof parsedResponse.score === "number"
          ) {
            qaAnalysis.idealAnswer = `\n${parsedResponse.idealAnswer}`;
            qaAnalysis.areasForImprovement = `\n${parsedResponse.areasForImprovement}`;
            qaAnalysis.score = parsedResponse.score;

            // Convert parsed JSON to Markdown for gptResponseContent
            qaAnalysis.gptResponseContent = `${parsedResponse.idealAnswer}
            `.trim();
          } else {
            // If JSON structure is incorrect, use fallback messages
            qaAnalysis.idealAnswer =
              "The ideal answer was not generated correctly. Please review the input.";
            qaAnalysis.areasForImprovement =
              "No feedback for improvement provided.";
            qaAnalysis.score = 0;
            qaAnalysis.gptResponseContent =
              "Invalid JSON structure received from GPT.";
            console.error(
              "GPT response JSON structure is incorrect:",
              parsedResponse
            );
          }
        } catch (jsonError) {
          // If JSON parsing fails, use fallback messages
          qaAnalysis.idealAnswer =
            "The ideal answer was not generated correctly. Please review the input.";
          qaAnalysis.areasForImprovement =
            "No feedback for improvement provided.";
          qaAnalysis.score = 0;
          qaAnalysis.gptResponseContent =
            "Failed to parse GPT response as JSON.";
          console.error("Failed to parse GPT response as JSON:", jsonError);
        }

        // Add the individual analysis to the array
        qaAnalyses.push(qaAnalysis);
      }

      const interviewReport = {
        report: qaAnalyses,
        sessionId: sessionId,
        studentName: name,
        date: new Date().toLocaleDateString(),
        interviewer: "LeetCV",
      };
      // Return the full analysis as an array of objects
      res.status(200).json(interviewReport);
    } catch (error) {
      console.error("Error analyzing interview:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    console.error(`Method ${req.method} not allowed`);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
