"use client";

import { Education } from "@/lib/schemas/resume.schema";
import { Calendar, GraduationCap } from "lucide-react";

interface EducationProps {
  educations: Education[];
}

export default function EducationSection({ educations }: EducationProps) {
  if (!educations || educations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Education</h2>
      <div className="space-y-6">
        {educations.map((edu) => (
          <div key={edu.id} className="space-y-2">
            <h3 className="font-semibold">{edu.school}</h3>
            <div className="flex items-center text-muted-foreground">
              <GraduationCap className="h-4 w-4 mr-2" />
              <span>
                {edu.degree} {edu.field && `in ${edu.field}`}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {edu.startDate} - {edu.current ? "Present" : edu.endDate}
              </span>
            </div>
            {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}