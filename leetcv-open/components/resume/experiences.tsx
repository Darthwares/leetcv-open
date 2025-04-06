"use client";

import { Experience } from "@/lib/schemas/resume.schema";
import { Calendar } from "lucide-react";

interface ExperiencesProps {
  experiences: Experience[];
}

export default function Experiences({ experiences }: ExperiencesProps) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id} className="space-y-2">
            <h3 className="font-semibold">{exp.position}</h3>
            <h4 className="text-muted-foreground">{exp.company}</h4>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </span>
            </div>
            {exp.description && <p className="text-sm mt-2">{exp.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}