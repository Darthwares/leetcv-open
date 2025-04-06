"use client";

import { Project } from "@/lib/schemas/resume.schema";
import { Calendar, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/button";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Projects</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{project.name}</h3>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Link
                </a>
              )}
            </div>
            
            {(project.startDate || project.endDate) && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {project.startDate} {project.endDate && `- ${project.endDate}`}
                </span>
              </div>
            )}
            
            {project.description && <p className="text-sm mt-2">{project.description}</p>}
            
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}