import ProjectDetailsHeader from "./projectDetailsHeader";
import ProjectSection from "./projectSection";

export default function ProjectDetails() {
  return (
    <div data-testid="projectDetails" className="z-10 mb-2" id="projects">
      <ProjectDetailsHeader />
      <ProjectSection />
    </div>
  );
}
