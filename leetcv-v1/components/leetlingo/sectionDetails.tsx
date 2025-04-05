import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  BookOpen,
  Trophy,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "shadcn/components/ui/button";

interface SectionDetailsProps {
  sectionName: any;
  courseName: any;
}
const SectionDetails = ({ sectionName, courseName }: SectionDetailsProps) => {
  const [openSections, setOpenSections] = useState<number[]>([1]); // Initialize with first unit open
  const router = useRouter(); // Initialize router for navigation

  const courseContent = [
    {
      unit: 1,
      title: "Introduction to Web Development",
      duration: "2 weeks",
      topics: [
        "Setting up your development environment",
        "HTML5 fundamentals",
        "CSS3 and modern layouts",
        "JavaScript basics and ES6+",
      ],
      outcomes: [
        "Build basic web pages",
        "Style with modern CSS",
        "Write basic JavaScript",
      ],
    },
    {
      unit: 2,
      title: "Frontend Frameworks",
      duration: "3 weeks",
      topics: [
        "React fundamentals",
        "Component lifecycle",
        "State management",
        "Routing and navigation",
      ],
      outcomes: [
        "Create React applications",
        "Manage component state",
        "Implement client-side routing",
      ],
    },
    {
      unit: 3,
      title: "Backend Development",
      duration: "3 weeks",
      topics: [
        "Node.js basics",
        "Express.js framework",
        "RESTful API design",
        "Database integration",
      ],
      outcomes: [
        "Build REST APIs",
        "Handle database operations",
        "Implement authentication",
      ],
    },
  ];

  const toggleSection = (unitNumber: number) => {
    setOpenSections((prev) =>
      prev.includes(unitNumber)
        ? prev.filter((num) => num !== unitNumber)
        : [...prev, unitNumber]
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 lg:py-12">
      {/* Course Header */}
      <Button
        variant="ghost"
        className="mb-6 gap-2 pl-0 hover:underline"
        size="sm"
        onClick={() => router.push(`/s/course/${courseName}/sections`)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Details for {sectionName} in {courseName}
        </h1>
        <p className="text-gray-600 mb-4">
          Master the art of web development with our comprehensive curriculum.
          This course is designed to take you from basics to advanced concepts.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>8 weeks</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="w-5 h-5 mr-2" />
            <span>12 modules</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Trophy className="w-5 h-5 mr-2" />
            <span>Certificate of completion</span>
          </div>
        </div>
      </div>

      {/* Back Button */}

      {/* Course Content Accordion */}
      <div className="space-y-4">
        {courseContent.map((unit) => (
          <div
            key={unit.unit}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleSection(unit.unit)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold">
                  Unit - {unit.unit}
                </span>
              </div>
              {openSections.includes(unit.unit) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {openSections.includes(unit.unit) && (
              <div className="p-4 border-t border-gray-200">
                <h1 className="text-2xl font-bold mb-4">{unit.title}</h1>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Topics Covered
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {unit.topics.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Learning Outcomes
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {unit.outcomes.map((outcome, index) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration: {unit.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionDetails;
