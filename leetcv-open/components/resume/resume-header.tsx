"use client";

import { Resume } from "@/lib/schemas/resume.schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Mail, Phone, Globe, Building } from "lucide-react";

interface ResumeHeaderProps {
  resume: Resume;
}

export default function ResumeHeader({ resume }: ResumeHeaderProps) {
  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
      <div className="flex-shrink-0">
        <Avatar className="h-24 w-24 md:h-32 md:w-32">
          <AvatarImage src={resume.avatar || resume.image || ""} alt={resume.displayName} />
          <AvatarFallback className="text-2xl">
            {getInitials(resume.displayName)}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-2">{resume.displayName}</h1>
        <h2 className="text-xl text-muted-foreground mb-4">{resume.title || resume.position}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {resume.city && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{[resume.city, resume.state, resume.country].filter(Boolean).join(", ")}</span>
            </div>
          )}
          
          {resume.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{resume.email}</span>
            </div>
          )}
          
          {resume.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{resume.phone}</span>
            </div>
          )}
          
          {resume.portfolioLink && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a href={resume.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Portfolio
              </a>
            </div>
          )}
          
          {resume.currentCompany && (
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{resume.currentCompany}</span>
            </div>
          )}
        </div>

        {resume.description && (
          <div className="mt-4">
            <p className="text-sm">{resume.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}