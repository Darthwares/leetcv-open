import { Progress } from "shadcn/components/ui/progress";
import { Trophy, BookOpen } from "lucide-react";
import { trpc } from "@utils/trpc";

interface CourseDetailProps {
  section: string;
  courseName: string;
  image: string;
  description: string;
  progress: number;
  completed: number;
  total: number;
  levels: number;
  isStarted: boolean;
}

const CourseDetail = ({
  section,
  courseName,
  image,
  description,
  progress,
  completed,
  total,
  isStarted,
}: CourseDetailProps) => {
  const { data: unitsDescription } = trpc.useQuery([
    "fs.leetCourseRouter.getUnitsDescription",
    {
      courseName,
      sectionName: section,
    },
  ]);

  return (
    <div className="my-10 p-4 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-4">
          {courseName} - {section}
        </h2>
        <div className="flex items-center space-x-4 mb-6 text-xs sm:text-base">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            <span>{total} Units</span>
          </div>
          <div className="flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            <span>{completed} Completed</span>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={progress} className="h-3 w-full bg-white/20" />
          <p className="text-sm font-medium">{progress}% Complete</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {description && (
          <div className="bg-white rounded-xl px-6 py-2 shadow-md">
            <h3 className="text-lg font-semibold mb-2">About This Course</h3>
            <p className={`${!isStarted ? "text-gray-500" : "text-gray-700"} text-sm p-2 leading-relaxed`}>
              {description}
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl px-6 py-2 shadow-md">
          <h3 className="text-xl font-semibold mb-4">Course Units</h3>
          <div className="space-y-2">
            {unitsDescription?.map((unit, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900">{unit.unitName}</h4>
                <p className="text-gray-600 mt-1 text-sm">{unit.unitDescription}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
