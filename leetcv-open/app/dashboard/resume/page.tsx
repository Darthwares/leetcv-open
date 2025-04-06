import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserResumes } from "@/lib/services/resume-service";
import ResumeView from "@/components/resume/resume-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Share2 } from "lucide-react";
import Link from "next/link";

export default async function ResumePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Please sign in to view your resume</p>
      </div>
    );
  }

  const resumes = await getUserResumes(session.user.email as string);
  
  if (!resumes || resumes.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resume</h1>
          <p className="text-muted-foreground">
            You don't have any resumes yet.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-4">No Resume Found</h2>
              <p className="text-muted-foreground mb-6">
                You haven't created a resume yet.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const resume = resumes[0]; // Get the first resume

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Resume</h1>
          <p className="text-muted-foreground">
            Manage and share your professional resume
          </p>
        </div>
        <Button asChild>
          <Link href={`/r/${resume.handle}`} target="_blank">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Link>
        </Button>
      </div>

      <ResumeView resume={resume} />
    </div>
  );
}