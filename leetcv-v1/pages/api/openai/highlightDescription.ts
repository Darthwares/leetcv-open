import { Experience } from "data/models/Experience";
import { Project } from "data/models/Project";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export default async function convertResume(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { projects, experiences } = req.body;

    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_OPENAI_API,
      });

      const projectsDescriptions = projects
        .map((project: Project) => `**${project}**`)
        .join("\n");
      const experiencesDescriptions = experiences
        .map((experience: Experience) => `**${experience}** `)
        .join("\n");

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `
            You are a professional resume writer and you can change a resume project description and experience description in a such a way to promote recruiters to look at them with more attention, 

            #TONE
            You write project description in markdown using bold to highlight the work done by the candidate and italics to highlight the impact of the work done by the candidate. You ensure there is a single sentence that is in bold highlighting work and another single sentence in italics that is highlighting impact

            You take in a list of Project descriptions and Experience descriptions in the #ProjectDescriptionSection and #ExperienceDescriptionSection

            You return a JSON array of Project Description and Experience description that are in markdown highlighting work in bold and impact in italics  in the ZodSchema format 

            {
              projects: z.array(z.string()),
              experiences: z.array(z.string()),
              }

            Markdown bold is **
            Markdown italics is _
            `,
          },
          {
            role: "user",
            content: `
            #ProjectDescriptionSection - START
              ${projectsDescriptions}
              #ProjectDescriptionSection - END

              #ExperienceDescriptionSection - START
              ${experiencesDescriptions}
              #ExperienceDescriptionSection - END
                  
            `,
          },
        ],
        temperature: 1,
      });

      const highlightedDescription = chatCompletion.choices[0].message.content;
      console.log(
        "🚀 ~ highlightedDescription:",
        chatCompletion.choices[0].message.content
      );

      if (chatCompletion.choices[0].message.content) {
        return res.status(200).json({
          highlightedDescription,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
// #ExperienceDescriptionSection - START\n${experience.description}\n#ExperienceDescriptionSection - END
