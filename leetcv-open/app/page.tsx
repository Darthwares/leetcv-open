import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  let session;
  
  try {
    session = await getServerSession(authOptions);
    
    if (session) {
      redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error getting session:", error);
    // Continue without session
  }

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="container mx-auto flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">LeetCV</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost">
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/signin">Get Started</Link>
              </Button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 container mx-auto py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Professional Resumes Made Simple
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Create, manage, and share your professional resume with LeetCV
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/signin">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/signin">Sign In</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Create Resume</h3>
                <p className="text-muted-foreground">Build a professional resume with our easy-to-use tools</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Google Authentication</h3>
                <p className="text-muted-foreground">Secure login with your Google account</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border rounded-lg">
                <div className="mb-4 p-3 bg-primary/10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16 6 12 2 8 6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Share Resume</h3>
                <p className="text-muted-foreground">Share your resume with a custom URL</p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="border-t py-8">
          <div className="container mx-auto text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} LeetCV. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
