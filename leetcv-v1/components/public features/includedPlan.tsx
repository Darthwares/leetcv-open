import { BriefcaseIcon, WandIcon } from "@components/svg";
import { DocumentTextIcon } from "@heroicons/react/outline";

function IncludePlan() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8">
          Included with every plan
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <DocumentTextIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Resume Reviews</h3>
            <p className="text-gray-600">
              You can receive 20 reviews from your peers, tailor-made for each
              job application. No limits, just endless opportunities to land
              your dream role.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <WandIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Resume Wizard</h3>
            <p className="text-gray-600">
              Starting from getting your name, skills, area of expertise, and
              projects, we tailor the best resumes for you.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <BriefcaseIcon className="w-12 h-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Portfolio</h3>
            <p className="text-gray-600">
              Showcase your best work and projects in a visually appealing
              portfolio, helping you stand out from the competition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IncludePlan;
