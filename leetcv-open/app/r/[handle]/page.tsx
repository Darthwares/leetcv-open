import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getResumeByHandle } from "@/lib/services/resume-service";
import ResumeView from "@/components/resume/resume-view";

interface PublicResumePageProps {
  params: {
    handle: string;
  };
}

export async function generateMetadata(
  { params }: PublicResumePageProps
): Promise<Metadata> {
  const resume = await getResumeByHandle(params.handle);
  
  if (!resume) {
    return {
      title: "Resume Not Found",
    };
  }
  
  return {
    title: `${resume.displayName}'s Resume | LeetCV`,
    description: resume.description || `Professional resume of ${resume.displayName}`,
  };
}

export default async function PublicResumePage({ params }: PublicResumePageProps) {
  const resume = await getResumeByHandle(params.handle);
  
  if (!resume || resume.private) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-muted py-12">
      <div className="container mx-auto px-4">
        <ResumeView resume={resume} />
      </div>
    </div>
  );
}