import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

interface UserInteractionRequest {
  sessionId: string;
  currentQuestion: string;
  transcript: string;
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing to use raw streams
  },
};

export default async function userInteraction(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    console.error("Method not allowed");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Parse the request body manually
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  const data = JSON.parse(Buffer.concat(buffers).toString());
  const { sessionId, currentQuestion, transcript }: UserInteractionRequest =
    data;

  if (!sessionId || !currentQuestion || !transcript) {
    console.error("Missing required fields");
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_OPENAI_API,
    });

    // Set headers for streaming
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const prompt = `The user is answering the following interview question:

    Question: ${currentQuestion}
    User's partial answer: ${transcript}

    Analyze the user's response. If the answer seems close to complete (i.e., if it contains relevant details, is logically structured, or has a natural conclusion), suggest the user move on to the next question. Otherwise, simplify the question or ask it in a different way to encourage the user to elaborate their answer.

    **Instructions:**
    - Never provide the answer.
    - Avoid repeating the question.
    - Provide guidance that is relevant and encourages further response, or suggest transitioning to the next question if appropriate.
    - Each sentence you generate must be at least 10 words and at most 15 words.
    - Avoid breaking sentences abruptly.
    `;

    const responseStream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
      max_tokens: 300,
      temperature: 0.5,
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of responseStream) {
      if (chunk.choices && chunk.choices[0].delta.content) {
        const sentence = chunk.choices[0].delta.content;
        fullResponse += sentence;

        if (sentence.trim().endsWith(".")) {
          const ttsResponse = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: fullResponse,
            speed: 1,
            response_format: "mp3",
          });

          const arrayBuffer = await ttsResponse.arrayBuffer();
          const audioBase64 = Buffer.from(arrayBuffer).toString("base64");

          console.log("fullResponse", fullResponse);
          console.log("audioBase64", audioBase64 ? true : false);

          // Stream the audio data to the client
          res.write(JSON.stringify({ audio: audioBase64 }) + "\n");

          fullResponse = ""; // Reset for the next response segment
        }
      }
    }

    res.end();
  } catch (error) {
    console.error("Error in userInteraction API:", error);
    // Ensure that error responses are only sent if headers haven't been sent
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal Server Error", details: error });
    }
  }
}
