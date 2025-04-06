"use client";

import { Resume } from "@/lib/schemas/resume.schema";
import ResumeHeader from "./resume-header";
import Experiences from "./experiences";
import Projects from "./projects";
import EducationSection from "./education";
import Skills from "./skills";
import SocialMediaLinks from "./social-media";

interface ResumeViewProps {
  resume: Resume;
}

export default function ResumeView({ resume }: ResumeViewProps) {
  return (
    <div className="max-w-4xl mx-auto bg-background p-6 rounded-lg shadow">
      <ResumeHeader resume={resume} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Experiences experiences={resume.experiences || []} />
          <Projects projects={resume.projects || []} />
        </div>
        
        <div className="space-y-8">
          <Skills skills={resume.skills || []} />
          <EducationSection educations={resume.educations || []} />
          <SocialMediaLinks socialMedia={resume.socialMedia || []} />
        </div>
      </div>
    </div>
  );
}