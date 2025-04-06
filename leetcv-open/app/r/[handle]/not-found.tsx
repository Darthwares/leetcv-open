import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResumeNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Resume Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The resume you're looking for doesn't exist or is set to private.
        </p>
        <Button asChild>
          <Link href="/">
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
}