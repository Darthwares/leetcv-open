import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function ProjectRecommendations(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { resume } = req.body;

  try {
    const apiKey = process.env.NEXT_OPENAI_API;
    const model = "gpt-4o-mini";

    if (!apiKey || !model) {
      return res
        .status(500)
        .json({ error: "Missing OpenAI API key or model." });
    }

    const openai = new OpenAI({ apiKey });

    const projectRecommendations = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: `
           You are an AI assistant tasked with analyzing a resume and suggesting project recommendations based on the candidate's skills, experience, projects, and education. Your goal is to provide diverse and unique project ideas that will enhance the candidate's professional development and showcase their abilities to potential employers.

           First, carefully review the following resume:

           <resume>
           ${JSON.stringify(resume)}
           </resume>

           Based on the information provided in the resume, you will suggest new project recommendations for three difficulty levels: basic, medium, and hard. For each difficulty level, provide three project titles that are unique and vary with each suggestion, reflecting the candidate's background and helping them develop their skills further.

           Strict Guidelines for Project Suggestions:

           1. Do not suggest personal portfolio websites or similar portfolio-related projects as project recommendations.
           2. Align with the candidate's field of study or work experience.
           3. Demonstrate practical application of the candidate's skills.
           4. Include a mix of individual and collaborative project ideas.
           5. Ensure projects are realistic for the candidate to pursue.
           6. Provide concise project descriptions (10-15 words) explaining how the project would help the candidate learn the concept.

           To generate diverse and unique projects:
           1. Consider different aspects of the candidate's background and skills for each project.
           2. Incorporate emerging technologies or trends in the candidate's field.
           3. Think creatively about combining multiple skills or interests.
           4. Suggest projects that fill gaps in the candidate's current experience.
           5. Vary the scale and scope of projects within each difficulty level.

           Present your recommendations in a JSON object with three keys: basic, medium, and hard. Each key should contain an array of strings, where each string includes a project title followed by a brief one-sentence description. Use this format:
           {
             "basic": [
               "Project Title 1: A short description.",
                "Project Title 2: A short description.",
                "Project Title 3: A short description."
             ],
             "medium": [
                "Project Title 1: A short description.",
                "Project Title 2: A short description.",
                "Project Title 3: A short description."
             ],
              "hard": [
                "Project Title 1: A short description.",
                "Project Title 2: A short description.",
                "Project Title 3: A short description."
              ]
            }

           Ensure that each set of project recommendations is unique and tailored to the candidate's specific skills, representing opportunities for growth and skill development in their professional field.
        `,
        },
      ],

      max_tokens: 500,
      temperature: 0.7,
      response_format: {
        type: "json_object",
      },
    });

    const recommendations = projectRecommendations.choices[0].message.content;

    if (!recommendations) {
      return res
        .status(500)
        .json({ error: "No recommendations received from OpenAI." });
    }

    try {
      const parsedRecommendations = JSON.parse(recommendations);
      return res.status(200).json(parsedRecommendations);
    } catch (parseError) {
      console.error("Error parsing recommendations:", parseError);
      return res
        .status(500)
        .json({ error: "Invalid response format from OpenAI." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
