"use client";

import { Badge } from "@/components/ui/button";

interface SkillsProps {
  skills: string[];
}

export default function Skills({ skills }: SkillsProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}