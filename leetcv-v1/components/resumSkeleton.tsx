import { Skeleton } from "../shadcn/components/ui/skeleton";
import Experience from "./skeleton/experience";

export function SkeletonDemo() {
  return (
    <div className="max-7xl px-4 w-full items-center space-y-4">
      <div className="w-full flex">
        <div className="space-x-10 flex w-full">
          <Skeleton className="h-36 w-44 rounded-lg" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-4 w-full md:w-[400px]" />
            <Skeleton className="h-4 w-full md:w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-full md:w-[400px]" />
            <Skeleton className="h-4 w-full md:w-[200px]" />
            <Skeleton className="h-4 w-full md:w-[300px]" />
          </div>
        </div>
        <Skeleton className="h-36 w-44 rounded-lg" />
      </div>
      <div className="w-full">
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="md:mt-1 lg:space-x-10 lg:flex">
        <div className="lg:w-3/4">
          <div className="block">
            {/* <ResumeSkills /> */}
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="print:mt-5">
            <div
              data-testid="experiences"
              className="w-full sm:p-0 print:-mt-4"
            >
              <div className="resume-section-header mr-4">
                <Skeleton className="h-6 w-24" />{" "}
                {/* Skeleton for "Experience" */}
              </div>
             <Experience />
            </div>
          </div>
          {/* <Experiences />
          <Projects />
          <Publications />
          <Awards /> */}
        </div>
        <div className="lg:w-1/4">
          <div className="hidden md:block">
            {/* <ResumeSkills /> */}
            <Skeleton className="h-10 w-full" />
          </div>
          {/* <EducationDetails />
          <Courses />
          <Certificates />
          <Preferences />
          <SocialMediaLink />
          <Languages />
          <Hobbies />
          <Causes /> */}
        </div>
      </div>
    </div>
  );
}
